import Player from "./Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(Player)
    player: Player = null;

    @property()
    turtleSpeed: number = 150;

    @property({type:cc.AudioClip})
    kickSound: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    stompSound: cc.AudioClip = null;

    private anim: cc.Animation = null;
    private moveDir = -1;
    private mode = 0;   //0: walk, 1: shell, 2: slide

    start () {
        this.anim = this.getComponent(cc.Animation);
    }

    update (dt) {
        if(this.moveDir == 1) {
            this.node.scaleX = -2.5;
        }
        else if(this.moveDir == -1) {
            this.node.scaleX = 2.5;
        }
        this.node.scaleY = 2.5;
        this.node.x += this.turtleSpeed * this.moveDir * dt;

    }
    
    onBeginContact(contact, self, other) {
        if(other.node.name == "lowBound"){
            this.node.destroy();
            cc.log("turtle destroy!");
        }
        else if(other.node.name == "player"){
            if(this.player.getSuper()){
                contact.disabled = true;
            }
            else if(contact.getWorldManifold().normal.y <= 0 && this.mode == 0) {
                other.getComponent(Player).changeMode(0);
            }
            else if(contact.getWorldManifold().normal.y > 0 && this.mode == 0) {
                cc.audioEngine.playEffect(this.stompSound, false);
                this.player.enemyJump();
                this.moveDir = 0;
                this.mode = 1;
                if(!this.anim.getAnimationState("turtle_shell").isPlaying){
                    this.anim.play("turtle_shell");
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
            else if(this.mode == 1){
                cc.audioEngine.playEffect(this.kickSound, false);
                if(contact.getWorldManifold().normal.y > 0) this.player.enemyJump();
                this.player.playerSuper();
                if(!this.anim.getAnimationState("turtle_slide").isPlaying) {
                    this.anim.play("turtle_slide");
                }   
                if(other.getComponent(Player).node.scaleX > 0) {
                    this.moveDir = 1;
                }
                else {
                    this.moveDir = -1;
                }
                this.mode = 2;
                this.node.group = "shell";
                this.getComponent(cc.PhysicsBoxCollider).apply();
            }
            else if(this.mode == 2){
                other.getComponent(Player).changeMode(0);
            }
        }
        else if(contact.getWorldManifold().normal.y == 0){
            if(this.moveDir == 1) this.moveDir = -1;
            else if(this.moveDir == -1) this.moveDir = 1;
        }
    }
}
