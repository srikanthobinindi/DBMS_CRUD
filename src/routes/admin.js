const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

router.get('/', adminController.list);
router.post('/add', adminController.save);
router.get('/delete/:id', adminController.delete);
router.get('/update/:id', adminController.edit);
router.post('/update/:id', adminController.update);
router.get('/staff/:id', adminController.viewStaff);

module.exports = router;
