import React, { useRef, useReducer } from 'react';

const Fourth_step = ({ product, step, setStep }) => {
  const faqRefs = useRef([]);
  const productDisplayRefs = useRef([]);
  const [, forceRender] = useReducer(x => x + 1, 0);

  const handleAddFAQ = () => {
    faqRefs.current.push({
      q: React.createRef(),
      a: React.createRef()
    });
    forceRender();
  };

  const handleAddProductDisplay = () => {
    productDisplayRefs.current.push({
      img: React.createRef(),
      name: React.createRef()
    });
    forceRender();
  };

  const handleNext = () => {
    const getFAQValues = refs =>
      refs.current.map(refSet => ({
        question: refSet.q.current?.value.trim() || "",
        answer: refSet.a.current?.value.trim() || ""
      })).filter(faq => faq.question || faq.answer);

    const getProductDisplays = refs =>
      refs.current.map(refSet => ({
        name: refSet.name.current?.value.trim() || "",
        file: refSet.img.current?.files?.[0] || null
      })).filter(item => item.name || item.file);

    product.current.faqs = getFAQValues(faqRefs);
    product.current.additionalDisplay = getProductDisplays(productDisplayRefs);
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
      <p>Step 4: FAQ & Additional Display</p>

      {/* FAQ Section */}
      <div>
        <p>FAQs</p>
        <ul>
          {faqRefs.current.map((refSet, index) => (
            <li key={index}>
              <input ref={refSet.q} type="text" placeholder="Question" />
              <input ref={refSet.a} type="text" placeholder="Answer" />
            </li>
          ))}
        </ul>
        <button onClick={handleAddFAQ}>Add FAQ</button>
      </div>

      {/* Additional Product Display */}
      <div>
        <p>Additional Product Display</p>
        <ul>
          {productDisplayRefs.current.map((refSet, index) => (
            <li key={index}>
              <input ref={refSet.img} type="file" accept="image/*" />
              <input ref={refSet.name} type="text" placeholder="Product Name" />
            </li>
          ))}
        </ul>
        <button onClick={handleAddProductDisplay}>Add Product</button>
      </div>

      {/* Navigation Buttons */}
      {step !== 5 && <button onClick={handleNext}>Next</button>}
      {step !== 1 && <button onClick={handleBack}>Back</button>}
    </div>
  );
};

export default Fourth_step;
