"use strict";
cc._RF.push(module, 'a7b801wuUdCc4tfD8dqSgRX', 'Player');
// Script/Player.ts

Object.defineProperty(exports, "__esModule", { value: true });
var score_1 = require("./score");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.anim = null; //this will use to get animation component
        _this.animateState = null; //this will use to record animationState
        _this.bulletPrefab = null;
        _this.score = null;
        _this.bulletPool = null; // this is a bullet manager, and it control the bullet resource
        _this.playerSpeed = 0;
        _this.zDown = false; // key for player to go left
        _this.xDown = false; // key for player to go right
        _this.jDown = false; // key for player to shoot
        _this.kDown = false; // key for player to jump
        _this.onGround = false;
        _this.isDead = true;
        return _this;
    }
    Player.prototype.onLoad = function () {
        // ===================== TODO =====================
        // 1. Use "this.anim" to record Animation component
        this.anim = this.getComponent(cc.Animation);
        // ================================================
        cc.director.getCollisionManager().enabled = true;
        cc.director.getPhysicsManager().enabled = true;
        this.bulletPool = new cc.NodePool('Bullet');
        var maxBulletNum = 5;
        for (var i = 0; i < maxBulletNum; i++) {
            var bullet = cc.instantiate(this.bulletPrefab);
            this.bulletPool.put(bullet);
        }
    };
    Player.prototype.start = function () {
        // add key down and key up event
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    };
    Player.prototype.update = function (dt) {
        this.playerMovement(dt);
        this.playerAnimation();
    };
    Player.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.z:
                this.zDown = true;
                this.xDown = false;
                break;
            case cc.macro.KEY.x:
                this.xDown = true;
                this.zDown = false;
                break;
            case cc.macro.KEY.j:
                this.jDown = true;
                break;
            case cc.macro.KEY.k:
                this.kDown = true;
                break;
        }
    };
    Player.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.z:
                this.zDown = false;
                break;
            case cc.macro.KEY.x:
                this.xDown = false;
                break;
            case cc.macro.KEY.j:
                this.jDown = false;
                break;
            case cc.macro.KEY.k:
                this.kDown = false;
                break;
        }
    };
    Player.prototype.playerMovement = function (dt) {
        if (this.isDead)
            this.playerSpeed = 0;
        else if (this.jDown || this.anim.getAnimationState('shoot').isPlaying)
            this.playerSpeed = 0;
        else if (this.zDown)
            this.playerSpeed = -300;
        else if (this.xDown)
            this.playerSpeed = 300;
        else
            this.playerSpeed = 0;
        this.node.x += this.playerSpeed * dt; //move player
    };
    Player.prototype.playerAnimation = function () {
        this.node.scaleX = (this.zDown) ? -1 : (this.xDown) ? 1 : this.node.scaleX;
        if (this.isDead) {
            //reset player position and play reborn animation
            if (this.animateState == null || this.animateState.name != 'reborn') {
                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
                // ===================== TODO =====================
                // 1. reset the player's position to (-192, 255)
                this.node.x = -192;
                this.node.y = 255;
                // 2. play reborn animation and use "this.animateState" to record animation state
                this.animateState = this.anim.play('reborn');
                // 3. register a callback function when reborn animation finish, and set the value of this.isDead to false in the callback function
                this.anim.on('finished', this.reborn, this);
                // ================================================
                //reset score value
                this.score.resetScore();
            }
        }
        else if (!this.anim.getAnimationState('shoot').isPlaying && !this.anim.getAnimationState('jump').isPlaying && this.onGround) // move animation can play only when shoot or jump animation finished
         {
            if (this.jDown)
                this.animateState = this.anim.play('shoot');
            else if (this.kDown) {
                this.animateState = this.anim.play('jump');
                this.jump();
            }
            else if (this.zDown || this.xDown) {
                if (this.animateState == null || this.animateState.name != 'move') // when first call or last animation is not move
                    this.animateState = this.anim.play('move');
            }
            else {
                //if no key is pressed and the player is on ground, stop all animations and go back to idle
                if (this.animateState == null || this.animateState.name != 'idle')
                    this.animateState = this.anim.play('idle');
            }
        }
    };
    Player.prototype.reborn = function () {
        this.isDead = false;
    };
    //give velocity to the player
    Player.prototype.jump = function () {
        this.onGround = false;
        // ===================== TODO =====================
        // 1. set the linearVelocity of RigidBody to (0, 1500)
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 1500);
        // ================================================
    };
    // call this when player shoots the bullet.
    Player.prototype.createBullet = function () {
        var bullet = null;
        if (this.bulletPool.size() > 0)
            bullet = this.bulletPool.get(this.bulletPool);
        if (bullet != null)
            bullet.getComponent('Bullet').init(this.node);
    };
    //check if the collision is valid or not
    Player.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        if (otherCollider.tag == 2 && !this.isDead) //enemy tag
            this.isDead = true;
        // ===================== TODO ===================== 
        // 1. Use otherCollider.tag to check if the player collides with ground or block(the tag of both ground and block are 1), 
        // and do step2 and step3 when the condition is true
        // 2. set the value of this.onGround to true
        // 3. check if jump animation still playing, if yes, stop it and play idle animation 
        if (otherCollider.tag == 1 && !this.isDead) {
            this.onGround = true;
            if (this.anim.getAnimationState('jump').isPlaying) {
                this.anim.stop('jump');
                this.animateState = this.anim.play('idle');
            }
        }
        // ================================================
    };
    __decorate([
        property(cc.Prefab)
    ], Player.prototype, "bulletPrefab", void 0);
    __decorate([
        property(score_1.default)
    ], Player.prototype, "score", void 0);
    Player = __decorate([
        ccclass
    ], Player);
    return Player;
}(cc.Component));
exports.default = Player;

cc._RF.pop();