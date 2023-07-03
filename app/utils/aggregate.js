import { INTERVAL_SWITCHES } from "../constants/intervalSwitches";

const aggregateData = (data, resolution) => {
    if (!data || data.length==0) return []
    const OHLCData = [];
  
    const interval = INTERVAL_SWITCHES[resolution];
  
    let open = data[0]['value'];
    let high = data[0]['value'];
    let low = data[0]['value'];
    let close = data[0]['value'];
    let timestamp = data[0]['time'] ;
  
    for (let i = 1; i < data.length; i++) {
      const {time, value} = data[i];
      if (time < timestamp + interval/1000) {
        high = Math.max(high, value);
        low = Math.min(low, value);
        close = value;
      } else {
  
        OHLCData.push({ time: timestamp, open, high, low, close });
        open = value;
        high = value;
        low = value;
        close = value;
        timestamp = timestamp+interval/1000;
      }
      
    }
    OHLCData.push({ time: timestamp, open, high, low, close });
  
    return OHLCData;
  };

export default aggregateData;