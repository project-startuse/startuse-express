const mongoose = require('mongoose');
const addressSchema = require('../utils/addressSchema');

const companySchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    owner: {
        type: String,
        default: 'Contact Person'
    },
    mobile: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: [String]
    },
    address: {
        required: true,
        type: addressSchema,
    },
    tags: {
        type: [String],
        default: []
    }
});

module.exports = mongoose.model('Company', companySchema);