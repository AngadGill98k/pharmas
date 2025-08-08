import React, { useReducer, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Third = ({ product, step, setStep }) => {
  let rasa = useRef();
  let veerya = useRef();
  let guna = useRef();
  let vipaka = useRef();
  let Formulations = useRef([]);
  let Therapeutic = useRef([]);
  let [, force_r] = useReducer(x => x + 1, 0);

  let handleAdd = () => {
    Formulations.current.push({
      image: React.createRef(),
      text: React.createRef()
    });
    force_r();
  };

  let handleUses = () => {
    Therapeutic.current.push({
      image: React.createRef(),
      text: React.createRef()
    });
    force_r();
  };

  let handleNext = () => {
    product.current.rasa = rasa.current?.value?.trim() || '';
    product.current.veerya = veerya.current?.value?.trim() || '';
    product.current.guna = guna.current?.value?.trim() || '';
    product.current.vipaka = vipaka.current?.value?.trim() || '';
    product.current.formulations = Formulations.current.map(ref => ({
      text: ref.text.current?.value?.trim() || '',
      image: ref.image.current?.files[0] || null
    }));
    product.current.therapeutic_uses = Therapeutic.current.map(ref => ({
      text: ref.text.current?.value?.trim() || '',
      image: ref.image.current?.files[0] || null
    }));

    console.log("Product after Third step:", product.current);

    if (step < 5) {
      setStep(prev => prev + 1);
    }
  };

  let handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  return (
    <>
      <div className=''>
        <div>
          <p>Ayurvedic Properties</p>
          <input style={{ height: "40px", border: "2px solid #ccc", width: "45%", borderRadius: "13px", marginLeft: "2%",marginBottom:"1%" }} ref={rasa} type='text' placeholder='Rasa' />
          <input style={{ height: "40px", border: "2px solid #ccc", width: "45%", borderRadius: "13px", marginLeft: "2%" }} ref={veerya} type='text' placeholder='Veerya' />
          <input style={{ height: "40px", border: "2px solid #ccc", width: "45%", borderRadius: "13px", marginLeft: "2%" }} ref={guna} type='text' placeholder='Guna' />
          <input style={{ height: "40px", border: "2px solid #ccc", width: "45%", borderRadius: "13px", marginLeft: "2%" }} ref={vipaka} type='text' placeholder='Vipaka' />
        </div>

        <div>
          <p>Important Formulations</p>
          {Formulations.current.map((ref, index) => (
                        <div style={{display:"flex",boxSizing:"border-box",paddingBottom:"1%",alignItems:"center"}} key={index}>
              <input style={{width:"20%" }} ref={ref.image} type='file' />
              <input style={{ height: "40px", border: "2px solid #ccc", width: "80%", borderRadius: "13px", marginLeft: "2%" }} ref={ref.text} type='text' placeholder={`Formulation ${index + 1}`} />
            </div>
          ))}
          <button style={{background:"none",border:"none",fontWeight:"bold",fontSize:"14px",cursor:"pointer",color:"#3A643C"}} onClick={handleAdd}>Add Formulation</button>
        </div>

        <div>
          <p>Therapeutic Uses</p>
          {Therapeutic.current.map((ref, index) => (
                        <div style={{display:"flex",boxSizing:"border-box",paddingBottom:"1%",alignItems:"center"}} key={index}>
                            <input style={{width:"20%" }} ref={ref.image} type='file' />

              <input style={{ height: "40px", border: "2px solid #ccc", width: "80%", borderRadius: "13px", marginLeft: "2%" }} ref={ref.text} type='text' placeholder={`Therapeutic Use ${index + 1}`} />
            </div>
          ))}
          <button style={{background:"none",border:"none",fontWeight:"bold",fontSize:"14px",cursor:"pointer",color:"#3A643C"}} onClick={handleUses}>Add Use</button>
        </div>

        <div style={{display:"flex",width:"100%",gap:"20px",justifyContent:"center",marginTop:"20px"}}>
                {step !== 5 && <button style={{width:"20%",backgroundColor:"#3A643B",color:"white",height:"40px",borderRadius:"10px",border:"none"}} onClick={handleNext}>Next</button>}
                {step !== 1 && <button style={{width:"20%",backgroundColor:"#3A643B",color:"white",height:"40px",borderRadius:"10px",border:"none"}} onClick={handleBack}>Back</button>}
                </div>
      </div>
    </>
  );
};

export default Third;
