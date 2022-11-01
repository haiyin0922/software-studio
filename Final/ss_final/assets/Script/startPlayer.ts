const {ccclass, property} = cc._decorator;

@ccclass
export default class startPlayer extends cc.Component {
    @property({type:cc.AudioClip})
    soundBgm: cc.AudioClip = null;

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
        this.anim.play("Idle");
        cc.audioEngine.setMusicVolume(0.3);
        cc.audioEngine.playMusic(this.soundBgm, true);
    }

    update (dt) {
        if (this.rot) {
            this.node.angle -= 5;
        }
    }


    public fall() {
        this.rot = true;
        let act1 = cc.moveBy(0.5, 15, 30);
        let act2 = cc.moveBy(2, 225, -450);
        let all = cc.sequence(act1, act2);
        this.node.runAction(all);
        this.scheduleOnce(this.changeScene, 4);
    }

    changeScene() {
        let black = cc.find("Canvas/black");
        black.runAction(cc.moveBy(3, 960, 0));
        this.scheduleOnce(function() {
            //change scene
            cc.log("testing");
            cc.director.loadScene("Game");
        }, 4);
    }

}
