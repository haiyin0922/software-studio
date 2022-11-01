"use strict";
cc._RF.push(module, '6ebcfYuLvpJTJNCNISdEbol', 'endEnemy');
// Script/endEnemy.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.text = 'hello';
        _this.anim = null;
        _this.rot = false;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    NewClass.prototype.onLoad = function () {
        this.anim = this.node.getComponent(cc.Animation);
    };
    NewClass.prototype.start = function () {
        this.anim.play("enemyIdle");
    };
    NewClass.prototype.fall = function () {
        this.rot = true;
        var act1 = cc.moveBy(0.5, -15, 30);
        var act2 = cc.moveBy(2, -225, -450);
        var all = cc.sequence(act1, act2);
        this.node.runAction(all);
        this.scheduleOnce(this.changeScene, 4);
    };
    NewClass.prototype.update = function (dt) {
        if (this.rot) {
            this.node.angle += 5;
        }
    };
    NewClass.prototype.changeScene = function () {
        var black = cc.find("Canvas/black");
        black.runAction(cc.moveBy(3, 960, 0));
        this.scheduleOnce(function () {
            //change scene
            cc.log("testing");
            cc.director.loadScene("Menu");
        }, 4);
    };
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "label", void 0);
    __decorate([
        property
    ], NewClass.prototype, "text", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();