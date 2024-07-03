const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGOOSEURL,{
    dbName: process.env.DBNAME
}).then(()=>{
    console.log('Database connected Successfully');
}).catch((error)=>{
    console.log('Error with connecting database: ', error);
})