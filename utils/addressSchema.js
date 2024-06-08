const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    door: String,
    street: String,
    city: String,
    state: String,
    country: String,
    code: String
});

module.exports = addressSchema;