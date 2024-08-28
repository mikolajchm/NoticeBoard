const Ads = require('../models/ads.model');

exports.getAll = async (req, res) => {
    try { 
        res.json(await Ads.find());
    } catch (err) {
        res.status(500).json({ message: err });  
    }
};

exports.getId = async (req, res) => {
    try {
        const ad = await Ads.findById(req.params.id)
        if(!ad)res.status(404).json({ message: 'Not found' });
        else res.json(ad);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.post = async (req, res) => {
    const newad = {
        title: (req.params.title),
        content: (req.params.content),
        publishedDate: (req.pamas.publishedDate),
        photo: (req.params.photo),
        price: (req.params.price),
        location: (req.params.location),
        sellerinfo: (req.params.sellerinfo)
    }
    try {
        const newAd = new Ads(newad);
        await newAd.save();
        res.json({ message: 'OK'});
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.delete = async (req, res) => {
    try {
        const ad = await Ads.findById(req.params.id);
        if(ad) {
            await Ads.deleteOne({ _id: req.params.id });
            res.json({ message: 'OK' });
        } else res.status(404).json({ message: 'Not found...' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.putId = async (req, res) => {
    const { title, content, publishedDate, photo, price, location, sellerinfo } = req.body;
    try {
        const ad = await Ads.findById(req.params.id);
        if(ad){
            ad.title = title;
            ad.content = content;
            ad.publishedDate = publishedDate;
            ad.photo = photo;
            ad.price = price;
            ad.location = location;
            ad.sellerinfo = sellerinfo;
            await ad.save();
            res.json({ message: 'OK' });
        }
        else res.status(404).json({ message: 'Not found...' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.search = async (req, res) => {
    try {
        const searchPharse = req.params.searchPharse;
        const searchScore = await Ads.find( { title: { $regex: searchPharse}});
        res.json(searchScore);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};