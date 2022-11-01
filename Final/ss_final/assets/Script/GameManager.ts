const {ccclass, property} = cc._decorator;
import Player from "./Player";

@ccclass
export default class GameManager extends cc.Component {

    @property({ type: cc.AudioClip })
    soundEffect_wind: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    bgm_spring: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    bgm_summer: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    bgm_fall: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    bgm_winter: cc.AudioClip = null;

    private enviroment_x: number = 0;

    private enviroment_y: number = 0;

    private count: number = 0;

    private cur_season: string = 'spring';

    private prev_season: string = 'spring';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    

    start () {
        cc.audioEngine.setMusicVolume(0.3);
        cc.audioEngine.setEffectsVolume(0.2);
        this.scheduleOnce(function() {
            this.playBgm(0);
        }, 1);
        this.initButton();
    }

    initButton() { 
        let clickEventHandler_newgame = new cc.Component.EventHandler(); 
        clickEventHandler_newgame.target = this.node;
        clickEventHandler_newgame.handler = "loadMenuScene";
        clickEventHandler_newgame.component = "GameManager";
        cc.find("Canvas/Main Camera/Newgame Button").getComponent(cc.Button).clickEvents.push(clickEventHandler_newgame);
    } 
 
    loadMenuScene(){
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                var cleanEmail = user.email.replace(/\./g, ',');
                firebase.database().ref(cleanEmail).once('value', (snapshot) => {
                    var childData = snapshot.val();
                    firebase.database().ref(cleanEmail).set({
                        time: childData.time,
                        savetime: 'X',
                        x: 'X',
                        y: 'X'
                    });
                });
            }
        });
        cc.director.loadScene("Menu"); 
    }

    update (dt) {
        this.setEnvironment();
        this.setSeason();
    }

    setEnvironment(){
        this.count = (this.count == 550)? 0:this.count+1;

        //Fall effect
        if(cc.find("Canvas/Player").getComponent(Player).node.y >= 6210 && cc.find("Canvas/Player").getComponent(Player).node.y <= 9256){
            if(this.count == 400){
                this.playEffect(0)
            }
            if(this.count > 400 && this.count < 550){
                    this.enviroment_x = 3000;
            }
            else{
                this.enviroment_x = 0;
            }
        }
    }

    setSeason(){
        if(cc.find("Canvas/Player").getComponent(Player).node.y >= -240 && cc.find("Canvas/Player").getComponent(Player).node.y <= 2900){
            this.cur_season = 'spring';
            if(this.cur_season != this.prev_season){
                this.scheduleOnce(function() {
                    this.playBgm(0);
                }, 1);
                this.prev_season = 'spring';
            }
        }
        else if(cc.find("Canvas/Player").getComponent(Player).node.y >= 2999 && cc.find("Canvas/Player").getComponent(Player).node.y <= 6066){
            this.cur_season = 'summer';
            if(this.cur_season != this.prev_season){
                this.scheduleOnce(function() {
                    this.playBgm(1);
                }, 1);
                this.prev_season = 'summer';
            }
        }
        else if(cc.find("Canvas/Player").getComponent(Player).node.y >= 6160 && cc.find("Canvas/Player").getComponent(Player).node.y <= 9270){
            this.cur_season = 'fall';
            if(this.cur_season != this.prev_season){
                this.scheduleOnce(function() {
                    this.playBgm(2);
                }, 1);
                this.prev_season = 'fall';
            }
        }
        else if(cc.find("Canvas/Player").getComponent(Player).node.y >= 9362){
            this.cur_season = 'winter';
            if(this.cur_season != this.prev_season){
                this.scheduleOnce(function() {
                    this.playBgm(3);
                }, 1);
                this.prev_season = 'winter';
            }
        }
    }

    environmentX(){
        return this.enviroment_x;
    }

    environmentY(){
        return this.enviroment_y;
    }

    playEffect(num: number){
        if(num == 0){
            cc.audioEngine.playEffect(this.soundEffect_wind, false);
        }
    }

    playBgm(num: number){
        if(num == 0){
            cc.audioEngine.playMusic(this.bgm_spring, true);
        }
        if(num == 1){
            cc.audioEngine.playMusic(this.bgm_summer, true);
        }
        if(num == 2){
            cc.audioEngine.playMusic(this.bgm_fall, true);
        }
        if(num == 3){
            cc.audioEngine.playMusic(this.bgm_winter, true);
        }
    }
}
