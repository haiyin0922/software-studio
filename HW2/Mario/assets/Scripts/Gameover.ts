const {ccclass, property} = cc._decorator;

@ccclass
export default class Gameover extends cc.Component {

    @property({type:cc.AudioClip})
    loseSound: cc.AudioClip = null;

    start () {
        this.schedule(function(){
            cc.director.loadScene("menu");
        }, 3);
        cc.audioEngine.playEffect(this.loseSound, false);
    }
}
