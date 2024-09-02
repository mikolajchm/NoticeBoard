const Ads = require('../models/Ad.model');
const fs = require('fs');

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
    const { title, content, publishedDate, price, location, sellerinfo } = req.body;
    try {
        const ad = await Ads.findById(req.params.id);
        if (ad) {
            if (title !== undefined) ad.title = title;
            if (content !== undefined) ad.content = content;
            if (publishedDate !== undefined) ad.publishedDate = publishedDate;
            if (price !== undefined) ad.price = price;
            if (location !== undefined) ad.location = location;
            if (sellerinfo !== undefined) ad.sellerinfo = sellerinfo;

            if (req.file) {
                if (ad.photo) {
                  
                    const oldPhotoPath = path.join(__dirname, '../public/uploads', ad.photo);
                    try {
                        fs.unlinkSync(oldPhotoPath);
                    } catch (err) {
                        console.error(`Error deleting old photo: ${err.message}`);
                    }
                }
            
                ad.photo = req.file.filename;
            }

            await ad.save();
            res.json({ message: 'OK' });
        } else {
            res.status(404).json({ message: 'Not found...' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
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