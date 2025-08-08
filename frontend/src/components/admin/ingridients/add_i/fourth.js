import React, { useState } from 'react';

const Fourth = ({ product, step, setStep }) => {
  const [part, setPart] = useState('');
  const [description, setDescription] = useState('');
  const [combinedWith, setCombinedWith] = useState(product.combinedWith || '');
  const [locations, setLocations] = useState(product.geographicalLocations || '');

  // Predefined plant parts
  const plantPartsOptions = [
    'Leaf',
    'Stem',
    'Root',
    'Flower',
    'Seed',
    'Fruit',
    'Bark'
  ];

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
    console.log("Product after Fourth step:", product.current);

    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <>
      <div className=''>
        <h3>Plant Parts And its Purpose</h3>
        <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <div style={{ width: "100%", display: "flex" }}>
            <select
              style={{ height: "47px", width: "20%", border: "2px solid #ccc", borderRadius: "13px" }}

              value={part}
              onChange={e => setPart(e.target.value)}
            >
              <option value="" disabled>Select Plant Part</option>
              {plantPartsOptions.map((option, idx) => (
                <option key={idx} value={option}>{option}</option>
              ))}
            </select>

            <input
              style={{ height: "40px", border: "2px solid #ccc", flex: 1, borderRadius: "13px", marginLeft: "2%" }}
              type='text'
              placeholder='Description'
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <button style={{ marginLeft: "10px", background: "none", border: "none", fontWeight: "bold", fontSize: "14px", cursor: "pointer", color: "#3A643C" }} onClick={handleAddPart}>Add</button>

          </div>
          <ul style={{ width: "100%", boxSizing: "border-box", padding: "0px", listStyle: "none", marginTop: "40px", gap: "10px", display: "flex", flexDirection: "column" }}>
            {product.current.plantParts && product.current.plantParts.map((part, index) => {
              return (
                <li style={{ boxSizing: "border-box", width: "100%" }} key={index}>
                  <div style={{ boxSizing: "border-box", gap: "10px", display: "flex", flexDirection: "row" }} >
                    <span
                      style={{
                        padding: "10px",
                        border: "2px solid #ccc",
                        borderRadius: "7px",
                        width: "20%",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis"
                      }}
                    >
                      {part.part}
                    </span>

                    <span
                      style={{
                        padding: "10px",
                        border: "2px solid #ccc",
                        borderRadius: "7px",
                        flex: 1,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis"
                      }}
                    >
                      {part.description}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>

        </div>
        <div style={{marginTop:"20px", display: "flex", width: "100%", gap: "10px", flexDirection: "column" }}>
          <input
            style={{ height: "40px", border: "2px solid #ccc", width: "100%", borderRadius: "13px", }}

            type='text'
            placeholder='Best combined with'
            value={combinedWith}
            onChange={e => setCombinedWith(e.target.value)}
          />
          <input
            style={{ height: "40px", border: "2px solid #ccc", width: "100%", borderRadius: "13px",  }}

            type='text'
            placeholder='Geographical Locations'
            value={locations}
            onChange={e => setLocations(e.target.value)}
          />
        </div>
      </div>

      <div style={{ display: "flex", width: "100%", gap: "20px", justifyContent: "center", marginTop: "20px" }}>
        {step !== 5 && <button style={{ width: "20%", backgroundColor: "#3A643B", color: "white", height: "40px", borderRadius: "10px", border: "none" }} onClick={handleNext}>Next</button>}
        {step !== 1 && <button style={{ width: "20%", backgroundColor: "#3A643B", color: "white", height: "40px", borderRadius: "10px", border: "none" }} onClick={handleBack}>Back</button>}
      </div>
    </>
  );
};

export default Fourth;
