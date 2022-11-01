import Player from "./Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Map extends cc.Component {

    @property(Player)
    player: Player = null;

    onBeginContact(contact, self, other) {
        if(other.node.name == "player"){
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
