const express = require('express')
const { dbConnection } = require('./database/config')
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());
//lectura y parseo del body
app.use(express.json())

dbConnection();

app.use('/api/users', require('./routes/user'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitals', require('./routes/hospitals'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/searches', require('./routes/searches'));
app.use('/api/uploads', require('./routes/uploads'));

app.listen( process.env.PORT || 4000,() => {
    console.log("Run server")
})