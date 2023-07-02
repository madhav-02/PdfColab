const express = require('express');
const path = require('path')
const dotenv = require("dotenv")
const conncetDB = require("./config/db")




// Loading config details
dotenv.config({ path: './config/config.env'})


conncetDB();

const app = express();
app.use(express.urlencoded({extended : false}))
app.use(express.json())



const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server running on port - ${PORT}`))