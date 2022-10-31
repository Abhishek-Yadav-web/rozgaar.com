const express = require('express');
const router = express.Router();


router.get('/user',(req,res) => {
    res.status(200).json({
        sucess : true,
        message : "this is a new user"
    })
})


module.exports = router