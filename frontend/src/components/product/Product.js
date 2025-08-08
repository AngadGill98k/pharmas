import React, { useEffect, useRef, useState } from 'react'
import Footer from '../footer/footer'
import "./product.css"
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../nav/Navbar';
import Search from '../search/search';

const Product = () => {
    let location = useLocation();
    let product = location.state
    let [price, setPrice] = useState()
    let [primary, setPrimary] = useState()
    let [all, setAll] = useState()
    let naviagte = useNavigate()
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }
    useEffect(() => {
        console.log(product)
        fetch('http://localhost:3001/get_ing_info', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': getCookie('XSRF-TOKEN')
            },
            body: JSON.stringify({
                primary: product.primaryIngredients, all: product.allIngredients
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.msg) {
                    console.log(data);

                    setPrimary(data.ingredients)
                    // setAll(data.all)
                }
                console.log(data);
            })
            .catch(err => console.error(err));
    }, [])

    let handlemoreclick = () => {
        
    }
    let handleclick = (category) => {
        
    }
    let handleimage = (image) => {

    }
    return (
        <>
            <Navbar />
            <Search />
            <div className='categoriess'>
                <div style={{width:"50%",display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                <div className='catt' onClick={() => handleclick('All')}>
                    <img src='/images/All.png' alt="All" />
                    Allc
                </div>
                <div className='catt' onClick={() => handleclick('Hair')}>
                    <img src='/images/Hair.png' alt="Hair" />
                    Hair
                </div>
                <div className='catt' onClick={() => handleclick('Skin')}>
                    <img src='/images/Skin care.png' alt="Skin" />
                    Skin
                </div>
                <div className='catt' onClick={() => handleclick('Digestion')}>
                    <img src='/images/Stomach.png' alt="Digestion" />
                    Digestion
                </div>
                <div className='catt' onClick={() => handleclick('Bones')}>
                    <img src='/images/Bones.png' alt="Bones" />
                    Bones
                </div>
                <div className='catt' onClick={() => handleclick('Immunity')}>
                    <img src='/images/Immunity.png' alt="Immunity" />
                    Immunity
                </div>
                <div className='catt' onClick={handlemoreclick}>
                    <img src='/images/hair care.png' alt="More" />
                    More
                </div>
                </div>
            </div>
            <div className='product_container'>
                <div className='product_wrapper'>


                    <img style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "cover", // ensures the image covers the area without distortion
                        display: "block",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden"
                    }} src={`http://localhost:3001/uploads/${product.thumbnail}`} alt="Product Thumnail" />
                    <h2>{product.name}|{product.scientific_name}|{product.sanskrit_name}</h2>
                    <h2>{product.quantities[0].price}</h2>
                    <div className='quantity'>
                        {product.quantities.map((quantity, index) => {
                            return (

                                <div onClick={() => { setPrice(quantity.price) }} style={{ marginRight: "2%", width: "30%", textAlign: "center", backgroundColor: "#EEEEEE", borderRadius: "10px" }}>
                                    <p style={{ fontSize: 'larger' }}>{quantity.quantity}</p>
                                    <p style={{}}>{quantity.month}</p>
                                    <p style={{ fontWeight: "bold" }}>₹ {quantity.price}</p>



                                </div>
                            )
                        })}
                    </div>
                    <p>{product.description}</p>
                    <h3>Primary Benefits</h3>
                    <ul style={{ margin: 0 }}>
                        {product.primary_benefits.map((benefit, index) => {
                            return (
                                <li style={{}}>{benefit}</li>
                            )
                        })}
                    </ul>
                    <h3>Secondary Benefits</h3>
                    <ul className='Secondary_b'>
                        {product.secondary_benefits.map((benefit, index) => {
                            return (
                                <div>
                                    <li className='Secondary_b_list' >
                                        <img style={{ backgroundColor: "red", height: "100px", width: "100px" }} src={`http://localhost:3001/uploads/${benefit.image}`} alt="" />
                                        {benefit.text}</li>

                                </div>

                            )
                        })}
                    </ul>
                    <h3>Dosage</h3>
                    <ul className='Dosage'>
                        {product.dosage.map((dosage, index) => {
                            return (
                                <>

                                    <li style={{}}>
                                        <img
                                            src={`http://localhost:3001/uploads/${dosage.image}`}
                                            alt=""
                                            style={{
                                                width: "10px",
                                                height: "10px",
                                                objectFit: "cover", // fills the box without stretching
                                                borderRadius: "100%"
                                            }}
                                        />
                                        {dosage.text}
                                    </li>
                                </>

                            )
                        })}
                    </ul>
                    <h3>Usage</h3>
                    <ul className='Dosage'>
                        {product.usage.map((usage, index) => {
                            return (
                                <li style={{}}>
                                    <img
                                        src={`http://localhost:3001/uploads/${usage.image}`}
                                        alt=""
                                        style={{
                                            width: "10px",
                                            height: "10px",
                                            objectFit: "cover", // fills the box without stretching
                                            borderRadius: "100%"
                                        }}
                                    />
                                    {usage.text}
                                </li>)
                        })}
                    </ul>
                    <h3>Primary Ingredients</h3>
                    <ul className='primary'>
                        {primary && primary.map((ingredient, index) => {

                            return (
                                <div style={{ height: "100%", width: "30%", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", padding: "10px", borderRadius: "10px" }} onClick={() => { naviagte('/ingredient', { state: ingredient }) }}>
                                    <li className='primary_list'><img style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                        display: 'block'
                                    }} src={`http://localhost:3001/uploads/${ingredient.image[index]}`}></img>  {ingredient.name}</li>

                                </div>
                            )
                        })}
                    </ul>
                    <h3>All Ingredients</h3>
                    <div>
                        {/* {product.allIngredients.map((ingredient, index) => {
                            return (
                                <>
                                    <div style={{height:"100%",width:"30%"}} onClick={() =>{naviagte('/ingredient',{state:ingredient})} }>
                        <li className='primary_list'><img style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
      display: 'block'
    }} src={`http://localhost:3001/uploads/${ingredient.image[index]}`}></img>  {ingredient.name}</li>
                               
                                </div>
                                </>
                            )
                        })} */}
                    </div>
                    <h3>Duration</h3>
                    <ul className='Dosage'>
                        {product.duration.map((duration, index) => {
                            return (
                                <li style={{}}>
                                    <img
                                        src={`http://localhost:3001/uploads/${duration.image}`}
                                        alt=""
                                        style={{
                                            width: "10px",
                                            height: "10px",
                                            objectFit: "cover", // fills the box without stretching
                                            borderRadius: "100%"
                                        }}
                                    />
                                    {duration.text}
                                </li>)
                        })}
                    </ul>
                    <div className='product_faq'>
                        <h3>FAQs</h3>
                        {product.faqs.map((faq, index) => {
                            return (
                                <div className='faq'>
                                    <h4>Q.{faq.question}</h4>
                                    <p>{faq.answer}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Product