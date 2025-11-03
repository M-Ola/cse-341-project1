const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/contacts')
}); // Redirect root to contacts            );

router.use('/contacts', require('./contacts'));

module.exports = router;

