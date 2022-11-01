console.log("Hello!");

    var isPressEqual = false; //記錄是否按下等於
    var isPressDot = false; //紀錄是否按下小數點
    var isZero = true; //紀錄上個數字是否為零
    var newNum = true; //紀錄是否為新數字開始
    
    function connectionDigital(num) {
        var txt = document.getElementById('screen');
        
        if(newNum && isZero){
            if(txt.value=='0') txt.value = '';
            else if(num=='0') return false;
            else if(num=='.'){
                newNum = false;
                isZero = false;
            }
            else backspace();            
        }

        if (isPressEqual) {
            txt.value = '';
            isPressEqual = false;
            isPressDot = false;
            isZero = false;
            newNum = true;
        }
 
        if(num=='.' && isPressDot)
            return false;
        else if(num=='.' && !isPressDot)
            isPressDot = true;

        if(newNum && num=='0') isZero = true;
        else if(num!='0') newNum = false;

        txt.value += num;
    }

    function backspace() {
        var txt = document.getElementById('screen');

        if(txt.value == 'error' || txt.value.length == 1)
            clearAll();
        else
            txt.value = txt.value.substring(0, txt.value.length - 1);
    }

    function clearAll() {
        document.getElementById('screen').value = '0';
        isPressEqual = false;
        isPressDot = false;
        isZero = true;
        newNum = true;
    }

    function calculation(control) {
        var txt = document.getElementById('screen');        
        txt.value += control;
        isPressEqual = false;
        isPressDot = false;
        isZero = false;
        newNum = true;
    }

    function getResult() {
        var txt = document.getElementById('screen');

        try {
            txt.value = eval(txt.value);
        }
        catch (e) {
            txt.value = 'error';
        }
        
        isPressEqual = true;
        isPressDot = false;
        isZero = false;
        newNum = false;
    }

    function keydown(event) {
        if(event.key>='0' && event.key<='9' || event.key=='.')
            connectionDigital(event.key);
        else if(event.key=='+' || event.key=='-' || event.key=='*' || event.key=='/' || event.key=='(' || event.key==')')
            calculation(event.key);
        else if(event.key=='Backspace')
            backspace();
        else if(event.key=='c')
            clearAll();
        else if(event.key=='=')
            getResult();
    }