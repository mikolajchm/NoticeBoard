const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));


app.use('/api', require('./routes/ads.routes'));
app.use('/auth', require('./routes/auth.routes'));

mongoose.connect('mongodb://0.0.0.0:27017/NoticeBoard', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));


app.use('/', (req, res) => {
    res.status(404).render('notFound');
});
  
app.listen('8000', () => {
    console.log('Server is running on port: 8000');
});