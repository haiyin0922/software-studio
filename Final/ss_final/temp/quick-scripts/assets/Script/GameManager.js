(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/GameManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '75f8amiJ4FBBqG8G7YaNUEd', 'GameManager', __filename);
// Script/GameManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Player_1 = require("./Player");
var GameManager = /** @class */ (function (_super) {
    __extends(GameManager, _super);
    function GameManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.soundEffect_wind = null;
        _this.bgm_spring = null;
        _this.bgm_summer = null;
        _this.bgm_fall = null;
        _this.bgm_winter = null;
        _this.enviroment_x = 0;
        _this.enviroment_y = 0;
        _this.count = 0;
        _this.cur_season = 'spring';
        _this.prev_season = 'spring';
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    GameManager.prototype.start = function () {
        cc.audioEngine.setMusicVolume(0.3);
        cc.audioEngine.setEffectsVolume(0.2);
        this.scheduleOnce(function () {
            this.playBgm(0);
        }, 1);
        this.initButton();
    };
    GameManager.prototype.initButton = function () {
        var clickEventHandler_newgame = new cc.Component.EventHandler();
        clickEventHandler_newgame.target = this.node;
        clickEventHandler_newgame.handler = "loadMenuScene";
        clickEventHandler_newgame.component = "GameManager";
        cc.find("Canvas/Main Camera/Newgame Button").getComponent(cc.Button).clickEvents.push(clickEventHandler_newgame);
    };
    GameManager.prototype.loadMenuScene = function () {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var cleanEmail = user.email.replace(/\./g, ',');
                firebase.database().ref(cleanEmail).once('value', function (snapshot) {
                    var childData = snapshot.val();
                    firebase.database().ref(cleanEmail).set({
                        time: childData.time,
                        savetime: 'X',
                        x: 'X',
                        y: 'X'
                    });
                });
            }
        });
        cc.director.loadScene("Menu");
    };
    GameManager.prototype.update = function (dt) {
        this.setEnvironment();
        this.setSeason();
    };
    GameManager.prototype.setEnvironment = function () {
        this.count = (this.count == 550) ? 0 : this.count + 1;
        //Fall effect
        if (cc.find("Canvas/Player").getComponent(Player_1.default).node.y >= 6210 && cc.find("Canvas/Player").getComponent(Player_1.default).node.y <= 9256) {
            if (this.count == 400) {
                this.playEffect(0);
            }
            if (this.count > 400 && this.count < 550) {
                this.enviroment_x = 3000;
            }
            else {
                this.enviroment_x = 0;
            }
        }
    };
    GameManager.prototype.setSeason = function () {
        if (cc.find("Canvas/Player").getComponent(Player_1.default).node.y >= -240 && cc.find("Canvas/Player").getComponent(Player_1.default).node.y <= 2900) {
            this.cur_season = 'spring';
            if (this.cur_season != this.prev_season) {
                this.scheduleOnce(function () {
                    this.playBgm(0);
                }, 1);
                this.prev_season = 'spring';
            }
        }
        else if (cc.find("Canvas/Player").getComponent(Player_1.default).node.y >= 2999 && cc.find("Canvas/Player").getComponent(Player_1.default).node.y <= 6066) {
            this.cur_season = 'summer';
            if (this.cur_season != this.prev_season) {
                this.scheduleOnce(function () {
                    this.playBgm(1);
                }, 1);
                this.prev_season = 'summer';
            }
        }
        else if (cc.find("Canvas/Player").getComponent(Player_1.default).node.y >= 6160 && cc.find("Canvas/Player").getComponent(Player_1.default).node.y <= 9270) {
            this.cur_season = 'fall';
            if (this.cur_season != this.prev_season) {
                this.scheduleOnce(function () {
                    this.playBgm(2);
                }, 1);
                this.prev_season = 'fall';
            }
        }
        else if (cc.find("Canvas/Player").getComponent(Player_1.default).node.y >= 9362) {
            this.cur_season = 'winter';
            if (this.cur_season != this.prev_season) {
                this.scheduleOnce(function () {
                    this.playBgm(3);
                }, 1);
                this.prev_season = 'winter';
            }
        }
    };
    GameManager.prototype.environmentX = function () {
        return this.enviroment_x;
    };
    GameManager.prototype.environmentY = function () {
        return this.enviroment_y;
    };
    GameManager.prototype.playEffect = function (num) {
        if (num == 0) {
            cc.audioEngine.playEffect(this.soundEffect_wind, false);
        }
    };
    GameManager.prototype.playBgm = function (num) {
        if (num == 0) {
            cc.audioEngine.playMusic(this.bgm_spring, true);
        }
        if (num == 1) {
            cc.audioEngine.playMusic(this.bgm_summer, true);
        }
        if (num == 2) {
            cc.audioEngine.playMusic(this.bgm_fall, true);
        }
        if (num == 3) {
            cc.audioEngine.playMusic(this.bgm_winter, true);
        }
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], GameManager.prototype, "soundEffect_wind", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], GameManager.prototype, "bgm_spring", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], GameManager.prototype, "bgm_summer", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], GameManager.prototype, "bgm_fall", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], GameManager.prototype, "bgm_winter", void 0);
    GameManager = __decorate([
        ccclass
    ], GameManager);
    return GameManager;
}(cc.Component));
exports.default = GameManager;

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
        //# sourceMappingURL=GameManager.js.map
        