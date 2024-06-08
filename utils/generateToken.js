const jwt = require('jsonwebtoken');

const generateToken = (email, hashedPassword) => {
    const token = jwt.sign({
        email: email,
        password: hashedPassword
    }, process.env.JWT_SECRET, {expiresIn: '10d'});

    return token;
}

module.exports = generateToken;