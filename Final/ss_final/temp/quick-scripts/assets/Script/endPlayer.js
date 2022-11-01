(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/endPlayer.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '626a3Ziv9JJBafX98ZVSrhl', 'endPlayer', __filename);
// Script/endPlayer.ts

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var endEnemy_1 = require("./endEnemy");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.soundBgm = null;
        _this.label = null;
        _this.text = 'hello';
        _this.enemy = null;
        _this.anim = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    NewClass.prototype.onLoad = function () {
        this.anim = this.node.getComponent(cc.Animation);
    };
    NewClass.prototype.start = function () {
        this.anim.play("Idle");
        this.scheduleOnce(this.playAnimation, 3);
        cc.audioEngine.setMusicVolume(0.3);
        cc.audioEngine.playMusic(this.soundBgm, true);
    };
    NewClass.prototype.update = function (dt) {
        if (!this.anim.getAnimationState("Idle").isPlaying && !this.anim.getAnimationState("Run").isPlaying && !this.anim.getAnimationState("Attack").isPlaying) {
            this.anim.play("Idle");
        }
    };
    NewClass.prototype.playAnimation = function () {
        this.anim.play("Run");
        var act1 = cc.moveBy(2, -183, 0);
        var finished = cc.callFunc(function () {
            this.anim.play("Idle");
            this.scheduleOnce(this.playHitAnimation, 3);
        }, this, 3);
        var all = cc.sequence(act1, finished);
        this.node.runAction(all);
    };
    NewClass.prototype.playHitAnimation = function () {
        this.anim.play("Attack");
        this.scheduleOnce(function () {
            this.enemy.getComponent(endEnemy_1.default).fall();
        }, 0.3);
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], NewClass.prototype, "soundBgm", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "label", void 0);
    __decorate([
        property
    ], NewClass.prototype, "text", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "enemy", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=endPlayer.js.map
        