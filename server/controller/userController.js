const User = require('../model/user');
const getNameCapitalize = require('../utils/getNameCapitalize');
const { validateEmail, validateLength, validatePassword } = require('../utils/validator');
const bcrypt = require('bcrypt');

//register user
exports.registerUser = async (req,res) => {
    try {
        let {firstName, lastName, email, password, gender, mobile} = req.body;

        // Validate email
        if(!validateEmail(email)){
            return res.status(400).json({
                success : false,
                error : `Invalid email`
            })
        }

        // validate first name and last name length
        if(!validateLength(firstName,3,30)){
            return res.status(400).json({
                success : false,
                error : `First Name should be at least 3 characters long and maxium 30 characters long`
            })
        }

        if(!validateLength(lastName,3,30)){
            return res.status(400).json({
                success : false,
                error : `Last Name should be at least 3 characters long and maxium 30 characters long`
            })
        }

        // validate password length
        if(!validatePassword(password,8,32)){
            return res.status(400).json({
                success : false,
                error : `Password should be at least 8 characters long and maxium 32 characters long`
            })
        }

        // find in database
        const findUser = await User.findOne({email});
        
        // if user already exists
        if(findUser){
            return res.status(400).json({
                success : false,
                error : `User ${findUser.email} already registered.`
            })
        }

        // convert password in hash format
        const hashPassword = await bcrypt.hash(password,12)

        // create new user
        const user = await new User({
            firstName : getNameCapitalize(firstName),
            lastName : getNameCapitalize(lastName),
            email,
            password : hashPassword,
            gender,
            mobile
        }).save();
        

        // if user created
        if(user){
            return res.status(200).json({
                success : true,
                message : `User created successfully`,
                user
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            error : `something went wrong : ${error}`
        })
    }
}
