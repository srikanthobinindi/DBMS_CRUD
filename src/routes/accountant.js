const express = require('express');
const router = express.Router();

const accountantController = require('../controllers/accountantController');

router.get('/', accountantController.list);
router.get('/add', accountantController.getAddForm);
router.post('/add', accountantController.save);
router.get('/delete/:id', accountantController.delete);
router.get('/update/:id', accountantController.edit);
router.post('/update/:id', accountantController.update);

module.exports = router;
