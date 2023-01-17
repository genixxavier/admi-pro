const express = require('express')
const { dbConnection } = require('./database/config')
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());

dbConnection();

app.get("/", (req, res)=>{
    res.status(200).json({
        ok: true,
        msg: "Hello world"
    })
})

app.listen( process.env.PORT || 4000,() => {
    console.log("Run server")
})