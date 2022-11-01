(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Board.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e1b14hQvn5AaIJVqbzChSAf', 'Board', __filename);
// Scripts/Board.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Board = /** @class */ (function (_super) {
    __extends(Board, _super);
    function Board() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.time = 200;
        return _this;
    }
    Board.prototype.start = function () {
        cc.find("Canvas/Main Camera/Board/timer/val").getComponent(cc.Label).string = '200';
        this.timer();
        this.initBoard();
    };
    Board.prototype.update = function (dt) {
    };
    Board.prototype.timer = function () {
        this.schedule(function () {
            this.time -= 1;
            cc.find("Canvas/Main Camera/Board/timer/val").getComponent(cc.Label).string = String(this.time);
        }, 1, 200, 0);
    };
    Board.prototype.initBoard = function () {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var cleanEmail = user.email.replace(/\./g, ',');
                firebase.database().ref(cleanEmail).once('value', function (snapshot) {
                    var childData = snapshot.val();
                    cc.find("Canvas/Main Camera/Board/life/val").getComponent(cc.Label).string = childData.life;
                    cc.find("Canvas/Main Camera/Board/coin/val").getComponent(cc.Label).string = childData.coin;
                    cc.find("Canvas/Main Camera/Board/score").getComponent(cc.Label).string = childData.score;
                });
            }
            else {
                alert('Please Login First!');
            }
        });
    };
    Board = __decorate([
        ccclass
    ], Board);
    return Board;
}(cc.Component));
exports.default = Board;

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
        //# sourceMappingURL=Board.js.map
        