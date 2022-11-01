(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Map.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '73e7bByJHRATo1vVH5Dqk6n', 'Map', __filename);
// Scripts/Map.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Player_1 = require("./Player");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Map = /** @class */ (function (_super) {
    __extends(Map, _super);
    function Map() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.player = null;
        return _this;
    }
    Map.prototype.onBeginContact = function (contact, self, other) {
        if (other.node.name == "player") {
            if (contact.getWorldManifold().normal.y > 0) {
                other.getComponent(Player_1.default).touchGround();
            }
        }
    };
    Map.prototype.onEndContact = function (contact, self, other) {
        if (other.node.name == "player") {
            other.getComponent(Player_1.default).noTouchGround();
        }
    };
    __decorate([
        property(Player_1.default)
    ], Map.prototype, "player", void 0);
    Map = __decorate([
        ccclass
    ], Map);
    return Map;
}(cc.Component));
exports.default = Map;

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
        //# sourceMappingURL=Map.js.map
        