import GameManager from "./GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {  

    @property({ type: cc.AudioClip })
    soundEffect_jump: cc.AudioClip = null;

    @property
    speed: number = 200;

    private horspeed = 500;

    private leftDown: boolean = false;
    private rightDown: boolean = false;
    private faceright: boolean = true;
    private charging: boolean = false;
    private inair: boolean = false;
    private movedir = 0;
    private jumpdir = 0;
    private hormove = 0;
    private floor = 0;
    private cam: cc.Node;
    private anim: cc.Animation;
    private crouchpaused = false;
    private jumptype = 0;
    private maxpower = 1800;
    private powerrate = 150;
    private time = 0;

    private power = 0;
    private count = 0;

    private environment_x: number;
    private environment_y: number;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.cam = cc.find("Canvas/Main Camera");
        this.anim = this.node.getComponent(cc.Animation);
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var cleanEmail = user.email.replace(/\./g, ',');
                firebase.database().ref(cleanEmail).once('value', (snapshot) => {
                    var childData = snapshot.val();
                    if(childData.x != 'X'){
                        this.node.x = childData.x;
                        this.node.y = childData.y;
                        this.time = childData.savetime;
                    }
                });
            }
        });
    }

    start () {
        cc.find("Canvas/Main Camera/Timer").getComponent(cc.Label).string  = '0';
        this.timer();
        this.initButton();
    }


    update (dt) {
        this.count = (this.count == 2)? 0 : this.count + 1;
        //cc.log(this.node.getComponent(cc.RigidBody).linearVelocity.y)
        if(this.node.getComponent(cc.RigidBody).linearVelocity.y != 0){
            this.inair = true;
        }

        this.environment_x = cc.find("Canvas/GameManager").getComponent(GameManager).environmentX();
        this.environment_y = cc.find("Canvas/GameManager").getComponent(GameManager).environmentY();

        //Fall effect
        if(this.node.y >= 6210 && this.node.y <= 9256){
            if(this.environment_x != 0 && this.inair){
                //this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.node.getComponent(cc.RigidBody).linearVelocity.x + this.environment_x, this.node.getComponent(cc.RigidBody).linearVelocity.y);
                this.node.getComponent(cc.RigidBody).applyForce(cc.v2(this.environment_x, 0), this.node.position, false)
            }
            /*if(this.environment_y != 0){
                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.node.getComponent(cc.RigidBody).linearVelocity.x, this.node.getComponent(cc.RigidBody).linearVelocity.y + this.environment_y);
            }*/
        }
        
        //determine wether to swap floor
        if (this.node.y > this.floor*640 + 320) {
            this.floor++;
            this.cam.y = this.floor*640;
        }
        if (this.node.y < this.floor*640 - 320) {
            this.floor--;
            this.cam.y = this.floor*640;
        }

        //if on ground then move
        if (!this.inair) {
            if(this.node.y < 9310){
                this.node.x += this.speed*this.movedir*dt;
            }
            else{
                this.node.getComponent(cc.RigidBody).applyForce(cc.v2(4500*this.movedir, 0), this.node.position, false) //Winter Effect
            }
        }

        //determine the direction that the player face
        if (this.faceright) this.node.scaleX = 1;
        else this.node.scaleX = -1;
        
        //if charging then add power
        if (this.charging && this.power < this.maxpower && this.count == 2) { 
            this.power += this.powerrate;
        }
        else if (this.charging && this.power > this.maxpower) {
            this.power = this.maxpower;
        }

        //determine the rise and fall animation typewhen player jump
        if (this.node.getComponent(cc.RigidBody).linearVelocity.y > 100) {
            //rising
            this.jumptype = 1;
        }
        else if (this.node.getComponent(cc.RigidBody).linearVelocity.y < 100 && this.node.getComponent(cc.RigidBody).linearVelocity.y > -100 && this.inair) {
            //top
            this.jumptype = 2;
        }
        else if (this.node.getComponent(cc.RigidBody).linearVelocity.y < -100) {
            //falling
            this.jumptype = 3;
        }

        this.playAnimation();
    }

    playEffect(num: number){
        if(num == 0){
            cc.audioEngine.playEffect(this.soundEffect_jump, false);
        }
    }

    onKeyDown(event) {
        switch(event.keyCode) {
            case cc.macro.KEY.left:
                //cc.log("key left down");
                this.faceright = false;
                this.leftDown = true;
                this.jumpdir = -1;
                if (this.charging) {
                    this.movedir = 0;
                }
                else {
                    this.movedir = -1;
                }
                
                break;
            case cc.macro.KEY.right:
                //cc.log("key right down");
                this.faceright = true;
                this.rightDown = true;
                this.jumpdir = 1;
                if (this.charging) {
                    this.movedir = 0;
                }
                else {
                    this.movedir = 1;
                }
                break;
            case cc.macro.KEY.space:
                //cc.log("charging");
                if (!this.inair) {
                    this.movedir = 0;
                    this.charging = true;
                }
                break;
            case cc.macro.KEY.a:
                this.upFloor();
                break;
            case cc.macro.KEY.z:
                this.downFloor();
                break;
        }
    }

    onKeyUp(event) {
        switch(event.keyCode) {
            case cc.macro.KEY.left:
                this.leftDown = false;
                if (this.rightDown) {
                    this.faceright = true;
                    this.jumpdir = 1;
                    if (this.charging) {
                        this.movedir = 0;
                    }
                    else {
                        this.movedir = 1;
                    }
                }
                else {
                    this.jumpdir = 0;
                    this.movedir = 0;
                    this.faceright = false;
                }
                break;
            case cc.macro.KEY.right:
                this.rightDown = false;
                if (this.leftDown) {
                    this.faceright = false;
                    this.jumpdir = -1;
                    if (this.charging) {
                        this.movedir = 0;
                    }
                    else {
                        this.movedir = -1;
                    }
                }
                else {
                    this.jumpdir = 0;
                    this.movedir = 0;
                    this.faceright = true;
                }
                break;
            case cc.macro.KEY.space:
                if (this.charging) {
                    this.charging = false;
                    this.inair = true;
                    this.hormove = this.movedir;
                    this.jump();
                }
                
        }
    }

    initButton() { 
        let clickEventHandler_save = new cc.Component.EventHandler(); 
        clickEventHandler_save.target = this.node;
        clickEventHandler_save.handler = "loadLoginScene";
        clickEventHandler_save.component = "Player";
        cc.find("Canvas/Main Camera/Save Button").getComponent(cc.Button).clickEvents.push(clickEventHandler_save);
    } 

    loadLoginScene(){
        var time = parseInt(cc.find("Canvas/Main Camera/Timer").getComponent(cc.Label).string);
        var X = cc.find("Canvas/Player").getComponent(Player).node.x;
        var Y = cc.find("Canvas/Player").getComponent(Player).node.y;
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var cleanEmail = user.email.replace(/\./g, ',');
                firebase.database().ref(cleanEmail).once('value', (snapshot) => {
                    var childData = snapshot.val();
                    firebase.database().ref(cleanEmail).set({
                        time: childData.time,
                        savetime: time,
                        x: X, //人現在的位置
                        y: Y //人現在的位置
                    });
                });
            }
        });
        cc.director.loadScene("Menu");
    }

    timer() {
        this.schedule(function() {
            this.time += 1;
            cc.find("Canvas/Main Camera/Timer").getComponent(cc.Label).string = String(this.time);
        }, 1);
    }

    jump() {
        cc.log("jump");
        cc.log("movedir: " + this.movedir);
        cc.log("power: " + this.power);
        this.playEffect(0);
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.jumpdir*this.horspeed, this.power);
    }

    onBeginContact(contact, self, other) {
        //cc.log("contact");
        cc.log(contact.getWorldManifold().normal);
        if(other.node.name == "End"){
            var time = parseInt(cc.find("Canvas/Main Camera/Timer").getComponent(cc.Label).string);
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    var cleanEmail = user.email.replace(/\./g, ',');
                    firebase.database().ref('rank').once('value', function(snapshot) {
                        var childData = snapshot.val();
                        if(childData.one == 'X' || time < parseInt(childData.oneval, 10)){
                            firebase.database().ref('rank').set({
                                one: cleanEmail.split('@')[0].toUpperCase(),
                                oneval: time,
                                two: childData.one,
                                twoval: childData.oneval,
                                three: childData.two,
                                threeval: childData.twoval,
                            });
                        }
                        else if(childData.two == 'X' || time < parseInt(childData.twoval, 10)){
                            firebase.database().ref('rank').set({
                                one: childData.one,
                                oneval: childData.oneval,
                                two: cleanEmail.split('@')[0].toUpperCase(),
                                twoval: time,
                                three: childData.two,
                                threeval: childData.twoval,
                            });
                        }
                        else if(childData.three == 'X' || time < parseInt(childData.threeval, 10)){
                            firebase.database().ref('rank').set({
                                one: childData.one,
                                oneval: childData.oneval,
                                two: childData.two,
                                twoval: childData.twoval,
                                three: cleanEmail.split('@')[0].toUpperCase(),
                                threeval: time,
                            });
                        }

                    });
                    firebase.database().ref(cleanEmail).once('value', (snapshot) => {
                        var childData = snapshot.val();
                        if(childData.time == 'X' || time < parseInt(childData.time, 10)){
                            firebase.database().ref(cleanEmail).set({
                                time: time,
                                savetime: 'X',
                                x: 'X',
                                y: 'X'
                            });
                        }
                        else{
                            firebase.database().ref(cleanEmail).set({
                                time: childData.time,
                                savetime: 'X',
                                x: 'X',
                                y: 'X'
                            });
                        }
                    });
                    
                }
            });
            cc.director.loadScene("EndGame");
        }

        if(other.node.name == 'unseenBlock'){
            contact.disabled = true;
        }
        else if(other.node.group == "enemy"){
            if(contact.getWorldManifold().normal.x < 0){
                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(1500, 800);
            }
            else if(contact.getWorldManifold().normal.x > 0){
                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-1500, 800);
            }
            else if(contact.getWorldManifold().normal.x == 0){
                if(this.node.scaleX > 0){
                    this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-1500, 800);
                }
                else if(this.node.scaleX < 0){
                    this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(1500, 800);
                }
            }
        }
        else if (contact.getWorldManifold().normal.y == -1) {
            cc.log("on ground");
            //on the ground
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
            this.inair = false;
            this.power = 0;
        }
        else if (contact.getWorldManifold().normal.x == 1) {
            cc.log("hit fro left");
            //hit obstacle from left
            var vy = this.node.getComponent(cc.RigidBody).linearVelocity.y;
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-100, vy);
        }
        else if (contact.getWorldManifold().normal.x == -1) {
            cc.log("hit from right");
            //hit obstacle from right
            var vy = this.node.getComponent(cc.RigidBody).linearVelocity.y;
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(100, vy);
        }
        
        //this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
    }

    playAnimation() {
        if (this.inair) {
            //jump anim
            if (this.jumptype == 1) {
                cc.log("anim Rise");
                this.anim.play("Rise");
            }
            else if (this.jumptype == 2) {
                cc.log("anim Top");
                this.anim.play("Top");
            }
            else if (this.jumptype == 3) {
                cc.log("anim Fall");
                this.anim.play("Fall");
            }
            this.crouchpaused = false;
        }
        else {
            //cc.log("not in air");
            if (this.charging) {
                //crouch anim
                if (!this.anim.getAnimationState("Crouch").isPlaying && !this.crouchpaused) {
                    this.anim.play("Crouch");
                    //cc.log("crouch anim");
                }
            }
            else if (this.movedir != 0) {
                //running
                if (!this.anim.getAnimationState("Run").isPlaying) {
                    this.anim.play("Run");
                    //cc.log("run anim");
                    this.crouchpaused = false;
                }
            }
            else {
                //touch the ground
                if (this.jumptype == 3 && !this.anim.getAnimationState("Touch").isPlaying) {
                    //cc.log("should play touch");
                    this.anim.play("Touch");
                    this.jumptype = 0;
                }
                //idle
                else if (this.jumptype == 0 && !this.anim.getAnimationState("Touch").isPlaying && !this.anim.getAnimationState("Idle").isPlaying) {
                    this.anim.play("Idle");
                    //cc.log("play idle");
                    this.crouchpaused = false;
                }
            }
        } 
    }

    CrouchControl() {
        this.crouchpaused = true;
        //cc.log("puased");
    }

    upFloor() {
        if(this.node.y > -250 && this.node.y < 300){ //1到2
            this.node.position = cc.v2(129.768, 490.852);
        }
        else if(this.node.y > 300 && this.node.y < 950){ //2到3
            this.node.position = cc.v2(-44.913, 1062.357);
        }
        else if(this.node.y > 950 && this.node.y < 1600){ //3到4
            this.node.position = cc.v2(73.776, 1706.479);
        }
        else if(this.node.y > 1600 && this.node.y < 2220){ //4到5
            this.node.position = cc.v2(-129.184, 2378.372);
        }
        else if(this.node.y > 2200 && this.node.y < 2895){ //5到6
            this.node.position = cc.v2(52.893, 3004.053);
        }
        else if(this.node.y > 2895 && this.node.y < 3520){ //6到7
            this.node.position = cc.v2(98.21, 3697.007);
        }
        else if(this.node.y > 3520 && this.node.y < 4150){ //7到8
            this.node.position = cc.v2(208.242, 4270.503);
        }
        else if(this.node.y > 4150 && this.node.y < 4800){ //8到9
            this.node.position = cc.v2(-322.797, 5002.008);
        }
        else if(this.node.y > 4800 && this.node.y < 5430){ //9到10
            this.node.position = cc.v2(-234.18, 5590.293);
        }
        else if(this.node.y > 5430 && this.node.y < 6090){ //10到11
            this.node.position = cc.v2(81.241, 6169.007);
        }
        else if(this.node.y > 6090 && this.node.y < 6720){ //11到12
            this.node.position = cc.v2(201.591, 6806.16);
        }
        else if(this.node.y > 6720 && this.node.y < 7350){ //12到13
            this.node.position = cc.v2(449.886, 7446.685);
        }
        else if(this.node.y > 7350 && this.node.y < 8000){ //13到14
            this.node.position = cc.v2(-214.574, 8133.869);
        }
        else if(this.node.y > 8000 && this.node.y < 8630){ //14到15
            this.node.position = cc.v2(-452.355, 8733.268);
        }
        else if(this.node.y > 8630 && this.node.y < 9280){ //15到16
            this.node.position = cc.v2(-300.842, 9367.349);
        }
        else if(this.node.y > 9280 && this.node.y < 9900){ //16到17
            this.node.position = cc.v2(-76.547, 10022.513);
        }
        else if(this.node.y > 9900 && this.node.y < 10550){ //17到18
            this.node.position = cc.v2(272.851, 10728.293);
        }
        else if(this.node.y > 10550 && this.node.y < 11170){ //18到19
            this.node.position = cc.v2(389.901, 11288.248);
        }
        else if(this.node.y > 11170 && this.node.y < 11840){ //19到20
            this.node.position = cc.v2(-227.966, 11928.443);
        }
        else if(this.node.y > 11840 && this.node.y < 12451){ //20到終點
            this.node.position = cc.v2(-204.591, 12238.901);
        }
    }

    downFloor() {
        if(this.node.y > 300 && this.node.y < 950){ //2到1
            this.node.position = cc.v2(224.102, -234.697);
        }
        else if(this.node.y > 950 && this.node.y < 1600){ //3到2
            this.node.position = cc.v2(129.768, 490.852);
        }
        else if(this.node.y > 1600 && this.node.y < 2220){ //4到3
            this.node.position = cc.v2(-44.913, 1062.357);
        }
        else if(this.node.y > 2200 && this.node.y < 2895){ //5到4
            this.node.position = cc.v2(73.776, 1706.479);
        }
        else if(this.node.y > 2895 && this.node.y < 3520){ //6到5
            this.node.position = cc.v2(-129.184, 2378.372);
        }
        else if(this.node.y > 3520 && this.node.y < 4150){ //7到6
            this.node.position = cc.v2(52.893, 3004.053);
        }
        else if(this.node.y > 4150 && this.node.y < 4800){ //8到7
            this.node.position = cc.v2(98.21, 3697.007);
        }
        else if(this.node.y > 4800 && this.node.y < 5430){ //9到8
            this.node.position = cc.v2(208.242, 4270.503);
        }
        else if(this.node.y > 5430 && this.node.y < 6090){ //10到9
            this.node.position = cc.v2(-322.797, 5002.008);
        }
        else if(this.node.y > 6090 && this.node.y < 6720){ //11到10
            this.node.position = cc.v2(-234.18, 5590.293);
        }
        else if(this.node.y > 6720 && this.node.y < 7350){ //12到11
            this.node.position = cc.v2(81.241, 6169.007);
        }
        else if(this.node.y > 7350 && this.node.y < 8000){ //13到12
            this.node.position = cc.v2(201.591, 6806.16);
        }
        else if(this.node.y > 8000 && this.node.y < 8630){ //14到13
            this.node.position = cc.v2(449.886, 7446.685);
        }
        else if(this.node.y > 8630 && this.node.y < 9280){ //15到14
            this.node.position = cc.v2(-214.574, 8133.869);
        }
        else if(this.node.y > 9280 && this.node.y < 9900){ //16到15
            this.node.position = cc.v2(-452.355, 8733.268);
        }
        else if(this.node.y > 9900 && this.node.y < 10550){ //17到16
            this.node.position = cc.v2(-300.842, 9367.349);
        }
        else if(this.node.y > 10550 && this.node.y < 11170){ //18到17
            this.node.position = cc.v2(-76.547, 10022.513);
        }
        else if(this.node.y > 11170 && this.node.y < 11840){ //19到18
            this.node.position = cc.v2(272.851, 10728.293);
        }
        else if(this.node.y > 11840 && this.node.y < 12451){ //20到19
            this.node.position = cc.v2(389.901, 11288.248);
        }
    }
}
