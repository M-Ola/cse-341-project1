const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.send('/contacts')
}); // Redirect root to contacts            );

router.use('/contacts', require('./contacts'));


module.exports = router;

