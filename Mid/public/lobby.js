function init() {
    if (Notification.permission === 'default' || Notification.permission === 'undefined') {
        Notification.requestPermission();
    }
    
    var HtmlUtil = {
        htmlEncodeByRegExp:function (str){  
             var s = "";
             if(str.length == 0) return "";
             s = str.replace(/&/g,"&amp;");
             s = s.replace(/</g,"&lt;");
             s = s.replace(/>/g,"&gt;");
             s = s.replace(/ /g,"&nbsp;");
             s = s.replace(/\'/g,"&#39;");
             s = s.replace(/\"/g,"&quot;");
             return s;  
       }
    };

    var user_email = '';
    firebase.auth().onAuthStateChanged(function(user) {
        var hello = document.getElementById('list-hello-list');
        var btnLogout = document.getElementById('list-logout-list');

        if (user) {
            user_email = user.email;
            hello.innerHTML = "Hello!" + "<br>" + user.email;

            var cleanEmail = user_email.replace(/\./g, ',');

            firebase.database().ref('email_list/' + cleanEmail).set({
                signin: 'ok'
            });

            btnLogout.addEventListener('click', function() {
                firebase.auth().signOut().then(function(){
                    alert("Success!");
                    window.location.href='index.html';
                })
                .catch(function(e){
                    alert("Error!");
                });
            });
        } else {
            window.location.href='index.html';
        }
    });

    var btnClose = document.getElementById('list-close-list');
    var list = document.getElementById('list-tab');
    
    btnClose.addEventListener('click', function() {
        if(btnClose.innerText=="↪"){
            list.style="visibility:visible";
            btnClose.innerText="↩"
        }
        else{
            list.style = "visibility:hidden";
            btnClose.style = "visibility:visible";
            btnClose.innerText="↪";
        }
    });

    var post_btn = document.getElementById('post_btn');
    var post_txt = document.getElementById('comment');
    var anoymous = document.getElementById('anonymous');
    var cleanEmail = user_email.replace(/\./g, ',');

    post_btn.addEventListener('click', function() {
        var cleanEmail = user_email.replace(/\./g, ',');
        if (post_txt.value != "") {
            if(anoymous.checked){
                firebase.database().ref('com_list').push({
                    name: '匿名',
                    email: user_email,
                    data: post_txt.value
                });
            }
            else{
                firebase.database().ref('com_list').push({
                    name: user_email,
                    email: user_email,
                    data: post_txt.value
                });
            }
            post_txt.value = '';
        }
    });

    var postsRef = firebase.database().ref('com_list');
    var total_post = [];
    var newpostNotify = {
        body: 'Lobby有新訊息 ε٩(๑> ₃ <)۶з',
        icon: '/img/mail.png'
    };

    postsRef.once('value')
        .then(function(snapshot) {
            var post_num = 0;
            var post_cnt = 0;
            document.getElementById('post_list').innerHTML = total_post.join('');
            post_num = snapshot.numChildren();
            console.log("There are "+post_num+" posts");

            postsRef.on('child_added', function(data) {
                post_cnt++;
                
                var childData = data.val();
                var str_before_username;
                var str_after_content = "</p></div></div>\n";

                var encodeHTML = HtmlUtil.htmlEncodeByRegExp(childData.data);

                if (childData.email==user_email) str_before_username = "<div class='me'>" + "<strong style='color: gray'>Me</strong>";
                else{
                    str_before_username = "<div class='others'>" + "<strong style='color: gray'>" + childData.name + "</strong>";
                    if (Notification.permission === 'granted' && post_cnt>post_num) {
                        var notification = new Notification('Hello!!', newpostNotify);
                    }
                }

                total_post[total_post.length] =  str_before_username + "<br>" + encodeHTML + str_after_content;
                document.getElementById('post_list').innerHTML = total_post.join('');
            });
        })
        .catch(e => console.log(e.message));

   var roomRef = firebase.database().ref('user_list/');
   var newroom =  document.getElementById('newroom');
   var roomlist = document.getElementById('list-tab2');
   var btnSubmit = document.getElementById('button_submit');
   var btnCreate = document.getElementById('button_create');
   var adduser =  document.getElementById('adduser');
   var total_room = [];
    
   btnSubmit.addEventListener('click', function() {   
        var cleanEmail = adduser.value.replace(/\./g, ',');

        firebase.database().ref('email_list/').child(cleanEmail).once('value', function(snapshot) {
            if (!snapshot.exists()) {
                alert('This username does not exist!');
            }
            else{
                firebase.database().ref('user_list/' + cleanEmail).child(current_room).once('value', function(snapshot) {
                    if (snapshot.exists()) {
                        alert('The user has already in this room!');
                    }
                    else{
                        alert('Success!');
                        firebase.database().ref('user_list/' + cleanEmail + '/' + current_room).push({
                            room: 'success!'
                        });
                        firebase.database().ref('user_list/' + cleanEmail + '/room_list').push({
                            room: current_room
                        });
        
                    }
                });
            }
        adduser.value = '';
        });
    });

    btnCreate.addEventListener('click', function() {
        var cleanEmail = user_email.replace(/\./g, ',');

        firebase.database().ref('room_list').child(newroom.value).once('value', function(snapshot) {
            if (snapshot.exists()) {
                alert('This name has already been used!');
            }
            else if (newroom.value != "") {
                firebase.database().ref('user_list/' + cleanEmail + '/' + newroom.value).push({
                    room: newroom.value
                });
                firebase.database().ref('user_list/' + cleanEmail + '/room_list').push({
                    room: newroom.value
                });
                firebase.database().ref('room_list/' + newroom.value).push({
                    room: 'success!'
                });
           }
           newroom.value = '';
        });
    });


    var newroomNotify = {
        body: '你加入了一個新房間 ✧*｡٩(ˊᗜˋ*)و✧*｡',
        icon: '/img/heart.png'
    };

    roomRef.once('value')
        .then(function(snapshot) {
            var room_cnt = 0;
            var room_num = 0;
            var cleanEmail = user_email.replace(/\./g, ',');
            var roomRef = firebase.database().ref('user_list/'+ cleanEmail + '/room_list');            
            roomlist.innerHTML = total_room.join('');

            roomRef.once("value", function(snapshot) {
                room_num = snapshot.numChildren();
                console.log("There are "+room_num+" rooms");

                roomRef.on('child_added', function(data) {
                    room_cnt++;
    
                    var childData = data.val();
        
                    var encodeHTML = HtmlUtil.htmlEncodeByRegExp(childData.room);
        
                    total_room[total_room.length] =  "<button type='button' class='tn btn-secondary' id=" + encodeHTML + " onclick='chat(this.id)'>" + encodeHTML + "</button>";
                    roomlist.innerHTML = total_room.join('');
                    
                    if (Notification.permission === 'granted' && room_cnt>room_num) {
                         var notification = new Notification('Hey!!', newroomNotify);
                    }
                });
            })
        })
        .catch(e => console.log(e.message));
    
    var post_btn2 = document.getElementById('post_btn2');
    var post_txt2 = document.getElementById('comment2');

    post_btn2.addEventListener('click', function() {
        var cleanEmail = user_email.replace(/\./g, ',');

        if (post_txt2.value != "") {
            firebase.database().ref('room_list/' + current_room + '/com_list').push({
                email: user_email,
                data: post_txt2.value
            });
        }
        post_txt2.value = '';
    });
}

function chat(roomname){
    var add = document.getElementById('add');
    add.style = "visibility:visible";
    current_room = roomname;

    var user_email = '';
    
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            user_email = user.email;
        } else {
            window.location.href='index.html';
        }
    });

    var postsRef = firebase.database().ref('room_list/' + roomname + '/com_list');
    var total_post = [];

    var HtmlUtil = {
        htmlEncodeByRegExp:function (str){  
             var s = "";
             if(str.length == 0) return "";
             s = str.replace(/&/g,"&amp;");
             s = s.replace(/</g,"&lt;");
             s = s.replace(/>/g,"&gt;");
             s = s.replace(/ /g,"&nbsp;");
             s = s.replace(/\'/g,"&#39;");
             s = s.replace(/\"/g,"&quot;");
             return s;  
       }
    };

    postsRef.once('value')
        .then(function(snapshot) {
            document.getElementById('post_list2').innerHTML = total_post.join('');

            postsRef.on('child_added', function(data) {
                var childData = data.val();
                var str_before_username;
                var str_after_content = "</p></div></div>\n";

                var encodeHTML = HtmlUtil.htmlEncodeByRegExp(childData.data);

                if (childData.email==user_email) str_before_username = "<div class='me'>" + "<strong style='color: gray'>Me</strong>";
                else str_before_username = "<div class='others'>" + "<strong style='color: gray'>" + childData.email + "</strong>";

                total_post[total_post.length] =  str_before_username + "<br>" + encodeHTML + str_after_content;
                document.getElementById('post_list2').innerHTML = total_post.join('');
            });


        })
        .catch(e => console.log(e.message));
}

window.onload = function() {
    var current_room = '';
    init();
}