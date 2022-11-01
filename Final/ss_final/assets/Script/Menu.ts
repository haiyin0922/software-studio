const {ccclass, property} = cc._decorator;
@ccclass
export default class Menu extends cc.Component {
    @property({type:cc.AudioClip})
    soundBgm: cc.AudioClip = null;
    
    rankNode: cc.Node;

    onLoad() {
        this.rankNode = cc.find("Canvas/Misc/Rank");
    }
    start () {
        this.initButton();
        this.initBoard();
        this.rankNode.active = false;
        cc.audioEngine.stopAll();
        //cc.audioEngine.play(this.bgm, true, 0.5);
        cc.audioEngine.setMusicVolume(0.4);
        cc.audioEngine.playMusic(this.soundBgm, true);
    }
    initButton() { 
        let clickEventHandler = new cc.Component.EventHandler(); 
        clickEventHandler.target = this.node;
        clickEventHandler.handler = "loadGameScene";
        clickEventHandler.component = "Menu";
        cc.find("Canvas/UI/Button").getComponent(cc.Button).clickEvents.push(clickEventHandler);
        let clickEventHandler_rank = new cc.Component.EventHandler(); 
        clickEventHandler_rank.target = this.node;
        clickEventHandler_rank.handler = "showRank";
        clickEventHandler_rank.component = "Menu";
        cc.find("Canvas/Misc/Rank Button").getComponent(cc.Button).clickEvents.push(clickEventHandler_rank);
    } 
    showRank(){
        cc.log("GGG");
        this.rankNode.active = !this.rankNode.active;
    }
    loadGameScene(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var cleanEmail = user.email.replace(/\./g, ',');
                firebase.database().ref(cleanEmail).once('value', (snapshot) => {
                    var childData = snapshot.val();
                    if(childData.x != 'X'){
                        cc.director.loadScene("Game");
                    }
                    else{
                        cc.director.loadScene("StartGame");
                    }
                });
            }
        });
    }
    initBoard() {
        firebase.database().ref('rank').once('value', function(snapshot) {
            if (snapshot.exists()) {
                var childData = snapshot.val();
                cc.find("Canvas/Misc/Rank/NO1/Name").getComponent(cc.Label).string = childData.one;
                cc.find("Canvas/Misc/Rank/NO2/Name").getComponent(cc.Label).string = childData.two;
                cc.find("Canvas/Misc/Rank/NO3/Name").getComponent(cc.Label).string = childData.three;
                cc.find("Canvas/Misc/Rank/NO1/Val").getComponent(cc.Label).string = childData.oneval;
                cc.find("Canvas/Misc/Rank/NO2/Val").getComponent(cc.Label).string = childData.twoval;
                cc.find("Canvas/Misc/Rank/NO3/Val").getComponent(cc.Label).string = childData.threeval;
            }
        });
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                cc.find("Canvas/Misc/User/Name").getComponent(cc.Label).string = user.email.split('@')[0].toUpperCase();
                var cleanEmail = user.email.replace(/\./g, ',');
                firebase.database().ref(cleanEmail).once('value', function(snapshot) {
                    if (snapshot.exists()) {
                        //cc.log("不是第一次登");
                        var childData = snapshot.val();
                        cc.find("Canvas/Misc/Highest/Val").getComponent(cc.Label).string = childData.time;
                    }
                    else{
                        //cc.log("第一次登");
                        firebase.database().ref(cleanEmail).set({
                            time: 'X',
                            savetime: 'X',
                            x: 'X',
                            y: 'X'
                        });
                        cc.find("Canvas/Misc/Highest/Val").getComponent(cc.Label).string = 'X';
                    }
                });
            }
            else {
                alert('Please Login First!');
            }
        });
    }
}