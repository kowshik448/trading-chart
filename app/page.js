"use client"

import { useState, useEffect } from 'react';
import ChartComponent from './components/chartComponent';
import { getLiveData as getLiveDataApi } from './api'; 
import ResolutionRange from './components/resolutionRange';
import InstrumentSelection from './components/instrumentSelection';
import getTime from './utils/getTime';
import aggregateData from './utils/aggregate';
import combineInstrumentsData from './utils/combineData';


const DATA_INDEX = {
  "data1":0,
  "data2" : 1,
}

const IndexPage = () => {
  const [data, setData] = useState([]);
  const [data1 , data2] = data;
  const [resolution, setResolution] = useState('1min');
  const [selectedInstruments, setSelectedInstruments] = useState(["data1"]);
  const [combinedData, setCombinedData] = useState([]);
  const [combinedLineData, combinedOHLCData] = combinedData;
  const availableInstruments = ["data1", "data2"];
  const [selectedInstrumentsData,setSelectedInstrumentsData] = useState([]);


  // getting data from local, as data is given
  useEffect(()=>{
    getLiveDataApi().then((data) => {
      const transformedData = data.map((item)=>item.map(([time, value]) => ({ time:19800+getTime(time)/1000, value:value/100})));
      setData(transformedData);
    })
  }, []);

  // updaing the selectedInstruments data
  useEffect(()=>{
    if(selectedInstruments.length == 0){
      setSelectedInstrumentsData([]);
    }
    const updatedSelectedData = [];
    for (let i=0; i<selectedInstruments.length;i++){
      if(selectedInstruments[i]==="data1"){
        updatedSelectedData.push(data1);
      }
      if(selectedInstruments[i]==="data2"){
        updatedSelectedData.push(data2);
      }
    };
    setSelectedInstrumentsData(updatedSelectedData);
  },[data,selectedInstruments]);

  // combining data for multiple instruments
  useEffect(() => {
    if(resolution!== "3sec"){
      const combinedData = combineInstrumentsData(selectedInstrumentsData, resolution);
      setCombinedData(combinedData);
  }
  }, [selectedInstrumentsData,resolution]);

  return (
    <div className='flex flex-col justify-start items-center bg-gradient-to-r from-red-100 via-blue-800 to-black-500  hover:bg-gradient-to-l h-screen'>
      <h1 className='text-2xl font-semibold p-5 text-white'>Live Price Chart</h1>
      <InstrumentSelection
        selectedInstruments={selectedInstruments}
        setSelectedInstruments={setSelectedInstruments}
        availableInstruments={availableInstruments}
      />
      <ChartComponent  
        resolution={resolution} 
        OHLCData={selectedInstruments.length>=1 ? selectedInstruments.length>1 ? combinedOHLCData : aggregateData(data[DATA_INDEX[selectedInstruments[0]]],resolution):[]} 
        selectedInstrumentsData={selectedInstruments.length>1 ? combinedLineData :selectedInstrumentsData}
      />
      <ResolutionRange setResolution={setResolution}/>
    </div>
  );
};

export default IndexPage;
