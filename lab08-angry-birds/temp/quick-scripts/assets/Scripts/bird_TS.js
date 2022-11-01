(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/bird_TS.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7d93eu3fJBPjbly3ZE+nwo6', 'bird_TS', __filename);
// Scripts/bird_TS.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NewClass.prototype.initResetButton = function () {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "bird_TS";
        clickEventHandler.handler = "reset";
        cc.find("Canvas/Reset").getComponent(cc.Button).clickEvents.push(clickEventHandler);
    };
    // TODO: Complete all the other functions
    // e.g. onLoad, start, update, ...
    NewClass.prototype.onLoad = function () {
        cc.director.getPhysicsManager().enabled = true;
    };
    NewClass.prototype.start = function () {
        this.initProperties();
        this.initResetButton();
    };
    NewClass.prototype.update = function () {
        var diff = this.initPos.sub(this.node.position);
        var angle = Math.atan2(diff.x, diff.y);
        if (this.node.position.sub(this.initPos).mag() <= 10) {
            if (!this.draggable) {
                this.motorJoint.enabled = false;
                this.ropeJoint.enabled = false;
                this.rb.angularVelocity = -angle * 20;
                this.attachRope = false;
                this.anchor1.setPosition(this.initPos.add(cc.v2(-20, 0)));
                this.anchor2.setPosition(this.initPos.add(cc.v2(-20, 0)));
            }
        }
        else {
            if (this.attachRope) {
                this.node.angle = -cc.misc.radiansToDegrees(angle) + 90;
                this.anchor1.setPosition(this.node.position.add(cc.v2(-18, 2).rotate(-angle + 90)));
                this.anchor2.setPosition(this.node.position.add(cc.v2(-18, 2).rotate(-angle + 90)));
            }
        }
    };
    NewClass.prototype.initProperties = function () {
        this.anchor1 = cc.find("Canvas/Slingshot/SlingshotFront/anchor1");
        this.anchor1.setPosition(this.node.position.add(cc.v2(-20, 0)));
        this.anchor2 = cc.find("Canvas/Slingshot/SlingshotBack/anchor2");
        this.anchor2.setPosition(this.node.position.add(cc.v2(-20, 0)));
        this.motorJoint = this.getComponent(cc.MotorJoint);
        this.ropeJoint = this.getComponent(cc.RopeJoint);
        this.rb = this.getComponent(cc.RigidBody);
        this.initPos = this.node.position;
        this.startPos = this.node.position;
        this.maxLength = this.ropeJoint.maxLength;
        this.rb.gravityScale = 0;
        this.draggable = true;
        this.attachRope = true;
    };
    NewClass.prototype.reset = function () {
        this.node.setPosition(this.initPos);
        this.rb.linearVelocity = cc.Vec2.ZERO;
        this.rb.angularVelocity = 0;
        this.rb.gravityScale = 0;
        this.node.angle = 0;
        this.draggable = true;
        this.attachRope = true;
    };
    NewClass.prototype.onEnable = function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    };
    NewClass.prototype.onDisable = function () {
        this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    };
    NewClass.prototype._onTouchBegan = function (event) {
        if (!this.enabledInHierarchy)
            return;
        if (this.draggable) {
            this.startPos = this.node.position;
            this.motorJoint.enabled = false;
            this.rb.gravityScale = 0;
            this.rb.linearVelocity = cc.Vec2.ZERO;
            this.rb.angularVelocity = 0;
        }
        event.stopPropagation();
    };
    NewClass.prototype._onTouchMove = function (event) {
        if (!this.enabledInHierarchy)
            return;
        if (this.draggable) {
            var start = event.getStartLocation();
            var cur = event.getLocation();
            cur.subSelf(start);
            var cur_v = cc.v2(cur.x, cur.y);
            if (cur_v.mag() > this.maxLength) {
                cur_v.normalizeSelf().mulSelf(this.maxLength);
            }
            this.node.setPosition(this.startPos.add(cur_v));
            this.rb.linearVelocity = cc.Vec2.ZERO;
            this.rb.angularVelocity = 0;
        }
        event.stopPropagation();
    };
    NewClass.prototype._onTouchEnded = function (event) {
        if (!this.enabledInHierarchy)
            return;
        this.dragEnd();
        event.stopPropagation();
    };
    NewClass.prototype._onTouchCancel = function (event) {
        if (!this.enabledInHierarchy)
            return;
        this.dragEnd();
        event.stopPropagation();
    };
    NewClass.prototype.dragEnd = function () {
        if (!this.draggable)
            return;
        if (this.node.position.sub(this.startPos).mag() > 10) {
            this.draggable = false;
        }
        this.motorJoint.enabled = true;
        this.rb.gravityScale = 1;
        this.rb.linearVelocity = cc.v2(1, 0);
    };
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

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
        //# sourceMappingURL=bird_TS.js.map
        