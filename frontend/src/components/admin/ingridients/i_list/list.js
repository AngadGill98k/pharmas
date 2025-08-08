
import React, { useEffect, useReducer, useRef, useState } from 'react'

const List = () => {
     const [list, setList] = useState([]);
      const [edit, setEdit] = useState(false);
      const [product, setProduct] = useState({});
      const [toggle, setToggle] = useState(false);
      const [, forceUpdate] = useReducer(x => x + 1, 0);
    
      useEffect(() => {
        fetch('http://localhost:3001/get_ing', {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (data.msg) setList(data.products);
          })
          .catch(err => console.error(err));
      }, []);
    
      function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
      }
      let fetchProduct = () => {
        fetch('http://localhost:3001/get_ing', {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        })
          .then(res => res.json())
          .then(data => {
            if (data.msg) setList(data.products);
          })
          .catch(err => console.error(err));
      }
      let handlestatus=(status)=>{
        fetch('http://localhost:3001/update_status_i', {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': getCookie('XSRF-TOKEN')
          },
          body: JSON.stringify({
            id: product._id,
            status
          })
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (data.msg) {
              fetchProduct();
              setToggle(!toggle);
              setEdit(!edit);
            }
          })
          .catch(err => console.error(err));
      }
      return (
        <>
          {edit &&<div style={{ display: "flex", boxSizing: "border-box", flexDirection: "column" }}>
            <div style={{ height: "50%", boxSizing: "border-box",display:"flex",flexDirection:"row",justifyContent:"space-between" }}>
              <h3>Product Details</h3>
              <button onClick={()=>setToggle(!toggle)}>:</button>
            </div>
    
    
            <div style={{ height: "25%", boxSizing: "border-box" }}>
              <p style={{ padding: "0px" }}>Product: {product.name}</p>
              <p style={{ padding: "0px" }}>Status: {product.status ? "True" : "False"} </p>
              {toggle&&(
                <>
                <div style={{borderRadius:"5px",boxSizing:"border-box",display:"flex",flexDirection:"row",boxShadow:"0px 0px 5px 0px black",width:"20%"}}>
                {product.status &&(<><button onClick={()=>{handlestatus(false)}} style={{background:"none",border:"none",width:"100%",height:"3rem"}}>Change to Inactive </button></>)} 
                {!(product.status) &&(<><button onClick={()=>{handlestatus(true)}} style={{background:"none",border:"none",width:"100%",height:"3rem"}}> Change to Active</button></>)} 
    
                </div>
                </>
              )}
            </div>
    
    
          </div>}
    
    
    
          <div style={{ display: "flex", boxSizing: "border-box", flexDirection: "column" }}>
           
           
            <div style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <h3>Product List</h3>
                <input type='text' placeholder='Search' />
                <button onClick={() => { }}>Search</button>
              </div>
    
    
              <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
                <button>Download</button>
                <button>Sort</button>
              </div>
    
    
            </div>
    
    
    
            <div style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              boxSizing: "border-box"
            }}>
    
              <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxSizing: "border-box",
                
              }}>
                <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                boxSizing: "border-box",
                borderBottom: "1px solid black"
              }}>
                <p  style={{ width: "20%" }}>Products</p>
                <p style={{ width: "60%" }}>Description</p>
                <p style={{ width: "20%" }}>Status</p>
                </div>
                
    
    
                <ul style={{ listStyle: "none", padding: 0 }}>
              {list && list.map((item, index) => {
                return(
                  <>
                  <li onClick={()=>{setEdit(true);setProduct(item)}} key={index}>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between",boxSizing:"border-box",gap:"20px"}}>
                      <p style={{ width: "20%" }}>{item.name}</p>
                      <p style={{ width: "60%" }}>{item.description}</p>
                      <p style={{ width: "20%" }}>{item.status ? "True" : "False"} </p>
                    </div>
                  </li>
                  </>
                )
              })}
              </ul>
              </div>
    
    
              
              
    
    
            </div>
    
    
    
            <div>
    
            </div>
    
          </div>
        </>
      );
}

export default List