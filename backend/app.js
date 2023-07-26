const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
//const config = require('config')
const app = express();

// importing routes
const trainRoutes = require('./Routes/TrainRoutes');

app.use(express.json());
app.use(helmet());
app.use(cors({origin:'*'}));


const mongoDBString = `mongodb://0.0.0.0:27017/trainReservation`;

mongoose.connect(mongoDBString,{
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>{console.log("connected to database!")}).catch((err)=>{console.log("error while connecting with db " + err)})

// using routes
app.use('/api/v1/trains',trainRoutes);

app.get('/api/v1/health',(req,res,next)=>{
    return res.status(200).json({
        success : true,
        message : "everything is working perfectly!"
    })
})


const port = process.env.PORT || 8000;

app.listen(port , ()=>{
    console.log("listening to port",port);
})
