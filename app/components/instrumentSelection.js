
const InstrumentSelection = ({selectedInstruments, setSelectedInstruments, availableInstruments }) => {

  const handleInstrumentToggle = (instrument) => {
    if (selectedInstruments.includes(instrument)) {
      setSelectedInstruments(selectedInstruments.filter((selected) => selected !== instrument));
    } else {
      setSelectedInstruments([...selectedInstruments, instrument]);
    }
  };

  return (
    <div className='flex flex-row justify-center gap-5 p-3'>
      <h2 className='text-white '>Available Instruments:</h2>
      {availableInstruments.map((instrument) => (
        <div key={instrument} className='px-1'>
          <label className='text-white'>
            <input
            className='mr-2'
              type="checkbox"
              checked={selectedInstruments.includes(instrument)}
              onChange={() => handleInstrumentToggle(instrument)}
            />
            {instrument}
          </label>
        </div>
      ))}
    </div>
  );
};

export default InstrumentSelection;