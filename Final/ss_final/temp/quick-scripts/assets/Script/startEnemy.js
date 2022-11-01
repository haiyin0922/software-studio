(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/startEnemy.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9e6d6O2zdBNXZonINvcDGqu', 'startEnemy', __filename);
// Script/startEnemy.ts

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
var startPlayer_1 = require("./startPlayer");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var startEnemy = /** @class */ (function (_super) {
    __extends(startEnemy, _super);
    function startEnemy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.text = 'hello';
        _this.player = null;
        _this.anim = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    startEnemy.prototype.onLoad = function () {
        this.anim = this.node.getComponent(cc.Animation);
    };
    startEnemy.prototype.start = function () {
        this.anim.play("enemyIdle");
        this.scheduleOnce(this.playAnimation, 3);
    };
    startEnemy.prototype.update = function (dt) {
        if (!this.anim.getAnimationState("enemyIdle").isPlaying && !this.anim.getAnimationState("enemyRun").isPlaying && !this.anim.getAnimationState("enemyAttack").isPlaying) {
            this.anim.play("enemyIdle");
        }
    };
    startEnemy.prototype.playAnimation = function () {
        this.anim.play("enemyRun");
        var act1 = cc.moveBy(2, 183, 0);
        var finished = cc.callFunc(function () {
            this.anim.play("enemyIdle");
            this.scheduleOnce(this.playHitAnimation, 3);
        }, this, 3);
        var all = cc.sequence(act1, finished);
        this.node.runAction(all);
    };
    startEnemy.prototype.playHitAnimation = function () {
        this.anim.play("enemyAttack");
        this.scheduleOnce(function () {
            this.player.getComponent(startPlayer_1.default).fall();
        }, 0.3);
    };
    __decorate([
        property(cc.Label)
    ], startEnemy.prototype, "label", void 0);
    __decorate([
        property
    ], startEnemy.prototype, "text", void 0);
    __decorate([
        property(cc.Node)
    ], startEnemy.prototype, "player", void 0);
    startEnemy = __decorate([
        ccclass
    ], startEnemy);
    return startEnemy;
}(cc.Component));
exports.default = startEnemy;

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
        //# sourceMappingURL=startEnemy.js.map
        