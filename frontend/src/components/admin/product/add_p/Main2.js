import React, { useRef, useState } from 'react';
import Add_p from './add_p';
import Second_step from './second_step';
import Third_step from './third_step';
import Fourth_step from './fourth_step';
import Fifth_step from './fifth_step';
import './Main2.css';

const Main2 = () => {
  const product = useRef({});
  const [step, setStep] = useState(1);

  const steps = [
    'General Information',
    'Benefits',
    'Properties',
    'FAQ',
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

  return (
    <> 
    
    <Stepper currentStep={step} />

      {step === 1 && <Add_p product={product} step={step} setStep={setStep} />}
      {step === 2 && <Second_step product={product} step={step} setStep={setStep} />}
      {step === 3 && <Third_step product={product} step={step} setStep={setStep} />}
      {step === 4 && <Fourth_step product={product} step={step} setStep={setStep} />}
      {step === 5 && <Fifth_step product={product} step={step} setStep={setStep} />}
    
  
      
    </>
  );
};

export default Main2;
