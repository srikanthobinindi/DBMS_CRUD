const express = require('express');
const router = express.Router();

const nurseController = require('../controllers/nurseController');

router.get('/', nurseController.list);
router.get('/add', nurseController.getAddForm);
router.post('/add', nurseController.save);
router.get('/delete/:id', nurseController.delete);
router.get('/update/:id', nurseController.edit);
router.post('/update/:id', nurseController.update);
router.get('/patients/:id', nurseController.viewPatients);

module.exports = router;
