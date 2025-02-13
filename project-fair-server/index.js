//steps to define express server
//Load .env file contents in to process.env
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes/router');
require('./database/dbConnection');

const pfServer = express();

pfServer.use(cors());
pfServer.use(express.json());
pfServer.use(router);
pfServer.use('/uploads',express.static('./uploads'))

const PORT = 5000 || process.env.PORT;

pfServer.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT} annd waiting for response`);
    
})

pfServer.get('/',(req,res)=>{
    res.status(200).send('<h1> Welcome to the server !!!!!</h1>');
})

pfServer.post('/',(req,res)=>{
  res.status(200).send('POST REQUEST');  
})