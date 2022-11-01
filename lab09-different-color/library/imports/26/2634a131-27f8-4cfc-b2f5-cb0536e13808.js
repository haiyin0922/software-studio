"use strict";
cc._RF.push(module, '2634aExJ/hM/LL1ywU24TgI', 'GameManager');
// Scripts/GameManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameManager = /** @class */ (function (_super) {
    __extends(GameManager, _super);
    function GameManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.circleContainer = null;
        _this.cover_red = null;
        _this.cover = null;
        _this.gameoverPanel = null;
        _this.circlePrefab = null;
        _this.bgm = null;
        _this.correctSound = null;
        _this.level = [["level", "plusTime_sec", "minusTime_sec", "n_by_n", "nextLevel", "type", "type_option_arr"], ["level1", "1", "1", "2", "3", "CLOSER", "1"], ["level2", "0.98", "1", "3", "2", "CLOSER", "2"], ["level3", "0.96", "1", "3", "3", "CLOSER", "3"], ["level4", "0.94", "1", "3", "2", "CLOSER", "3"], ["level5", "0.92", "1", "4", "2", "CLOSER", "4"], ["level6", "0.9", "1", "4", "3", "CLOSER", "5"], ["level7", "0.88", "1", "4", "2", "CLOSER", "5"], ["level8", "0.86", "1", "4", "3", "CLOSER", "6"], ["level9", "0.84", "1", "5", "3", "CLOSER", "6"], ["level10", "0.82", "1", "5", "2", "CLOSER", "6"], ["level11", "0.8", "1", "5", "3", "CLOSER", "7"], ["level12", "0.78", "1.2", "5", "2", "CLOSER", "7"], ["level13", "0.76", "1.2", "5", "2", "CLOSER", "7"], ["level14", "0.74", "1.2", "5", "2", "CLOSER", "7"], ["level15", "0.72", "1.2", "6", "2", "CLOSER", "8"], ["level16", "0.7", "1.2", "6", "4", "CLOSER", "8"], ["level17", "0.68", "1.2", "6", "2", "CLOSER", "8"], ["level18", "0.66", "1.2", "6", "3", "CLOSER", "9"], ["level19", "0.64", "1.2", "6", "2", "CLOSER", "9"], ["level20", "0.62", "1.3", "7", "3", "CLOSER", "9"], ["level21", "0.6", "1.3", "7", "1", "CLOSER", "9"], ["level22", "0.58", "1.3", "7", "1", "CLOSER", "10"], ["level23", "0.56", "1.3", "7", "1", "CLOSER", "10"], ["level24", "0.54", "1.3", "7", "1", "CLOSER", "10"], ["level25", "0.52", "1.3", "7", "200", "CLOSER", "10"], ["MAX", "0", "1.3", "7", "80", "CLOSER", "10"]];
        _this.colorSet = [["colorId", "color_r", "color_g", "color_b"], ["color0", "90", "45", "145"], ["color1", "145", "35", "135"], ["color2", "215", "15", "120"], ["color3", "230", "35", "45"], ["color4", "245", "150", "30"], ["color5", "250", "220", "5"], ["color6", "180", "210", "55"], ["color7", "5", "190", "115"], ["color8", "5", "150", "175"], ["color9", "24", "75", "169"]];
        _this.curLevel = 1;
        _this.levelWinCount = 0;
        _this.gameLevel = 1;
        _this.remainTime = 20;
        _this.curCloserArr = [];
        _this.gameover = false;
        return _this;
    }
    GameManager.prototype.onLoad = function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    };
    GameManager.prototype.start = function () {
        this.initProperties();
        this.playBGM();
        this.newRound();
    };
    GameManager.prototype.initProperties = function () {
        this.levelText = cc.find("Canvas/UI/LEVEL/number").getComponent(cc.Label);
        this.timeText = cc.find("Canvas/UI/TIME/number").getComponent(cc.Label);
    };
    GameManager.prototype.update = function (dt) {
        if (!this.gameover) {
            this.updateUI(dt);
            if (this.remainTime == 0) {
                this.gameover = true;
                this.onGameover();
            }
        }
    };
    GameManager.prototype.onKeyDown = function (event) {
        if (event.keyCode == cc.macro.KEY.k) {
            this.getResult(null, "Ans");
        }
    };
    GameManager.prototype.newRound = function () {
        this.checkCloserArr();
        var row = parseInt(this.level[this.curLevel][3]);
        this.spawnCircle(row);
    };
    GameManager.prototype.checkCloserArr = function () {
        if (this.curCloserArr.length <= 1) {
            var index = Math.floor(Math.random() * 10);
            var indexL = (index + 9) % 10;
            var p = parseInt(this.level[this.curLevel][6]) + 1;
            var u = cc.color(parseInt(this.colorSet[index + 1][1]), parseInt(this.colorSet[index + 1][2]), parseInt(this.colorSet[index + 1][3]));
            var d = cc.color(parseInt(this.colorSet[indexL + 1][1]), parseInt(this.colorSet[indexL + 1][2]), parseInt(this.colorSet[indexL + 1][3]));
            var c = cc.color(Math.ceil((d.getR() - u.getR()) / p), Math.ceil((d.getG() - u.getG()) / p), Math.ceil((d.getB() - u.getB()) / p));
            this.curCloserArr.length = 0;
            this.curCloserArr.push(u);
            for (var f = 1; f <= p; f++) {
                var m = cc.color(u.getR() + c.getR() * f, u.getG() + c.getG() * f, u.getB() + c.getB() * f);
                if (Math.abs(d.getR() - m.getR()) + Math.abs(d.getG() - m.getG()) + Math.abs(d.getB() - m.getB()) >= 10) {
                    this.curCloserArr.push(m);
                }
            }
            this.curCloserArr.push(d);
        }
        this.targetColor = this.curCloserArr.shift();
        this.baseColor = this.curCloserArr[0];
    };
    GameManager.prototype.getResult = function (event, customEventData) {
        if (this.gameover)
            return;
        if (customEventData == "Ans") {
            this.gameLevel++;
            this.levelWinCount++;
            if (this.levelWinCount == parseInt(this.level[this.curLevel][4])) {
                this.levelWinCount = 0;
                this.curLevel++;
                if (this.curLevel > 26) {
                    this.curLevel = 26;
                }
            }
            this.remainTime += parseFloat(this.level[this.curLevel][1]);
            this.newRound();
            this.playEffect();
        }
        else {
            var offset = 4;
            this.circleContainer.runAction(cc.sequence(cc.moveTo(0.05, cc.v2(offset, -110.5)), cc.moveTo(0.05, cc.v2(-offset, -110.5)), cc.moveTo(0.05, cc.v2(offset, -110.5)), cc.moveTo(0.05, cc.v2(-offset, -110.5)), cc.moveTo(0.05, cc.v2(0, -110.5))));
            this.cover_red.runAction(cc.sequence(cc.fadeIn(0.1), cc.delayTime(0.1), cc.fadeOut(0.1)));
            this.remainTime -= parseFloat(this.level[this.curLevel][2]);
        }
    };
    GameManager.prototype.updateUI = function (dt) {
        this.levelText.string = this.gameLevel.toString();
        this.remainTime -= dt;
        if (this.remainTime < 0) {
            this.remainTime = 0;
        }
        this.timeText.string = this.remainTime.toFixed(2).toString().replace(".", ":");
    };
    GameManager.prototype.onGameover = function () {
        this.cover.runAction(cc.fadeTo(0.2, 128));
        this.gameoverPanel.active = true;
        this.gameoverPanel.runAction(cc.fadeIn(0.2));
        var LEVELText = this.gameoverPanel.getChildByName("LEVEL").getComponent(cc.Label);
        LEVELText.string = "Lv. " + this.gameLevel.toString();
        this.stopBGM();
    };
    GameManager.prototype.loadMenu = function () {
        cc.director.loadScene("menu");
    };
    GameManager.prototype.playBGM = function () {
        // ===================== TODO =====================
        // 1. Play music. The audio clip to play is this.bgm
        cc.audioEngine.play(this.bgm, true, 0.4);
        // ================================================
    };
    GameManager.prototype.stopBGM = function () {
        // ===================== TODO =====================
        // 1. Stop music. 
        cc.audioEngine.stopAll();
        // ================================================
    };
    GameManager.prototype.playEffect = function () {
        // ===================== TODO =====================
        // 1. Play sound effect. The audio clip to play is 
        //    this.correctSound
        cc.audioEngine.playEffect(this.correctSound, false);
        // ================================================
    };
    GameManager.prototype.spawnCircle = function (row) {
        cc.log("spawn " + row + "*" + row);
        this.clearCircle();
        var containerSize = 380;
        if (row == 2) {
            containerSize = 246;
        }
        else if (row == 3) {
            containerSize = 369;
        }
        var circleSize = containerSize / row;
        // ===================== TODO =====================
        // 1. Spawn [row]*[row] circles (this.circlePrefab)
        //    under circleContainer.
        //    (Be child nodes of the circleContainer node)
        //
        //    Hints:  cc.instantiate(), cc.Node.addChild()
        //
        // 2. All circles should be place like a square matrix.
        //    There is no space between each circle in each
        //    row and each column.
        // 
        //    e.g. A 3*3 matrix of circles is look like:
        //    https://i.imgur.com/NuLEiyY.png
        //    A 4*4 matrix of circles is look like:
        //    https://i.imgur.com/Ij8GDvx.png
        // 
        //    Hints:  Layout component
        //
        // 3. The width and height of each circle is 
        //    [circleSize].
        //
        // 4. Only ONE of the circles is the answer.
        // 
        //    Hints:  Math.floor(Math.random() * 12) => random 0~12 
        // 
        // 5. There is a child node named "Background" under
        //    the circle node. You should change the color
        //    of the "Background" node to this.targetColor
        //    if it is the answer, or change the color to
        //    this.baseColor otherwise.
        // 
        // 6. Add a click event to the Button component of
        //    each circle so that when you click on it,
        //    GameManager.getResult() will be called.
        // 
        // 7. If the circle is the answer, customEventData
        //    of the click event should be "Ans".
        this.circleContainer.width = containerSize;
        this.circleContainer.height = containerSize;
        var ans = Math.floor(Math.random() * (row * row - 1));
        for (var i = 0; i < row * row; i++) {
            var circle = cc.instantiate(this.circlePrefab);
            circle.width = circleSize;
            circle.height = circleSize;
            circle.name = "circle" + String(i);
            var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.handler = "getResult";
            clickEventHandler.component = "GameManager";
            clickEventHandler.target = this.node;
            if (i == ans) {
                circle.getChildByName("Background").color = this.targetColor;
                clickEventHandler.customEventData = "Ans";
            }
            else {
                circle.getChildByName("Background").color = this.baseColor;
                clickEventHandler.customEventData = "";
            }
            this.circleContainer.addChild(circle);
            cc.find("Canvas/circleContainer/" + circle.name).getComponent(cc.Button).clickEvents.push(clickEventHandler);
        }
        // ================================================
    };
    GameManager.prototype.clearCircle = function () {
        this.circleContainer.removeAllChildren();
    };
    __decorate([
        property(cc.Node)
    ], GameManager.prototype, "circleContainer", void 0);
    __decorate([
        property(cc.Node)
    ], GameManager.prototype, "cover_red", void 0);
    __decorate([
        property(cc.Node)
    ], GameManager.prototype, "cover", void 0);
    __decorate([
        property(cc.Node)
    ], GameManager.prototype, "gameoverPanel", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameManager.prototype, "circlePrefab", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], GameManager.prototype, "bgm", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], GameManager.prototype, "correctSound", void 0);
    GameManager = __decorate([
        ccclass
    ], GameManager);
    return GameManager;
}(cc.Component));
exports.default = GameManager;

cc._RF.pop();