import './SingleTrainCard.css'
import trainIcon from '../../assets/train-light.svg'


function SingleTrainCard({train}) {

    return ( <>
    
        <div className="singleTrainCardWrapper" onClick={()=>{if(currentClickedTrain!=null)setCurrentClickedTrain(prev=>{return {isOpen : true, train : train} })}}>
            <div className="trainCardTop">
                <div className="trainName">
                    {(train && train.trainName)?train.trainName : ''}
                </div>
                <div className="trainNumber">
                  {(train && train.trainNumber)?train.trainNumber : ''}
                </div>

            </div>
            <div className="trainCardBottom">
                <div className="trainCardLeft">
                    <div className="trainIcon">
                        <img src={trainIcon} alt="train" height={100}  width={100}/>
                    </div>
                    <div className="trainTimings">
                        <div className="trainDepartureTime">
                            <div className="trainDepartureName">
                                Departure at
                            </div>
                            <div className="trainDepartureDisplay">
                            {train.departureTime.Hours} : { train.departureTime.Minutes}
                            </div>
                        </div>
                        <div className="trainDelay">
                            <div className="trainDelayName">
                                Delayed by
                            </div>
                            <div className="trainDelayDisplay">
                                 {(train && train.delayedBy)?train.delayedBy : ''} mins
                            </div>
                        </div>
                    </div>
                </div>
                <div className="trainCardRight">
                    <div className="seatsAvailable">
                        <div className="seatsAvailableName">
                            Seats Available
                        </div>
                        <div className="seatsOverAllDisplay">
                            <div className="sleeperCount">
                                <div className="sleeperCountName">
                                    Sleeper
                                </div>
                                <div className="sleeperCountDisplay">
                                    {(train && train.seatsAvailable)?train.seatsAvailable.sleeper : ''}
                                </div>
                            </div>
                            <div className="acCount">
                                <div className="acCountName">
                                    AC
                                </div>
                                <div className="acCountDisplay">
                                {(train && train.seatsAvailable)?train.seatsAvailable.AC : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="price">

                        <div className="priceName">
                            Prices
                        </div>

                         <div className="overAllPrices">
                             <div className="sleeperPrice">
                                <div className="sleeperPriceName">
                                    Sleeper
                                </div>
                                <div className="sleeperPriceDisplay">
                                {(train && train.price)?train.price.sleeper : ''}
                                </div>
                                                     </div>
                             
                                <div className="acPrice">
                                        <div className="acPriceName">
                                            AC
                                        </div>
                                        <div className="acPriceDisplay">
                                        {(train && train.price)?train.price.AC : ''}
                                        </div>
                                </div>
                         </div>
                         
                    </div>
                </div>
            </div>
        </div>
    </> );
}


export default SingleTrainCard;



