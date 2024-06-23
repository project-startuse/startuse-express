const ObjectId = require('mongoose').Types.ObjectId;
const Customer = require('../model/Customer');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

const CompanyService = require('../service/CompanyService');

class CustomerService {
    async getCustomer(id) {
        const customer = await Customer.findById(new ObjectId(id));
        return customer;
    }

    async createCustomer(body) {
        // user creation process
        const {email, password} = body;
        const hashedPassword = await bcrypt.hash(password, 10);
        body.password = hashedPassword;
        const customer = await Customer.create(body);
        console.log(customer);

        // token pre-generation process
        const token = generateToken(email, hashedPassword);

        return {
            accessToken: token,
            firstName: customer.firstName,
            id: customer._id.toString()
        };
    }

    async editCustomer(id, body) {
        const customer = await Customer.findByIdAndUpdate(new ObjectId(id), body);
        return customer;
    }

    async deleteCustomer(id) {
        await Customer.findByIdAndDelete(new ObjectId(id));
    }

    async getFeed(id) {
        const customer = await Customer.findById(new ObjectId(id));
        console.log(customer);
        // const companies = await CompanyService.prototype.getCompaniesByState(customer.address.state);
        const companies = await CompanyService.prototype.getCompaniesByAddress(customer.address);
        return companies;
    }

    async getFavourites(id) {
        const customer = await Customer.findById(new ObjectId(id));
        const favourites = await CompanyService.prototype.getCompaniesWithIds(customer.favourites);
        return favourites;
    }

    async addFavourite(custId, compId) {
        const customer = await Customer.findById(new ObjectId(custId));
        customer.favourites.push(compId);
        await customer.save();
        return customer;
    }

    async removeFavourite(custId, compId) {
        const customer = await Customer.findById(new ObjectId(custId));
        customer.favourites = customer.favourites.filter((fav) => {return fav.toString() !== compId})
        await customer.save();
        return customer;
    }

    async verifyCustomer(email, password) {
        const customer = await Customer.findOne({email: email});
        const isVerified = await bcrypt.compare(password, customer.password);
        if(isVerified) {
            const token = generateToken(email, customer.password);
            return {
                accessToken: token,
                firstName: customer.firstName,
                id: customer._id.toString()
            };
        } else throw new Error('Invalid credentials');
    }
}

module.exports = CustomerService;