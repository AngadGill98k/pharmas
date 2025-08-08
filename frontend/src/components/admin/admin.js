import React, { useRef, useState } from 'react';
import "./admin.css"
import List from './product/product_list/list';
import List2 from './ingridients/i_list/list';
import Main from './ingridients/add_i/main';
import Main2 from './product/add_p/Main2';
import Navbar from '../nav/Navbar';
const Admin = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  let[label,setlabel]=useState()
  const [ChildComponent, setChildComponent] = useState(null);
  const dashboard = [
    { label: "Dashboard", icon: "📊" },
    { label: "Doctors", icon: "👨‍⚕️" },
    { label: "Patients", icon: "🧑‍🤝‍🧑" },
    { label: "Appointments", icon: "📅" },
    { label: "Specialties", icon: "📅" },
    {
      label: "Ingredients",
      icon: "📅",
      children: [
        { label: "Ingredients List" },
        { label: "Add Ingredients", highlight: true }
      ]
    },
    {
      label: "Products",
      icon: "📅",
      children: [
        { label: "Product List" },
        { label: "Add Product", highlight: true }
      ]
    },
    { label: "Coupons", icon: "📅" },
    { label: "Concerns", icon: "📅" },
    { label: "Referral", icon: "📅" },
    { label: "Customization", icon: "📅" },
    { label: "Wallet", icon: "📅" },
    { label: "Refund", icon: "📅" }
  ];

  const handleClick = (label,index) => {
    setActiveIndex(prevIndex => (prevIndex === index ? null : index));
    setlabel(label)
  };


const handleChildClick = (parent, child) => {
  console.log(`Clicked on ${child.label} of ${parent.label}`);

  if (child.label === "Ingredients List") {
    setChildComponent(<List2 />);
  } else if (child.label === "Add Ingredients") {
    setChildComponent(<Main />);
  } else if (child.label === "Product List") {
    setChildComponent(<List />);
  } else if (child.label === "Add Product") {
    setChildComponent(<Main2 />);
  } else {
    setChildComponent(null);
  }
};


  return (
    < >
      <Navbar/>
      <div className='admin_container'>
        <div className='admin_nav'>
          <div className='admin_head'>
            {/* <button style={{border:'none' ,borderRadius:'30px',height:'40px',backgroundColor:'#D9D9D9'}} className='back'>Back</button> */}
            <img src='/images/Amrutam Green Png Logo V3-02 2.png' alt='logo' />
            <h2>A M R U T A M</h2>
          </div>
          <div className='admin_profile'>
            <h4 style={{font:'#3A643B'}}>Name</h4>
                                <img style={{}} src='./images/admin_logo.png'></img>
          </div>
        </div>
        <div className='admin_wrapper'>
        <div className='admin_left'>


          <ul className='child'>
            {dashboard.map((item, index) => (
              <div style={{margin:"20px"}} key={index}>
                <li style={{ listStyleType: 'none',color:"#333548" }} onClick={() => handleClick(item.label,index)}>
                  {item.icon} {item.label}
                </li>
                {activeIndex === index && item.children && (
                  <ul style={{padding:"0px"}} >
                    {item.children.map((child, i) => (
                      <li
                        key={i}
                        style={{ listStyleType: 'none',margin:"20px" }}
                        onClick={() => handleChildClick(item, child)}
                      >
                        {child.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </ul>
        </div>
        <div className='admin_right'>
            <h3 style={{color:" #2F522F"}}>{label}</h3>
            <div className='admin_child'>
            {ChildComponent && ChildComponent}
            </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
