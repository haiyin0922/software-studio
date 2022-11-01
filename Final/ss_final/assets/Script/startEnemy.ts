// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html


import startPlayer from "./startPlayer";

const {ccclass, property} = cc._decorator;

@ccclass
export default class startEnemy extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Node)
    player: cc.Node = null;


    private anim = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.anim = this.node.getComponent(cc.Animation);
    }

    start () {
        this.anim.play("enemyIdle");
        this.scheduleOnce(this.playAnimation, 3);
    }

    update (dt) {
        if (!this.anim.getAnimationState("enemyIdle").isPlaying && !this.anim.getAnimationState("enemyRun").isPlaying && !this.anim.getAnimationState("enemyAttack").isPlaying) {
            this.anim.play("enemyIdle");
        }
    }


    playAnimation() {
        this.anim.play("enemyRun");
        let act1 = cc.moveBy(2, 183, 0);
        let finished = cc.callFunc(function() {
            this.anim.play("enemyIdle");
            this.scheduleOnce(this.playHitAnimation, 3);
        }, this, 3);
        let all = cc.sequence(act1, finished);
        this.node.runAction(all);
    }

    playHitAnimation() {
        this.anim.play("enemyAttack");
        this.scheduleOnce(function() {
            this.player.getComponent(startPlayer).fall();
        }, 0.3);
        
    }

}
