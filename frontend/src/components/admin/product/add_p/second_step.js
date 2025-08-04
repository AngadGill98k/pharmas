import React, { useRef, useReducer } from 'react';

const Second_step = ({ product, step, setStep }) => {
  const primaryRefs = useRef([]);
  const secondaryRefs = useRef([]);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const handleAddPrimary = () => {
    primaryRefs.current.push(React.createRef());
    forceUpdate();
  };

  const handleAddSecondary = () => {
    secondaryRefs.current.push({
      image: React.createRef(),
      text: React.createRef()
    });
    forceUpdate();
  };

  const handleNext = () => {
    const primaryValues = primaryRefs.current
      .map(ref => ref.current?.value?.trim())
      .filter(Boolean);

    const secondaryValues = secondaryRefs.current
      .map(ref => ({
        icon: ref.image.current?.files[0],
        text: ref.text.current?.value?.trim()
      }))
      .filter(item => item.text);

    product.current.primary_benefits = primaryValues;
    product.current.secondary_benefits = secondaryValues;
      console.log(product);
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
    <>
      <div className="container">
        <p>Step 2: Add Benefits</p>

        {/* Primary Benefits */}
        <div>
          <p>Primary Benefits</p>
          <ul>
            {primaryRefs.current.map((ref, index) => (
              <li key={index}>
                <input ref={ref} type="text" placeholder={`Primary Benefit ${index + 1}`} />
              </li>
            ))}
          </ul>
          <button onClick={handleAddPrimary}>Add Primary</button>
        </div>

        {/* Secondary Benefits */}
        <div>
          <p>Secondary Benefits</p>
          <ul>
            {secondaryRefs.current.map((ref, index) => (
              <li key={index}>
                <input ref={ref.image} type="file" />
                <input ref={ref.text} type="text" placeholder={`Secondary Benefit ${index + 1}`} />
              </li>
            ))}
          </ul>
          <button onClick={handleAddSecondary}>Add Secondary</button>
        </div>

        {/* Navigation Buttons */}
        <div>
          {step !== 5 && <button onClick={handleNext}>Next</button>}
          {step !== 1 && <button onClick={handleBack}>Back</button>}
        </div>
      </div>
    </>
  );
};

export default Second_step;
