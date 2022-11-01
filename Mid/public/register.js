function initApp() {
    var txtEmail = document.getElementById('email');
    var txtPassword = document.getElementById('password');
    var btnSignUp = document.getElementById('signup');

    btnSignUp.addEventListener('click', function() {
        var email = txtEmail.value;
        var password = txtPassword.value;

        firebase.auth().createUserWithEmailAndPassword(email,password).then(function (result) {
            window.location.href='lobby.html';
        })
        .catch(function(error) { 
            alert(error.message);
        });
        txtEmail.value='';
        txtPassword.value='';
    });
}

window.onload = function() {
    initApp();
};