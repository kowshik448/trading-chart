import { INTERVAL_SWITCHES } from "../constants/intervalSwitches";

const combineInstrumentsData = (instrumentsData, resolution) => {
    const combinedOHLCData = [];
    const combinedLineData = [];
    const interval = INTERVAL_SWITCHES[resolution];
  
    const timestampMap = new Map();
  
    instrumentsData.forEach((instrument) => {
      if(instrument){
      instrument.forEach(({time, value}) => {
        const intervalTimestamp = Math.floor(time*1000 / interval) * interval/1000;
        if (timestampMap.has(intervalTimestamp)) {
          timestampMap.get(intervalTimestamp).push(value);
        } else {
          timestampMap.set(intervalTimestamp, [value]);
        }
      });}
    });
  
    timestampMap.forEach((prices, timestamp) => {
      const open = prices[0];
      const high = Math.max(...prices);
      const low = Math.min(...prices);
      const close = prices[prices.length - 1];
      combinedOHLCData.push({ time: timestamp, open:open, high:high, low:low, close:close });
      combinedLineData.push({ time : timestamp, value : close});
    });
  
    return [combinedLineData,combinedOHLCData];
  };

export default combineInstrumentsData;