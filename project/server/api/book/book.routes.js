const controller = require('./book.controller');
const express = require('express');
const router = express.Router();

router.get('/allBooks', controller.allBooks);

module.exports = router;