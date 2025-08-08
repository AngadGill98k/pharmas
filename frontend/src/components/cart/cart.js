import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../nav/Navbar';
import './cart.css';

const Cart = () => {
  const [items, setItems] = useState([]);
  
  const navigate = useNavigate();
  const url = 'http://localhost:3001';

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }
  useEffect(() => {
    fetch(`${url}/ret_cart`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        
      },
      credentials:'include',
      body: JSON.stringify()
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.msg);
        if (data.msg) {
          console.log(data);
          setItems(data.product.product.map(p => ({ ...p, qnt: p.qnt || 1 })));
        }
        
      });
  }, []);

  const plus = (index) => {
    setItems(prev => {
      const updated = [...prev];
      console.log(updated[index].qnt);
      
        updated[index].qnt += 1;
     
      return updated;
    });
  };

  const minus = (index) => {
    setItems(prev => {
      const updated = [...prev];
      if (updated[index].qnt > 1) {
        updated[index].qnt -= 1;
      } else {
        updated.splice(index, 1);
      }
      return updated;
    });
  };

const payment = () => {
  const total = items.reduce((sum, value) => sum + (value.price * value.qnt), 0);
  sessionStorage.setItem("canAccessPayment", "true"); // ✅ Allow access
  navigate('/payment', { state: { cart: items, total } });
};


  const Bill = ({ items }) => {
    const total = items.reduce((sum, value) => sum + (value.price * value.qnt), 0);
    return (
      <div className="bill-summary">
        <h3>Bill Summary</h3>
        <ul className="bill-list">
          {items.map((item, idx) => (
            <li key={idx}>
              {item.name}: ₹{item.quantities[0].price * item.qnt}
            </li>
          ))}
        </ul>
        <div className="bill-total">Total: ₹{total}</div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="cart-container">
        <h2>Your Cart</h2>
        <ul className="cart-items">
          {items.map((item, index) => (
            <li key={item._id} className="cart-item">
              <div className="item-content">
                <img src={`${url}/uploads/${item.thumbnail}`} alt={item.name} className="item-image" />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>Price: ₹{item.quantities[0].price}</p>
                  <div className="item-controls">
                    <button onClick={() => plus(index)}>+</button>
                    <span>{item.qnt}</span>
                    <button onClick={() => minus(index)}>-</button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Bill items={items} />
        <button className="payment-button" onClick={payment}>Proceed to Payment</button>
      </div>
    </>
  );
};

export default Cart;
