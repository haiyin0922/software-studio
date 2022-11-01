(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Bg.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f1344UK8ZtGGYpZGuspx5YM', 'Bg', __filename);
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
        //# sourceMappingURL=Bg.js.map
        