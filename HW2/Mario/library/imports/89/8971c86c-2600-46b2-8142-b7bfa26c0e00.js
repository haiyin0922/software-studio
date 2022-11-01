"use strict";
cc._RF.push(module, '8971chsJgBGsoFCt7+ibA4A', 'Mushroom');
// Scripts/Mushroom.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Player_1 = require("./Player");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Mushroom = /** @class */ (function (_super) {
    __extends(Mushroom, _super);
    function Mushroom() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.player = null;
        _this.mushroomSpeed = 200;
        _this.moveupSound = null;
        _this.moveDir = 1;
        _this.cnt = 0;
        return _this;
    }
    Mushroom.prototype.update = function (dt) {
        if (this.cnt > 0 && this.cnt < 35) {
            this.node.y += 1;
            this.cnt += 1;
        }
        if (this.cnt == 35) {
            this.getComponent(cc.PhysicsBoxCollider).enabled = true;
            this.getComponent(cc.RigidBody).gravityScale = 1;
            this.node.x += this.mushroomSpeed * this.moveDir * dt;
        }
    };
    Mushroom.prototype.start = function () {
        this.getComponent(cc.PhysicsBoxCollider).enabled = false;
    };
    Mushroom.prototype.onBeginContact = function (contact, self, other) {
        if (other.node.name == "lowBound") {
            this.node.destroy();
            cc.log("mushroom destroy!");
        }
        else if (other.node.name == "player") {
            if (this.player.getSuper()) {
                contact.disabled = true;
            }
            else {
                this.node.destroy();
                other.getComponent(Player_1.default).changeMode(1);
                cc.log("mushroom destroy!");
                firebase.auth().onAuthStateChanged(function (user) {
                    var cleanEmail = user.email.replace(/\./g, ',');
                    firebase.database().ref(cleanEmail).once('value', function (snapshot) {
                        var childData = snapshot.val();
                        cc.find("Canvas/Main Camera/Board/score").getComponent(cc.Label).string = childData.score + 1000;
                        firebase.database().ref(cleanEmail).set({
                            life: childData.life,
                            coin: childData.coin,
                            score: childData.score + 1000
                        });
                    });
                });
            }
        }
        else if (contact.getWorldManifold().normal.y == 0) {
            if (this.moveDir == 1)
                this.moveDir = -1;
            else if (this.moveDir == -1)
                this.moveDir = 1;
        }
    };
    Mushroom.prototype.moveUp = function () {
        cc.audioEngine.playEffect(this.moveupSound, false);
        this.cnt = 1;
    };
    __decorate([
        property(Player_1.default)
    ], Mushroom.prototype, "player", void 0);
    __decorate([
        property()
    ], Mushroom.prototype, "mushroomSpeed", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Mushroom.prototype, "moveupSound", void 0);
    Mushroom = __decorate([
        ccclass
    ], Mushroom);
    return Mushroom;
}(cc.Component));
exports.default = Mushroom;

cc._RF.pop();