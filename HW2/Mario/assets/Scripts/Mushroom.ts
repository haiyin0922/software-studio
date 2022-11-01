import Player from "./Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Mushroom extends cc.Component {

    @property(Player)
    player: Player = null;

    @property()
    mushroomSpeed: number = 200;

    @property({type:cc.AudioClip})
    moveupSound: cc.AudioClip = null;

    private moveDir = 1;
    private cnt = 0;

    update (dt) {
        if(this.cnt > 0 && this.cnt < 35) {
            this.node.y += 1;
            this.cnt += 1;
        }
        if(this.cnt == 35) {
            this.getComponent(cc.PhysicsBoxCollider).enabled = true;
            this.getComponent(cc.RigidBody).gravityScale = 1;
            this.node.x += this.mushroomSpeed * this.moveDir * dt;
        }
    }

    start () { 
        this.getComponent(cc.PhysicsBoxCollider).enabled = false;
    }

    onBeginContact(contact, self, other) {
        if(other.node.name == "lowBound"){
            this.node.destroy();
            cc.log("mushroom destroy!");
        }
        else if(other.node.name == "player"){
            if(this.player.getSuper()){
                contact.disabled = true;
            }
            else{
                this.node.destroy();
                other.getComponent(Player).changeMode(1);
                cc.log("mushroom destroy!");

                firebase.auth().onAuthStateChanged((user) => {
                    var cleanEmail = user.email.replace(/\./g, ',');
                    firebase.database().ref(cleanEmail).once('value', (snapshot) => {
                        var childData = snapshot.val();
                        cc.find("Canvas/Main Camera/Board/score").getComponent(cc.Label).string = childData.score+1000;
                        firebase.database().ref(cleanEmail).set({
                            life: childData.life,
                            coin: childData.coin,
                            score: childData.score+1000
                        });
                    });
                });
            }
        }
        else if(contact.getWorldManifold().normal.y == 0){
            if(this.moveDir == 1) this.moveDir = -1;
            else if(this.moveDir == -1) this.moveDir = 1;
        }

    }
    
    moveUp() {
        cc.audioEngine.playEffect(this.moveupSound, false);
        this.cnt = 1;
    }

}
