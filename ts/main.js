(function () {
    var registeredUsers = []; // this array stores valid usernames until the next pageload
    registeredUsers.push('hoang', 'Ronald', 'Tarjamo', 'user1');
    var checkSpace = function (sample) {
        return sample === '' || sample.indexOf(' ') > -1;
    };
    var getUserName = function () {
        var inputField = document.querySelector('input[name="username"]');
        return inputField.value;
    };
    var getEmail = function () {
        var inputField = document.querySelector('input[name="email"]');
        return inputField.value;
    };
    var getPassword = function () {
        var inputField = document.querySelector('input[name="password"]');
        return inputField.value;
    };
    var getConfirmPassword = function () {
        var inputField = document.querySelector('input[name="password_confirm"]');
        return inputField.value;
    };
    var validateUsername = function () {
        var _userName = getUserName();
        return !checkSpace(_userName);
    };
    var validateEmail = function () {
        var _email = getEmail();
        if (checkSpace(_email) === true) {
            return false;
        }
        // check for @
        var atSymbol = _email.indexOf('@');
        if (atSymbol < 1) {
            return false;
        }
        // check if there is a dot located less than 2 symbols away from the @ sign
        var dot = _email.indexOf('.');
        if (dot <= atSymbol + 2) {
            return false;
        }
        // check that the dot is not at the end
        if (dot === _email.length - 1) {
            return false;
        }
        return true;
    };
    var validatePassword = function () {
        var _password = getPassword();
        var _confirmPassword = getConfirmPassword();
        return _password !== _confirmPassword;
    };
    var renderRegisteredUsers = function () {
        registeredUsers.forEach(function (registeredUser) {
            // $('<li>' + registeredUser + '</li>').appendTo('#registered-users')
            var _newUser = document.createElement('li');
            _newUser.innerHTML = registeredUser;
            document.getElementById('registered-users').appendChild(_newUser);
        });
    };
    var validateForm = function (e) {
        e.preventDefault();
        console.log('validating....');
        console.log('user name: ' + validateUsername());
        console.log('email: ' + validateEmail());
        console.log('password: ' + validatePassword());
        if (validateUsername() && validateEmail() && validatePassword()) { // true && true & true
            var _newUser = getUserName(); // undefined 
            // 1. add code to update registeredUsers array with new user 
            registeredUsers.push(_newUser);
            if (registeredUsers.length > 5) {
                registeredUsers.shift();
            }
            // 2. call render function
            var userList = document.querySelector('ul#registered-users');
            userList.innerHTML = '';
            renderRegisteredUsers();
            var form = document.querySelector('form[name="registration"]');
            form.reset(); // reset form input fields
        }
    };
    var submitBtn = document.querySelector('button#register');
    submitBtn.addEventListener('click', validateForm);
})();
