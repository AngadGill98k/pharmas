import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Add_p from './components/admin/product/add_p/add_p';
import Second_step from './components/admin/product/add_p/second_step';
import Third_step from './components/admin/product/add_p/third_step';
import Fourth_step from './components/admin/product/add_p/fourth_step';
import Fifth_step from './components/admin/product/add_p/fifth_step';
import Add from './components/admin/ingridients/add_i/add';
import Second from './components/admin/ingridients/add_i/second';
import Third from './components/admin/ingridients/add_i/third';
import Fourth from './components/admin/ingridients/add_i/fourth';
import Fifth from './components/admin/ingridients/add_i/fifth';
import Main from './components/admin/ingridients/add_i/main';
import Main2 from './components/admin/product/add_p/Main2';
import Login from './components/login/Login';
import Product from './components/product/Product';
import Ing from './components/ingredients/ing';
import Admin from './components/admin/admin';
import Forums from './components/forums/forums';
import User from './components/user/user';
import Cart from './components/cart/cart';
const root = ReactDOM.createRoot(document.getElementById('root'));
const router=createBrowserRouter([
  {
    path:"/",
    element:<Login/>
  },
  {
    path:"/home",
    element:<App/>
  },
  {
    path:"/product",
    element:<Product/>
  },
  {
    path:"/ingredient",
    element:<Ing/>
  },
  {
    path:"/admin",
    element:<Admin/>
  },
  {
    path:"/forums",
    element:<Forums/>
  },
  {
    path:"/user",
    element:<User/>
  },
  {
    path:"/cart",
    element:<Cart/>
  }
])
root.render(
 
     <RouterProvider router={router} />
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
