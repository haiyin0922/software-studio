const {ccclass, property} = cc._decorator;

@ccclass
export default class Money extends cc.Component {

    
    private anim: cc.Animation = null;
    private cnt = 0;

    @property({type:cc.AudioClip})
    coinSound: cc.AudioClip = null;

    start () {
        this.getComponent(cc.PhysicsBoxCollider).enabled = false;
        this.anim = this.getComponent(cc.Animation);
    }

    update (dt) {
        if(this.cnt > 0 && this.cnt < 25) {
            this.node.y += 4;
            this.cnt += 1;
        }
        if(this.cnt == 25){
            this.getComponent(cc.PhysicsBoxCollider).enabled = true;
            this.getComponent(cc.RigidBody).gravityScale = 1;
            this.cnt = 0;
        }
    }

    moveUp() {
        this.anim.play("money");
        this.cnt = 1;
    }

    onBeginContact(contact, self, other) {
        cc.audioEngine.playEffect(this.coinSound, false);
        this.anim.play("money_disappear");
        this.schedule(function(){
            this.node.destroy();
        }, 0.11);

        firebase.auth().onAuthStateChanged((user) => {
            var cleanEmail = user.email.replace(/\./g, ',');
            firebase.database().ref(cleanEmail).once('value', (snapshot) => {
                var childData = snapshot.val();
                cc.find("Canvas/Main Camera/Board/coin/val").getComponent(cc.Label).string = childData.coin+100;
                firebase.database().ref(cleanEmail).set({
                    life: childData.life,
                    coin: childData.coin+100,
                    score: childData.score
                });
            });
        });
        cc.log("money destroy!");
    }
}
