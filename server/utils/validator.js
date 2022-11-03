var passwordValidator = require('password-validator');

exports.validateEmail = (email) => {
    return String(email).toLowerCase().match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/)
}

exports.validateLength = (text,min,max) => {
    if(text.length <= min || text.length >= max) return false
    return true
}

exports.validatePassword = (password) => {
    var schema = new passwordValidator();

    schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(1)
    .has().symbols(1)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']);

    // check 
    return schema.validate(password,{details : true})
}
