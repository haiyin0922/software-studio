const {ccclass, property} = cc._decorator;

@ccclass
export default class Win extends cc.Component {

    @property({type:cc.AudioClip})
    winSound: cc.AudioClip = null;

    start () {
        cc.audioEngine.playEffect(this.winSound, false);
        this.schedule(function(){
            cc.director.loadScene("menu");
        }, 3);
    }
}
