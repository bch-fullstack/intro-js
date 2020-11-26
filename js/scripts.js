(function ($) {
    /**
     * DOM Manipulation
     * 
     * $ or jQuery or window.jQuery
     * 
     * document.getElementById('someID') => $('#someID')
     * document.getElementsByClassName('someClass') => $('.someClass')
     * document.getElementsByTagName('someTag') => $('someTag')
     * document.createElement('div').innerText = 'test';  => el = $('<div>test</div>')
     * 
     * document.querySelectorAll('#someID .someClass someTag') => $('#someID .someClass someTag')
     */

    var registeredUsers = ['hoang', 'Ronald', 'Tarjamo', 'user1']; // this array stores valid usernames until the next pageload

    function validateForm(e) {
        e.preventDefault(); // stop the submit button from refreshing the page
        console.log('validating....');

        console.log('user name: ' + validateUsername());
        console.log('email: ' + validateEmail());
        console.log('password: ' + validatePassword());

        if (validateUsername() && validateEmail() && validatePassword()) { // true && true & true
            var _newUser = getUserName();   // undefined 
            // 1. add code to update registeredUsers array with new user 
            registeredUsers.push(_newUser);

            if (registeredUsers.length > 5) {
                registeredUsers.shift();
            }

            // 2. call render function
            $('#registered-users').empty();
            renderRegisteredUsers();

            document.registration.reset(); // reset form input fields
        }
    }

    function renderRegisteredUsers() {
        // $.each(registeredUsers, function(registeredUser){
        //     $('<li>' + registeredUser + '</li>').appendTo('#registered-users')
        // var _newUser = document.createElement('li'); 
        // _newUser.innerHTML = registeredUser;
        // document.getElementById('registered-users').appendChild(_newUser);
        // })

        registeredUsers.forEach(function (registeredUser) {
            $('<li>' + registeredUser + '</li>').appendTo('#registered-users')
            // var _newUser = document.createElement('li'); 
            // _newUser.innerHTML = registeredUser;
            // document.getElementById('registered-users').appendChild(_newUser);
        });
    }

    /**
     * this function supposely validates submitted username
     * @returns [Boolean] true when valid, false otherwise
     */
    function validateUsername() {
        var _userName = getUserName();

        return !checkSpace(_userName);
    }

    /**
     * this function supposely validates submitted email
     * @returns [Boolean] true when valid, false otherwise
     */
    function validateEmail() {
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
    }

    /**
     * this function supposely validates submitted password
     * if password and confirmPassword do not match, return false 
     * 
     * @returns [Boolean] true when valid, false otherwise
     */
    function validatePassword() {
        var _password = getPassword();
        var _confirmPassword = getConfirmPassword();

        if (_password !== _confirmPassword) {
            return false;
        }

        return true;
    }

    /**
     * this function supposely checks whether the sample is an empty string
     * or there is space within it
     * @param [String] sample text to be evaluated
     * @returns [Boolean] true when valid, false otherwise
     */
    function checkSpace(sample) {
        return sample === '' || sample.indexOf(' ') > -1;
    }

    /**
     * this function looks under the form with name "registration"
     * look under the "username" input field and returns the value of it
     * returns nothing if no value is found
     * 
     * @returns [String] user input or an empty string
     */
    function getUserName() {
        // if (typeof(document.registration.username) === 'undefined') {
        //     return '';
        // } else {
        //     return document.registration.username.value;
        // }   

        return $('[name="username"]').val();
    }

    /**
     * this function looks under the form with name "registration"
     * look under the "email" input field and returns the value of it
     * returns nothing if no value is found
     * 
     * @returns [String] user input or an empty string
     */
    function getEmail() {
        // if (typeof(document.registration.email) === 'undefined') {
        //     return '';
        // } else {
        //     return document.registration.email.value;
        // }   
        return $('[name="email"]').val();
    }

    /**
     * this function looks under the form with name "registration"
     * look under the "password" input field and returns the value of it
     * returns nothing if no value is found
     * 
     * @returns [String] user input or an empty string
     */
    function getPassword() {
        // if (typeof(document.registration.password) === 'undefined') {
        //     return ''; // empty string
        // } else {
        //     return document.registration.password.value;
        // }  
        return $('[name="password"]').val();
    }

    /**
     * this function looks under the form with name "registration"
     * look under the "password_confirm" input field and returns the value of it
     * returns nothing if no value is found
     * 
     * @returns [String] user input or an empty string
     */
    function getConfirmPassword() {
        // if (typeof(document.registration.password_confirm) === 'undefined') {
        //     return ''; // empty string
        // } else {
        //     return document.registration.password_confirm.value;
        // } 
        return $('[name="password_confirm"]').val();
    }

    var sliderEl = document.createElement('section');
    sliderEl.classList.add('lazy', 'slider');
    sliderEl.setAttribute('data-sizes', '50vw');
    document.body.appendChild(sliderEl);

    function addSlide(imgUrl='http://placehold.it/650x300?text=1-650w'){
        // if(typeof(imgUrl) === 'undefined') {
        //     imgUrl = 'http://placehold.it/650x300?text=1-650w';
        // }

        var slide = document.createElement('div');
        var slideImage = document.createElement('img');
        slideImage.setAttribute('data-lazy', imgUrl);
        slideImage.setAttribute('data-srcset', imgUrl);
        slideImage.setAttribute('data-sizes', '100vw');
        slide.appendChild(slideImage);

        sliderEl.appendChild(slide);
    }
})(window.jQuery)

