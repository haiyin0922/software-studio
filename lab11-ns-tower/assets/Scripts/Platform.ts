const { ccclass, property } = cc._decorator;

@ccclass
export default class Platform extends cc.Component {

    protected isTouched: boolean = false;

    private anim: cc.Animation = null;

    private moveSpeed: number = 50;

    private camera: cc.Node = null;

    start() {
        this.anim = this.getComponent(cc.Animation);

        this.camera = cc.find('Canvas/Main Camera');

        if (this.node.name == "Conveyor") {
            this.node.scaleX = (Math.random() >= 0.5) ? 1 : -1;
            this.moveSpeed *= this.node.scaleX;
        }
        else if(this.node.name == "Normal")
        {
            let canMove = (Math.random() > 0.8) ? true : false;
            if(canMove)
            {
                let moveDir = (Math.random() > 0.5) ? "v" : "h";
                let delayTime = Math.random() * 2;
                this.platformMove(moveDir, delayTime);
            }
        }
    }

    update(dt)
    {   
        if(this.camera.y - this.node.y >= 190) // platform out of screen
            this.platformDestroy();
    }

    playAnim() {
        if(this.anim)
            this.anim.play();
    }

    platformDestroy()
    {
        this.node.destroy();
    }

    platformMove(moveDir: string, delayTime: number)
    {
        let easeRate: number = 2;
        // ===================== TODO =====================
        // 1. Make platform move back and forth. You should use moveDir to decide move direction.
        //    'v' for vertical, and 'h' for horizontal.
        // 2. Use action system to make platfrom move forever.
        //    For horizontal case, you should first move right 50 pixel in 2s and then move back to initial position in 2s
        //    For vertical case, you should first move up 50 pixel in 2s and then move back to initial position in 2s
        //    You need to use "easeInOut" to modify your action with "easeRate" as parameter.
        // ================================================
        this.scheduleOnce(function() {
            if(moveDir == "h"){
                let go = cc.moveBy(2, 50, 0).easing(cc.easeInOut(easeRate));
                let back = cc.moveBy(2, -50, 0).easing(cc.easeInOut(easeRate));
                go.easing(cc.easeInOut(easeRate));
                back.easing(cc.easeInOut(easeRate));
                this.node.runAction(cc.sequence(go, back)).repeatForever();
            }
            else if(moveDir == "v"){
                let go = cc.moveBy(2, 0, 50).easing(cc.easeInOut(easeRate));
                let back = cc.moveBy(2, 0, -50).easing(cc.easeInOut(easeRate));
                go.easing(cc.easeInOut(easeRate));
                back.easing(cc.easeInOut(easeRate));
                this.node.runAction(cc.sequence(go, back)).repeatForever();
            }
        }, delayTime);
    }

  // ===================== TODO =====================
  // 1. In the physics lecture, we know that Cocos Creator
  //    provides four contact callbacks. You need to use callbacks to
  //    design different behaviors for different platforms.
  //
  //    Hints: The callbacks are "onBeginContact", "onEndContact", "onPreSolve", "onPostSolve".
  //
  // 2. There are two different types of platforms: "Normal" & Conveyor".
  //    For "Conveyor", you have to do "delivery effect" when player is in contact with it.
  //    Note that the platforms have "delivery effect" only when player stands on them. 
  //
  //    Hints: Change "linearVelocity" of the player's rigidbody to make him move.
  //    The move value is "moveSpeed".
  //
  // 3. All the platforms have only "upside" collision. You have to prevent the collisions from the other directions.
  //
  //    Hints: You can use "contact.getWorldManifold().normal" to judge collision direction.
  //
  // ================================================
    onBeginContact(contact, self, other) {
        if(contact.getWorldManifold().normal.y != 1 && other.node.name == "player"){
            contact.disabled = true;
            cc.log("!");
        }
    }

    onPreSolve(contact, self, other){
        if(contact.getWorldManifold().normal.y != 1 && other.node.name == "player"){
            contact.disabled = true;
            cc.log("!");
        }
    }

    onPostSolve(contact, self, other){
        if(contact.getWorldManifold().normal.y != 1 && other.node.name == "player"){
            contact.disabled = true;
            cc.log("!");
        }
        var player_V = cc.v2(other.getComponent(cc.RigidBody).linearVelocity);
        if(contact.getWorldManifold().normal.y == 1 && self.node.name == "Conveyor" && other.node.name == "player"){
            other.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.moveSpeed, player_V.y);
        }
    }

    onEndContact(contact, self, other){
        var player_V = cc.v2(other.getComponent(cc.RigidBody).linearVelocity);
        if(contact.getWorldManifold().normal.y == 1 && self.node.name == "Conveyor" && other.node.name == "player"){
            other.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, player_V.y);
        }
        if(self.node.name == "Conveyor" && other.node.name == "player"){
            other.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
        }
    }
}
