import Player from "./Player";
import Mushroom from "./Mushroom";
import Money from "./Money";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Block extends cc.Component {

    @property(Player)
    player: Player = null;

    @property(Mushroom)
    mushroom: Mushroom = null;

    @property(Money)
    money: Money = null;

    private anim: cc.Animation = null;
    private hit: boolean = false;
    private move = 0;

    start () {
        this.anim = this.getComponent(cc.Animation);
    }

    update (dt) {
        this.blockAnimation();
        this.node.y += this.move;
        if(this.move == 5) this.move = -5;
        else if(this.move == -5) this.move = 0;
    }

    blockAnimation() {
        if(!this.anim.getAnimationState("question_block").isPlaying && !this.hit){
            this.anim.play("question_block");
        }
        else if(!this.anim.getAnimationState("normal_block").isPlaying && this.hit){
            this.anim.play("normal_block");
        }
    }

    onBeginContact(contact, self, other) {
        if(other.node.name == "player"){
            if(contact.getWorldManifold().normal.y < 0 && !this.hit){
                this.hit = true;
                this.move = 5;
                if(this.mushroom != null) this.mushroom.moveUp();
                if(this.money != null) this.money.moveUp();
            }
            if(contact.getWorldManifold().normal.y > 0){
                other.getComponent(Player).touchGround();
            }
        }
    }
    
    onEndContact(contact, self, other) {
        if(other.node.name == "player"){
            other.getComponent(Player).noTouchGround();
        }
    }
}
