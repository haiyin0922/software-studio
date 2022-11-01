import Player from "./Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(Player)
    player: Player = null;

    @property()
    goombaSpeed: number = 200;

    @property({type:cc.AudioClip})
    stompSound: cc.AudioClip = null;

    private anim: cc.Animation = null;
    private moveDir = 1;
    private cnt = 1;
    private mode = 0;   //0: walk, 1:die

    start () {
        this.anim = this.getComponent(cc.Animation);
    }

    update (dt) {
        if(this.cnt%20 == 0){
            this.node.scaleX = -this.node.scaleX;
        }
        if(this.cnt < 20 && this.cnt > 0) {
            this.cnt += 1;
        }
        else if(this.cnt == 20){
            this.cnt = 1;
        }
        this.node.x += this.goombaSpeed * this.moveDir * dt;
        this.node.scaleY = 2;
    }

    onBeginContact(contact, self, other) {
        if(other.node.name == "lowBound"){
            this.node.destroy();
            cc.log("goomba destroy!");
        }
        else if(other.node.name == "turtle" && this.mode == 0){
            this.goombaDie();
        }
        else if(other.node.name == "player" && this.mode == 0){
            if(this.player.getSuper()){
                contact.disabled = true;
            }
            else if(contact.getWorldManifold().normal.y <= 0) {
                other.getComponent(Player).changeMode(0);
            }
            else if(contact.getWorldManifold().normal.y > 0) {
                this.player.enemyJump();
                this.goombaDie();
            }
        }
        else if(contact.getWorldManifold().normal.y == 0){
            if(this.moveDir == 1) this.moveDir = -1;
            else if(this.moveDir == -1) this.moveDir = 1;
        }
    }

    goombaDie() {
        cc.audioEngine.playEffect(this.stompSound, false);
        this.cnt = -1;
        this.mode = 1;
        this.moveDir = 0;
        this.getComponent(cc.PhysicsBoxCollider).enabled = false;
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 750);
        if(!this.anim.getAnimationState("goomba_die").isPlaying){
            this.anim.play("goomba_die");
        }
        
        firebase.auth().onAuthStateChanged((user) => {
            var cleanEmail = user.email.replace(/\./g, ',');
            firebase.database().ref(cleanEmail).once('value', (snapshot) => {
                var childData = snapshot.val();
                cc.find("Canvas/Main Camera/Board/score").getComponent(cc.Label).string = childData.score+100;
                firebase.database().ref(cleanEmail).set({
                    life: childData.life,
                    coin: childData.coin,
                    score: childData.score+100
                });
            });
        });
    }
}
