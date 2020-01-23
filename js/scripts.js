var registeredUsers = []; // this array stores valid usernames until the next pageload

function validateForm(e) {
  e.preventDefault(); // stop the submit button from refreshing the page
  console.log("validating....");

  console.log("user name: " + validateUsername());
  console.log("email: " + validateEmail());
  console.log("password: " + validatePassword());
  console.log();

  if (validateUsername() && validateEmail() && validatePassword()) {
    var newUser = getUserName();
    registeredUsers.push(newUser);
    if (registeredUsers.length > 5) {
      registeredUsers.shift();
    }
    renderRegisteredUsers();
    alert("new user: " + registeredUsers);

    document.registration.reset(); // reset form input fields
  }
}

function renderRegisteredUsers() {
  registeredUsers.forEach(function(registeredUser) {
    var newUser = document.createElement("li");
    newUser.innerHTML = registeredUser;
    document.getElementById("registered-users").appendChild(newUser);
  });
}

/**
 * this function supposely validates submitted username
 * @returns [Boolean] true when valid, false otherwise
 */
function validateUsername() {
  var username = getUserName();

  return !checkSpace(username);
}

/**
 * this function supposely validates submitted email
 * @returns [Boolean] true when valid, false otherwise
 */
function validateEmail() {
  var email = getEmail();

  if (checkSpace(email) === true) {
    return false;
  }

  // check for @
  var atSymbol = email.indexOf("@");
  if (atSymbol < 1) {
    return false;
  }

  // check if there is a dot located less than 2 symbols away from the @ sign
  var dot = email.indexOf(".");
  if (dot >= atSymbol + 2) {
    return false;
  }

  // check that the dot is not at the end
  if (dot === email.length - 1) {
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
  var password = getPassword();
  var confirmPassword = getConfirmPassword();

  if (password !== confirmPassword) {
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
  return sample === "" || sample.indexOf(" ") > -1;
}

/**
 * this function looks under the form with name "registration"
 * look under the "username" input field and returns the value of it
 * returns nothing if no value is found
 *
 * @returns [Boolean] true when valid, false otherwise
 */
function getUserName() {
  if (typeof document.registration.username.value === "undefined") {
    return "";
  } else {
    return document.registration.username.value;
  }
}

function getEmail() {
  if (typeof document.registration.email.value === "undefined") {
    return "";
  } else {
    return document.registration.email.value;
  }
}

function getPassword() {
  if (typeof document.registration.password.value === "undefined") {
    return "";
  } else {
    return document.registration.password.value;
  }
}

function getConfirmPassword() {
  if (typeof document.registration.password.value === "undefined") {
    return "";
  } else {
    return document.registration.confirmPassword.value;
  }
}
