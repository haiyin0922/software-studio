# Software Studio 2020 Spring Assignment 2

## Basic Components
|Component|Score|Y/N|
|:-:|:-:|:-:|
|Membership Mechanism|10%|Y|
|Complete Game Process|5%|Y|
|Basic Rules|45%|Y|
|Animations|10%|Y|
|Sound Effects|10%|Y|
|UI|10%|Y|

## Website Detail Description

# Basic Components Description : 
1. World map : 分為Easy和Normal兩個關卡，camera的位置會隨player的位置移動。所有看起來像地面的東西或是方塊，都是可以踩在上面的，Normal關卡多加了水，掉下去會死掉。然後花朵只會擋住enemy，其他都可以穿過它。

2. Player : 用左右鍵移動，空白鍵跳躍。player碰到enemy後的一秒內為super狀態，所有的enemy和mushroom都不會與player發生碰撞，1秒後恢復正常。

3. Enemies : 有turtle和goomba兩種。從正上方踩到走路turtle，就會變成靜止龜殼，再碰它一下，就會變成滑行龜殼，可以用來擊退goomba。但player若不是從正上方碰到走路turtle，或是碰到了滑行龜殼狀態的turtle，就會由大隻變小隻，或小隻會死掉。player從正上方踩到goomba可以讓它死掉，但若非從正上方碰到它，player一樣會由大隻變小隻，或小隻會死掉。

4. Question Blocks : 從下方碰撞會彈出mushroom或coin。如果人物是小隻的狀態下，吃到mushroom可以變大隻。block的上方可以踩，跟一般的地面一樣。

5. Animations : player走路(大小隻)、player跳躍(大小隻)、player死掉(小隻)、turtle走路、turtle變成殼、turtle殼滑行、goomba走路、goomna死掉、coin消失閃光、game start中間馬力歐動畫。

6. Sound effects : Menu背景音樂、Easy關卡背景音樂、Normal關卡背景音樂、game over音效、過關音效、player跳躍音效、player變大變小音效、player吃香菇音效、player死掉音效、player踢龜殼音效、enemy死掉音效、mushroom出現音效、coin音效。

7. UI : 登入畫面: login(google第三方登入) 
選單畫面: (1)玩家名稱 (2)累積coin (3)剩餘life (4)累積score (5)關卡選擇
遊戲畫面: (1)world1/2 (2)剩餘life (3)剩餘time (4)累積coin (5)累積score
遊戲畫面中的玩家life、coin、score，都會與firebase立即同步更新。
(初始值為5條命，coin、score皆為0。)

8. coin與score計算方式 :　擊退enemy score+100、獲得coin coin+100、吃到mushroom score+1000、過關後(player碰到flag) score+剩餘time*10