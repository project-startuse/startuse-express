const mongoose = require('mongoose');
const addressSchema = require('../utils/addressSchema');

module.exports = mongoose.model('Address', addressSchema);