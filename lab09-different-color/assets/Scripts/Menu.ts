const {ccclass, property} = cc._decorator;

@ccclass
export default class Menu extends cc.Component {
    
    // ===================== TODO =====================
    // 1. Add click event to StartButton to call this
    //    function
    initStartButton() { 
        let clickEventHandler = new cc.Component.EventHandler(); 
        clickEventHandler.target = this.node;
        clickEventHandler.handler = "loadGameScene";
        clickEventHandler.component = "Menu";
        cc.find("Canvas/UI/StartButton").getComponent(cc.Button).clickEvents.push(clickEventHandler);
    } 

    start () {
        this.initStartButton();
    }

    loadGameScene(){
        cc.director.loadScene("game"); 
    }
    // ================================================
}
