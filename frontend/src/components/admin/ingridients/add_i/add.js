import React, { useRef } from 'react';

const Add = ({ product, step, setStep }) => {
  let i_name = useRef();
  let s_name = useRef();
  let Sanskrit = useRef();
  let image = useRef();
  let [, forceupdate] = React.useReducer(x => x + 1, 0);
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
  let handleThumbnail = () => {
    forceupdate();
  };
  return (
    <>
      <h2 style={{padding:"2%"}}>General Information</h2>
      <div style={{ display: "flex", flexDirection:"row",height:"50px"}}>
      <input style={{border: "2px solid #ccc",width:"30%",borderRadius:"13px",marginLeft:"2%"}} ref={i_name} type="text" placeholder="Ingredient name" />
      <input style={{border: "2px solid #ccc",width:"30%",borderRadius:"13px",marginLeft:"2%"}} ref={s_name} type="text" placeholder="Scientific name" />
      <input style={{border: "2px solid #ccc",width:"30%",borderRadius:"13px",marginLeft:"2%"}} ref={Sanskrit} type="text" placeholder="Sanskrit name" />
      </div>
            <input style={{marginTop:"20px",marginBottom:"20px",border: "2px solid #ccc",width:"96%",borderRadius:"13px",height:"50px",marginLeft:"2%"}} ref={i_name} type="text" placeholder="Ingredient name" />
      <div>
      <h2>Thumbnail</h2>
                    <div style={{borderRadius:"15px",padding:"20px",height:"15rem",display:"flex",gap:"20px",justifyContent:"space-between",boxSizing:"border-box",marginTop:"20px",border:'1px solid #e6e6e6'}}>
                                               <div style={{ overflow: "auto",display:"flex",width:"70%"}}>

                        {image.current?.files?.[0] &&<img src={URL.createObjectURL(image.current.files[0])} style={{height:"100%",width:"100%",borderRadius:"10px",objectFit:"cover",flexShrink:0}}/>}
</div>
<div 
  onClick={() => image.current.click()}
  style={{
    backgroundColor: "#EAF2EA",
    height: "100%",
    width: "30%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "12px",
    border: "2px dashed #ccc",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#555",
    fontFamily: "sans-serif"
  }}
>
  Upload Thumbnail
  <input
    onChange={handleThumbnail}
    ref={image}
    type="file"
    style={{ display: "none" }}
    accept="image/*"
  />
</div>
                    </div>
      </div>
      
<div style={{display:"flex",width:"100%",gap:"20px",justifyContent:"center",marginTop:"20px"}}>
                {step !== 5 && <button style={{width:"20%",backgroundColor:"#3A643B",color:"white",height:"40px",borderRadius:"10px",border:"none"}} onClick={handleNext}>Next</button>}
                {step !== 1 && <button style={{width:"20%",backgroundColor:"#3A643B",color:"white",height:"40px",borderRadius:"10px",border:"none"}} onClick={handleBack}>Back</button>}
                </div>
    </>
  );
};

export default Add;
