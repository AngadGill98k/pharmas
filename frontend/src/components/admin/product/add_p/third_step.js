import React, { useRef, useReducer } from 'react';

const Third_step = ({ product, step, setStep }) => {
  const dosage = useRef([]);
  const usage = useRef([]);
  const primaryIngredients = useRef([]);
  const allIngredients = useRef([]);
  const duration = useRef([]);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const handledosage = () => {
    dosage.current.push({
      image: React.createRef(),
      text: React.createRef()
    });
    forceUpdate();
  };

  const handleusage = () => {
    usage.current.push({
      image: React.createRef(),
      text: React.createRef()
    });
    forceUpdate();
  };

  const handlePrimary = () => {
    primaryIngredients.current.push(React.createRef());
    forceUpdate();
  };

  const handleAll = () => {
    allIngredients.current.push(React.createRef());
    forceUpdate();
  };

  const handleDuration = () => {
    duration.current.push({
      image: React.createRef(),
      text: React.createRef()
    });
    forceUpdate();
  };

  const getTextValues = (refArray) =>
    refArray.current.map(ref => ref.current?.value?.trim()).filter(Boolean);

  const getImageTextPairs = (refArray) =>
    refArray.current.map(({ image, text }) => ({
      file: image.current?.files?.[0] || null,
      text: text.current?.value?.trim() || ''
    })).filter(item => item.file || item.text);

  const handleNext = () => {
    product.current.dosage = getImageTextPairs(dosage);
    product.current.usage = getImageTextPairs(usage);
    product.current.duration = getImageTextPairs(duration);
    product.current.primaryIngredients = getTextValues(primaryIngredients);
    product.current.allIngredients = getTextValues(allIngredients);
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
    <div className="container">
      <p>Step 3: Composition</p>

      {/* Dosage */}
      <div>
        <p>Dosage</p>
        <ul>
          {dosage.current.map((ref, index) => (
            <li key={index}>
              <input ref={ref.image} type="file" />
              <input ref={ref.text} type="text" placeholder={`Dosage ${index + 1}`} />
            </li>
          ))}
        </ul>
        <button onClick={handledosage}>Add Dosage</button>
      </div>

      {/* Usage */}
      <div>
        <p>Usage</p>
        <ul>
          {usage.current.map((ref, index) => (
            <li key={index}>
              <input ref={ref.image} type="file" />
              <input ref={ref.text} type="text" placeholder={`Usage ${index + 1}`} />
            </li>
          ))}
        </ul>
        <button onClick={handleusage}>Add Usage</button>
      </div>

      {/* Primary Ingredients */}
      <div>
        <p>Primary Ingredients</p>
        <ul>
          {primaryIngredients.current.map((ref, index) => (
            <li key={index}>
              <input ref={ref} type="text" placeholder={`Primary ${index + 1}`} />
            </li>
          ))}
        </ul>
        <button onClick={handlePrimary}>Add Primary Ingredient</button>
      </div>

      {/* All Ingredients */}
      <div>
        <p>All Ingredients</p>
        <ul>
          {allIngredients.current.map((ref, index) => (
            <li key={index}>
              <input ref={ref} type="text" placeholder={`Ingredient ${index + 1}`} />
            </li>
          ))}
        </ul>
        <button onClick={handleAll}>Add Ingredient</button>
      </div>

      {/* Duration */}
      <div>
        <p>Duration</p>
        <ul>
          {duration.current.map((ref, index) => (
            <li key={index}>
              <input ref={ref.image} type="file" />
              <input ref={ref.text} type="text" placeholder={`Duration ${index + 1}`} />
            </li>
          ))}
        </ul>
        <button onClick={handleDuration}>Add Duration</button>
      </div>

      {/* Navigation */}
      {step !== 5 && <button onClick={handleNext}>Next</button>}
      {step !== 1 && <button onClick={handleBack}>Back</button>}
    </div>
  );
};

export default Third_step;
