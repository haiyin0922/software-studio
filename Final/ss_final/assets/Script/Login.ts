const {ccclass, property} = cc._decorator;
 
@ccclass
export default class Login extends cc.Component {

    @property({ type: cc.AudioClip })
    soundBgm: cc.AudioClip = null;
 
    onLoad () {
        this.initButton();
    }

    start(){
        cc.audioEngine.setMusicVolume(0.4);
        cc.audioEngine.playMusic(this.soundBgm, true);
    }
 
    initButton() {
        let clickEventHandler = new cc.Component.EventHandler(); 
        clickEventHandler.target = this.node;
        clickEventHandler.handler = "loadMenuScene";
        clickEventHandler.component = "Login";
        cc.find("Canvas/UI/Button").getComponent(cc.Button).clickEvents.push(clickEventHandler);
    }
 
    loadMenuScene(){
        var provider = new firebase.auth.GoogleAuthProvider();
    
        firebase.auth().signInWithPopup(provider).then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;
            cc.director.loadScene("Menu");
        })
        .catch(function(error) {
            alert(error.message);
        });
    }
}
 
