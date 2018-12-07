const express = require('express');
const bodyParser = require('body-parser');
const routes = require('../routes/routers')

module.exports =function(app) {
app.use('/api/v1', routes)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

}
