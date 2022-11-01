const {ccclass, property} = cc._decorator;

@ccclass
export default class Menu extends cc.Component {

    @property({type:cc.AudioClip})
    bgm: cc.AudioClip = null;

    start () {
        this.initButton();
        this.initBoard();
        cc.audioEngine.stopAll();
        cc.audioEngine.play(this.bgm, true, 0.5);
    }

    initButton() { 
        let clickEventHandler_easy = new cc.Component.EventHandler(); 
        clickEventHandler_easy.target = this.node;
        clickEventHandler_easy.handler = "loadEasyScene";
        clickEventHandler_easy.component = "Menu";
        cc.find("Canvas/UI/easyButton").getComponent(cc.Button).clickEvents.push(clickEventHandler_easy);

        let clickEventHandler_normal = new cc.Component.EventHandler(); 
        clickEventHandler_normal.target = this.node;
        clickEventHandler_normal.handler = "loadNormalScene";
        clickEventHandler_normal.component = "Menu";
        cc.find("Canvas/UI/normalButton").getComponent(cc.Button).clickEvents.push(clickEventHandler_normal);
    } 

    loadEasyScene(){
        cc.director.loadScene("start_easy"); 
    }

    loadNormalScene(){
        cc.director.loadScene("start_normal"); 
    }

    initBoard() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                cc.find("Canvas/Misc/board/user/name").getComponent(cc.Label).string = user.email.split('@')[0].toUpperCase();
                var cleanEmail = user.email.replace(/\./g, ',');
                firebase.database().ref(cleanEmail).once('value', function(snapshot) {
                    if (snapshot.exists()) {
                        //cc.log("不是第一次登");
                        var childData = snapshot.val();
                        cc.find("Canvas/Misc/board/life/val").getComponent(cc.Label).string = childData.life;
                        cc.find("Canvas/Misc/board/coin/val").getComponent(cc.Label).string = childData.coin;
                        cc.find("Canvas/Misc/board/score/val").getComponent(cc.Label).string = childData.score;
                    }
                    else{
                        //cc.log("第一次登");
                        firebase.database().ref(cleanEmail).set({
                            score: 0,
                            coin: 0,
                            life: 5
                        });
                        cc.find("Canvas/Misc/board/life/val").getComponent(cc.Label).string = '5';
                        cc.find("Canvas/Misc/board/coin/val").getComponent(cc.Label).string = '0';
                        cc.find("Canvas/Misc/board/score/val").getComponent(cc.Label).string = '0';
                    }
                });
            }
            else {
                alert('Please Login First!');
            }
        });
    }
}
