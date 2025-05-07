const express = require('express');
const router = express.Router();

const laboratoryController = require('../controllers/laboratoryController');

router.get('/', laboratoryController.list);
router.get('/add', laboratoryController.getAddForm);
router.post('/add', laboratoryController.save);
router.get('/delete/:id', laboratoryController.delete);
router.get('/update/:id', laboratoryController.edit);
router.post('/update/:id', laboratoryController.update);
router.get('/patients/:id', laboratoryController.viewPatients);

module.exports = router;
