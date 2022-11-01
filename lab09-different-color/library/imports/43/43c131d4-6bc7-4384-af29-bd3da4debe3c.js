"use strict";
cc._RF.push(module, '43c13HUa8dDhK8pvT2k3r48', 'Menu');
// Scripts/Menu.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // ===================== TODO =====================
    // 1. Add click event to StartButton to call this
    //    function
    Menu.prototype.initStartButton = function () {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.handler = "loadGameScene";
        clickEventHandler.component = "Menu";
        cc.find("Canvas/UI/StartButton").getComponent(cc.Button).clickEvents.push(clickEventHandler);
    };
    Menu.prototype.start = function () {
        this.initStartButton();
    };
    Menu.prototype.loadGameScene = function () {
        cc.director.loadScene("game");
    };
    Menu = __decorate([
        ccclass
    ], Menu);
    return Menu;
}(cc.Component));
exports.default = Menu;

cc._RF.pop();