const express = require('express');
const {mongoose} = require('mongoose');
require('dotenv').config();

const customerController = require('./routes/customerController');
const companyController = require('./routes/companyController');
const app = express();
const port = process.env.PORT;

const connection = mongoose.connect(process.env.DATABASE_URI);

app.use(express.json());
app.use('/customers', customerController);
app.use('/companies', companyController);

app.listen(port, () => {
    console.log('server listening on port ' + port);
})