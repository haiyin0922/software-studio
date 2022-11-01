"use strict";
cc._RF.push(module, '71751osmgNCQJK7nodKEKDx', 'anchor');
// Scripts/anchor.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var anchor = /** @class */ (function (_super) {
    __extends(anchor, _super);
    function anchor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.target = _this.node;
        return _this;
    }
    anchor.prototype.start = function () {
        this.graphics = this.node.getComponent(cc.Graphics);
    };
    anchor.prototype.lateUpdate = function () {
        this.graphics.clear();
        this.graphics.moveTo(0, 0);
        var offset = this.target.position.sub(this.node.position);
        this.graphics.lineTo(offset.x, offset.y);
        this.graphics.stroke();
    };
    __decorate([
        property(cc.Node)
    ], anchor.prototype, "target", void 0);
    anchor = __decorate([
        ccclass
    ], anchor);
    return anchor;
}(cc.Component));
exports.default = anchor;

cc._RF.pop();