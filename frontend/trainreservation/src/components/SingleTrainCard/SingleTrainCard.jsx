import './SingleTrainCard.css'

function SingleTrainCard({train}) {

    return ( <>
        <div className="singleTrainCardWrapper">
            <div className="trainCardTop">
                <div className="trainName">
                    {(train && train.trainName)?train.trainName : ''}
                </div>
                <div className="trainNumber">
                  {(train && train.trainNumber)?train.trainNumber : ''}
                </div>
            </div>
            <div className="trainCardLeft"> 
                <div className="trainDepartureTime">
                    {/* {(train && train.departureTime)?train.departureTime : ''} */}
                </div>
                <div className="trainDelay">
                    {(train && train.delayedBy)?train.delayedBy : ''}
                </div>
            </div>
            <div className="trainCardRight">
                <div className="seatsAvailable">
                    <div className="sleeperCount">
                        {(train && train.seatsAvailable)?train.seatsAvailable.sleeper : ''}
                    </div>
                    <div className="acCount">
                    {(train && train.seatsAvailable)?train.seatsAvailable.AC : ''}
                    </div>
                </div>
                <div className="price">
                     <div className="sleeperPrice">
                        {(train && train.price)?train.price.sleeper : ''}
                    </div>
                    <div className="acPrice">
                         {(train && train.price)?train.price.AC : ''}
                    </div>
                </div>
            </div>
        </div>
    </> );
}


export default SingleTrainCard;


