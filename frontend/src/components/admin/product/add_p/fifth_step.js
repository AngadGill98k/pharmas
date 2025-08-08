import React from 'react';
import { useLocation } from 'react-router-dom';

const Fifth_step = ({step,product,setStep}) => {
 
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}
  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append('name', product.current.name);
    formData.append('subtitle', product.current.subtitle);
    formData.append('description', product.current.description);
    formData.append('primary_benefits', JSON.stringify(product.current.primary_benefits));
    // formData.append('secondary_benefits', JSON.stringify(product.current.secondary_benefits));
    formData.append('allIngredients', JSON.stringify(product.current.allIngredients));
    formData.append('faqs', JSON.stringify(product.current.faqs));
    formData.append('quantities', JSON.stringify(product.current.quantities));
    formData.append('primaryIngredients', JSON.stringify(product.current.primaryIngredients));

    formData.append('thumbnail',product.current.thumbnail);

    product.current.images.forEach((image,index)=>{
      formData.append('images', image)
    })
    

    let Secondary_Benefits_text=product.current.secondary_benefits.map((obj,index)=>{
      return obj.text
    })
    formData.append("secondary_benefits_text", JSON.stringify(Secondary_Benefits_text));

    let Secondary_Benefits_image=product.current.secondary_benefits.map((obj,index)=>{
      return obj.icon
    })
    Secondary_Benefits_image.map((image,index)=>{
      formData.append(`Secondary_Benefits_image`,image)
    })
    

    let dosage_text=product.current.dosage.map((obj,index)=>{
      return obj.text
    })
    formData.append("dosage_text", JSON.stringify(dosage_text));

    let dosage_image=product.current.dosage.map((obj,index)=>{
      return obj.file
    })
    dosage_image.map((image,index)=>{
      formData.append(`dosage_image`,image)
    })



    let usage_text=product.current.usage.map((obj,index)=>{
      return obj.text
    })
    formData.append("usage_text", JSON.stringify(usage_text));
    let usage_image=product.current.usage.map((obj,index)=>{
      return obj.file
    })
  
    
    usage_image.map((image,index)=>{
      formData.append(`usage_image`,image)
    })
    

    let duration_text=product.current.duration.map((obj,index)=>{
      return obj.text
    })
    let duration_image=product.current.duration.map((obj,index)=>{
      return obj.file
    })
    formData.append("duration_text", JSON.stringify(duration_text));
    
    duration_image.map((image,index)=>{
      formData.append(`duration_image`,image)
    })


    let additional_text=product.current.additionalDisplay.map((obj,index)=>{
      return obj.name
    })
    let additional_image=product.current.additionalDisplay.map((obj,index)=>{
      return obj.file
    })
    formData.append("additional_text", JSON.stringify(additional_text));
    
    additional_image.map((image,index)=>{
      formData.append(`additional_image`,image)
    })

    

    fetch('http://localhost:3001/add_product', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'X-CSRF-Token': getCookie('XSRF-TOKEN')
      },
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      if (data.msg) {
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
   <div style={{ marginTop: '40px' }}>
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

        <div style={{display:"flex",width:"100%",gap:"20px",justifyContent:"center",marginTop:"20px"}}>
                {step === 5 && <button style={{width:"20%",backgroundColor:"#3A643B",color:"white",height:"40px",borderRadius:"10px",border:"none"}} onClick={handleSubmit}>Submit</button>}
                {step !== 1 && <button style={{width:"20%",backgroundColor:"#3A643B",color:"white",height:"40px",borderRadius:"10px",border:"none"}} onClick={handleBack}>Back</button>}
                </div>
      </div>
    </>
  );
};

export default Fifth_step;



// import React from 'react';
// import { useLocation } from 'react-router-dom';

// const Fifth_step = ({step,product,setStep}) => {
 
// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
//   return null;
// }
// const handleSubmit = async () => {
//   const fd = new FormData();
//   const p = product.current;

//   fd.append('name', p.name);
//   fd.append('subtitle', p.subtitle);
//   fd.append('description', p.description);

//   // Quantities (array of objects)
//   fd.append('quantities', JSON.stringify(p.quantities));

//   // Thumbnail
//   if (p.thumbnail && p.thumbnail instanceof File) {
//     fd.append('thumbnail', p.thumbnail);
//   }

//   // Images (multiple files)
//   if (Array.isArray(p.images)) {
//     p.images.forEach((img, index) => {
//       if (img instanceof File) {
//         fd.append('images', img);
//       }
//     });
//   }

//   // Primary and secondary benefits
//   fd.append('primary_benefits', JSON.stringify(p.primary_benefits));
//   fd.append('secondary_benefits', JSON.stringify(p.secondary_benefits));

//   // Dosage
//   fd.append('dosage', JSON.stringify(p.dosage));
//   p.dosage.forEach((d, i) => {
//     if (d.file instanceof File) {
//       fd.append(`dosage_files`, d.file);
//     }
//   });

//   // Usage
//   fd.append('usage', JSON.stringify(p.usage));
//   p.usage.forEach((u, i) => {
//     if (u.file instanceof File) {
//       fd.append(`usage_files`, u.file);
//     }
//   });

//   // Duration
//   fd.append('duration', JSON.stringify(p.duration));
//   p.duration.forEach((d, i) => {
//     if (d.file instanceof File) {
//       fd.append(`duration_files`, d.file);
//     }
//   });

//   // Ingredients
//   fd.append('primaryIngredients', JSON.stringify(p.primaryIngredients));
//   fd.append('allIngredients', JSON.stringify(p.allIngredients));

//   // FAQs
//   fd.append('faqs', JSON.stringify(p.faqs));

//   // Additional display (images with name)
//   fd.append('additionalDisplay', JSON.stringify(p.additionalDisplay));
//   p.additionalDisplay.forEach((item, i) => {
//     if (item.file instanceof File) {
//       fd.append(`additionalDisplay_files`, item.file);
//     }
//   });

  

//   try {
//     const res = await fetch('http://localhost:3001/add_product', {
//       method: 'POST',
//       credentials: 'include',
//       headers: {
//         'X-CSRF-Token': getCookie('XSRF-TOKEN')
//       },
//       body: fd
//     });

//     const data = await res.json();
//     console.log(data);
//   } catch (err) {
//     console.error(err);
//   }
// };


//   const handleBack = () => {
//     if (step > 1) setStep(step - 1);
//   };
//   return (
//     <>
//       <div className='container'>
//         <h2>Review Your Product</h2>
//         <pre style={{ 
//           background: '#111', 
//           color: '#0f0', 
//           padding: '10px', 
//           borderRadius: '8px', 
//           fontSize: '14px',
//           overflowX: 'auto'
//         }}>
//           {JSON.stringify(product, null, 2)}
//         </pre>

//         <button onClick={handleSubmit} style={{
//           marginTop: '20px',
//           padding: '10px 20px',
//           fontSize: '16px',
//           backgroundColor: '#4CAF50',
//           color: 'white',
//           border: 'none',
//           borderRadius: '4px',
//           cursor: 'pointer'
//         }}>
//           Submit
//         </button>

//         {step !== 1 && (
//           <button onClick={handleBack} style={{
//             marginLeft: '10px',
//             padding: '10px 20px',
//             fontSize: '16px',
//             backgroundColor: '#888',
//             color: 'white',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer'
//           }}>
//             Back
//           </button>
//         )}
//       </div>
//     </>
//   );
// };

// export default Fifth_step;
