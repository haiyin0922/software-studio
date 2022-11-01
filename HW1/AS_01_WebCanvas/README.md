# Software Studio 2020 Spring
## Assignment 01 Web Canvas


### Scoring

| **Basic components**                             | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Basic control tools                              | 30%       | Y         |
| Text input                                       | 10%       | Y         |
| Cursor icon                                      | 10%       | Y         |
| Refresh button                                   | 10%       | Y         |

| **Advanced tools**                               | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Different brush shapes                           | 15%       | Y         |
| Un/Re-do button                                  | 10%       | Y         |
| Image tool                                       | 5%        | Y         |
| Download                                         | 5%        | Y         |

| **Other useful widgets**                         | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Draw a straight line                             | 1~5%      | Y         |

---

### How to use 

![](https://i.imgur.com/Ka3Rh1Y.png)　**筆刷**　　　![](https://i.imgur.com/WBkS3AV.png)　**橡皮擦**　　　![](https://i.imgur.com/2uH1PFx.png)　**文字**
![](https://i.imgur.com/0MeQvaS.png)　**圓形**　　　![](https://i.imgur.com/ZGbJnxl.png)　**三角形**　　　![](https://i.imgur.com/Ejxy00M.png)　**矩形**
![](https://i.imgur.com/m7NR8Jq.png)　**直線**　　　![](https://i.imgur.com/f3TKCep.png)　**另存新檔**　　![](https://i.imgur.com/A3allYe.png)　**開啟舊檔**
![](https://i.imgur.com/8wXHR7r.png)　**REDO**　 　![](https://i.imgur.com/UFSaipM.png)　**UNDO**　　　![](https://i.imgur.com/jjQknO0.png)　**RESET**
<br>
* 筆刷、橡皮擦、圓形、三角形、矩形、直線的粗細，可以透過拉動木桌上的bar來調整
Bar：　![](https://i.imgur.com/aj3wQpv.png)
<br>
* 筆刷、文字、圓形、三角形、矩形、直線的顏色可以透過木桌上的list來調整
顏色List：　![](https://i.imgur.com/4tCplg2.png)
<br>
* 文字的字型、字體大小，可以透過木桌上的list來調整
字型、字體大小List：　![](https://i.imgur.com/VuFypjJ.png)
<br>
* 圓形、三角形、矩形的繪製皆為空心
* 輸入文字時，可以透過在畫布上點擊滑鼠或將游標離開畫布，來完成輸入
* 匯入圖片時，會將圖片的尺寸變更為等同畫布的尺寸
* 在畫布上作畫時，只要游標離開畫布範圍，便視為該動作已結束（等同於放開滑鼠）
* 按下RESET後，便無法透過UNDO回到RESET的上一步

---

### Function description

* function listner()
    * 用來監聽mouse的事件，包括mousedown, mousemove, moveup以及mouseleave
    並分為兩個不同畫布，一個為主要顯示canvas，另一個為暫存canvas，x, y則為游標位置
    * mousedown時，先判斷現在是哪個功能的變數為ture，便把它的ing也設為true
    * 實作橡皮擦時不能用clearRect()，不然會有一格一格不連續的感覺，要使用跟筆刷一樣的方式，只是將globalCompositeOperation改為destination-out
    * 而實作畫形狀，要把暫存canvas拉上來，先在上面畫，才不會出現閃爍的情況

* function {各種繪圖功能}Clicked()
    * 用來改變cursor，以及將自身功能的變數設為true，其餘設為false
 
* function downloadClicked()
    * 下載當前畫布上的圖片，並儲存為myCanvas.png

* function uploadClicked()
    * 上傳本地圖片至畫布，並將尺寸符合畫布

* function {undo/redo}Clicked()
    * 將畫布回到上一步/下一步
    * 實作方式是把push()所儲存的圖片，透過step加減顯示出來

* function resetClicked() 
    * 將畫布內容清空，並且無法使用UNDO來復原

* function push()
    * 用來儲存當前畫布上的圖片，供REDO, UNDO使用

* function inputText()
    * 讓使用者在文字框輸入內容

* function {各種繪圖功能}()
    * 使用canvas的內建函數實作各種繪圖功能，並呈現在畫布上

* function temp{畫形狀功能}()
    * 先以destination-atop的方式畫在暫存canvas，才不會出現連續多個形狀
    * 完成後再改以source-over的方式，畫到主要顯示的canvas上

---

### Gitlab page link

[https://105072123.gitlab.io/AS_01_WebCanvas](https://105072123.gitlab.io/AS_01_WebCanvas)

<style>
table th{
    width: 100%;
}
</style>
