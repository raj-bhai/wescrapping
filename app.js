const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const cors = require('cors');

// const task = require('./models/task');

;
const userRoutes = require('./routes/user');


const corsOpts = {
    origin: '*',

    methods: [
        'GET',
        'POST',
    ],

    allowedHeaders: [
        'Content-Type',
    ],
};

const app = express();

app.use(express.json());
app.use(cors(corsOpts));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(userRoutes);



app.listen(process.env.APP_PORT, function () {
    console.log("Server running at port 9000")
 })