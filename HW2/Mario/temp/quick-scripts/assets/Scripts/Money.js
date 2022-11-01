(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Money.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3ea97Q1G/xNP67kWcQ2gVn3', 'Money', __filename);
// Scripts/Money.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Money = /** @class */ (function (_super) {
    __extends(Money, _super);
    function Money() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.anim = null;
        _this.cnt = 0;
        _this.coinSound = null;
        return _this;
    }
    Money.prototype.start = function () {
        this.getComponent(cc.PhysicsBoxCollider).enabled = false;
        this.anim = this.getComponent(cc.Animation);
    };
    Money.prototype.update = function (dt) {
        if (this.cnt > 0 && this.cnt < 25) {
            this.node.y += 4;
            this.cnt += 1;
        }
        if (this.cnt == 25) {
            this.getComponent(cc.PhysicsBoxCollider).enabled = true;
            this.getComponent(cc.RigidBody).gravityScale = 1;
            this.cnt = 0;
        }
    };
    Money.prototype.moveUp = function () {
        this.anim.play("money");
        this.cnt = 1;
    };
    Money.prototype.onBeginContact = function (contact, self, other) {
        cc.audioEngine.playEffect(this.coinSound, false);
        this.anim.play("money_disappear");
        this.schedule(function () {
            this.node.destroy();
        }, 0.11);
        firebase.auth().onAuthStateChanged(function (user) {
            var cleanEmail = user.email.replace(/\./g, ',');
            firebase.database().ref(cleanEmail).once('value', function (snapshot) {
                var childData = snapshot.val();
                cc.find("Canvas/Main Camera/Board/coin/val").getComponent(cc.Label).string = childData.coin + 100;
                firebase.database().ref(cleanEmail).set({
                    life: childData.life,
                    coin: childData.coin + 100,
                    score: childData.score
                });
            });
        });
        cc.log("money destroy!");
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], Money.prototype, "coinSound", void 0);
    Money = __decorate([
        ccclass
    ], Money);
    return Money;
}(cc.Component));
exports.default = Money;

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
        //# sourceMappingURL=Money.js.map
        