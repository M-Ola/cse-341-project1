//const router = require('express').Router();

const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {res.send('Hello World') });

module.exports = router;

