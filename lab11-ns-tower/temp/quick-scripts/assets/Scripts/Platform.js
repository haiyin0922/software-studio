(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Platform.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a3e6dBne/JI4rscTjPZ8hyF', 'Platform', __filename);
// Scripts/Platform.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Platform = /** @class */ (function (_super) {
    __extends(Platform, _super);
    function Platform() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isTouched = false;
        _this.anim = null;
        _this.moveSpeed = 50;
        _this.camera = null;
        return _this;
    }
    Platform.prototype.start = function () {
        this.anim = this.getComponent(cc.Animation);
        this.camera = cc.find('Canvas/Main Camera');
        if (this.node.name == "Conveyor") {
            this.node.scaleX = (Math.random() >= 0.5) ? 1 : -1;
            this.moveSpeed *= this.node.scaleX;
        }
        else if (this.node.name == "Normal") {
            var canMove = (Math.random() > 0.8) ? true : false;
            if (canMove) {
                var moveDir = (Math.random() > 0.5) ? "v" : "h";
                var delayTime = Math.random() * 2;
                this.platformMove(moveDir, delayTime);
            }
        }
    };
    Platform.prototype.update = function (dt) {
        if (this.camera.y - this.node.y >= 190) // platform out of screen
            this.platformDestroy();
    };
    Platform.prototype.playAnim = function () {
        if (this.anim)
            this.anim.play();
    };
    Platform.prototype.platformDestroy = function () {
        this.node.destroy();
    };
    Platform.prototype.platformMove = function (moveDir, delayTime) {
        var easeRate = 2;
        // ===================== TODO =====================
        // 1. Make platform move back and forth. You should use moveDir to decide move direction.
        //    'v' for vertical, and 'h' for horizontal.
        // 2. Use action system to make platfrom move forever.
        //    For horizontal case, you should first move right 50 pixel in 2s and then move back to initial position in 2s
        //    For vertical case, you should first move up 50 pixel in 2s and then move back to initial position in 2s
        //    You need to use "easeInOut" to modify your action with "easeRate" as parameter.
        // ================================================
        this.scheduleOnce(function () {
            if (moveDir == "h") {
                var go = cc.moveBy(2, 50, 0).easing(cc.easeInOut(easeRate));
                var back = cc.moveBy(2, -50, 0).easing(cc.easeInOut(easeRate));
                go.easing(cc.easeInOut(easeRate));
                back.easing(cc.easeInOut(easeRate));
                this.node.runAction(cc.sequence(go, back)).repeatForever();
            }
            else if (moveDir == "v") {
                var go = cc.moveBy(2, 0, 50).easing(cc.easeInOut(easeRate));
                var back = cc.moveBy(2, 0, -50).easing(cc.easeInOut(easeRate));
                go.easing(cc.easeInOut(easeRate));
                back.easing(cc.easeInOut(easeRate));
                this.node.runAction(cc.sequence(go, back)).repeatForever();
            }
        }, delayTime);
    };
    // ===================== TODO =====================
    // 1. In the physics lecture, we know that Cocos Creator
    //    provides four contact callbacks. You need to use callbacks to
    //    design different behaviors for different platforms.
    //
    //    Hints: The callbacks are "onBeginContact", "onEndContact", "onPreSolve", "onPostSolve".
    //
    // 2. There are two different types of platforms: "Normal" & Conveyor".
    //    For "Conveyor", you have to do "delivery effect" when player is in contact with it.
    //    Note that the platforms have "delivery effect" only when player stands on them. 
    //
    //    Hints: Change "linearVelocity" of the player's rigidbody to make him move.
    //    The move value is "moveSpeed".
    //
    // 3. All the platforms have only "upside" collision. You have to prevent the collisions from the other directions.
    //
    //    Hints: You can use "contact.getWorldManifold().normal" to judge collision direction.
    //
    // ================================================
    Platform.prototype.onBeginContact = function (contact, self, other) {
        if (contact.getWorldManifold().normal.y != 1 && other.node.name == "player") {
            contact.disabled = true;
            cc.log("!");
        }
    };
    Platform.prototype.onPreSolve = function (contact, self, other) {
        if (contact.getWorldManifold().normal.y != 1 && other.node.name == "player") {
            contact.disabled = true;
            cc.log("!");
        }
    };
    Platform.prototype.onPostSolve = function (contact, self, other) {
        if (contact.getWorldManifold().normal.y != 1 && other.node.name == "player") {
            contact.disabled = true;
            cc.log("!");
        }
        var player_V = cc.v2(other.getComponent(cc.RigidBody).linearVelocity);
        if (contact.getWorldManifold().normal.y == 1 && self.node.name == "Conveyor" && other.node.name == "player") {
            other.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.moveSpeed, player_V.y);
        }
    };
    Platform.prototype.onEndContact = function (contact, self, other) {
        var player_V = cc.v2(other.getComponent(cc.RigidBody).linearVelocity);
        if (contact.getWorldManifold().normal.y == 1 && self.node.name == "Conveyor" && other.node.name == "player") {
            other.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, player_V.y);
        }
        if (self.node.name == "Conveyor" && other.node.name == "player") {
            other.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
        }
    };
    Platform = __decorate([
        ccclass
    ], Platform);
    return Platform;
}(cc.Component));
exports.default = Platform;

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
        //# sourceMappingURL=Platform.js.map
        