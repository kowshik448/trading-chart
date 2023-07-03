// import { INTERVAL_SWITCHES } from "../constants/intervalSwitches";
import aggregateData from "./aggregate";

const combineInstrumentsData = (instrumentsData, resolution) => {
    let combinedOHLCData;
    const combinedLineData = [];
  
    const timestampMap = new Map();
  
    instrumentsData.forEach((instrument) => {
      if(instrument){
      instrument.forEach(({time, value}) => {
        const intervalTimestamp = time;
        if (timestampMap.has(intervalTimestamp)) {
          timestampMap.set(intervalTimestamp,timestampMap.get(intervalTimestamp)+value);
        } else {
          timestampMap.set(intervalTimestamp, value);
        }
      });}
    });
  
    timestampMap.forEach((price, timestamp) => {
      combinedLineData.push({ time : timestamp, value : price});
    });
    combinedOHLCData = aggregateData(combinedLineData,resolution)
    console.log(combinedLineData,combinedOHLCData,'both')
  
    return [combinedLineData,combinedOHLCData];
  };

export default combineInstrumentsData;