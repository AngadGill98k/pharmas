import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Add from './add';
import Second from './second';
import Third from './third';
import Fourth from './fourth';
import Fifth from './fifth';
import './main.css'; // Ensure this file contains your stepper styles

const Main = () => {
    let navigation = useNavigate();
    let product = useRef({});
    let [step, setStep] = useState(1);

    const steps = [
        'General Information',
        'Benefits',
        'Properties',
        'Other',
        'Overview'
    ];

    const Stepper = ({ currentStep }) => {
        return (
            <div className="stepper">
                {steps.map((label, index) => {
                    const stepNumber = index + 1;
                    const isCompleted = currentStep > stepNumber;
                    const isActive = currentStep === stepNumber;

                    return (
                        <div className="step-item" key={index}>
                            <div
                                className={`step-circle ${
                                    isCompleted ? 'completed' : isActive ? 'active' : ''
                                }`}
                            >
                                {isCompleted ? '✔' : `0${stepNumber}`}
                            </div>
                            <div className="step-label">{label}</div>
                            {index !== steps.length - 1 && (
                                <div
                                    className={`step-line ${
                                        currentStep > stepNumber ? 'line-filled' : ''
                                    }`}
                                ></div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    useEffect(() => {
        console.log(product);
    }, [product]);

    return (
        <>
            <Stepper currentStep={step} />

            <div className="">
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
