import React, { useState } from 'react';

const Fourth = ({ product, step, setStep }) => {
  const [part, setPart] = useState('');
  const [description, setDescription] = useState('');
  const [combinedWith, setCombinedWith] = useState(product.combinedWith || '');
  const [locations, setLocations] = useState(product.geographicalLocations || '');

  const handleAddPart = () => {
    if (!product.current.plantParts) product.current.plantParts = [];
    if (part.trim() && description.trim()) {
      product.current.plantParts.push({ part, description });
      setPart('');
      setDescription('');
    }
  };

  const handleNext = () => {
    product.current.combinedWith = combinedWith;
    product.current.geographicalLocations = locations;
    console.log("Product after Fouth step:", product.current);

    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <>
      <div className='container'>
        <h3>Plant Parts And its Purpose</h3>
        <div>
          <input
            type='text'
            placeholder='Plant Part'
            value={part}
            onChange={e => setPart(e.target.value)}
          />
          <input
            type='text'
            placeholder='Description'
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          {product.current.plantParts && product.current.plantParts.map((part, index) => {
            return (
              <div key={index}>
                <p>{part.part}</p>
                <p>{part.description}</p>
              </div>
            );
          })}
            
        
          <button onClick={handleAddPart}>Add</button>
        </div>

        <div>
          <input
            type='text'
            placeholder='Best combined with'
            value={combinedWith}
            onChange={e => setCombinedWith(e.target.value)}
          />
          <input
            type='text'
            placeholder='Geographical Locations'
            value={locations}
            onChange={e => setLocations(e.target.value)}
          />
        </div>
      </div>

      {step !== 5 && <button onClick={handleNext}>Next</button>}
      {step === 5 && <button onClick={() => console.log('Submit')}>Submit</button>}
      {step !== 1 && <button onClick={handleBack}>Back</button>}
    </>
  );
};

export default Fourth;
