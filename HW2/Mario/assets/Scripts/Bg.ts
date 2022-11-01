const {ccclass, property} = cc._decorator;

@ccclass
export default class Bg extends cc.Component {

    // onLoad () {}

    start () {
        cc.director.setClearColor(cc.color(204, 204, 255, 0));
    }

    // update (dt) {}
}
