const generateRandomDataPoint = (interval,lastEntry) => {
    const basePrice = lastEntry["value"];
    const baseTime = lastEntry["time"];
    const price = basePrice + Math.random() * 10 - Math.random()*10;
    const timestamp = baseTime + interval/1000;
    data.push({ time: timestamp, value: price });
  
    return {time:timestamp,value:price};
  };

export default generateRandomDataPoint;