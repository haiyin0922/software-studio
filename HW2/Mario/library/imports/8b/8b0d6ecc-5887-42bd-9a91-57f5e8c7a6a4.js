"use strict";
cc._RF.push(module, '8b0d67MWIdCvZqRV/Xox6ak', 'Player');
// Scripts/Player.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Board_1 = require("./Board");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.board = null;
        _this.playerSpeed = 250;
        _this.jumpSound = null;
        _this.dieSound = null;
        _this.bigSound = null;
        _this.smallSound = null;
        _this.eatSound = null;
        _this.onGround = false;
        _this.anim = null;
        _this.action = "idle";
        _this.moveDir = 0;
        _this.mode = 0; //0:small, 1:big, 2:die
        _this.super = false;
        return _this;
    }
    Player.prototype.start = function () {
        this.anim = this.getComponent(cc.Animation);
    };
    Player.prototype.update = function (dt) {
        if (this.mode < 2) {
            if (cc.find("Canvas/Main Camera/Board/timer/val").getComponent(cc.Label).string == '0') {
                this.playerDie();
            }
            else {
                switch (this.moveDir) {
                    case 1:
                        this.node.x += this.playerSpeed * this.moveDir * dt;
                    case 2:
                        this.node.scaleX = 2.5;
                        break;
                    case -1:
                        this.node.x += this.playerSpeed * this.moveDir * dt;
                    case -2:
                        this.node.scaleX = -2.5;
                        break;
                }
            }
        }
        this.node.scaleY = 2.5;
        this.playerAnimation();
    };
    Player.prototype.playerAnimation = function () {
        if (this.mode == 0) {
            if (!this.anim.getAnimationState("small_walk").isPlaying && this.action == "walk" && this.onGround) {
                this.anim.play("small_walk");
            }
            else if (!this.anim.getAnimationState("small_jump").isPlaying && this.action == "jump" && !this.onGround) {
                this.anim.play("small_jump");
            }
            else if (this.action == "idle" && this.onGround) {
                this.anim.play("small_idle");
            }
        }
        else if (this.mode == 1) {
            if (!this.anim.getAnimationState("big_walk").isPlaying && this.action == "walk" && this.onGround) {
                this.anim.play("big_walk");
            }
            else if (!this.anim.getAnimationState("big_jump").isPlaying && this.action == "jump" && !this.onGround) {
                this.anim.play("big_jump");
            }
            else if (this.action == "idle" && this.onGround) {
                this.anim.play("big_idle");
            }
        }
        else {
            if (!this.anim.getAnimationState("player_die").isPlaying) {
                this.anim.play("player_die");
            }
        }
    };
    Player.prototype.touchGround = function () {
        this.onGround = true;
    };
    Player.prototype.noTouchGround = function () {
        this.onGround = false;
    };
    Player.prototype.changeMode = function (mode) {
        //cc.log("super:" + this.super);
        if (mode == 0 && this.mode == 1) {
            cc.audioEngine.playEffect(this.smallSound, false);
            this.playerSuper();
            this.mode = 0;
            this.getComponent(cc.PhysicsBoxCollider).destroy();
            var collider = this.addComponent(cc.PhysicsBoxCollider);
            collider.size.width = 16;
            collider.size.height = 16;
        }
        else if (mode == 1 && this.mode == 0) {
            cc.audioEngine.playEffect(this.bigSound, false);
            this.mode = 1;
            this.getComponent(cc.PhysicsBoxCollider).destroy();
            var collider = this.addComponent(cc.PhysicsBoxCollider);
            collider.size.width = 15;
            collider.size.height = 27;
        }
        else if (mode == 0 && this.mode == 0) {
            this.playerDie();
        }
        else if (mode == 1 && this.mode == 1) {
            cc.audioEngine.playEffect(this.eatSound, false);
        }
    };
    Player.prototype.playerDie = function () {
        var _this = this;
        cc.audioEngine.stopAll();
        cc.audioEngine.playEffect(this.dieSound, false);
        this.mode = 2;
        this.getComponent(cc.PhysicsBoxCollider).enabled = false;
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 750);
        firebase.auth().onAuthStateChanged(function (user) {
            var cleanEmail = user.email.replace(/\./g, ',');
            firebase.database().ref(cleanEmail).once('value', function (snapshot) {
                var childData = snapshot.val();
                firebase.database().ref(cleanEmail).set({
                    life: childData.life - 1,
                    coin: childData.coin,
                    score: childData.score
                });
                if (childData.life - 1 > 0) {
                    if (cc.find("Canvas/Main Camera/Board/world/val").getComponent(cc.Label).string == '1') {
                        _this.schedule(function () {
                            cc.director.loadScene("start_easy");
                        }, 2);
                    }
                    else {
                        _this.schedule(function () {
                            cc.director.loadScene("start_normal");
                        }, 2);
                    }
                }
                else {
                    firebase.auth().onAuthStateChanged(function (user) {
                        var cleanEmail = user.email.replace(/\./g, ',');
                        firebase.database().ref(cleanEmail).once('value', function (snapshot) {
                            firebase.database().ref(cleanEmail).set({
                                score: 0,
                                coin: 0,
                                life: 5
                            });
                        });
                    });
                    _this.schedule(function () {
                        cc.director.loadScene("gameover");
                    }, 2);
                }
            });
        });
    };
    Player.prototype.playerJump = function () {
        if (this.onGround) {
            cc.audioEngine.playEffect(this.jumpSound, false);
            this.onGround = false;
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 750);
        }
    };
    Player.prototype.enemyJump = function () {
        this.onGround = false;
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 750);
    };
    Player.prototype.playerAction = function (action) {
        this.action = action;
    };
    Player.prototype.playerMove = function (moveDir) {
        this.moveDir = moveDir;
    };
    Player.prototype.playerSuper = function () {
        this.super = true;
        this.schedule(function () {
            this.super = false;
        }, 1);
    };
    Player.prototype.getSuper = function () {
        return this.super;
    };
    Player.prototype.onBeginContact = function (contact, self, other) {
        if (other.node.name == "lowBound") {
            this.playerDie();
        }
    };
    __decorate([
        property(Board_1.default)
    ], Player.prototype, "board", void 0);
    __decorate([
        property()
    ], Player.prototype, "playerSpeed", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Player.prototype, "jumpSound", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Player.prototype, "dieSound", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Player.prototype, "bigSound", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Player.prototype, "smallSound", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Player.prototype, "eatSound", void 0);
    Player = __decorate([
        ccclass
    ], Player);
    return Player;
}(cc.Component));
exports.default = Player;

cc._RF.pop();