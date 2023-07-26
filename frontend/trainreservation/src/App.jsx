import './App.css';
import { useEffect, useState } from 'react';
import { connectToServerFunc, getTrainData } from './utils/ApiHandlers';
import SingleTrainCard from './components/SingleTrainCard/SingleTrainCard';
import TopNavComponent from './components/TopNavComponent/TopNavComponent';
import ConnectingToServer from './components/ConnectingToServer/ConnectingToServer';

function App() {

  const [isConnected , setIsConnected] = useState(false);
  const [trains, setTrains] = useState([]);

  useEffect(()=>{
      if(!isConnected){
        connectToServerFunc(setIsConnected);
      }
  },[])

  useEffect(()=>{
      if(isConnected){
        getTrainData(setTrains);
      }
  },[isConnected])

  return ( <>

      {(!isConnected)?"Connecting To Server!" : ''}
      <TopNavComponent siteName={"RSK Central"}/>
      <div className="trainCardsWrapper">
        {
          trains.map((train,index)=>{
            return <SingleTrainCard key={index} train={train}/>
          })
        }
      </div>
  </> );
}

export default App;