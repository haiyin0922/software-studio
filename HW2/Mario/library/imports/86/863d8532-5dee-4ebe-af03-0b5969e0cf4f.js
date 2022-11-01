"use strict";
cc._RF.push(module, '863d8UyXe5Ovq8DC1lp4M9P', 'Gameover');
// Scripts/Gameover.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Gameover = /** @class */ (function (_super) {
    __extends(Gameover, _super);
    function Gameover() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loseSound = null;
        return _this;
    }
    Gameover.prototype.start = function () {
        this.schedule(function () {
            cc.director.loadScene("menu");
        }, 3);
        cc.audioEngine.playEffect(this.loseSound, false);
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], Gameover.prototype, "loseSound", void 0);
    Gameover = __decorate([
        ccclass
    ], Gameover);
    return Gameover;
}(cc.Component));
exports.default = Gameover;

cc._RF.pop();