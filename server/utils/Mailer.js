const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const {OAuth2} = google.auth

const {CLIENT_ID,CLIENT_SECRECT,WEB_EMAIL,REFRESH_TOKEN,BASE_URL} = process.env

const OAuth2Link  = "https://developers.google.com/oauthplayground"

const auth = new OAuth2(CLIENT_ID,CLIENT_SECRECT,OAuth2Link);


exports.sendVerficationLink = (email,name,link) => {
    auth.setCredentials({
        refresh_token : REFRESH_TOKEN,
    })   

    const accessToken = auth.getAccessToken();
    const smtp = nodemailer.createTransport({
        service : "gmail",
        auth : {
            type : "OAuth2",
            user : WEB_EMAIL,
            clientId : CLIENT_ID,
            clientSecret : CLIENT_SECRECT,
            refreshToken : REFRESH_TOKEN,
            accessToken
        }
    })

    const mailOptions = {
        from : WEB_EMAIL,
        to : email,
        subject : 'Rozgaar.com email verification link.',
        html : `<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Document</title> <style> @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600&display=swap'); *{ margin: 0; padding: 0; box-sizing: border-box; font-family: 'Plus Jakarta Sans', sans-serif; } a{ text-decoration: none; } .container{ width: 100%; height: 90vh; display: flex; justify-content: center; padding: 40px; align-items: center; background: #eee; } .contentDiv{ background: #fff; height: auto !important; width: 60%; padding: 40px; margin : 0 auto; position: relative; } .logo{ height: 50px; } .mailTitle{ font-size: 22px; margin: 30px 0; margin-bottom: 40px; font-weight: 500; } .mailDescription{ font-size: 18px; font-weight: 300; letter-spacing: 0.5px; margin-bottom: 20px; } .btn{ text-decoration: none; padding: 10px 30px; background: #8a55f4; border-radius: 30px; display: inline-block; margin-bottom: 20px; color: #fff; } .mailDescription.active{ margin-top: 40px; font-size: 16px; line-height: 22px; font-weight: 400; } .mailDescription.active a{ color: #8a55f4; } .copyright{ position: absolute; left:50%; transform : translate(-50%); top:95%; text-align: center; font-size: 12px; color: #ccc; letter-spacing: 0.05px; } </style> </head> <body> <div class="container"> <div class="contentDiv"> <img src="https://res.cloudinary.com/dmmf19y1p/image/upload/v1667462898/logo_w5vrs3.png" alt="web logo" class="logo"> <h1 class="mailTitle">Verify your email address to activate your account.</h1> <p class="mailDescription">Hi ${name},</p> <p class="mailDescription">Thanks for your interest in joining Rozgaar.com! To complete your registration, we need you to verify your email address.</p> <a href=${link}><div class="btn">Verification Link</div></a> <p class="mailDescription">Please note that verification link will be valid for only 2hr. Make sure to verify your email before 2hr.</p> <p class="mailDescription active">Thanks for your time,<br>The <a href=${BASE_URL} target="_blank">Rozgaar.com</a> Team.</p> <p class="copyright">Copyright © Rozgaar.com 2022 | All rights reserved.</p> </div> </div> </body> </html>`
    }

    smtp.sendMail(mailOptions,(err, res) => {
        if (err){
            console.log(err);
            return err
        }

        return res
    })
}