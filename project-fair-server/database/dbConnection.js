const mongoose = require('mongoose')

const connectionString = process.env.DBCONNECTIONSTRING

mongoose.connect(connectionString).then(res=>{
    console.log("MongoDB atlas connected successfully..");
    
}).catch(err=>{
    console.log('Mongodb atlas connection failed');
    console.log(err);
})