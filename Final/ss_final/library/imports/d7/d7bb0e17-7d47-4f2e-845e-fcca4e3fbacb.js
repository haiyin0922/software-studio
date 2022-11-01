"use strict";
cc._RF.push(module, 'd7bb04XfUdPLoRe/MpOP7rL', 'Enemy');
// Script/Enemy.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.moveDir = -1;
        _this.bunnyMoveSpeed = 70;
        _this.ghostMoveSpeed = 50;
        _this.slimeMoveSpeed = 50;
        _this.mushroomMoveSpeed = 100;
        _this.anim = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    Enemy.prototype.start = function () {
        this.anim = this.getComponent(cc.Animation);
    };
    Enemy.prototype.update = function (dt) {
        if (this.node.name == "Bunny") {
            this.node.x += this.bunnyMoveSpeed * this.moveDir * dt;
            if (this.moveDir == 1) {
                this.node.scaleX = -1.5;
            }
            else {
                this.node.scaleX = 1.5;
            }
        }
        if (this.node.name == "Ghost") {
            this.node.x += this.ghostMoveSpeed * this.moveDir * dt;
            if (this.moveDir == 1) {
                this.node.scaleX = -1;
            }
            else {
                this.node.scaleX = 1;
            }
        }
        if (this.node.name == "Slime") {
            this.node.x += this.slimeMoveSpeed * this.moveDir * dt;
            if (this.moveDir == 1) {
                this.node.scaleX = -1.5;
            }
            else {
                this.node.scaleX = 1.5;
            }
        }
        if (this.node.name == "Mushroom") {
            this.node.x += this.mushroomMoveSpeed * this.moveDir * dt;
            if (this.moveDir == 1) {
                this.node.scaleX = -1.5;
            }
            else {
                this.node.scaleX = 1.5;
            }
        }
        this.playAnimate();
    };
    Enemy.prototype.playAnimate = function () {
        if (this.node.name == "Bunny") {
            if (!this.anim.getAnimationState("Bunny").isPlaying) {
                this.anim.play("Bunny");
            }
        }
        if (this.node.name == "Ghost") {
            if (!this.anim.getAnimationState("Ghost").isPlaying) {
                this.anim.play("Ghost");
            }
        }
        if (this.node.name == "Slime") {
            if (!this.anim.getAnimationState("Slime").isPlaying) {
                this.anim.play("Slime");
            }
        }
        if (this.node.name == "Mushroom") {
            if (!this.anim.getAnimationState("Mushroom").isPlaying) {
                this.anim.play("Mushroom");
            }
        }
    };
    Enemy.prototype.onBeginContact = function (contact, self, other) {
        if (contact.getWorldManifold().normal.x > 0) {
            this.moveDir = -1;
        }
        else if (contact.getWorldManifold().normal.x < 0) {
            this.moveDir = 1;
        }
    };
    Enemy = __decorate([
        ccclass
    ], Enemy);
    return Enemy;
}(cc.Component));
exports.default = Enemy;

cc._RF.pop();