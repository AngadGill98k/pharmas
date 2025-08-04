import React from 'react';
import { useNavigate } from 'react-router-dom';

const Fifth = ({ product, step, setStep }) => {
  const navigate = useNavigate();
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}
  const handleSubmit = () => {
    console.log("Final Product Submission:", product);
    let formData=new FormData();
    formData.append('name',product.current.name);
    formData.append('scientific_name',product.current.scientific_name);
    formData.append('sanskrit_name',product.current.sanskrit_name);
    

    formData.append('image',product.current.image);


    formData.append('uses',JSON.stringify(product.current.uses));
    formData.append('vata',product.current.vata);
    formData.append('kapha',product.current.kapha);
    formData.append('v_reason',product.current.v_reason);
    formData.append('k_reason',product.current.k_reason);


    let benefits_text=product.current.benefits.map((obj,index)=>{
      return obj.text
    })
    formData.append("benefits_text",JSON.stringify(benefits_text));

    let benefits_image=product.current.benefits.map((obj,index)=>{
      return obj.image
    })
    benefits_image.map((image,index)=>{
      formData.append(`benefits_image`,image)
    })


    formData.append('rasa',product.current.rasa);
    formData.append('veerya',product.current.veerya);
    formData.append('guna',product.current.guna);
    formData.append('vipaka',product.current.vipaka);
    

    let Formulations_text=product.current.formulations.map((obj,index)=>{
      return obj.text
    })
    formData.append("Formulations_text",JSON.stringify(Formulations_text));

    let Formulations_image=product.current.formulations.map((obj,index)=>{
      return obj.image
    })
    Formulations_image.map((image,index)=>{
      formData.append(`Formulations_image`,image)
    })


    let Therapeutic_text=product.current.therapeutic_uses.map((obj,index)=>{
      return obj.text
    })
    formData.append("Therapeutic_text",JSON.stringify(Therapeutic_text));

    let Therapeutic_image=product.current.therapeutic_uses.map((obj,index)=>{
      return obj.image
    })
    Therapeutic_image.map((image,index)=>{
      formData.append(`Therapeutic_image`,image)
    })


    formData.append('combinedWith',product.current.combinedWith);
    formData.append('geographicalLocations',product.current.geographicalLocations);
    formData.append('plantParts',JSON.stringify(product.current.plantParts));


    fetch('http://localhost:3001/add_ing', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'X-CSRF-Token': getCookie('XSRF-TOKEN')
      },
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      if(data.msg){
        console.log(data);
      }
      console.log(data);
    })
    .catch(err => console.error(err));
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <>
      <div className='container'>
        <h2>Review Your Product</h2>
        <pre style={{ 
          background: '#111', 
          color: '#0f0', 
          padding: '10px', 
          borderRadius: '8px', 
          fontSize: '14px',
          overflowX: 'auto'
        }}>
          {JSON.stringify(product, null, 2)}
        </pre>

        <button onClick={handleSubmit} style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Submit
        </button>

        {step !== 1 && (
          <button onClick={handleBack} style={{
            marginLeft: '10px',
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#888',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Back
          </button>
        )}
      </div>
    </>
  );
};

export default Fifth;
