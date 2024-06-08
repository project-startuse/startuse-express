const express = require('express');
const router = express.Router();

const CustomerService = require('../service/customerService');
const auth = require('../middleware/auth');

router.get(['/:id', '/profile/:id'], async (req, res) => {
    const customer = await CustomerService.prototype.getCustomer(req.params.id)
    res.json(customer);
});

router.post(['/register'], async (req, res) => {
    const data = await CustomerService.prototype.createCustomer(req.body);
    res.json(data);
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    let data;
    try {
        data = await CustomerService.prototype.verifyCustomer(email, password);
    } catch(err) {
        res.sendStatus(401).json({message: err.message});
    }
    res.json(data);
});

router.put('/:id', auth, async (req, res) => {
    const customer = await CustomerService.prototype.editCustomer(req.params.id, req.body);
    res.json(customer);
});

router.get('/feed/:id', auth, async (req, res) => {
    const feed = await CustomerService.prototype.getFeed(req.params.id);
    res.json(feed);
});

router.get('/favourites/:id', auth, async (req, res) => {
    const favourites = await CustomerService.prototype.getFavourites(req.params.id);
    res.json(favourites);
});


module.exports = router;