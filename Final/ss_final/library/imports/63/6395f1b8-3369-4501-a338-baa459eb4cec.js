"use strict";
cc._RF.push(module, '6395fG4M2lFAaM4uqRZ60zs', 'startPlayer');
// Script/startPlayer.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var startPlayer = /** @class */ (function (_super) {
    __extends(startPlayer, _super);
    function startPlayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.soundBgm = null;
        _this.label = null;
        _this.text = 'hello';
        _this.anim = null;
        _this.rot = false;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    startPlayer.prototype.onLoad = function () {
        this.anim = this.node.getComponent(cc.Animation);
    };
    startPlayer.prototype.start = function () {
        this.anim.play("Idle");
        cc.audioEngine.setMusicVolume(0.3);
        cc.audioEngine.playMusic(this.soundBgm, true);
    };
    startPlayer.prototype.update = function (dt) {
        if (this.rot) {
            this.node.angle -= 5;
        }
    };
    startPlayer.prototype.fall = function () {
        this.rot = true;
        var act1 = cc.moveBy(0.5, 15, 30);
        var act2 = cc.moveBy(2, 225, -450);
        var all = cc.sequence(act1, act2);
        this.node.runAction(all);
        this.scheduleOnce(this.changeScene, 4);
    };
    startPlayer.prototype.changeScene = function () {
        var black = cc.find("Canvas/black");
        black.runAction(cc.moveBy(3, 960, 0));
        this.scheduleOnce(function () {
            //change scene
            cc.log("testing");
            cc.director.loadScene("Game");
        }, 4);
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], startPlayer.prototype, "soundBgm", void 0);
    __decorate([
        property(cc.Label)
    ], startPlayer.prototype, "label", void 0);
    __decorate([
        property
    ], startPlayer.prototype, "text", void 0);
    startPlayer = __decorate([
        ccclass
    ], startPlayer);
    return startPlayer;
}(cc.Component));
exports.default = startPlayer;

cc._RF.pop();