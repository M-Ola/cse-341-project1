const express = require("express");
const router = express.Router();

router.get('/', (req, res) => { res.send('Api is running') });

router.use('/contacts', require('./contacts'));

module.exports = router;

