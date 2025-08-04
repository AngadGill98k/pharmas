import React, { useEffect } from 'react'
import Footer from '../footer/footer'
import "./product.css"
import { useLocation } from 'react-router-dom';
import Navbar from '../nav/Navbar';
const Product = () => {
    let location = useLocation();
    let product=location.state
    useEffect(() => {
        console.log(product);
    },[])

    let handleimage=(image)=>{
        
    }
  return (
    <>
    <Navbar/>
    <div className='product_container'>
        <div className='product_wrapper'>

        
    <img src={`http://localhost:3001/uploads/${product.image}`} alt="Product Thumnail" />
    <h2>{product.name}|{product.scientific_name}|{product.sanskrit_name}</h2>
    <h2>₹{product.price}</h2>
    <div >
    {product.quantities.map((quantity,index)=>{
        return(
            <div className='quantity'>
                <div style={{width:"33%",textAlign:"center",backgroundColor: "#EEEEEE"}}>
                <p style={{fontSize:'larger'}}>{quantity.quantity}</p>
                <p style={{}}>{quantity.month}</p>
                <p style={{fontWeight:"bold"}}>{quantity.price}</p>
                
                </div>
                
            </div>
        )
    })}
    </div>
    <p>{product.description}</p>
    <h3>Primary Benefits</h3>
    <ul style={{padding:0,margin:0}}>
        {product.primary_benefits.map((benefit,index)=>{
            return(
                <li style={{listStyle:`http://localhost:3001/uploads/Frame.png`,listStyle:"none"}}>{benefit}</li>
            )
        })}
    </ul>
    <h3>Secondary Benefits</h3>
    <ul className='Secondary_b'>
        {product.secondary_benefits.map((benefit,index)=>{
            return(
                <li className='Secondary_b_list' >{benefit.text}</li>
            )
        })}
    </ul>
    <h3>Dosage</h3>
    <ul className='Dosage'>
        {product.dosage.map((dosage,index)=>{
            return(
                <li style={{listStyle:dosage.image}}>{dosage.text}</li>
            )
        })}
        </ul>
        <h3>Usage</h3>
         <ul className='Dosage'>    
        {product.usage.map((usage,index)=>{
            return(
                <li style={{listStyle:usage.image}}>{usage.text}</li>
            )
        })}
        </ul>
    <h3>Primary Ingredients</h3>
    <ul className='primary'>
        {product.primaryIngredients.map((ingredient,index)=>{
            return(
                <li  className='primary_list'>{ingredient.text}</li>
            )
        })}
    </ul>
    <h3>All Ingredients</h3>
    <div>
        {product.allIngredients.map((ingredient,index)=>{
            return(
                <>
                <div>
                    <img src={`http://localhost:3001/uploads/${ingredient.image}`} alt="" />
                    <p>{ingredient.text}</p>
                </div>
                </>
            )
        })}
    </div>
    <h3>Duration</h3>
    {product.duration.map((duration,index)=>{
        return(
            <li style={{listStyle:duration.image}}>{duration.text}</li>
        )
    })}</div>
    </div>
    <Footer/>
  </>
  )
}

export default Product