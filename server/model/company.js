const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    accountType: String,
    company:{
        type: String,
        required : [true, 'FirstName is required.'],
        trim : true,
        text : true
    },
    workemail:{
        type: String,
        required : [true, 'email is required.'],
        trim : true,
    },
    password:{
        type : String,
        required : [true, 'Password is required.'],
        minLength : [8,'password should be at least 8 characters'],
        maxLength : [32, 'password should be at most 32 characters']
    },
    companyLogo : {
        type : String,
        trim : true,
        default : "https://res.cloudinary.com/dmmf19y1p/image/upload/v1667246177/based/user_qqg00d.png"
    },
    companyContact : {
        contactNumber : {
            mCode : {
                type : String,
                default : "+91"
            },
            mNumber : {
                type : Number,
                required : [true, 'Number is required.'],
            }
        },
        ownerName : {
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
        companyDetails : {
            website : {
                type : String,
            },
            industry : {
                type : String,
            },
            employeNumber : {
                type : String,
            },
            tagline : {
                type : String,
            },
            description : {
                type : String,
            },
            
        },
        follower : {
            type : Array,
            default : []
        },
        companyJobs : {
            type : Array,
            default : []
        },
        companyEmployee : {
            type : Array,
            default : []
        },
        jobRequest : {
            type : Array,
            default : []
        },
        timestamps : true
    }
})

module.exports = mongoose.Model('Company', userSchema)