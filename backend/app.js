const express = require('express');
const path = require('path');
const dotenv = require("dotenv");
const conncetDB = require("./config/db");
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');


// Loading config details
dotenv.config({ path: './config/config.env'})


conncetDB();

const app = express();
app.use(express.urlencoded({extended : false}))
app.use(express.json())

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

app.get('/', (req, res) =>{
    res.send({message : 'Backend Server running!!!!'});
})
const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server running on port - ${PORT}`))