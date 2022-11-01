// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    private anim = null;
    private rot = false;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.anim = this.node.getComponent(cc.Animation);
    }

    start () {
        this.anim.play("enemyIdle");
    }

    public fall() {
        this.rot = true;
        let act1 = cc.moveBy(0.5, -15, 30);
        let act2 = cc.moveBy(2, -225, -450);
        let all = cc.sequence(act1, act2);
        this.node.runAction(all);
        this.scheduleOnce(this.changeScene, 4);
    }

    update (dt) {
        if (this.rot) {
            this.node.angle += 5;
        }
    }


    changeScene() {
        let black = cc.find("Canvas/black");
        black.runAction(cc.moveBy(3, 960, 0));
        this.scheduleOnce(function() {
            //change scene
            cc.log("testing");
            cc.director.loadScene("Menu");
        }, 4);
    }

}
