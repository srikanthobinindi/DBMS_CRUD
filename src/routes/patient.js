const express = require('express');
const router = express.Router();

const patientController = require('../controllers/patientController');

router.get('/', patientController.list);
router.get('/add', patientController.getAddForm);
router.post('/add', patientController.save);
router.get('/delete/:id', patientController.delete);
router.get('/update/:id', patientController.edit);
router.post('/update/:id', patientController.update);
router.get('/doctor/:doctor_id', patientController.getDoctorPatients);

module.exports = router;
