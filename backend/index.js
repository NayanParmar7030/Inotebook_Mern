const mongoToconnect = require('./db');

const express = require('express')
mongoToconnect();
const app = express()

app.use(express.json())

app.use("/api/auth",require("./routers/Auth"));

app.listen(5000)

