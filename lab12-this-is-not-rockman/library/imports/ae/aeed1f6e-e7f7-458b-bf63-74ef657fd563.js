"use strict";
cc._RF.push(module, 'aeed19u5/dFi79jdO9lf9Vj', 'Bullet');
// Script/Bullet.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.anim = null;
        _this.bulletManager = null;
        _this.isTriggered = false; // I add this to make the bullet kill one enemy at a time.
        return _this;
    }
    // when created, the bullet need to be placed at correct position and play animation.
    Bullet.prototype.init = function (node) {
        this.anim = this.getComponent(cc.Animation);
        this.setInitPos(node);
        this.anim.play('bullet');
    };
    // this function is called when the bullet manager calls "get" API.
    Bullet.prototype.reuse = function (bulletManager) {
        this.bulletManager = bulletManager;
        this.isTriggered = false;
    };
    //this function sets the bullet's initial position when it is reused.
    Bullet.prototype.setInitPos = function (node) {
        this.node.parent = node.parent; // don't mount under the player, otherwise it will change direction when player move
        if (node.scaleX > 0) {
            this.node.position = cc.v2(62, 8);
            this.node.scaleX = 1;
        }
        else {
            this.node.position = cc.v2(-62, 8);
            this.node.scaleX = -1;
        }
        this.node.position = this.node.position.addSelf(node.position);
    };
    //make the bullet move from current position
    Bullet.prototype.bulletMove = function () {
        var _this = this;
        var moveDir = null;
        // move bullet to 500 far from current position in 0.8s
        if (this.node.scaleX > 0)
            moveDir = cc.moveBy(0.8, 300, 0);
        else
            moveDir = cc.moveBy(0.8, -300, 0);
        var finished = cc.callFunc(function () {
            _this.bulletManager.put(_this.node);
        });
        // after playing animation, the bullet move 0.8s and destroy itself(put back to the bullet manager)
        this.scheduleOnce(function () {
            _this.node.runAction(cc.sequence(moveDir, finished));
        });
    };
    //detect collision with enemies
    Bullet.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        var _this = this;
        this.node.stopAllActions();
        this.unscheduleAllCallbacks();
        this.scheduleOnce(function () {
            _this.anim.stop();
            _this.bulletManager.put(_this.node);
        }, 0.1); // for better animation effect, I delay 0.1s when bullet hits the enemy
    };
    Bullet = __decorate([
        ccclass
    ], Bullet);
    return Bullet;
}(cc.Component));
exports.default = Bullet;

cc._RF.pop();