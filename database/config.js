const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CDN);

        console.log("Success connected")
    } catch (error) {
        console.log(error);
        throw new Error("Error connected database")
    }
}


module.exports = { dbConnection }