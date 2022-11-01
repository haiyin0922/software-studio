function initApp() {
    var txtEmail = document.getElementById('email');
    var txtPassword = document.getElementById('password');
    var btnSignin = document.getElementById('signin');
    var btnGoogle = document.getElementById('google');

    btnSignin.addEventListener('click', function() {
        var email = txtEmail.value;
        var password = txtPassword.value;

        firebase.auth().signInWithEmailAndPassword(email, password).then(function (result) {
            window.location.href='lobby.html';
        })
        .catch(function(error) { 
            alert(error.message);
            txtEmail.value='';
            txtPassword.value='';
        });
    });

    btnGoogle.addEventListener('click', function() {
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;
            window.location.href='lobby.html';
        })
        .catch(function(error) {
            alert(error.message);
        });
    });
}

window.onload = function() {
    initApp();
};