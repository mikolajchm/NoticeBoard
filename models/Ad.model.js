const mongoose = require('mongoose');

const adSchema  = new mongoose.Schema({
    title: { type: String, required: true, minlength: 10, maxlength: 50 },
    content: { type: String, required: true, minlength: 20, maxlength: 1000 },
    publishDate: { type: Date, default: Date.now },
    photo: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true},
    sellerinfo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
});

module.exports = mongoose.model('Ads', adSchema);