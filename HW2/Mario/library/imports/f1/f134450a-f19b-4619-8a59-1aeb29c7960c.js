"use strict";
cc._RF.push(module, 'f1344UK8ZtGGYpZGuspx5YM', 'Bg');
// Scripts/Bg.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Bg = /** @class */ (function (_super) {
    __extends(Bg, _super);
    function Bg() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // onLoad () {}
    Bg.prototype.start = function () {
        cc.director.setClearColor(cc.color(204, 204, 255, 0));
    };
    Bg = __decorate([
        ccclass
    ], Bg);
    return Bg;
}(cc.Component));
exports.default = Bg;

cc._RF.pop();