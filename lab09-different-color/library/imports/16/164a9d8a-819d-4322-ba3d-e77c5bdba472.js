"use strict";
cc._RF.push(module, '164a92KgZ1DIro953xb26Ry', 'Circle');
// Scripts/Circle.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bg = null;
        return _this;
    }
    Circle.prototype.start = function () {
        this.bg = this.node.getChildByName("Background");
    };
    Circle.prototype.update = function (dt) {
        if (this.bg.width < this.node.width) {
            this.bg.width = (this.node.width - 10) * 0.1 + this.bg.width;
            this.bg.height = (this.node.height - 10) * 0.1 + this.bg.height;
        }
        if (this.bg.width > this.node.width) {
            this.bg.width = this.node.width;
            this.bg.height = this.node.height;
        }
    };
    Circle = __decorate([
        ccclass
    ], Circle);
    return Circle;
}(cc.Component));
exports.default = Circle;

cc._RF.pop();