import React, { useEffect, useState } from 'react'
import "./store.css"
import Page from './page'
const Store = () => {
    let time_offers=['Summer Collection']
    let [categories, setCategories] = useState()
    let products=[]
    let handleclick = (category) => {
        setCategories(category);
        console.log(`Category selected: ${category}`);
    }
    useEffect(() => {
      
    }, [])
    let handlemoreclick = () => {
        
    }
  return (
    <>
    <div className='conatiner'>
    <div className='categories'>
    <div className='cat' onClick={() => handleclick('All')}>
        <img src='/images/All.png' alt="All" />
    All
    </div>
    <div className='cat' onClick={() => handleclick('Hair')}>
        <img src='/images/Hair.png' alt="Hair" />
        Hair
    </div>
    <div className='cat' onClick={() => handleclick('Skin')}>
        <img src='/images/Skin care.png' alt="Skin" />
    Skin
    </div>
    <div className='cat' onClick={() => handleclick('Digestion')}>
        <img src='/images/Stomach.png' alt="Digestion" />
    Digestion
    </div>
    <div className='cat' onClick={() => handleclick('Bones')}>
        <img src='/images/Bones.png' alt="Bones" />
    Bones
    </div>
    <div className='cat' onClick={() => handleclick('Immunity')}>
        <img src='/images/Immunity.png' alt="Immunity" />
    Immunity
    </div>
    <div className='cat' onClick={handlemoreclick}>
        <img src='/images/hair care.png' alt="More" />
    More
    </div>
</div>

    {
    // if(categories==="All") {

    //     time_offers.map(async (offer, index) =>{
    //     await fetch('', {
    //       method: 'GET',
    //       credentials: 'include',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       }
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //       console.log(data);
    //     })
    //     .catch(err => console.error(err));
    //     return(
    //     <div key={index} className='offer'>
    //         <h2>{offer}</h2>
    //         <p>Check out our latest products and offers!</p>
    //         <button>Shop Now</button>
    //     </div>
    // )
    // })
    // }
    }
    </div>
    <Page/>
    </>
  )
}

export default Store