const mongoToconnect = require('./db');

const express = require('express');
const cors = require('cors');
const app = express();
mongoToconnect();

app.use(cors());
app.use(express.json())

app.use("/api/auth",require("./routers/Auth"));
app.use("/api/notes",require("./routers/Notes"));

app.listen(5000)

