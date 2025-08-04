import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Add from './add';
import Second from './second';
import Third from './third';
import Fourth from './fourth';
import Fifth from './fifth';

const Main = () => {
    let navigation = useNavigate();
    let product = useRef({});
    let [step, setStep] = useState(1);

    const handleBack = () => {
        if (step === 1) return;
        setStep(prev => prev - 1);
        console.log(step);
    };

    const handleNext = () => {
        if (step === 5) return;
        setStep(prev => prev + 1);
        console.log(step);
    };

    const handleSubmit = () => {
        // Submission logic will go here
    };
    useEffect(() => {
      
    console.log(product);
    
    }, [product])
    
    return (
        <>
            <div className="container">
                {step === 1 && <Add product={product} step={step} setStep={setStep} />}
                {step === 2 && <Second product={product} step={step} setStep={setStep} />}
                {step === 3 && <Third product={product} step={step} setStep={setStep} />}
                {step === 4 && <Fourth product={product} step={step} setStep={setStep} />}
                {step === 5 && <Fifth product={product} step={step} setStep={setStep} />}
            </div>
        </>
    );
};

export default Main;
