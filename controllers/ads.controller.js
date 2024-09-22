const Ads = require('../models/Ad.model');
const fs = require('fs');
const getImageFileType = require('../utils /getImageFileType');

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
    try {
        const { title, content, publishDate, price, location, sellerinfo } = req.body;
        
        const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
        console.log(req.body, req.file); 
        if (!req.file || !['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
            return res.status(400).json({ message: 'Invalid file format. Only PNG, JPEG, and GIF are allowed.' });
        }

        const newAd = new Ads({
            title,
            content,
            publishDate,
            photo: req.file.filename, 
            price,
            location,
            sellerinfo
        });

        await newAd.save();
        res.status(201).json(newAd);
    } catch (err) {
        console.error(err);
        if (req.file) {
            fs.unlinkSync(req.file.path); 
        }
        res.status(500).json({ message: err.message });
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
    const { title, content, price, location } = req.body;
    try {
        const ad = await Ads.findById(req.params.id);
        if (ad) {
            if (title !== undefined) ad.title = title;
            if (content !== undefined) ad.content = content;
            if (price !== undefined) ad.price = price;
            if (location !== undefined) ad.location = location;
            

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