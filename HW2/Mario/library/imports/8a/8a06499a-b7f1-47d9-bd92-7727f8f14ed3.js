"use strict";
cc._RF.push(module, '8a064mat/FH2b2Sdyf48U7T', 'Login');
// Scripts/Login.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Login.prototype.onLoad = function () {
        this.initButton();
    };
    Login.prototype.initButton = function () {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.handler = "loadMenuScene";
        clickEventHandler.component = "Login";
        cc.find("Canvas/UI/loginButton").getComponent(cc.Button).clickEvents.push(clickEventHandler);
    };
    Login.prototype.loadMenuScene = function () {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            var token = result.credential.accessToken;
            var user = result.user;
            cc.director.loadScene("menu");
        })
            .catch(function (error) {
            alert(error.message);
        });
    };
    Login = __decorate([
        ccclass
    ], Login);
    return Login;
}(cc.Component));
exports.default = Login;

cc._RF.pop();