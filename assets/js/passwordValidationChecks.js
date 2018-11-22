var emailField = $('#id_email');
var userField = $('#id_username');
var passwordField = $('#id_password1');
var password2Field = $('#id_password2');

var passHelpBlocks = passwordField.next().first().children().children();
var pass2HelpBlock = password2Field.next()[0];

var initialHelpColor = passHelpBlocks[0].style.color;
var passedValue = '#00960D';
var badValue = 'red';


console.log(pass2HelpBlock);

function passwordCheck() {
    if (passwordField.val() === '') {
        passHelpBlocks.each(function( i ) {
            this.style.color = initialHelpColor;
        });
    } else {
        if (
          emailField.val() !== ''
          && (passwordField.val().indexOf(emailField.val()) != -1 ||
           emailField.val().indexOf(passwordField.val()) != -1)
          || userField.val() !== ''
          && (passwordField.val().indexOf(userField.val()) != -1 ||
           userField.val().indexOf(passwordField.val()) != -1)
        ) {
            passHelpBlocks[0].style.color = badValue;
        } else if (emailField.val() !== '' || userField.val() !== '') {
            passHelpBlocks[0].style.color = passedValue;
        };

        if (passwordField.val().length < 8 ) {
            passHelpBlocks[1].style.color = badValue;
        } else {
            passHelpBlocks[1].style.color = passedValue;
        };

        if (/[a-zA-Z]/.test(passwordField.val()) === false) {
            passHelpBlocks[3].style.color = badValue;
        } else {
            passHelpBlocks[3].style.color = passedValue;
        };
    };
};

function password2Check() {
    if (password2Field.val() === '') {
        pass2HelpBlock.style.color = initialHelpColor;
    } else {
        if (passwordField.val() !== password2Field.val()) {
            pass2HelpBlock.style.color = badValue;
        } else {
            pass2HelpBlock.style.color = passedValue;
        }
    };
};

emailField.keyup(function() {
    passwordCheck();
});

userField.keyup(function() {
    passwordCheck();
});

passwordField.keyup(function() {
    passwordCheck();
    password2Check();
});

password2Field.keyup(function() {
    password2Check();
});