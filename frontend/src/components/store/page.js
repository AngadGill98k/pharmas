import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import "./page.css"
const Page = () => {
    let [products,setProducts]=useState([]);
    let naviagte=useNavigate();
    useEffect(() => {
        fetch('http://localhost:3001/get_products', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json())
        .then(data => {
          if(data.msg){
            console.log(data);
            setProducts(data.products);
          }
          console.log(data);
        })
        .catch(err => console.error(err));
    },[])
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }
    let handleclick = (product) => {
        naviagte('/product',{state:product});
    }

    let handleAdd=(product)=>{
        fetch('http://localhost:3001/add_to_cart', {
            headers:{
                'Content-Type': 'application/json',
                'X-CSRF-Token': getCookie('XSRF-TOKEN')
            },
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({product_id:product._id})
        })
        .then(res => res.json())
        .then(data => {
            if(data.msg){
                console.log(data);
            }
            console.log(data);
        })
        .catch(err => console.error(err));
    }
  return (
    <div className='page_container'>
        {products && products.map((product,index)=>{
            
            return(
                <div id='product' product={product} onClick={() => handleclick(product)}>
                    <div className='product_image'>
                      <img style={{width: '100%',height: '100%',objectFit: 'cover',borderRadius: '10px'}} src={`http://localhost:3001/uploads/${product.thumbnail}`} alt={product.name}></img>
                    </div>
                    <span>{product.name}</span>
                    <span>{product.price}</span>
                    <span>rating</span>
<                   button onClick={() => handleAdd(product)}>Add to Cart</button>
                    </div> 
            )
        })}
    </div>
  )
}

export default Page