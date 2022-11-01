"use strict";
cc._RF.push(module, 'd7701CN7npPaYeeSEex8OdI', 'Win');
// Scripts/Win.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Win = /** @class */ (function (_super) {
    __extends(Win, _super);
    function Win() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.winSound = null;
        return _this;
    }
    Win.prototype.start = function () {
        cc.audioEngine.playEffect(this.winSound, false);
        this.schedule(function () {
            cc.director.loadScene("menu");
        }, 3);
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], Win.prototype, "winSound", void 0);
    Win = __decorate([
        ccclass
    ], Win);
    return Win;
}(cc.Component));
exports.default = Win;

cc._RF.pop();