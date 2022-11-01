"use strict";
cc._RF.push(module, 'a2821YdjcRHk7qegPh2TPqY', 'Block');
// Scripts/Block.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Player_1 = require("./Player");
var Mushroom_1 = require("./Mushroom");
var Money_1 = require("./Money");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Block = /** @class */ (function (_super) {
    __extends(Block, _super);
    function Block() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.player = null;
        _this.mushroom = null;
        _this.money = null;
        _this.anim = null;
        _this.hit = false;
        _this.move = 0;
        return _this;
    }
    Block.prototype.start = function () {
        this.anim = this.getComponent(cc.Animation);
    };
    Block.prototype.update = function (dt) {
        this.blockAnimation();
        this.node.y += this.move;
        if (this.move == 5)
            this.move = -5;
        else if (this.move == -5)
            this.move = 0;
    };
    Block.prototype.blockAnimation = function () {
        if (!this.anim.getAnimationState("question_block").isPlaying && !this.hit) {
            this.anim.play("question_block");
        }
        else if (!this.anim.getAnimationState("normal_block").isPlaying && this.hit) {
            this.anim.play("normal_block");
        }
    };
    Block.prototype.onBeginContact = function (contact, self, other) {
        if (other.node.name == "player") {
            if (contact.getWorldManifold().normal.y < 0 && !this.hit) {
                this.hit = true;
                this.move = 5;
                if (this.mushroom != null)
                    this.mushroom.moveUp();
                if (this.money != null)
                    this.money.moveUp();
            }
            if (contact.getWorldManifold().normal.y > 0) {
                other.getComponent(Player_1.default).touchGround();
            }
        }
    };
    Block.prototype.onEndContact = function (contact, self, other) {
        if (other.node.name == "player") {
            other.getComponent(Player_1.default).noTouchGround();
        }
    };
    __decorate([
        property(Player_1.default)
    ], Block.prototype, "player", void 0);
    __decorate([
        property(Mushroom_1.default)
    ], Block.prototype, "mushroom", void 0);
    __decorate([
        property(Money_1.default)
    ], Block.prototype, "money", void 0);
    Block = __decorate([
        ccclass
    ], Block);
    return Block;
}(cc.Component));
exports.default = Block;

cc._RF.pop();