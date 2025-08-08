import React, { useRef, useReducer } from 'react';

const Second_step = ({ product, step, setStep }) => {
  const primaryRefs = useRef([]);
  const secondaryRefs = useRef([]);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const handleAddPrimary = () => {
    primaryRefs.current.push({
      id: Date.now() + Math.random(),
      ref: React.createRef()
    });
    forceUpdate();
  };

  const handleRemovePrimary = (id) => {
    primaryRefs.current = primaryRefs.current.filter(item => item.id !== id);
    forceUpdate();
  };

  const handleAddSecondary = () => {
    secondaryRefs.current.push({
      id: Date.now() + Math.random(),
      image: React.createRef(),
      text: React.createRef()
    });
    forceUpdate();
  };

  const handleRemoveSecondary = (id) => {
    secondaryRefs.current = secondaryRefs.current.filter(item => item.id !== id);
    forceUpdate();
  };

  const handleNext = () => {
    const primaryValues = primaryRefs.current
      .map(item => item.ref.current?.value?.trim())
      .filter(Boolean);

    const secondaryValues = secondaryRefs.current
      .map(item => ({
        icon: item.image.current?.files[0],
        text: item.text.current?.value?.trim()
      }))
      .filter(item => item.text);

    product.current.primary_benefits = primaryValues;
    product.current.secondary_benefits = secondaryValues;

    if (step < 5) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  return (
    <div style={{ marginTop: '40px' }}>
      
      {/* Primary Benefits */}
      <div>
        <p style={{ fontWeight: 'bold' }}>Primary Benefits</p>
        <ul style={{ padding: 0, listStyle: 'none' }}>
          {primaryRefs.current.map((item, index) => (
            <li key={item.id}>
              <div style={{
                paddingBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <input
                  style={{
                    flex: 1,
                    height: '40px',
                    border: '2px solid #ccc',
                    paddingLeft: '10px',
                    borderRadius: '13px'
                  }}
                  ref={item.ref}
                  type="text"
                  placeholder={`Primary Benefit ${index + 1}`}
                />
                <button
                  style={{
                    marginLeft: '10px',
                    background: 'none',
                    border: 'none',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleRemovePrimary(item.id)}
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button style={{background:"none",border:"none",fontWeight:"bold",fontSize:"14px",cursor:"pointer",color:"#3A643C"}} onClick={handleAddPrimary}>Add Primary</button>
      </div>

      {/* Secondary Benefits */}
      <div>
        <p style={{ fontWeight: 'bold' }}>Secondary Benefits</p>
        <ul style={{ padding: 0, listStyle: 'none' }}>
          {secondaryRefs.current.map((item, index) => (
            <li key={item.id}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                paddingBottom: '10px'
              }}>
                <input type="file" ref={item.image} />
                <input
                  style={{
                    flex: 1,
                    height: '40px',
                    border: '2px solid #ccc',
                    borderRadius: '13px',
                    paddingLeft: '10px'
                  }}
                  ref={item.text}
                  type="text"
                  placeholder={`Secondary Benefit ${index + 1}`}
                />
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleRemoveSecondary(item.id)}
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button style={{background:"none",border:"none",fontWeight:"bold",fontSize:"14px",cursor:"pointer",color:"#3A643C"}}  onClick={handleAddSecondary}>Add Secondary</button>
      </div>

      {/* Navigation Buttons */}
      <div style={{display:"flex",width:"100%",gap:"20px",justifyContent:"center",marginTop:"20px"}}>
                {step !== 5 && <button style={{width:"20%",backgroundColor:"#3A643B",color:"white",height:"40px",borderRadius:"10px",border:"none"}} onClick={handleNext}>Next</button>}
                {step !== 1 && <button style={{width:"20%",backgroundColor:"#3A643B",color:"white",height:"40px",borderRadius:"10px",border:"none"}} onClick={handleBack}>Back</button>}
                </div>
    </div>
  );
};

export default Second_step;
