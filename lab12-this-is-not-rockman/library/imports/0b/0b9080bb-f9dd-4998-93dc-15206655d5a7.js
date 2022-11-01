"use strict";
cc._RF.push(module, '0b908C7+d1JmJPcFSBmVdWn', 'enemyManager');
// Script/enemyManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var enemyManager = /** @class */ (function (_super) {
    __extends(enemyManager, _super);
    function enemyManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.enemyPrefab = null;
        _this.enemyPool = null;
        return _this;
    }
    enemyManager.prototype.onLoad = function () {
        this.enemyPool = new cc.NodePool('enemy');
        var maxEnemyNum = 3;
        for (var i = 0; i < maxEnemyNum; i++) {
            var enemy = cc.instantiate(this.enemyPrefab);
            this.enemyPool.put(enemy);
        }
        this.schedule(this.createEnemy, 0.5); //set one enemy to the scene every 0.5s .
    };
    //call this function to add new enemy to the scene.
    enemyManager.prototype.createEnemy = function () {
        var enemy = null;
        if (this.enemyPool.size() > 0)
            enemy = this.enemyPool.get(this.enemyPool);
        if (enemy != null)
            enemy.getComponent('enemy').init(this.node);
    };
    __decorate([
        property(cc.Prefab)
    ], enemyManager.prototype, "enemyPrefab", void 0);
    enemyManager = __decorate([
        ccclass
    ], enemyManager);
    return enemyManager;
}(cc.Component));
exports.default = enemyManager;

cc._RF.pop();