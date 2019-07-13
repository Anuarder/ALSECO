const StuffController = require('../controllers/stuff');
const express = require('express');
const router = express.Router();

//* All users
router.get('/getStuff', StuffController.getStuff);

router.post('/addNewStuff', StuffController.addNewStuff);

router.put('/updateStuff', StuffController.updateStuff);
router.put('/giveStuffToEmployee', StuffController.giveStuffToEmployee);

router.delete('/deleteStuff/:id', StuffController.deleteStuff);

module.exports = router;