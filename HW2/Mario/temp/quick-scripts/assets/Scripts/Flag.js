(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Flag.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8d6acuQEEVDdJBtDXXphkzL', 'Flag', __filename);
// Scripts/Flag.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Flag = /** @class */ (function (_super) {
    __extends(Flag, _super);
    function Flag() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Flag.prototype.onBeginContact = function (contact, self, other) {
        if (other.node.name == "player") {
            var time = parseInt(cc.find("Canvas/Main Camera/Board/timer/val").getComponent(cc.Label).string);
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    var cleanEmail = user.email.replace(/\./g, ',');
                    firebase.database().ref(cleanEmail).once('value', function (snapshot) {
                        var childData = snapshot.val();
                        firebase.database().ref(cleanEmail).set({
                            life: childData.life,
                            coin: childData.coin,
                            score: childData.score + time * 10
                        });
                    });
                }
            });
            cc.audioEngine.stopAll();
            cc.director.loadScene("win");
        }
    };
    Flag = __decorate([
        ccclass
    ], Flag);
    return Flag;
}(cc.Component));
exports.default = Flag;

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
        //# sourceMappingURL=Flag.js.map
        