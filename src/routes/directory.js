const express = require('express');
const router = express.Router();

const directoryController = require('../controllers/directoryController');

router.get('/', directoryController.list);

module.exports = router;
