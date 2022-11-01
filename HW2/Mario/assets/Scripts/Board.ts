const {ccclass, property} = cc._decorator;

@ccclass
export default class Board extends cc.Component {
    
    private time = 200;
   

    start () {
        cc.find("Canvas/Main Camera/Board/timer/val").getComponent(cc.Label).string  = '200';
        this.timer();
        this.initBoard();
    }

    update(dt) {

    }

    timer() {
        this.schedule(function() {
            this.time -= 1;
            cc.find("Canvas/Main Camera/Board/timer/val").getComponent(cc.Label).string = String(this.time);
        }, 1, 200, 0);
    }

    initBoard() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                var cleanEmail = user.email.replace(/\./g, ',');
                firebase.database().ref(cleanEmail).once('value', function(snapshot) {
                    var childData = snapshot.val();
                    cc.find("Canvas/Main Camera/Board/life/val").getComponent(cc.Label).string = childData.life;
                    cc.find("Canvas/Main Camera/Board/coin/val").getComponent(cc.Label).string = childData.coin;
                    cc.find("Canvas/Main Camera/Board/score").getComponent(cc.Label).string = childData.score;
                });
            }
            else {
                alert('Please Login First!');
            }
        });
    }
}
