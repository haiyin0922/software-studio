"use strict";
cc._RF.push(module, '33cb9eJogRAvryYC303hxrs', 'Menu');
// Scripts/Menu.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bgm = null;
        return _this;
    }
    Menu.prototype.start = function () {
        this.initButton();
        this.initBoard();
        cc.audioEngine.stopAll();
        cc.audioEngine.play(this.bgm, true, 0.5);
    };
    Menu.prototype.initButton = function () {
        var clickEventHandler_easy = new cc.Component.EventHandler();
        clickEventHandler_easy.target = this.node;
        clickEventHandler_easy.handler = "loadEasyScene";
        clickEventHandler_easy.component = "Menu";
        cc.find("Canvas/UI/easyButton").getComponent(cc.Button).clickEvents.push(clickEventHandler_easy);
        var clickEventHandler_normal = new cc.Component.EventHandler();
        clickEventHandler_normal.target = this.node;
        clickEventHandler_normal.handler = "loadNormalScene";
        clickEventHandler_normal.component = "Menu";
        cc.find("Canvas/UI/normalButton").getComponent(cc.Button).clickEvents.push(clickEventHandler_normal);
    };
    Menu.prototype.loadEasyScene = function () {
        cc.director.loadScene("start_easy");
    };
    Menu.prototype.loadNormalScene = function () {
        cc.director.loadScene("start_normal");
    };
    Menu.prototype.initBoard = function () {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                cc.find("Canvas/Misc/board/user/name").getComponent(cc.Label).string = user.email.split('@')[0].toUpperCase();
                var cleanEmail = user.email.replace(/\./g, ',');
                firebase.database().ref(cleanEmail).once('value', function (snapshot) {
                    if (snapshot.exists()) {
                        //cc.log("不是第一次登");
                        var childData = snapshot.val();
                        cc.find("Canvas/Misc/board/life/val").getComponent(cc.Label).string = childData.life;
                        cc.find("Canvas/Misc/board/coin/val").getComponent(cc.Label).string = childData.coin;
                        cc.find("Canvas/Misc/board/score/val").getComponent(cc.Label).string = childData.score;
                    }
                    else {
                        //cc.log("第一次登");
                        firebase.database().ref(cleanEmail).set({
                            score: 0,
                            coin: 0,
                            life: 5
                        });
                        cc.find("Canvas/Misc/board/life/val").getComponent(cc.Label).string = '5';
                        cc.find("Canvas/Misc/board/coin/val").getComponent(cc.Label).string = '0';
                        cc.find("Canvas/Misc/board/score/val").getComponent(cc.Label).string = '0';
                    }
                });
            }
            else {
                alert('Please Login First!');
            }
        });
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], Menu.prototype, "bgm", void 0);
    Menu = __decorate([
        ccclass
    ], Menu);
    return Menu;
}(cc.Component));
exports.default = Menu;

cc._RF.pop();