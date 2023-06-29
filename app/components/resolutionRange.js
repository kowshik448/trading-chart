import React from 'react'
import { INTERVAL_SWITCHES } from '../constants/intervalSwitches';

const ResolutionRange = ({setResolution}) => {
  return (
    <div className='p-5 flex flex-row justify-center items-center gap-3  '>
      {
        Object.entries(INTERVAL_SWITCHES).map(([key]) => (
          <button key={key} value={key}
            className="cursor-pointer border-2 border-blue-500  rounded-md p-1 bg-blue-500 text-white hover:bg-white hover:text-blue-500 hover:scale-90  w-20 focus:bg-white focus:text-blue-500"
            onClick={(e)=>setResolution(e.target.value)}>
              {key}
          </button>
        ))
      }
    </div>
  )
}

export default ResolutionRange;