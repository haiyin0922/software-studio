import Player from "./Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameMgr extends cc.Component {

    @property(Player)
    player: Player = null;

    private leftDown: boolean = false;
    private rightDown: boolean = false;
    private spaceDown: boolean = false;

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2(0, -2000);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    update (dt) {
        if(this.player.node.x > 0)
            this.node.x = this.player.node.x;
    }

    //1右走 2右停 -1左走 -2左停
    onKeyDown(event) {
        switch(event.keyCode)
        {
            case cc.macro.KEY.left:
                this.leftDown = true;
                this.player.playerMove(-1);
                this.player.playerAction("walk");
                break;
            case cc.macro.KEY.right:
                this.rightDown = true;
                this.player.playerMove(1);
                this.player.playerAction("walk");
                break;
            case cc.macro.KEY.space:
                if(!this.spaceDown)
                    this.player.playerAction("jump");
                    this.player.playerJump();
                this.spaceDown = true;
                break;
        }
    }

    	
    onKeyUp(event) {
        switch(event.keyCode)
        {
            case cc.macro.KEY.left:
                this.leftDown = false;
                if(this.rightDown){
                    this.player.playerMove(1);
                    this.player.playerAction("walk");
                }
                else{
                    this.player.playerMove(-2);
                    this.player.playerAction("idle");
                }
                break;
            case cc.macro.KEY.right:
                this.rightDown = false;
                if(this.leftDown){
                    this.player.playerMove(-1);
                    this.player.playerAction("walk");
                }
                else{
                    this.player.playerMove(2);
                    this.player.playerAction("idle");
                }
                break;
            case cc.macro.KEY.space:
                this.spaceDown = false;
                if(this.leftDown){
                    this.player.playerMove(-1);
                    this.player.playerAction("walk");
                }
                else if(this.rightDown){
                    this.player.playerMove(1);
                    this.player.playerAction("walk");
                }
                else{
                    this.player.playerMove(0);
                    this.player.playerAction("idle");
                }
                break;
        }
    }

}
