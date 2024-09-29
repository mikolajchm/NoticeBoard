const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const fs = require('fs'); 
const getImageFileType = require('../utils /getImageFileType');

exports.register = async (req, res) => {
    try {
    const { login, password, phone } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unkown';
    console.log(req.body, req.file);
    if (login && typeof login === 'string' && password && typeof password === 'string' && req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
        
        const userWithLogin = await User.findOne({ login });
        if(userWithLogin) {
            if(req.file) {
                fs.unlinkSync(req.file.path);
            }
           return  res.status(409).send({ message: 'User with this login already exists' });
        }
        const user = await User.create({ login, password: await bcrypt.hash(password, 10), avatar: req.file.filename, phone});
        res.status(201).send({ message: 'User created ' + user.login });
    } else {
        res.status(400).send({ message: 'Bad request'})
    }
    
} catch (err) {
 res.status(500).send({ message: err.message });
}
};

exports.login = async (req, res) => {
    try { 
        const { login, password } = req.body;
        if (login && typeof login === 'string' && password && typeof password === 'string') {
            const user = await User.findOne({ login });
            if (!user) {
                return res.status(400).send({ message: 'Login or password are incorrect' });
            } 
            if (bcrypt.compareSync(password, user.password)) {
                req.session.user = { id: user._id,  }; 
                return res.status(200).send({
                    message: 'Login successful',
                    user: { id: user._id,  }  
                });
            } else {
                return res.status(400).send({ message: 'Login or password are incorrect' });
            }
        } else {
            return res.status(400).send({ message: 'Bad request' });
        }
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
}; 

exports.user = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user)res.status(404).json({ message: 'Not found' });
        else res.json(user);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.logout = async (req, res) => {
    try {
        req.session.destroy(async (err) => {
            if (err) {
                return res.status(500).send({ message: err.message });
            }
            if (process.env.NODE_ENV !== "production") {
                try {
                    await Session.deleteMany({});
                } catch (dbError) {
                    return res.status(500).send({ message: 'Error clearing sessions: ' + dbError.message });
                }
            }

            res.json({ message: 'Logout successful' });
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};