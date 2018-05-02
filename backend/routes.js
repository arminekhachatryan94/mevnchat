const express = require('express');
const exp = express();

// routes
exp.get('/', (req, res) => res.send('Homepage'));

module.exports = exp;
