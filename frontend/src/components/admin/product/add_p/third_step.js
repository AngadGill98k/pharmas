import React, { useRef, useReducer, useEffect, useState } from 'react';

const Third_step = ({ product, step, setStep }) => {
  const dosage = useRef([]);
  const usage = useRef([]);
  const primaryIngredients = useRef([]);
  const allIngredients = useRef([]);
  const duration = useRef([]);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  let [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/get_ingridients', {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        if (data.msg) {
          setIngredients(data.ingredients);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const genId = () => Date.now() + Math.random();

  const handledosage = () => {
    dosage.current.push({ id: genId(), image: React.createRef(), text: React.createRef() });
    forceUpdate();
  };

  const handleusage = () => {
    usage.current.push({ id: genId(), image: React.createRef(), text: React.createRef() });
    forceUpdate();
  };

  const handlePrimary = () => {
    primaryIngredients.current.push({ id: genId(), ref: React.createRef() });
    forceUpdate();
  };

  const handleAll = () => {
    allIngredients.current.push({ id: genId(), ref: React.createRef() });
    forceUpdate();
  };

  const handleDuration = () => {
    duration.current.push({ id: genId(), image: React.createRef(), text: React.createRef() });
    forceUpdate();
  };

  const getTextValues = (refArray) =>
    refArray.current.map(item => item.ref.current?.value?.trim()).filter(Boolean);

  const getImageTextPairs = (refArray) =>
    refArray.current.map(({ image, text }) => ({
      file: image.current?.files?.[0] || null,
      text: text.current?.value?.trim() || ''
    })).filter(item => item.file || item.text);

  const handleRemove = (refArray, id) => {
    refArray.current = refArray.current.filter(item => item.id !== id);
    forceUpdate();
  };

  const handleNext = () => {
    product.current.dosage = getImageTextPairs(dosage);
    product.current.usage = getImageTextPairs(usage);
    product.current.duration = getImageTextPairs(duration);
    product.current.primaryIngredients = getTextValues(primaryIngredients);
    product.current.allIngredients = getTextValues(allIngredients);
    if (step < 5) setStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(prev => prev - 1);
  };

  return (
    <div style={{ marginTop: '40px' }}>
      {/* Dosage */}
      <p style={{ fontWeight: 'bold' }}>Dosage</p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {dosage.current.map((item, index) => (
          <li key={item.id}>
            <div style={{ marginBottom: "10px", display: 'flex', alignItems: 'center' }}>
              <input ref={item.image} type="file" />
              <input
                ref={item.text}
                type="text"
                placeholder={`Dosage ${index + 1}`}
                style={{
                  flex: 1,
                  height: '40px',
                  border: '2px solid #ccc',
                  borderRadius: '13px',
                  paddingLeft: '10px',
                  marginLeft: "10px"
                }}
              />
              <button  style={{ marginLeft: "10px", border: "none", background: "none", fontWeight: "bold" }} onClick={() => handleRemove(dosage, item.id)}>X</button>
            </div>
          </li>
        ))}
      </ul>
      <button style={{background:"none",border:"none",fontWeight:"bold",fontSize:"14px",cursor:"pointer",color:"#3A643C"}}  onClick={handledosage}>Add Dosage</button>

      {/* Usage */}
      <p style={{ fontWeight: 'bold' }}>Usage</p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {usage.current.map((item, index) => (
          <li key={item.id}>
            <div style={{ marginBottom: "10px", display: 'flex', alignItems: 'center' }}>
              <input ref={item.image} type="file" />
              <input
                ref={item.text}
                type="text"
                placeholder={`Usage ${index + 1}`}
                style={{
                  flex: 1,
                  height: '40px',
                  border: '2px solid #ccc',
                  borderRadius: '13px',
                  paddingLeft: '10px',
                  marginLeft: "10px"
                }}
              />
              <button  style={{ marginLeft: "10px", border: "none", background: "none", fontWeight: "bold" }} onClick={() => handleRemove(usage, item.id)}>X</button>
            </div>
          </li>
        ))}
      </ul>
      <button style={{background:"none",border:"none",fontWeight:"bold",fontSize:"14px",cursor:"pointer",color:"#3A643C"}}  onClick={handleusage}>Add Usage</button>

      {/* Primary Ingredients */}
      <p style={{ fontWeight: 'bold' }}>Primary Ingredients</p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {primaryIngredients.current.map((item, index) => (
          <li key={item.id}>
            <div style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
              <select
                ref={item.ref}
                style={{
                  flex: 1,
                  height: "40px",
                  border: "2px solid #ccc",
                  borderRadius: "13px",
                  paddingLeft: "10px"
                }}
              >
                <option value="">Select ingredient</option>
                {ingredients.map((ing, i) => (
                  <option key={i} value={ing._id}>{ing.name}</option>
                ))}
              </select>
              <button  style={{ marginLeft: "10px", border: "none", background: "none", fontWeight: "bold" }} onClick={() => handleRemove(primaryIngredients, item.id)}>X</button>
            </div>
          </li>
        ))}
      </ul>
      <button style={{background:"none",border:"none",fontWeight:"bold",fontSize:"14px",cursor:"pointer",color:"#3A643C"}}   onClick={handlePrimary}>Add Primary Ingredient</button>

      {/* All Ingredients */}
      <p style={{ fontWeight: 'bold' }}>All Ingredients</p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {allIngredients.current.map((item, index) => (
          <li key={item.id}>
            <div style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
              <select
                ref={item.ref}
                style={{
                  flex: 1,
                  height: "40px",
                  border: "2px solid #ccc",
                  borderRadius: "13px",
                  paddingLeft: "10px"
                }}
              >
                <option value="">Select ingredient</option>
                {ingredients.map((ing, i) => (
                  <option key={i} value={ing._id}>{ing.name}</option>
                ))}
              </select>
              <button  style={{ marginLeft: "10px", border: "none", background: "none", fontWeight: "bold" }} onClick={() => handleRemove(allIngredients, item.id)}>X</button>
            </div>
          </li>
        ))}
      </ul>
      <button style={{background:"none",border:"none",fontWeight:"bold",fontSize:"14px",cursor:"pointer",color:"#3A643C"}}  onClick={handleAll}>Add Ingredient</button>

      {/* Duration */}
      <p style={{ fontWeight: 'bold' }}>Duration</p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {duration.current.map((item, index) => (
          <li key={item.id}>
            <div style={{ marginBottom: "10px", display: 'flex', alignItems: 'center' }}>
              <input ref={item.image} type="file" />
              <input
                ref={item.text}
                type="text"
                placeholder={`Duration ${index + 1}`}
                style={{
                  flex: 1,
                  height: '40px',
                  border: '2px solid #ccc',
                  borderRadius: '13px',
                  paddingLeft: '10px',
                  marginLeft: "10px"
                }}
              />
              <button style={{ marginLeft: "10px", border: "none", background: "none", fontWeight: "bold" }}  onClick={() => handleRemove(duration, item.id)}>X</button>
            </div>
          </li>
        ))}
      </ul>
      <button  style={{background:"none",border:"none",fontWeight:"bold",fontSize:"14px",cursor:"pointer",color:"#3A643C"}}   onClick={handleDuration}>Add Duration</button>

      {/* Navigation */}
      <div style={{display:"flex",width:"100%",gap:"20px",justifyContent:"center",marginTop:"20px"}}>
                {step !== 5 && <button style={{width:"20%",backgroundColor:"#3A643B",color:"white",height:"40px",borderRadius:"10px",border:"none"}} onClick={handleNext}>Next</button>}
                {step !== 1 && <button style={{width:"20%",backgroundColor:"#3A643B",color:"white",height:"40px",borderRadius:"10px",border:"none"}} onClick={handleBack}>Back</button>}
                </div>
    </div>
  );
};

export default Third_step;
