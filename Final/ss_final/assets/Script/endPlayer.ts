// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import endEnemy from "./endEnemy";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property({type:cc.AudioClip})
    soundBgm: cc.AudioClip = null;

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Node)
    enemy: cc.Node = null;

    private anim = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.anim = this.node.getComponent(cc.Animation);
    }

    start () {
        this.anim.play("Idle");
        this.scheduleOnce(this.playAnimation, 3);
        cc.audioEngine.setMusicVolume(0.3);
        cc.audioEngine.playMusic(this.soundBgm, true);
    }

    update (dt) {
        if (!this.anim.getAnimationState("Idle").isPlaying && !this.anim.getAnimationState("Run").isPlaying && !this.anim.getAnimationState("Attack").isPlaying) {
            this.anim.play("Idle");
        }
    }

    playAnimation() {
        this.anim.play("Run");
        let act1 = cc.moveBy(2, -183, 0);
        let finished = cc.callFunc(function() {
            this.anim.play("Idle");
            this.scheduleOnce(this.playHitAnimation, 3);
        }, this, 3);
        let all = cc.sequence(act1, finished);
        this.node.runAction(all);
    }

    playHitAnimation() {
        this.anim.play("Attack");
        this.scheduleOnce(function() {
            this.enemy.getComponent(endEnemy).fall();
        }, 0.3);
        
    }
}
