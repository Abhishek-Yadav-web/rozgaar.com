const mongoose = require('mongoose');

const userSchema =  mongoose.Schema({
    accountType: String,
    firstName:{
        type: String,
        required : [true, 'FirstName is required.'],
        trim : true,
        text : true
    },
    lastName:{
        type: String,
        required : [true, 'LastName is required.'],
        trim : true,
        text : true
    },
    email:{
        type: String,
        required : [true, 'email is required.'],
        trim : true,
    },
    password:{
        type : String,
        required : [true, 'Password is required.'],
        minLength : [8,'password should be at least 8 characters']
    },
    profilePic : {
        type : String,
        trim : true,
        default : "https://res.cloudinary.com/dmmf19y1p/image/upload/v1667246177/based/user_qqg00d.png"
    },
    gender : {
        type : String,
        required : [true, 'gender is required.'],
    },
    mobile : {
        mCode : {
            type : String,
            required : true,
            default : "+91"
        },
        mNumber : {
            type : Number,
            required : [true, 'Number is required.'],
        }
    },
    resumeInfo : {
        profileTitle : {
            type : String,
        },
        profileDescription : {
            type : String,
        },
        location : {
            country : {
                type : String,
            },
            state : {
                type : String,
            },
            city : {
                type : String,
            },
            address : {
                type : String,
            }
        },
        hourInWeek : {
            type : Number,
            minLength : [10, 'hours should be at least 10 hours.'],
        },
        languages : [
            {
                name : {
                    type : String,
                    trim : true
                },
                level : {
                    type : String,
                    trim : true
                }
            }
        ],
        education : [
            {
                collegeName : {
                    type : String,
                },
                description : {
                    type : String,
                }
            }
        ],
        employmentHistory : [
            {
                cName : {
                    type : String,
                },
                description : {
                    type : String,
                },
                joinDate : {
                    type : Date,
                },
                endDate : {
                    type : Date,
                }
            }
        ],
        friends : {
            type : Array,
            default : []
        },
        following : {
            type : Array,
            default : []
        },
        follower : {
            type : Array,
            default : []
        },
        request : {
            type : Array,
            default : [] 
        },
    }
})


module.exports =  mongoose.model('User', userSchema)