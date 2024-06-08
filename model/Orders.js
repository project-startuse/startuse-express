const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    customer: {
        required: true,
        type: mongoose.Schema.ObjectId,
    },
    company: {
        required: true,
        type: mongoose.Schema.ObjectId
    },
    orderedAt: {
        required: true,
        type: Date
    },
    message: String,
})

module.exports = mongoose.model('Order', ordersSchema);