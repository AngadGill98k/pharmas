import React, { useEffect, useState } from 'react'

const List = () => {
    let [list,setList]=useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/get_ingridients', {
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
        setList(data.ingredients);
      }
      
    })
    .catch(err => console.error(err));
  },[])
  
    return (
        <>
        {list && list.map((item,i)=><div key={i}>{item.name}</div>)}
        </>
  )
}

export default List