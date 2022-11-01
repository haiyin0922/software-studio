const {ccclass, property} = cc._decorator;

@ccclass
export default class Start_easy extends cc.Component {

    @property({type:cc.AudioClip})
    bgm: cc.AudioClip = null;

    start () {
        this.schedule(function(){
            cc.director.loadScene("easy");
        }, 1);
        cc.audioEngine.stopAll();
        cc.audioEngine.play(this.bgm, true, 0.5);
    }
}
