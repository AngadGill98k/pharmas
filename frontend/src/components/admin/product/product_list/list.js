import React, { useEffect, useState } from 'react'

const List = () => {
  let [list,setList]=useState([]);
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
        }
        console.log(data);
      })
      .catch(err => console.error(err));
    },[])
  return (
    <>
    <p>Products</p>
    <div>
        <span>Product List</span><input type='text' placeholder='search here'></input><button>+</button>
        <div>
          {list && list.map((item,i)=><div key={i}>{item.name}</div>)}
          <div className='left'></div><div className='right'></div><div className='status'></div>
        </div>
    </div>
    </>
  )
}

export default List