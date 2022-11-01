const {ccclass, property} = cc._decorator;

@ccclass
export default class Flag extends cc.Component {

    onBeginContact(contact, self, other) {
        if(other.node.name == "player"){
            var time = parseInt(cc.find("Canvas/Main Camera/Board/timer/val").getComponent(cc.Label).string);
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    var cleanEmail = user.email.replace(/\./g, ',');
                    firebase.database().ref(cleanEmail).once('value', (snapshot) => {
                        var childData = snapshot.val();
                        firebase.database().ref(cleanEmail).set({
                            life: childData.life,
                            coin: childData.coin,
                            score: childData.score + time*10
                        });
                    });
                }
            });
            cc.audioEngine.stopAll();
            cc.director.loadScene("win");
        }
    }
}
