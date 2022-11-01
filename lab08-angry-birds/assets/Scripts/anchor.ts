const {ccclass, property} = cc._decorator;

@ccclass
export default class anchor extends cc.Component {

    @property(cc.Node)
    target: cc.Node = this.node;

    graphics: cc.Graphics;

    start () {
        this.graphics = this.node.getComponent(cc.Graphics);
    }

    lateUpdate () {
        this.graphics.clear();

        this.graphics.moveTo(0, 0);

        let offset = this.target.position.sub(this.node.position);

        this.graphics.lineTo(offset.x, offset.y);
        this.graphics.stroke();
    }
}
