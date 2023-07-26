const trains = require('../Models/Trains.js');
const lastUpdateds = require('../Models/LastUpdateds');

// api handlers
// Get all trains 
exports.getTrains = async (req,res,next) =>{
    try{
        const allTrainsData = await trains.find().sort({ price : 1 , seatsAvilable : -1 , departureTime : -1 , delayedBy : -1 });
        if(!allTrainsData){
            return res.status(400).json({
                success : false,
                message : "something went wrong while getting trains!"
            });
        }
        return res.status(200).json({
            success : true,
            data : allTrainsData,
            count : allTrainsData.length
        });
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server error!" + err
        })
    }
}

// Get specific train
exports.getUniqueTrainById = async (req,res,next) => {
    const trainID  = req.params.id;
        // if data not in db:
        let dataInDB = await trains.findById({_id:trainID});
        if(!dataInDB){
            return res.status(404).json({
                message : "cannot find document",
                success : false 
            })
        }

    try{
        const trainsData = await trains.findById(trainID)


        if(!trainsData){
            return res.status(400).json({
                success : false,
                message: "something went wrong while fetching train!"
            })
        }
        return res.status(200).json({
            success : true , 
            data : trainsData,
            count : trainsData.length
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server error!" + err,
        })
    }
}

exports.postTrain = async (req,res,next) => {
    if(req.body.trainName == null || req.body.trainNumber == null || req.body.departureTime == null || req.body.seatsAvailable == null || req.body.price == null || req.body.delayedBy == null ){
        return res.status(404).json({
            success : false,
            message: "send valid details!"
        })
    }
    const postableData = {trainName : req.body.trainName, 
                        trainNumber : req.body.trainNumber , 
                        departureTime : req.body.departureTime , 
                        seatsAvailable : req.body.seatsAvailable ,
                        price : req.body.price , 
                        delayedBy : req.body.delayedBy  
                    };

    try{
        const postedData = await trains.create(postableData);
        if(!postedData){
            return res.status(400).json({
                success : false,
                message : "something went wrong while posting!"
            })
        };
        return res.status(200).json({
            success : true ,
            data : postedData ,
            count : postedData.length
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server error!"  ,  err
        })
    }
}


// post many trains
exports.postManyTrains = async (req, res, next) => {

    if (!Array.isArray(req.body)) {
      return res.status(400).send("Send an array of train objects");
    }

    const invalidTrains = req.body.filter(train => (
      train.trainName == null || train.trainNumber == null || train.departureTime == null || train.seatsAvailable == null || train.price == null || train.delayedBy == null
    ));
    if (invalidTrains.length > 0) {
      return res.status(400).send("Send valid train objects");
    }
  
    try {

      let result = await trains.collection.insertMany(req.body);
      if (!result || result.insertedCount !== req.body.length) {
        return res.status(400).json({
          success: false,
          error: "Error inserting trains"
        });
      }
      return res.status(200).json(req.body);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        error: "Server error"
      });
    }
  };

// patch trains
exports.patchTrainById = async (req,res,next) => {
    if(!req.params.id){
        return res.status(404).json({
            success : false,
            message : "enter valid trainID",
        })
    }

    const trainID = req.params.id;

    // if data not in db:
    let dataInDB = await trains.findById({_id:trainID});
    if(!dataInDB){
        return res.status(404).json({
            message : "cannot find document",
            success : false 
        })
    }
    
    if(req.body.trainName == null && req.body.trainNumber == null && req.body.departureTime == null && req.body.seatsAvailable == null && req.body.price == null && req.body.delayedBy == null ){
        return res.status(404).json({
            success : false,
            message : "send valid data to patch!"
        })
    }
    // fetching train data 
    let trainData;
    try{
        trainData = await trains.findById(trainID);
    }catch(err){
        return res.status(500).json({
            success : false, 
            message : "Internal server error while fetching trains",err
        })
    }
    const patchableData = {
        trainName :  req.body.trainName || trainData.trainName ,
        trainNumber : req.body.trainNumber || trainData.trainNumber ,
        departureTime : req.body.departureTime || trainData.departureTime ,
        seatsAvailable : req.body.seatsAvailable || trainData.seatsAvailable ,
        price : req.body.price || trainData.price ,
        delayedBy : (req.body.delayedBy!=null)?req.body.delayedBy:trainData.delayedBy ,
    }
    try{
        const patchedData = await trains.findByIdAndUpdate(trainID , { $set: { ...patchableData } }, {new : true});
        if(!patchedData){
            return res.status(400).json({
                success : false,
                message : "something went wrong while patching train!"
            })
        }
        return res.status(200).json({
            success : true,
            data : patchedData ,
            count : patchedData.length
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server error!",err
        })
    }
}


// delete trains 
exports.deleteTrainById = async (req,res,next) => {
    const trainID = req.params.id;
    if(!trainID){
        return res.status(404).json({
            success : false,
            message : "send valid trainId"
        })
    }
    // if data not in db:
    let dataInDB = await trains.findById({_id:trainID});
    if(!dataInDB){
        return res.status(404).json({
            message : "cannot find document",
            success : false 
        })
    }

    try{
        const deletedTrainData = await trains.findByIdAndDelete(trainID);
        if(!deletedTrainData){
            return res.status(400).json({
                success : false,
                message : "something went wrong while deleting train!"
            })
        }
        return res.status(200).json({
            success : true,
            data : deletedTrainData,
            count : deletedTrainData.length
        })    
    }catch(err){
        return res.status(500).json({
            success : false,
            message  : "Internal server error ",err
        })
    }
}



// last updated tracking

exports.getLastUpdated = async (req,res,next) => {
    const lastUpdatedId  = req.params.id;
        // if data not in db:
        let dataInDB = await lastUpdateds.findById({_id:lastUpdatedId});
        if(!dataInDB){
            return res.status(404).json({
                message : "cannot find document",
                success : false 
            })
        }

    try{
        const lastUpdatedsData = await lastUpdateds.findById(lastUpdatedId)


        if(!lastUpdatedsData){
            return res.status(400).json({
                success : false,
                message: "something went wrong while fetching train!"
            })
        }
        return res.status(200).json({
            success : true , 
            data : lastUpdatedsData,
            count : lastUpdatedsData.length
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server error!" + err,
        })
    }
}


// patch trains
exports.patchLastUpdated = async (req,res,next) => {
    if(!req.params.id){
        return res.status(404).json({
            success : false,
            message : "enter valid trainID",
        })
    }

    const lastUpdatedId = req.params.id;
    if(req.body.date == null ){
        return res.status(404).json({
            success : false,
            message : "send valid data to patch!"
        })
    }
    const patchableData = {
        date :  req.body.date 
    }
    try{
        const lastUpdatedsData = await trains.findByIdAndUpdate(lastUpdatedId , { $set: { ...patchableData } }, {new : true});
        if(!lastUpdatedsData){
            return res.status(400).json({
                success : false,
                message : "something went wrong while patching train!"
            })
        }
        return res.status(200).json({
            success : true,
            data : lastUpdatedsData ,
            count : lastUpdatedsData.length
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server error!",err
        })
    }
}
