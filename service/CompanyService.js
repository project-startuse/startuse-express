const ObjectId = require('mongoose').Types.ObjectId;
const Company = require('../model/Company');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

class CompanyService {
    async getCompany(id) {
        const company = await Company.findById(new ObjectId(id));
        return company;
    }

    async createCompany(body) {
        const {email, password} = body;
        const hashedPassword = await bcrypt.hash(password, 11);
        body.password = hashedPassword;
        const company = await Company.create(body);
        console.log(company);
        
        const token = generateToken(email, hashedPassword);
        return {accessToken: token};
    }

    async editCompany(id, body) {
        const company = await Company.findByIdAndUpdate(new ObjectId(id), body);
        return company;
    }

    async deleteCompany(id) {
        const company = await Company.findByIdAndDelete(new ObjectId(id));
    }

    async getAllCompanies() {
        const companies = await Company.find({});
        return companies;
    }

    async getCompaniesWithIds(idArray) {
        const companies = await Company.find({_id: {$in: idArray}});
        return companies;
    }

    async getCompaniesByCity(cityName) {
        const companies = await Company.find({'address.city': cityName});
        return companies;
    }

    async getCompaniesByState(stateName) {
        const companies = await Company.find({'address.state': stateName});
        console.log(companies);
        return companies;
    }

    async getCompaniesByCountry(countryName) {
        const companies = await Company.find({'address.country': countryName});
        return companies;
    }

    async getCompaniesByAddress(address) {
        const companies = await Company.find({'address.city': address.city, 'address.state': address.state, 'address.country': address.country});
        return companies;
    }

    async verifyCompany({email, password}) {
        const company = await Company.findOne({email: email});
        const isVerified = await bcrypt.compare(password, company.password);
        if(!isVerified) throw new Error("Invalid credentials");
        const token = generateToken(email, company.password);
        return {accessToken: token};
    }
}

module.exports = CompanyService;