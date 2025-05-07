const express = require('express');
const router = express.Router();

const pharmacistController = require('../controllers/pharmacistController');

router.get('/', pharmacistController.list);
router.get('/add', pharmacistController.getAddForm);
router.post('/add', pharmacistController.save);
router.get('/delete/:id', pharmacistController.delete);
router.get('/update/:id', pharmacistController.edit);
router.post('/update/:id', pharmacistController.update);

module.exports = router;
