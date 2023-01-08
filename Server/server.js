require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const companyRoute = require('./Routes/companyRoutes')
const userRoute = require('./Routes/userRoute')

//Create an Express App
const app = express();

app.use(cors())

//MiddleWare
app.use(express.json());

app.use((req, resp, next) => {
    console.log(req.path, req.method);
    next();
});

app.use('/api/company', companyRoute)
app.use('/api', userRoute)

mongoose.set('strictQuery', true);
const MONGO_URL = 'mongodb+srv://' + process.env.MONGO_USERNAME + ':' + process.env.MONGO_PASSWORD + process.env.MONGO_APP +'.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(MONGO_URL)
.then(()=> {
    //Listen for Request
    app.listen(process.env.PORT, () => {
        console.log("Connected to the DB and Listening on port", process.env.PORT);
    });
})
.catch((err)=>{
    //Log the error if connection failed
    console.log(err);
})
