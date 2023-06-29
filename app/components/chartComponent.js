import { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import { INTERVAL_SWITCHES } from '../constants/intervalSwitches';
// import generateRandomDataPoint from '../utils/getNewDatapoint';


const ChartComponent = ({ resolution ,OHLCData,selectedInstrumentsData}) => {
  const chartContainerRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const LineSeriesRef = useRef(null);
  const candleStickSeriesRef = useRef(null);

  const [data] = selectedInstrumentsData;

  const candleStickProperties = {
    upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
    wickUpColor: '#26a69a', wickDownColor: '#ef5350',
};
  const interval = INTERVAL_SWITCHES[resolution];

// generating new random data point to make it look like receiving from websocket
  const generateRandomDataPoint = (interval,lastEntry) => {
    const basePrice = lastEntry["value"];
    const baseTime = lastEntry["time"];
    const price = basePrice + Math.random() * 10 - Math.random()*10;
    const timestamp = baseTime + interval/1000;
    data.push({ time: timestamp, value: price });
  
    return {time:timestamp,value:price};
  };

// creating a chart with different types of series 

  useEffect(() => {
    chartInstanceRef.current = createChart(chartContainerRef.current, { width: 1200, height: 500, timeScale:{
      timeVisible:true,
      secondsVisible:true,
    } });
    LineSeriesRef.current = chartInstanceRef.current.addLineSeries();
    candleStickSeriesRef.current = chartInstanceRef.current.addCandlestickSeries(candleStickProperties);
    chartInstanceRef.current.timeScale().fitContent();

    return () => {
      chartInstanceRef.current?.remove();
    };
  }, []);

  // setting the data of the series 

  useEffect(() => {

    if (!LineSeriesRef.current || !data) return;
    const LineSeriesData = OHLCData.map(({time,close})=>{
      return {time,value:close}
    });

    LineSeriesRef.current.setData(LineSeriesData.length>0 ? LineSeriesData : data);
    candleStickSeriesRef.current.setData(OHLCData);

    const dataUpdateInterval = setInterval(() => {
      if(data.length>0){
      const newDataPoint = generateRandomDataPoint(interval,data[data.length-1]);
      updateChart(newDataPoint);
      }
      } , interval);

      return () => {
        clearInterval(dataUpdateInterval);
      };

    },[selectedInstrumentsData,OHLCData]);

  // updating the chart up on adding new data point 

  const updateChart = (newDataPoint) => {
    LineSeriesRef.current.update(newDataPoint);
  };
  

  return <div className='' ref={chartContainerRef} />;
};

export default ChartComponent;
