(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Start_normal.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '76e5etzQ71C3rsV08Jn8ryL', 'Start_normal', __filename);
// Scripts/Start_normal.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Start_Normal = /** @class */ (function (_super) {
    __extends(Start_Normal, _super);
    function Start_Normal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bgm = null;
        return _this;
    }
    Start_Normal.prototype.start = function () {
        this.schedule(function () {
            cc.director.loadScene("normal");
        }, 1);
        cc.audioEngine.stopAll();
        cc.audioEngine.play(this.bgm, true, 0.5);
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], Start_Normal.prototype, "bgm", void 0);
    Start_Normal = __decorate([
        ccclass
    ], Start_Normal);
    return Start_Normal;
}(cc.Component));
exports.default = Start_Normal;

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
        //# sourceMappingURL=Start_normal.js.map
        