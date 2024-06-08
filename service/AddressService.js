const ObjectId = require('mongoose').Types.ObjectId;
const Address = require('../model/Address');

class AddressService {
    async getAddress(id) {
        const address = await Address.findById(id);
        return address;
    }

    async createAddress(id, addressObj) {
        const address = await Address.create(addressObj);
        address._id = id;
        address.save();
        return address;
    }
}

module.exports = AddressService;