# Software Studio 2020 Spring Midterm Project

## Topic
* Project Name : midterm-project
* Key functions (add/delete)
    1. Lobby是公開聊天室，所有人都可以傳送訊息
    2. My rooms是私人聊天室，裡面會顯示你所在的所有聊天室
    3. Create可以建立新聊天室，點擊聊天室名稱即可進入
    4. 在聊天室右上輸入框，輸入對方E-mail即可將他加入聊天室
    
* Other functions (add/delete)
    1. 可以使用E-mail或是google登入
    2. 網頁開啟時會有加入房間以及Lobby新訊息推播通知
    3. 聊天室首頁問候語css打字動畫
    4. 訊息內容及房間名稱使用html encode

## Basic Components
|Component|Score|Y/N|
|:-:|:-:|:-:|
|Membership Mechanism|15%|Y|
|Firebase Page|5%|Y|
|Database|15%|Y|
|RWD|15%|Y|
|Topic Key Function|20%|Y|

## Advanced Components
|Component|Score|Y/N|
|:-:|:-:|:-:|
|Third-Party Sign In|2.5%|Y|
|Chrome Notification|5%|Y|
|Use CSS Animation|2.5%|Y|
|Security Report|5%|N|

## Website Detail Description
1. 私人聊天室名稱不可重複，以及含有非法字元，字數限制10
2. 公開聊天室勾選匿名，在本地端看到的還是Me，但別人看到的會是匿名
3. 其他人的對話框靠左、藍色，自己的對話框靠右、白色

## 作品網址：https://midterm-project0420.web.app/

# Components Description : 
1. Membership Mechanism : 可以使用E-mail註冊以及登入
2. Host on your Firebase page : use firebase deploy
3. Database read/write : 將read/write rules都設為"auth.uid != null"
4. RWD：網頁比例會隨著視窗大小調整，不會產生物件重疊難以使用的問題
5. Chat room : 私人聊天室，可以傳送訊息、瀏覽歷史訊息
6. Sign Up/In with Google or other third-party accounts : 可以使用google登入
7. Add Chrome notification : 加入新房間、Lobby有新訊息，都會有推播通知
8. Use CSS animation : 一進到聊天室頁面的問候語，使用css動畫做出打字效果
9. Deal with messages when sending html code : 使用html encode

# Other Functions Description : 
1. Lobby : 所有人都可以傳訊息的公開聊天室
2. 匿名 : 在Lobby可以選擇是否匿名傳送訊息
3. 選單收放 : 左邊的list可點擊箭頭收放
4. 未登入 : 未登入會被強迫跳轉至登入頁面

