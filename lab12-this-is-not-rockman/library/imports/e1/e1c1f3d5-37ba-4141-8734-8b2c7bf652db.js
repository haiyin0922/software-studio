"use strict";
cc._RF.push(module, 'e1c1fPVN7pBQYc0iyx79lLb', 'enemy');
// Script/enemy.ts

Object.defineProperty(exports, "__esModule", { value: true });
var score_1 = require("./score");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var enemy = /** @class */ (function (_super) {
    __extends(enemy, _super);
    function enemy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.score = null;
        _this.anim = null;
        _this.collider = null;
        _this.enemyManager = null;
        _this.enemySpeed = 0;
        return _this;
    }
    enemy.prototype.init = function (node) {
        this.score = cc.find("Canvas/score").getComponent(score_1.default);
        this.anim = this.getComponent(cc.Animation);
        this.collider = this.getComponent(cc.PhysicsBoxCollider);
        this.node.opacity = 255;
        this.setInitPos(node);
        this.anim.play('enemy');
    };
    // this function is called when the enemy manager calls "get" API.
    enemy.prototype.reuse = function (enemyManager) {
        this.enemyManager = enemyManager;
    };
    //this function sets the enemy's initial position when it is reused.
    enemy.prototype.setInitPos = function (node) {
        this.node.parent = node;
        // I use random to decide where the enemy appear after reuse.
        if (Math.random() > 0.5) {
            this.node.position = cc.v2(600, -110);
            this.node.scaleX = 1;
            this.enemySpeed = -200;
            this.collider.enabled = true;
            this.collider.offset = cc.v2(20, 0);
            this.collider.apply();
        }
        else {
            this.node.position = cc.v2(-600, -110);
            this.node.scaleX = -1;
            this.enemySpeed = 200;
            this.collider.enabled = true;
            this.collider.offset = cc.v2(-20, 0);
            this.collider.apply();
        }
    };
    // check if current position is out of view.
    enemy.prototype.boundingDetect = function () {
        if (this.node.x > 650 || this.node.x < -650)
            this.enemyManager.put(this.node);
    };
    //if this is called, the enemy will fade out in 1s and go back to the enemy pool.
    enemy.prototype.deadEffect = function () {
        var _this = this;
        this.enemySpeed = 0;
        this.collider.enabled = false;
        var fade = cc.fadeOut(1);
        var finished = cc.callFunc(function () {
            _this.enemyManager.put(_this.node);
        });
        this.node.runAction(cc.sequence(fade, finished));
    };
    enemy.prototype.update = function (dt) {
        this.node.x += this.enemySpeed * dt;
        this.boundingDetect();
    };
    //check if the collision is valid or not, and call "deadEffect" if the collision is valid.
    enemy.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        if (otherCollider.node.name == "bullet" && !otherCollider.node.getComponent('Bullet').isTriggered) {
            otherCollider.node.getComponent('Bullet').isTriggered = true;
            this.score.addOnePoint();
            this.anim.stop();
            this.deadEffect();
        }
    };
    enemy = __decorate([
        ccclass
    ], enemy);
    return enemy;
}(cc.Component));
exports.default = enemy;

cc._RF.pop();