const express = require('express');
const router = express.Router();


router.get('/company',(req,res) => {
    res.status(200).json({
        sucess : true,
        message : "this is a new company"
    })
})


module.exports = router