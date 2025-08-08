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
    <div style={{ marginTop: '40px' }}>
     

      {/* FAQ Section */}
      <div>
        <p>FAQs</p>
        <ul style={{ listStyle: 'none'}}>
          {faqRefs.current.map((refSet, index) => (
            <li key={index}>
              <div style={{ display: 'flex', gap: '10px', }}>
              <input ref={refSet.q} style={{
                  width:"30%",
                  height: '40px',
                  border: '2px solid #ccc',
                  borderRadius: '13px',
                  paddingLeft: '10px',
                  marginBottom: "10px"
                }} type="text" placeholder="Question" />
              <input ref={refSet.a} style={{
                  width:"30%",
                  height: '40px',
                  border: '2px solid #ccc',
                  borderRadius: '13px',
                  paddingLeft: '10px',
                  marginBottom: "10px"
                }} type="text" placeholder="Answer" />
              <button style={{background:"none", border:"none"}} onClick={() => faqRefs.current.splice(index, 1)}>X</button>
              </div>
            </li>
          ))}
        </ul>
        <button style={{background:"none",border:"none",fontWeight:"bold",fontSize:"14px",cursor:"pointer",color:"#3A643C"}}  onClick={handleAddFAQ}>Add FAQ</button>
      </div>

      {/* Additional Product Display */}
      <div>
        <p>Additional Product Display</p>
        <ul >
          {productDisplayRefs.current.map((refSet, index) => (
            <li key={index}>
              <input ref={refSet.img} type="file" accept="image/*" />
              <input ref={refSet.name} type="text" placeholder="Product Name" />
            </li>
          ))}
        </ul>
        <button style={{background:"none",border:"none",fontWeight:"bold",fontSize:"14px",cursor:"pointer",color:"#3A643C"}}  onClick={handleAddProductDisplay}>Add Product</button>
      </div>

      <div style={{display:"flex",width:"100%",gap:"20px",justifyContent:"center",marginTop:"20px"}}>
                {step !== 5 && <button style={{width:"20%",backgroundColor:"#3A643B",color:"white",height:"40px",borderRadius:"10px",border:"none"}} onClick={handleNext}>Next</button>}
                {step !== 1 && <button style={{width:"20%",backgroundColor:"#3A643B",color:"white",height:"40px",borderRadius:"10px",border:"none"}} onClick={handleBack}>Back</button>}
                </div>
    </div>
  );
};

export default Fourth_step;
