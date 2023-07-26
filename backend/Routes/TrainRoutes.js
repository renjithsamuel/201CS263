const express = require('express');
const router = express.Router();

const {getTrains,getUniqueTrainById,postTrain,postManyTrains,patchTrainById,deleteTrainById} = require('../Controller/TrainController');

router.get('/getTrains',getTrains);
router.get('/getUniqueTrainById/:id',getUniqueTrainById);
router.post('/postTrain',postTrain);
router.post('/postManyTrains',postManyTrains);
router.patch('/patchTrainById/:id',patchTrainById);
router.delete('/deleteTrainById/:id',deleteTrainById);

module.exports = router;