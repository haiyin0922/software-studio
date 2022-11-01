"use strict";
cc._RF.push(module, 'b3d28DVm+pK0ZUt9Nzii06b', 'Login');
// Script/Login.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.soundBgm = null;
        return _this;
    }
    Login.prototype.onLoad = function () {
        this.initButton();
    };
    Login.prototype.start = function () {
        cc.audioEngine.setMusicVolume(0.4);
        cc.audioEngine.playMusic(this.soundBgm, true);
    };
    Login.prototype.initButton = function () {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.handler = "loadMenuScene";
        clickEventHandler.component = "Login";
        cc.find("Canvas/UI/Button").getComponent(cc.Button).clickEvents.push(clickEventHandler);
    };
    Login.prototype.loadMenuScene = function () {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            var token = result.credential.accessToken;
            var user = result.user;
            cc.director.loadScene("Menu");
        })
            .catch(function (error) {
            alert(error.message);
        });
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], Login.prototype, "soundBgm", void 0);
    Login = __decorate([
        ccclass
    ], Login);
    return Login;
}(cc.Component));
exports.default = Login;

cc._RF.pop();