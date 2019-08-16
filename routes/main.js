const express = require('express')

const getInterfaces = require('../middleware/getInterfaces')
const getStatistics = require('../middleware/getStatistics')

module.exports = express.Router()
    .get('/interfaces', getInterfaces)
    .get('/statistics/:interface/:timeperiod', getStatistics)
