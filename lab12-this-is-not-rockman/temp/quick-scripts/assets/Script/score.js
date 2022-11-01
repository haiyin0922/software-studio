(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/score.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '906760NAB1JXK11rok+U9Ds', 'score', __filename);
// Script/score.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var score = /** @class */ (function (_super) {
    __extends(score, _super);
    function score() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.value = 0;
        return _this;
    }
    score.prototype.onLoad = function () {
        this.resetScore();
    };
    score.prototype.resetScore = function () {
        this.value = 0;
        this.node.getComponent(cc.Label).string = "Score: 0";
    };
    score.prototype.addOnePoint = function () {
        this.value++;
        this.node.getComponent(cc.Label).string = "Score: " + this.value.toString();
    };
    score = __decorate([
        ccclass
    ], score);
    return score;
}(cc.Component));
exports.default = score;

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
        //# sourceMappingURL=score.js.map
        