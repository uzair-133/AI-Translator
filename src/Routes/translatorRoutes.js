const generateResponse = require('../Controller/translatorController')

const express = require('express')
const router = express.Router();




router.post('/translation',generateResponse);

module.exports = router