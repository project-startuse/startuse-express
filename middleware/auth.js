const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    if(!req.headers) res.status(404).json({message: "header missing"});
    const authHeader = req.headers['authorization'];
    if(!authHeader) res.status(404).json({message: 'token missing...'});
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if(err) res.status(401).json({message: err.message});
    });
    next();
}

module.exports = auth;