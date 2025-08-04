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
      <div className='container'>
        <div>
          <p>Ayurvedic Properties</p>
          <input ref={rasa} type='text' placeholder='Rasa' />
          <input ref={veerya} type='text' placeholder='Veerya' />
          <input ref={guna} type='text' placeholder='Guna' />
          <input ref={vipaka} type='text' placeholder='Vipaka' />
        </div>

        <div>
          <p>Important Formulations</p>
          {Formulations.current.map((ref, index) => (
            <div key={index}>
              <input ref={ref.text} type='text' placeholder={`Formulation ${index + 1}`} />
              <input ref={ref.image} type='file' />
            </div>
          ))}
          <button onClick={handleAdd}>Add Formulation</button>
        </div>

        <div>
          <p>Therapeutic Uses</p>
          {Therapeutic.current.map((ref, index) => (
            <div key={index}>
              <input ref={ref.text} type='text' placeholder={`Therapeutic Use ${index + 1}`} />
              <input ref={ref.image} type='file' />
            </div>
          ))}
          <button onClick={handleUses}>Add Use</button>
        </div>

        <br />
        {step !== 5 && <button onClick={handleNext}>Next</button>}
        {step !== 1 && <button onClick={handleBack}>Back</button>}
      </div>
    </>
  );
};

export default Third;
