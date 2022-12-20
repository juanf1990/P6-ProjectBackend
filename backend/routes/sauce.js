const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

/* TODO : Add multer middleware to handle file upload */


const sauceCtrl = require('../controllers/sauce');


/* TODO: Add correct paths for the following routes */
router.get('/', auth, sauceCtrl.getAllSauces);
/* TODO : Line 17: two middlewares for creating a sauce */
router.post('/', sauceCtrl.createSauce);
router.get('/sauces/:id', sauceCtrl.getOneSauce);
router.put('/api/sauces/:id', sauceCtrl.modifySauce);
router.delete('/api/sauces/:id', sauceCtrl.deleteSauce);
router.post('/api/sauces/:id/like', sauceCtrl.likeSauce);

module.exports = router;