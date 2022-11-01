const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    anchor1: cc.Node;
    anchor2: cc.Node;

    // TODO: Complete all the other declarations
    // e.g. draggable, attachRope, ...
    draggable: boolean;
    attachRope: boolean;
    initPos: cc.Vec2;
    startPos: cc.Vec2;
    motorJoint: cc.MotorJoint;
    ropeJoint: cc.RopeJoint;
    rb: cc.RigidBody;
    maxLength: number;






    initResetButton () {
        let clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "bird_TS";
        clickEventHandler.handler = "reset";

        cc.find("Canvas/Reset").getComponent(cc.Button).clickEvents.push(clickEventHandler);
    }
    
    // TODO: Complete all the other functions
    // e.g. onLoad, start, update, ...
    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
    }

    start () {
        this.initProperties();
        this.initResetButton();
    }

    update () {
        var diff =  this.initPos.sub(this.node.position);
        var angle = Math.atan2(diff.x, diff.y);
        if (this.node.position.sub(this.initPos).mag() <= 10){
            if(!this.draggable){
                this.motorJoint.enabled = false;
                this.ropeJoint.enabled = false;
                this.rb.angularVelocity = -angle * 20;
                this.attachRope = false;
                this.anchor1.setPosition(this.initPos.add(cc.v2(-20, 0)));
                this.anchor2.setPosition(this.initPos.add(cc.v2(-20, 0)));
            }
        } else {
            if (this.attachRope) {
                this.node.angle = - cc.misc.radiansToDegrees(angle) + 90;
    
                this.anchor1.setPosition(this.node.position.add(cc.v2(-18, 2).rotate(-angle+90)));
                this.anchor2.setPosition(this.node.position.add(cc.v2(-18, 2).rotate(-angle+90)));
            }
        }
    }

    initProperties () {
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
    }

    reset () {
        this.node.setPosition(this.initPos);

        this.rb.linearVelocity = cc.Vec2.ZERO;
        this.rb.angularVelocity = 0;
        this.rb.gravityScale = 0;
        
        this.node.angle = 0;
        this.draggable = true;
        this.attachRope = true;
    }

    onEnable () {
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    }
    
    onDisable () {
        this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    }
    
    
    _onTouchBegan (event) {
        if (!this.enabledInHierarchy) return;

        if(this.draggable) {
            this.startPos = this.node.position;
            this.motorJoint.enabled = false;
            this.rb.gravityScale = 0;
            this.rb.linearVelocity = cc.Vec2.ZERO;
            this.rb.angularVelocity = 0;
        }
        event.stopPropagation();
    }
    
    _onTouchMove (event) {
        if (!this.enabledInHierarchy) return;
    
        if(this.draggable){
            let start = event.getStartLocation();
            let cur = event.getLocation();
            cur.subSelf(start);
            
            let cur_v = cc.v2(cur.x, cur.y);
            if(cur_v.mag() > this.maxLength){
                cur_v.normalizeSelf().mulSelf(this.maxLength);
            }

            this.node.setPosition(this.startPos.add(cur_v));
            
            this.rb.linearVelocity = cc.Vec2.ZERO;
            this.rb.angularVelocity = 0;
        }

        event.stopPropagation();
    }
    
    _onTouchEnded (event) {
        if (!this.enabledInHierarchy) return;
    
        this.dragEnd();
    
        event.stopPropagation();
    }
    
    _onTouchCancel (event) {
        if (!this.enabledInHierarchy) return;

        this.dragEnd();
    
        event.stopPropagation();
    }

    dragEnd () {
        if (!this.draggable) return;

        if (this.node.position.sub(this.startPos).mag() > 10){
            this.draggable = false;
        }

        this.motorJoint.enabled = true;

        this.rb.gravityScale = 1;
        this.rb.linearVelocity = cc.v2(1, 0);
    }

}
