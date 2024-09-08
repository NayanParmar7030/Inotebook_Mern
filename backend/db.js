const mongoConnect = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/MERN';

const mongoToconnect = () => {
    mongoConnect.connect(mongoURL).
    then(() => {
        console.log("MongoDB connected");
    })
    .catch((error)=>{
        console.error("MongoDB connection error:", error);
    })
    }


module.exports = mongoToconnect;