const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const formData = require('./schema/schema')


// const router = require('./routes/router')


const app = express();
dotenv.config();

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const port = process.env.PORT || 3001

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.qk874z8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(()=>{
    console.log('Database Connected Succesfully')
    app.listen(port, ()=>{
        console.log(`server is running on the port ${port}`)
    })
})
.catch((error) => {
    console.log('error')
})

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/pages/index.html");
})

app.post('/register', async (req, res) => {
    try {
        const {name, email, password} = req.body;

        const existingUser = await registrationData.findOne({email: email});
        if(!existingUser) {
        
        
        const registrationData = new formData({
            name,
            email,
            password
        });
        await registrationData.save();
        res.redirect("/success");
    } else {
        console.log("User already exits");
    }
    res.redirect("/error"); 
    } catch(error){
        console.log(error);
        res.redirect("error")
    }
})

app.get('/success', (req, res) => {
    res.sendFile(__dirname+"/pages/success.html");
})

app.get('/error', (req, res) => {
    res.sendFile(__dirname+"/pages/error.html");
})