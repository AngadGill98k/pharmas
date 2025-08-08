import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import "./page.css"
const Page = () => {
  let [products, setProducts] = useState([]);
  let naviagte = useNavigate();
  useEffect(() => {
    fetch('http://localhost:3001/get_store_products', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.msg) {
          console.log(data);
          setProducts(data.products);
        }
        console.log(data);
      })
      .catch(err => console.error(err));
  }, [])
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }
  let handleclick = (product) => {
    naviagte('/product', { state: product });
  }

  let handleAdd = (product) => {
     fetch('http://localhost:3001/cart', {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': getCookie('XSRF-TOKEN')
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ product_id: product._id })
    })
      .then(res => res.json())
      .then(data => {
        if (data.msg) {
          console.log(data);
        }
        console.log(data);
      })
      .catch(err => console.error(err));
  }
  return (
    <div className='page_container'>
      <div style={{ width: "80%", boxSizing: "border-box", flexWrap: "wrap", display: "flex", }}>
        {products && products.map((product, index) => {

          return (
            <div id='product' product={product} >
              <div onClick={() => handleclick(product)} className='product_image'>
                <img style={{ width: '100%', objectFit: 'contain', borderRadius: '10px' }} src={`http://localhost:3001/uploads/${product.thumbnail}`} alt={product.name}></img>
              </div>
              <div style={{ width: "100%", height: "5rem", display: "flex", flexDirection: "row",justifyContent:"space-between" }}>
                <div style={{width:"85%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                  <span style={{ fontSize: '18px', fontWeight: 'semibold', textAlign: "center" }}>{product.name} | {[product.subtitle]}</span>
                  <span style={{ fontSize: '14.36px', fontWeight: 'semibold', textAlign: "center", marginTop: "5px", color: "#2E2F2E" }}>${product.quantities[0].price} {product.quantities[0].quantity} ml</span>
                </div>
                <div style={{display:"flex",width:"10%",flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                  <button style={{width:"100%", height:"35px",background: 'none', border: 'none', borderRadius: "9px", backgroundColor: '#3A643B', color: 'white', padding: '10px', fontWeight: 'bold', padding: "5px" }} onClick={() => handleAdd(product)}>+</button>
                </div>
              </div>

            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Page