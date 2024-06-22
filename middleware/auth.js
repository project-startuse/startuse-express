const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    // if no header at all => send header missing response
    if(!req.headers) {
        res.status(404).json({message: "header missing"});
        return;
    }

    // check for authorization header
    const authHeader = req.headers['authorization'];
    if(!authHeader) {
        res.status(404).json({message: 'token missing'});
        return;
    }

    // extract and verify token for accessing the route
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if(err) res.status(403).json({message: err.message});
        else next();
    });
    // next();
}

module.exports = auth;