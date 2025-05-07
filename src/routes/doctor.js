const express = require('express');
const router = express.Router();

const doctorController = require('../controllers/doctorController');

router.get('/', doctorController.list);
router.get('/add', doctorController.getAddForm);
router.post('/add', doctorController.save);
router.get('/delete/:id', doctorController.delete);
router.get('/update/:id', doctorController.edit);
router.post('/update/:id', doctorController.update);
router.get('/patients/:id', doctorController.viewPatients);

module.exports = router;
