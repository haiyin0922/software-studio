(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Goomba.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fca6ca2455K24Fb8SmT4s7a', 'Goomba', __filename);
// Scripts/Goomba.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Player_1 = require("./Player");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.player = null;
        _this.goombaSpeed = 200;
        _this.stompSound = null;
        _this.anim = null;
        _this.moveDir = 1;
        _this.cnt = 1;
        _this.mode = 0; //0: walk, 1:die
        return _this;
    }
    NewClass.prototype.start = function () {
        this.anim = this.getComponent(cc.Animation);
    };
    NewClass.prototype.update = function (dt) {
        if (this.cnt % 20 == 0) {
            this.node.scaleX = -this.node.scaleX;
        }
        if (this.cnt < 20 && this.cnt > 0) {
            this.cnt += 1;
        }
        else if (this.cnt == 20) {
            this.cnt = 1;
        }
        this.node.x += this.goombaSpeed * this.moveDir * dt;
        this.node.scaleY = 2;
    };
    NewClass.prototype.onBeginContact = function (contact, self, other) {
        if (other.node.name == "lowBound") {
            this.node.destroy();
            cc.log("goomba destroy!");
        }
        else if (other.node.name == "turtle" && this.mode == 0) {
            this.goombaDie();
        }
        else if (other.node.name == "player" && this.mode == 0) {
            if (this.player.getSuper()) {
                contact.disabled = true;
            }
            else if (contact.getWorldManifold().normal.y <= 0) {
                other.getComponent(Player_1.default).changeMode(0);
            }
            else if (contact.getWorldManifold().normal.y > 0) {
                this.player.enemyJump();
                this.goombaDie();
            }
        }
        else if (contact.getWorldManifold().normal.y == 0) {
            if (this.moveDir == 1)
                this.moveDir = -1;
            else if (this.moveDir == -1)
                this.moveDir = 1;
        }
    };
    NewClass.prototype.goombaDie = function () {
        cc.audioEngine.playEffect(this.stompSound, false);
        this.cnt = -1;
        this.mode = 1;
        this.moveDir = 0;
        this.getComponent(cc.PhysicsBoxCollider).enabled = false;
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 750);
        if (!this.anim.getAnimationState("goomba_die").isPlaying) {
            this.anim.play("goomba_die");
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
    };
    __decorate([
        property(Player_1.default)
    ], NewClass.prototype, "player", void 0);
    __decorate([
        property()
    ], NewClass.prototype, "goombaSpeed", void 0);
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
        //# sourceMappingURL=Goomba.js.map
        