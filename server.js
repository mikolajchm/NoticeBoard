const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(session({ 
    secret: process.env.secret, 
    store: MongoStore.create({
        mongoUrl: 'mongodb://0.0.0.0:27017/NoticeBoard'
    }),
    resave: false, 
    saveUninitialized: false,
}));

mongoose.connect('mongodb://0.0.0.0:27017/NoticeBoard', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

app.use('/api', require('./routes/ads.routes'));
app.use('/auth', require('./routes/auth.routes'));


app.listen('8000', () => {
    console.log('Server is running on port: 8000');
});

/* app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});
*/
