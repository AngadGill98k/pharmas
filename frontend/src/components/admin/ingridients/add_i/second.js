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
            <div className='container'>
                <div>
                    <p>Why to Use</p>
                    {uses.current.map((ref, index) => (
                        <li key={index}>
                            <input ref={ref} type='text' placeholder={`Use ${index + 1}`} />
                        </li>
                    ))}
                    <button onClick={handleuse}>Add Use</button>
                </div>

                <div>
                    <p>Prakriti Impact</p>
                    <input ref={vata} type='text' placeholder='Vata' />
                    <input ref={kapha} type='text' placeholder='Kapha' />
                    <input ref={v_reason} type='text' placeholder='Vata Reason' />
                    <input ref={k_reason} type='text' placeholder='Kapha Reason' />
                </div>

                <div>
                    <p>Benefits</p>
                    {benefits.current.map((ref, index) => (
                        <div key={index}>
                            <input ref={ref.image} type='file' placeholder={`Benefit Image ${index + 1}`} />
                            <input ref={ref.text} type='text' placeholder={`Benefit Text ${index + 1}`} />
                        </div>
                    ))}
                    <button onClick={handlebenefits}>Add Benefit</button>
                </div>

                <br />
                {step !== 5 && <button onClick={handleNext}>Next</button>}
                {step !== 1 && <button onClick={handleBack}>Back</button>}
            </div>
        </>
    );
};

export default Second;
