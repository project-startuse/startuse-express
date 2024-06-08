const mongoose = require('mongoose');
const addressSchema = require('../utils/addressSchema');

const customerSchema = new mongoose.Schema({
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        lowercase: true
    },
    password: {
        required: true,
        type: String
    },
    mobile: {
        required: true,
        type: String
    },
    address: addressSchema,
    favourites: {
        type: [mongoose.Schema.ObjectId],
        default: []
    }
});

module.exports = mongoose.model('Customer', customerSchema);