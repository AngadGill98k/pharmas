import React, { useReducer, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Add_p = ({ product, step, setStep }) => {
    
    let p_name=useRef()
    let subtitle=useRef()
    let quantity=useRef([])
    let qn=useRef()
    let month=useRef()
    let price=useRef()
    let description=useRef() 
    let image=useRef()
    let images=useRef()
   
let [, forceUpdate] = useReducer(x => x + 1, 0);

    let handleclick=()=>{
        let obj = {
            quantity: qn.current.value,
            price: price.current.value,
            month: month.current.value
        };
        forceUpdate()
        quantity.current.push(obj)
        console.log("added nw quantity",obj)
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
    return (
        <>
       
            <div className='step1'>
                <p> General Information</p>
                <input ref={p_name} type='text' placeholder='Product Name'></input>
                <input ref={subtitle} type='text' placeholder='Subtitle'></input>
                <div>
                    <input ref={qn} type='number' placeholder='Quantiy in gm'></input>
                    <input ref={month} type='number' placeholder='ex-1 is 1 jar in 1 month'></input>
                    <input ref={price} type='number' placeholder='Price'></input>
                    <ul>{quantity.current.map((item,index)=>{
                        return(
                            <>
                            <li>{item.month}</li>
                            <li>{item.price}</li>
                            <li>{item.quantity}</li>
                            </>
                        )
                    })}
                    </ul>
                    <button onClick={handleclick}>add</button>
                </div>
                
                <input  ref={description} type='text' placeholder='Product Description'></input>
                <div>
                    <div className='display'>

                    </div>
                    <div>
                        <input ref={image} type='file' placeholder='upload image'></input>
                        <input ref={images} type='file' placeholder='upload image'></input>
                        
                    </div>
                </div>
                {step !== 5 && <button onClick={handleNext}>Next</button>}
      {step !== 1 && <button onClick={handleBack}>Back</button>}
            </div>
        </>
    )
}

export default Add_p