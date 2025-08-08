import React, { useReducer, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Second = ({ product, step, setStep }) => {
    let uses = useRef([]);
    let vata = useRef();
    let kapha = useRef();
    let v_reason = useRef();
    let k_reason = useRef();
    let benefits = useRef([]);
    let [, force_r] = useReducer(x => x + 1, 0);

    let handleuse = () => {
        uses.current.push(React.createRef());
        force_r();
    };

    let handlebenefits = () => {
        benefits.current.push({
            image: React.createRef(),   // File input
            text: React.createRef()     // Text input
        });
        force_r();
    };

    let handleNext = () => {
        // Save data into product.current
        product.current.uses = uses.current.map(ref => ref.current?.value?.trim() || '');
        product.current.vata = vata.current?.value?.trim() || '';
        product.current.kapha = kapha.current?.value?.trim() || '';
        product.current.v_reason = v_reason.current?.value?.trim() || '';
        product.current.k_reason = k_reason.current?.value?.trim() || '';
        product.current.benefits = benefits.current.map(ref => ({
            image: ref.image.current?.files[0] || null,
            text: ref.text.current?.value?.trim() || ''
        }));

        console.log("Product after Second step:", product.current);

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
                    <p>Why to Use</p>
                    <ul style={{listStyle:"none",padding:"0"}}>
                    {uses.current.map((ref, index) => (
                        <li style={{marginBottom:"1%"}} key={index}>
                            <input style={{height:"40px",border: "2px solid #ccc",width:"93%",borderRadius:"13px",marginLeft:"2%"}} ref={ref} type='text' placeholder={`Use ${index + 1}`} />
                        </li>
                    ))}
                    </ul>
                    <button style={{background:"none",border:"none",fontWeight:"bold",fontSize:"14px",cursor:"pointer",color:"#3A643C"}}  onClick={handleuse}>Add Use</button>
                </div>

                <div>
                    <p>Prakriti Impact</p>
                    <input style={{height:"40px",border: "2px solid #ccc",width:"45%",borderRadius:"13px",marginLeft:"2%"}}  ref={vata} type='text' placeholder='Vata' />
                    <input style={{height:"40px",border: "2px solid #ccc",width:"45%",borderRadius:"13px",marginLeft:"2%"}} ref={kapha} type='text' placeholder='Kapha' />
                    <input style={{height:"40px",border: "2px solid #ccc",width:"45%",borderRadius:"13px",marginLeft:"2%",marginTop:"2%"}} ref={v_reason} type='text' placeholder='Vata Reason' />
                    <input style={{height:"40px",border: "2px solid #ccc",width:"45%",borderRadius:"13px",marginLeft:"2%"}} ref={k_reason} type='text' placeholder='Kapha Reason' />
                </div>

                <div>
                    <p>Benefits</p>
                    <button style={{background:"none",border:"none",fontWeight:"bold",fontSize:"14px",cursor:"pointer",color:"#3A643C"}}  onClick={handlebenefits}>Add Benefit</button>
                    {benefits.current.map((ref, index) => (
                        <div style={{display:"flex",boxSizing:"border-box",paddingBottom:"1%",alignItems:"center"}} key={index}>
                            <input style={{width:"20%"}} ref={ref.image} type='file' placeholder={`Benefit Image ${index + 1}`} />
                            <input style={{width:"80%",height:"40px",border: "2px solid #ccc",borderRadius:"13px",marginLeft:"2%"}} ref={ref.text} type='text' placeholder={`Benefit Text ${index + 1}`} />
                        </div>
                    ))}
                    
                </div>

                <div style={{display:"flex",width:"100%",gap:"20px",justifyContent:"center",marginTop:"20px"}}>
                {step !== 5 && <button style={{width:"20%",backgroundColor:"#3A643B",color:"white",height:"40px",borderRadius:"10px",border:"none"}} onClick={handleNext}>Next</button>}
                {step !== 1 && <button style={{width:"20%",backgroundColor:"#3A643B",color:"white",height:"40px",borderRadius:"10px",border:"none"}} onClick={handleBack}>Back</button>}
                </div>
            </div>
        </>
    );
};

export default Second;
