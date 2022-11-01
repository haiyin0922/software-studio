"use strict";
cc._RF.push(module, '229a5L0sylJM4aAIYdyO9Tv', 'bird');
// Scripts/bird.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        anchor1: {
            default: null,
            type: cc.Node
        },
        anchor2: {
            default: null,
            type: cc.Node
        },
        draggable: {
            default: true
            // type: boolean
        },
        attachRope: {
            default: true
            // type: boolean
        },
        initPos: {
            default: null
            // type: cc.Vec2
        },
        startPos: {
            default: null
            // type: cc.Vec2
        },
        motorJoint: {
            default: null,
            type: cc.MotorJoint
        },
        ropeJoint: {
            default: null,
            type: cc.RopeJoint
        },
        rb: {
            default: null,
            type: cc.RigidBody
        },
        maxLength: {
            default: null
            // type: number
        }
    },

    initResetButton: function initResetButton() {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "bird";
        clickEventHandler.handler = "reset";

        cc.find("Canvas/Reset").getComponent(cc.Button).clickEvents.push(clickEventHandler);
    },
    onLoad: function onLoad() {
        cc.director.getPhysicsManager().enabled = true;
    },
    start: function start() {
        this.initProperties();
        this.initResetButton();
    },
    update: function update() {
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
        } else {
            if (this.attachRope) {
                this.node.angle = -cc.misc.radiansToDegrees(angle) + 90;

                this.anchor1.setPosition(this.node.position.add(cc.v2(-18, 2).rotate(-angle + 90)));
                this.anchor2.setPosition(this.node.position.add(cc.v2(-18, 2).rotate(-angle + 90)));
            }
        }
    },
    initProperties: function initProperties() {
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
    },
    reset: function reset() {
        this.node.setPosition(this.initPos);

        this.rb.linearVelocity = cc.Vec2.ZERO;
        this.rb.angularVelocity = 0;
        this.rb.gravityScale = 0;

        this.node.angle = 0;
        this.draggable = true;
        this.attachRope = true;
    },
    onEnable: function onEnable() {
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    },
    onDisable: function onDisable() {
        this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    },
    _onTouchBegan: function _onTouchBegan(event) {
        if (!this.enabledInHierarchy) return;

        if (this.draggable) {
            this.startPos = this.node.position;
            this.motorJoint.enabled = false;
            this.rb.gravityScale = 0;
            this.rb.linearVelocity = cc.Vec2.ZERO;
            this.rb.angularVelocity = 0;
        }
        event.stopPropagation();
    },
    _onTouchMove: function _onTouchMove(event) {
        if (!this.enabledInHierarchy) return;

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
    },
    _onTouchEnded: function _onTouchEnded(event) {
        if (!this.enabledInHierarchy) return;

        this.dragEnd();

        event.stopPropagation();
    },
    _onTouchCancel: function _onTouchCancel(event) {
        if (!this.enabledInHierarchy) return;

        this.dragEnd();

        event.stopPropagation();
    },
    dragEnd: function dragEnd() {
        if (!this.draggable) return;

        if (this.node.position.sub(this.startPos).mag() > 10) {
            this.draggable = false;
        }

        this.motorJoint.enabled = true;

        this.rb.gravityScale = 1;
        this.rb.linearVelocity = cc.v2(1, 0);
    }
});

cc._RF.pop();