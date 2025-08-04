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
const root = ReactDOM.createRoot(document.getElementById('root'));
const router=createBrowserRouter([
  {
    path:"/",
    element:<Login/>
  },
   {
    path:"/add_p",
    element:<Main2/>
  },
  {
    path:"/add_i",
    element:<Main/>
  },
  {
    path:"/home",
    element:<App/>
  },
  {
    path:"/product",
    element:<Product/>
  }
])
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
