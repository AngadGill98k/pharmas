import React, { useRef } from 'react';

const Add = ({ product, step, setStep }) => {
  let i_name = useRef();
  let s_name = useRef();
  let Sanskrit = useRef();
  let image = useRef();

  let handleNext = () => {
    // Update the shared product object
    product.current.name = i_name.current.value.trim();
    product.current.scientific_name = s_name.current.value.trim();
    product.current.sanskrit_name = Sanskrit.current.value.trim();
    product.current.image = image.current.files[0];

    console.log("Product after Add step:", product.current);

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
      <h2>Add Ingredients</h2>
      <input ref={i_name} type="text" placeholder="Ingredient name" />
      <input ref={s_name} type="text" placeholder="Scientific name" />
      <input ref={Sanskrit} type="text" placeholder="Sanskrit name" />
      <input ref={image} type="file" />
      
      <br />

      {step !== 5 && <button onClick={handleNext}>Next</button>}
      {step !== 1 && <button onClick={handleBack}>Back</button>}
    </>
  );
};

export default Add;
