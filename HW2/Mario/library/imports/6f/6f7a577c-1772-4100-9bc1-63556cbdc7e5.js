"use strict";
cc._RF.push(module, '6f7a5d8F3JBAJvBY1Vsvcfl', 'Start_easy');
// Scripts/Start_easy.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Start_easy = /** @class */ (function (_super) {
    __extends(Start_easy, _super);
    function Start_easy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bgm = null;
        return _this;
    }
    Start_easy.prototype.start = function () {
        this.schedule(function () {
            cc.director.loadScene("easy");
        }, 1);
        cc.audioEngine.stopAll();
        cc.audioEngine.play(this.bgm, true, 0.5);
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], Start_easy.prototype, "bgm", void 0);
    Start_easy = __decorate([
        ccclass
    ], Start_easy);
    return Start_easy;
}(cc.Component));
exports.default = Start_easy;

cc._RF.pop();