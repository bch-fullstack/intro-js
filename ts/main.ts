(() => {
    let registeredUsers : string[] = []; // this array stores valid usernames until the next pageload
    registeredUsers.push('hoang', 'Ronald', 'Tarjamo', 'user1');

    const checkSpace = (sample: string) : boolean => {
        return sample === '' || sample.indexOf(' ') > -1;
    }

    const getUserName = () : string => {
        const inputField = document.querySelector('input[name="username"]') as HTMLInputElement;
        return inputField.value;
    }

    const getEmail = () : string => {
        const inputField = document.querySelector('input[name="email"]') as HTMLInputElement;
        return inputField.value;
    }

    const getPassword = () : string => {
        const inputField = document.querySelector('input[name="password"]') as HTMLInputElement;
        return inputField.value;
    }
    
    const getConfirmPassword = () : string => {
        const inputField = document.querySelector('input[name="password_confirm"]') as HTMLInputElement;
        return inputField.value;
    }

    const validateUsername = () : boolean => {
        const _userName = getUserName();

        return !checkSpace(_userName);
    }
    
    const validateEmail = () : boolean => {
        const _email : string = getEmail();

        if (checkSpace(_email) === true) {
            return false;
        }

        // check for @
        const atSymbol : number = _email.indexOf('@');
        if (atSymbol < 1) {
            return false;
        }

        // check if there is a dot located less than 2 symbols away from the @ sign
        const dot : number = _email.indexOf('.');
        if (dot <= atSymbol + 2) {
            return false;
        }

        // check that the dot is not at the end
        if (dot === _email.length - 1) {
            return false;
        }

        return true;
    }
    
    const validatePassword = () : boolean => {
        const _password : string = getPassword();
        const _confirmPassword : string = getConfirmPassword();

        return _password !== _confirmPassword;
    }

    const renderRegisteredUsers = () : void => {
        registeredUsers.forEach(function (registeredUser) {
            // $('<li>' + registeredUser + '</li>').appendTo('#registered-users')
            let _newUser : HTMLLIElement = document.createElement('li'); 
            _newUser.innerHTML = registeredUser;
            document.getElementById('registered-users').appendChild(_newUser);
        });
    }

    const validateForm = (e: Event) => {
        e.preventDefault();

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
            const userList = document.querySelector('ul#registered-users') as HTMLUListElement;
            userList.innerHTML = '';

            renderRegisteredUsers();

            const form = document.querySelector('form[name="registration"]') as HTMLFormElement;
            form.reset(); // reset form input fields
        }
    }

    const submitBtn = document.querySelector('button#register') as HTMLButtonElement;
    submitBtn.addEventListener('click', validateForm);
})();