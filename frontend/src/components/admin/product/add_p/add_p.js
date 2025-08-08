import React, { useEffect, useReducer, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Add_p = ({ product, step, setStep }) => {

    let p_name = useRef()
    let subtitle = useRef()
    let quantity = useRef([])
    let qn = useRef()
    let month = useRef()
    let price = useRef()
    let description = useRef()
    let image = useRef()
    let images = useRef()

    let [, forceUpdate] = useReducer(x => x + 1, 0);

    let handleclick = () => {
        let obj = {
            quantity: qn.current.value,
            price: price.current.value,
            month: month.current.value
        };
        forceUpdate()
        quantity.current.push(obj)
        console.log("added nw quantity", obj)
    }

    let handleNext = () => {
        let thumbnail = image.current.files[0];
        let imagefiles = Array.from(images.current.files);
        product.current.name = p_name.current.value.trim();
        product.current.subtitle = subtitle.current.value.trim();
        product.current.description = description.current.value.trim();
        product.current.quantities = quantity.current
        product.current.thumbnail = thumbnail
        product.current.images = imagefiles
        console.log(product);
        if (step < 5) {
            setStep(prev => prev + 1);
        }
    };

    let handleBack = () => {
        if (step > 1) {
            setStep(prev => prev - 1);
        }
    };
    let handleimages = () => {
        console.log(images.current.files)
        forceUpdate()
    }
    let handleThumbnail = () => {
        console.log(image.current.files)
        forceUpdate()
    }
    useEffect(() => {
        console.log("uploaded")
    },[images.current])
    return (
        <>

            <div className='step1' style={{ marginTop: '40px' }} >
                <p> General Information</p>
                <div style={{width:"100%",display:"flex",flexDirection:"column",gap:"10px",marginBottom:"30px"}}>
                    <input style={{paddingLeft:"10px",width:"100%", height: "40px", border: "2px solid #ccc",  borderRadius: "13px" }} ref={p_name} type='text' placeholder='Product Name'></input>
                    <input style={{paddingLeft:"10px",width:"100%", height: "40px", border: "2px solid #ccc",  borderRadius: "13px" }} ref={subtitle} type='text' placeholder='Subtitle'></input>
                
                </div>
                <div>
                    <div style={{ display: "flex", justifyContent: 'space-between' }}>
                        <input style={{ paddingLeft:"10px",height: "40px", border: "2px solid #ccc", width: "20%", borderRadius: "13px" }} ref={qn} type='number' placeholder='Quantiy in gm'></input>
                        <input style={{ paddingLeft:"10px",height: "40px", border: "2px solid #ccc", width: "20%", borderRadius: "13px" }} ref={month} type='number' placeholder='ex-1 is 1 jar in 1 month'></input>
                        <div style={{ height: "40px", width: "30%",justifyContent:"space-between",display:"flex" }}>
                            <input style={{ paddingLeft:"10px",height: "100%", border: "2px solid #ccc", width: "70%", borderRadius: "13px" }} ref={price} type='number' placeholder='Price'></input>
                            <button style={{backgroundColor:"#3A643B",color:"white",height:"100%",borderRadius:"10px",border:"none"}} onClick={handleclick}>ADD</button>
                        </div>
                    </div>
                    <ul style={{listStyle:"none",padding:"0%"}}>{quantity.current.map((item, index) => {
                        return (
                            <>
                                <div style={{ height: "40px", width: "100%",display: "flex", justifyContent: 'space-between',borderBottom:"1px solid #ccc" }}>
                                    <li style={{alignItems:"center", width: "20%", fontWeight: "bold",display:"flex",justifyContent:"center" }} >{item.month}</li>
                                    <li style={{ width: "20%", alignItems:"center",fontWeight: "bold",display:"flex",justifyContent:"center" }}>{item.price}</li>
                                    <li style={{ width: "20%", fontWeight: "bold",alignItems:"center",display:"flex",justifyContent:"start" }}>{item.quantity}</li>
                                </div>
                            </>
                        )
                    })}
                    </ul>

                </div>

                <input style={{ paddingLeft:"10px",height: "40px", border: "2px solid #ccc", width: "100%", borderRadius: "13px" }} ref={description} type='text' placeholder='Product Description'></input>
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
    borderRadius: "10px",
    border: "2px dashed #ccc",
    cursor: "pointer",
    fontWeight: "bold",
    fontFamily: "sans-serif",
    color: "#555"
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
                    <div style={{borderRadius:"15px",padding:"20px",height:"15rem",display:"flex",gap:"20px",justifyContent:"space-between",boxSizing:"border-box",marginTop:"20px",border:'1px solid #e6e6e6'}}>
                        <div style={{ overflow: "auto",display:"flex",width:"70%"}}>
                          {image.current?.files?.[0]&&  Array.from(images.current.files).map((file, index) => (
        <img
          key={index}
          src={URL.createObjectURL(file)}
          alt={`upload-${index}`}
          style={{
            height: "100%",
            width: "auto",
            borderRadius: "10px",
            objectFit: "cover",
            flexShrink: 0,
          }}
        />
      ))}
                        </div>
<div 
  onClick={() => images.current.click()}
  style={{
    backgroundColor: "#EAF2EA",
    height: "100%",
    width: "30%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    border: "2px dashed #ccc",
    cursor: "pointer",
    fontWeight: "bold",
    fontFamily: "sans-serif",
    color: "#555"
  }}
>
  Upload Image
  <input
    onChange={handleimages}
    ref={images}
    type="file"
    multiple
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
            </div>
        </>
    )
}

export default Add_p