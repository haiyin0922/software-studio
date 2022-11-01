"use strict";
cc._RF.push(module, '3afd9MFRJVMk4vRET44VYFj', 'GameMgr');
// Scripts/GameMgr.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Player_1 = require("./Player");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameMgr = /** @class */ (function (_super) {
    __extends(GameMgr, _super);
    function GameMgr() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.player = null;
        _this.leftDown = false;
        _this.rightDown = false;
        _this.spaceDown = false;
        return _this;
    }
    GameMgr.prototype.onLoad = function () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2(0, -2000);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    };
    GameMgr.prototype.update = function (dt) {
        if (this.player.node.x > 0)
            this.node.x = this.player.node.x;
    };
    //1右走 2右停 -1左走 -2左停
    GameMgr.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
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
                if (!this.spaceDown)
                    this.player.playerAction("jump");
                this.player.playerJump();
                this.spaceDown = true;
                break;
        }
    };
    GameMgr.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                this.leftDown = false;
                if (this.rightDown) {
                    this.player.playerMove(1);
                    this.player.playerAction("walk");
                }
                else {
                    this.player.playerMove(-2);
                    this.player.playerAction("idle");
                }
                break;
            case cc.macro.KEY.right:
                this.rightDown = false;
                if (this.leftDown) {
                    this.player.playerMove(-1);
                    this.player.playerAction("walk");
                }
                else {
                    this.player.playerMove(2);
                    this.player.playerAction("idle");
                }
                break;
            case cc.macro.KEY.space:
                this.spaceDown = false;
                if (this.leftDown) {
                    this.player.playerMove(-1);
                    this.player.playerAction("walk");
                }
                else if (this.rightDown) {
                    this.player.playerMove(1);
                    this.player.playerAction("walk");
                }
                else {
                    this.player.playerMove(0);
                    this.player.playerAction("idle");
                }
                break;
        }
    };
    __decorate([
        property(Player_1.default)
    ], GameMgr.prototype, "player", void 0);
    GameMgr = __decorate([
        ccclass
    ], GameMgr);
    return GameMgr;
}(cc.Component));
exports.default = GameMgr;

cc._RF.pop();