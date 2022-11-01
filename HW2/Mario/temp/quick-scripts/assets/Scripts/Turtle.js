(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Turtle.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b3c67VSJK5A+aKyDQx8X9zh', 'Turtle', __filename);
// Scripts/Turtle.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Player_1 = require("./Player");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.player = null;
        _this.turtleSpeed = 150;
        _this.kickSound = null;
        _this.stompSound = null;
        _this.anim = null;
        _this.moveDir = -1;
        _this.mode = 0; //0: walk, 1: shell, 2: slide
        return _this;
    }
    NewClass.prototype.start = function () {
        this.anim = this.getComponent(cc.Animation);
    };
    NewClass.prototype.update = function (dt) {
        if (this.moveDir == 1) {
            this.node.scaleX = -2.5;
        }
        else if (this.moveDir == -1) {
            this.node.scaleX = 2.5;
        }
        this.node.scaleY = 2.5;
        this.node.x += this.turtleSpeed * this.moveDir * dt;
    };
    NewClass.prototype.onBeginContact = function (contact, self, other) {
        if (other.node.name == "lowBound") {
            this.node.destroy();
            cc.log("turtle destroy!");
        }
        else if (other.node.name == "player") {
            if (this.player.getSuper()) {
                contact.disabled = true;
            }
            else if (contact.getWorldManifold().normal.y <= 0 && this.mode == 0) {
                other.getComponent(Player_1.default).changeMode(0);
            }
            else if (contact.getWorldManifold().normal.y > 0 && this.mode == 0) {
                cc.audioEngine.playEffect(this.stompSound, false);
                this.player.enemyJump();
                this.moveDir = 0;
                this.mode = 1;
                if (!this.anim.getAnimationState("turtle_shell").isPlaying) {
                    this.anim.play("turtle_shell");
                }
                firebase.auth().onAuthStateChanged(function (user) {
                    var cleanEmail = user.email.replace(/\./g, ',');
                    firebase.database().ref(cleanEmail).once('value', function (snapshot) {
                        var childData = snapshot.val();
                        cc.find("Canvas/Main Camera/Board/score").getComponent(cc.Label).string = childData.score + 100;
                        firebase.database().ref(cleanEmail).set({
                            life: childData.life,
                            coin: childData.coin,
                            score: childData.score + 100
                        });
                    });
                });
            }
            else if (this.mode == 1) {
                cc.audioEngine.playEffect(this.kickSound, false);
                if (contact.getWorldManifold().normal.y > 0)
                    this.player.enemyJump();
                this.player.playerSuper();
                if (!this.anim.getAnimationState("turtle_slide").isPlaying) {
                    this.anim.play("turtle_slide");
                }
                if (other.getComponent(Player_1.default).node.scaleX > 0) {
                    this.moveDir = 1;
                }
                else {
                    this.moveDir = -1;
                }
                this.mode = 2;
                this.node.group = "shell";
                this.getComponent(cc.PhysicsBoxCollider).apply();
            }
            else if (this.mode == 2) {
                other.getComponent(Player_1.default).changeMode(0);
            }
        }
        else if (contact.getWorldManifold().normal.y == 0) {
            if (this.moveDir == 1)
                this.moveDir = -1;
            else if (this.moveDir == -1)
                this.moveDir = 1;
        }
    };
    __decorate([
        property(Player_1.default)
    ], NewClass.prototype, "player", void 0);
    __decorate([
        property()
    ], NewClass.prototype, "turtleSpeed", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], NewClass.prototype, "kickSound", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], NewClass.prototype, "stompSound", void 0);
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
        //# sourceMappingURL=Turtle.js.map
        