"use strict";
cc._RF.push(module, '1a2e1DoqZhNvrl/oQcQ8UxP', 'Menu');
// Script/Menu.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.soundBgm = null;
        return _this;
    }
    Menu.prototype.onLoad = function () {
        this.rankNode = cc.find("Canvas/Misc/Rank");
    };
    Menu.prototype.start = function () {
        this.initButton();
        this.initBoard();
        this.rankNode.active = false;
        cc.audioEngine.stopAll();
        //cc.audioEngine.play(this.bgm, true, 0.5);
        cc.audioEngine.setMusicVolume(0.4);
        cc.audioEngine.playMusic(this.soundBgm, true);
    };
    Menu.prototype.initButton = function () {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.handler = "loadGameScene";
        clickEventHandler.component = "Menu";
        cc.find("Canvas/UI/Button").getComponent(cc.Button).clickEvents.push(clickEventHandler);
        var clickEventHandler_rank = new cc.Component.EventHandler();
        clickEventHandler_rank.target = this.node;
        clickEventHandler_rank.handler = "showRank";
        clickEventHandler_rank.component = "Menu";
        cc.find("Canvas/Misc/Rank Button").getComponent(cc.Button).clickEvents.push(clickEventHandler_rank);
    };
    Menu.prototype.showRank = function () {
        cc.log("GGG");
        this.rankNode.active = !this.rankNode.active;
    };
    Menu.prototype.loadGameScene = function () {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var cleanEmail = user.email.replace(/\./g, ',');
                firebase.database().ref(cleanEmail).once('value', function (snapshot) {
                    var childData = snapshot.val();
                    if (childData.x != 'X') {
                        cc.director.loadScene("Game");
                    }
                    else {
                        cc.director.loadScene("StartGame");
                    }
                });
            }
        });
    };
    Menu.prototype.initBoard = function () {
        firebase.database().ref('rank').once('value', function (snapshot) {
            if (snapshot.exists()) {
                var childData = snapshot.val();
                cc.find("Canvas/Misc/Rank/NO1/Name").getComponent(cc.Label).string = childData.one;
                cc.find("Canvas/Misc/Rank/NO2/Name").getComponent(cc.Label).string = childData.two;
                cc.find("Canvas/Misc/Rank/NO3/Name").getComponent(cc.Label).string = childData.three;
                cc.find("Canvas/Misc/Rank/NO1/Val").getComponent(cc.Label).string = childData.oneval;
                cc.find("Canvas/Misc/Rank/NO2/Val").getComponent(cc.Label).string = childData.twoval;
                cc.find("Canvas/Misc/Rank/NO3/Val").getComponent(cc.Label).string = childData.threeval;
            }
        });
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                cc.find("Canvas/Misc/User/Name").getComponent(cc.Label).string = user.email.split('@')[0].toUpperCase();
                var cleanEmail = user.email.replace(/\./g, ',');
                firebase.database().ref(cleanEmail).once('value', function (snapshot) {
                    if (snapshot.exists()) {
                        //cc.log("不是第一次登");
                        var childData = snapshot.val();
                        cc.find("Canvas/Misc/Highest/Val").getComponent(cc.Label).string = childData.time;
                    }
                    else {
                        //cc.log("第一次登");
                        firebase.database().ref(cleanEmail).set({
                            time: 'X',
                            savetime: 'X',
                            x: 'X',
                            y: 'X'
                        });
                        cc.find("Canvas/Misc/Highest/Val").getComponent(cc.Label).string = 'X';
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
    ], Menu.prototype, "soundBgm", void 0);
    Menu = __decorate([
        ccclass
    ], Menu);
    return Menu;
}(cc.Component));
exports.default = Menu;

cc._RF.pop();