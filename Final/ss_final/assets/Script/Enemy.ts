const {ccclass, property} = cc._decorator;

@ccclass
export default class Enemy extends cc.Component {

    private moveDir : number = -1;

    private bunnyMoveSpeed: number = 70;

    private ghostMoveSpeed: number = 50;

    private slimeMoveSpeed: number = 50;

    private mushroomMoveSpeed: number = 100;

    private anim: cc.Animation = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.anim = this.getComponent(cc.Animation);
    }

    update (dt) {
        if(this.node.name == "Bunny"){
            this.node.x += this.bunnyMoveSpeed * this.moveDir * dt;
            if(this.moveDir == 1){
                this.node.scaleX = -1.5;
            }
            else{
                this.node.scaleX = 1.5;
            }
        }
        if(this.node.name == "Ghost"){
            this.node.x += this.ghostMoveSpeed * this.moveDir * dt;
            if(this.moveDir == 1){
                this.node.scaleX = -1;
            }
            else{
                this.node.scaleX = 1;
            }
        }
        if(this.node.name == "Slime"){
            this.node.x += this.slimeMoveSpeed * this.moveDir * dt;
            if(this.moveDir == 1){
                this.node.scaleX = -1.5;
            }
            else{
                this.node.scaleX = 1.5;
            }
        }
        if(this.node.name == "Mushroom"){
            this.node.x += this.mushroomMoveSpeed * this.moveDir * dt;
            if(this.moveDir == 1){
                this.node.scaleX = -1.5;
            }
            else{
                this.node.scaleX = 1.5;
            }
        }
        this.playAnimate();
    }

    playAnimate(){
        if(this.node.name == "Bunny"){
            if(!this.anim.getAnimationState("Bunny").isPlaying){
                this.anim.play("Bunny");
            }
        }
        if(this.node.name == "Ghost"){
            if(!this.anim.getAnimationState("Ghost").isPlaying){
                this.anim.play("Ghost");
            }
        }
        if(this.node.name == "Slime"){
            if(!this.anim.getAnimationState("Slime").isPlaying){
                this.anim.play("Slime");
            }
        }
        if(this.node.name == "Mushroom"){
            if(!this.anim.getAnimationState("Mushroom").isPlaying){
                this.anim.play("Mushroom");
            }
        }
    }

    onBeginContact(contact, self, other){
        if(contact.getWorldManifold().normal.x > 0){
            this.moveDir = -1;
        }
        else if(contact.getWorldManifold().normal.x < 0){
            this.moveDir = 1;
        }
    }
}
