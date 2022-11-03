const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const {readdirSync} = require('fs');
const mongoose = require('mongoose');

// enviorment file configuration
require('dotenv').config();

// backend will run only given url
const corsOption = {
    origin : ["http://localhost:3000"],
    useSuccessStatus : 200,
}

// config code
app.use(cors(corsOption));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// config all router
readdirSync('./routes').map((fileName) => {
    const route = require(`./routes/${fileName}`)
    app.use('/api/v1',route)
})

// app home page
app.get('/', (req, res) => {
    //see in browser
    res.sendFile(path.join(__dirname+'/public/index.html'))
})


app.get('/email',(req,res) => {
    res.sendFile(path.join(__dirname+'/public/verification.html'))
})

// listen on port
const PORT = process.env.PORT || 8000;
app.listen(PORT,() => {
    console.log(`SERVER IS LISTENING ON ${PORT} 🚀.`);

    //connect to mongodb
    mongoose.connect(process.env.MONGODB_URI)
    .then((res) => {
        console.log(`MONGODB IS CONNECTED 🍁 : ${res.connection.host}`);
    })
    .catch((err) => {
        console.log(`Something went wrong : ${err}`);
    })
})