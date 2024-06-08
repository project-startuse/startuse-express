const express = require('express');
const router = express.Router();

const CompanyService = require('../service/CompanyService');

router.get('/:id', async (req, res) => {
    const company = await CompanyService.prototype.getCompany(req.params.id)
    res.json(company);
});

router.get('/', async (req,res) => {
    res.json(await CompanyService.prototype.getAllCompanies());
});

router.post('/register', async (req, res) => {
    const data = await CompanyService.prototype.createCompany(req.body);
    res.json(data);
});

router.post('/login', async (req, res) => {
    let data;
    try{
        data = await CompanyService.prototype.verifyCompany(req.body);
    } catch(err) {
        res.sendStatus(401).json({message: err.message});
    }
    res.json(data);
})

// city is a string
router.get('/city/:city', async (req, res) => {
    const companies = await CompanyService.prototype.getCompaniesByCity(req.params.city);
    res.json(companies);
});

// state is a string
router.get('/state/:state', async (req, res) => {
    const companies = await CompanyService.prototype.getCompaniesByState(req.params.state);
    res.json(companies);
});

// country is a string
router.get('/country/:country', async (req, res) => {
    const companies = await CompanyService.prototype.getCompaniesByCountry(req.params.country);
    res.json(companies);
})

// body must have city, state and country as keys
router.post('/address', async (req, res) => {
    const companies = await CompanyService.prototype.getCompaniesByAddress(req.body);
    res.json(companies);
})

router.post('/search', async (req, res) => {
    const companies = await CompanyService.prototype.searchCompanies(req.body.keywords);
    res.json(companies);
})

module.exports = router;