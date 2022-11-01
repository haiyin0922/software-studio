import GameMgr from "./GameMgr";
import Board from "./Board";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    @property(Board)
    board: Board = null;

    @property()
    playerSpeed: number = 250;

    @property({type:cc.AudioClip})
    jumpSound: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    dieSound: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    bigSound: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    smallSound: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    eatSound: cc.AudioClip = null;


    private onGround: boolean = false;
    private anim: cc.Animation = null;
    private action = "idle";
    private moveDir = 0;
    private mode = 0;   //0:small, 1:big, 2:die
    private super = false;

    start () {
        this.anim = this.getComponent(cc.Animation);
    }

    update (dt) {
        if(this.mode < 2){
            if(cc.find("Canvas/Main Camera/Board/timer/val").getComponent(cc.Label).string == '0'){
                this.playerDie();
            }
            else{
                switch(this.moveDir)
                {
                    case 1:
                        this.node.x += this.playerSpeed * this.moveDir * dt;
                    case 2:
                        this.node.scaleX = 2.5;
                        break;
                    case -1: 
                        this.node.x += this.playerSpeed * this.moveDir * dt;
                    case -2:
                        this.node.scaleX = -2.5;
                        break;
                }
            }
        }
        this.node.scaleY = 2.5;
        this.playerAnimation();
    }

    playerAnimation() {
        if(this.mode == 0) {
            if(!this.anim.getAnimationState("small_walk").isPlaying && this.action=="walk" && this.onGround){
                this.anim.play("small_walk");
            }
            else if(!this.anim.getAnimationState("small_jump").isPlaying && this.action=="jump" && !this.onGround){
                this.anim.play("small_jump");
            }
            else if(this.action=="idle" && this.onGround){
                this.anim.play("small_idle");
            }
        }
        else if(this.mode == 1) {
            if(!this.anim.getAnimationState("big_walk").isPlaying && this.action=="walk" && this.onGround){
                this.anim.play("big_walk");
            }
            else if(!this.anim.getAnimationState("big_jump").isPlaying && this.action=="jump" && !this.onGround){
                this.anim.play("big_jump");
            }
            else if(this.action=="idle" && this.onGround){
                this.anim.play("big_idle");
            }
        }
        else {
            if(!this.anim.getAnimationState("player_die").isPlaying){
                this.anim.play("player_die");
            }
        }
    }

    touchGround() {
        this.onGround = true;
    }
    noTouchGround() {
        this.onGround = false;
    }

    changeMode(mode: number) {
        //cc.log("super:" + this.super);
        if(mode == 0 && this.mode == 1) {
            cc.audioEngine.playEffect(this.smallSound, false);
            this.playerSuper();
            this.mode = 0;
            this.getComponent(cc.PhysicsBoxCollider).destroy();
            let collider = this.addComponent(cc.PhysicsBoxCollider);
            collider.size.width = 16;
            collider.size.height = 16;
        }
        else if(mode == 1 && this.mode == 0) {
            cc.audioEngine.playEffect(this.bigSound, false);
            this.mode = 1;
            this.getComponent(cc.PhysicsBoxCollider).destroy();
            let collider = this.addComponent(cc.PhysicsBoxCollider);
            collider.size.width = 15;
            collider.size.height = 27;
        }
        else if(mode == 0 && this.mode == 0) {
            this.playerDie();
        }
        else if(mode == 1 && this.mode == 1){
            cc.audioEngine.playEffect(this.eatSound, false);
        }
    }

    playerDie() {
        cc.audioEngine.stopAll();
        cc.audioEngine.playEffect(this.dieSound, false);
        this.mode = 2;
        this.getComponent(cc.PhysicsBoxCollider).enabled = false;
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 750);

        firebase.auth().onAuthStateChanged((user) => {
            var cleanEmail = user.email.replace(/\./g, ',');
            firebase.database().ref(cleanEmail).once('value', (snapshot) => {
                var childData = snapshot.val();
                firebase.database().ref(cleanEmail).set({
                    life: childData.life-1,
                    coin: childData.coin,
                    score: childData.score
                });
                if(childData.life-1 > 0){
                    if(cc.find("Canvas/Main Camera/Board/world/val").getComponent(cc.Label).string == '1'){
                        this.schedule(function(){
                            cc.director.loadScene("start_easy");
                        }, 2);
                    }
                    else{
                        this.schedule(function(){
                            cc.director.loadScene("start_normal");
                        }, 2);
                    }
                }
                else {
                    firebase.auth().onAuthStateChanged(function(user) {
                        var cleanEmail = user.email.replace(/\./g, ',');
                        firebase.database().ref(cleanEmail).once('value', function(snapshot) {
                            firebase.database().ref(cleanEmail).set({
                                score: 0,
                                coin: 0,
                                life: 5
                            });
                        });
                    });
                    this.schedule(function(){
                        cc.director.loadScene("gameover");
                    }, 2);
                }
            });
        });
    }

    playerJump() {
        if(this.onGround) {
            cc.audioEngine.playEffect(this.jumpSound, false);
            this.onGround = false;
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 750);
        }
    }

    enemyJump() {
        this.onGround = false;
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 750);
    }

    playerAction(action: string) {
        this.action = action;
    }

    playerMove(moveDir: number) {
        this.moveDir = moveDir;
    }

    playerSuper() {
        this.super = true;
        this.schedule(function(){
               this.super = false;
        }, 1);
    }

    getSuper() {
        return this.super;
    }

    onBeginContact(contact, self, other) {
        if(other.node.name == "lowBound"){
            this.playerDie();
        }
    }
}
