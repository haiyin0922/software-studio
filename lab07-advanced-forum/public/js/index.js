function init() {
    var user_email = '';
    firebase.auth().onAuthStateChanged(function(user) {
        var menu = document.getElementById('dynamic-menu');
        if (user) {
            user_email = user.email;
            menu.innerHTML = "<span class='dropdown-item'>" + user.email + "</span><span class='dropdown-item' id='logout-btn'>Logout</span>";
            var logout_button = document.getElementById('logout-btn');
            logout_button.addEventListener('click', function() {
                firebase.auth().signOut()
                    .then(function() {
                        alert('Sign Out!')
                    })
                    .catch(function(error) {
                        alert('Sign Out Error!')
                    });
            });
        } else {
            menu.innerHTML = "<a class='dropdown-item' href='signin.html'>Login</a>";
            document.getElementById('post_list').innerHTML = "";
        }
    });

    post_btn = document.getElementById('post_btn');
    post_txt = document.getElementById('comment');
    post_btn.addEventListener('click', function() {
        if (post_txt.value != "") {
            var newpostref = firebase.database().ref('com_list').push();
            newpostref.set({
                email: user_email,
                data: post_txt.value
            });
            post_txt.value = "";
        }
    });

    var str_before_username = "<div class='my-3 p-3 bg-white rounded box-shadow'><h6 class='border-bottom border-gray pb-2 mb-0'>Recent updates</h6><div class='media text-muted pt-3'><img src='img/test.svg' alt='' class='mr-2 rounded' style='height:32px; width:32px;'><p class='media-body pb-3 mb-0 small lh-125 border-bottom border-gray'><strong class='d-block text-gray-dark'>";

    var str_after_content = "</p></div></div>\n";


    var postsRef = firebase.database().ref('com_list');
    var total_post = [];
    var first_count = 0;
    var second_count = 0;

    postsRef.on('child_added', function(data) {
        second_count += 1;
        if (second_count > first_count) {
            var childData = data.val();
            total_post[total_post.length] = str_before_username + childData.email + "</strong>" + childData.data + str_after_content;
            document.getElementById('post_list').innerHTML = total_post.join('');
            first_count = total_post.length;
        }
    });
}

window.onload = function() {
    init();
}