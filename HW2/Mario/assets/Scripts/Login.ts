const {ccclass, property} = cc._decorator;

@ccclass
export default class Login extends cc.Component {

    onLoad () {
        this.initButton();
    }

    initButton() {
        let clickEventHandler = new cc.Component.EventHandler(); 
        clickEventHandler.target = this.node;
        clickEventHandler.handler = "loadMenuScene";
        clickEventHandler.component = "Login";
        cc.find("Canvas/UI/loginButton").getComponent(cc.Button).clickEvents.push(clickEventHandler);
    }

    loadMenuScene(){
        var provider = new firebase.auth.GoogleAuthProvider();
    
        firebase.auth().signInWithPopup(provider).then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;
            cc.director.loadScene("menu");
        })
        .catch(function(error) {
            alert(error.message);
        });
    }
}
