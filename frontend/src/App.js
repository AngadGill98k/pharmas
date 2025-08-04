import logo from './logo.svg';
import './App.css';
import Login from './components/login/Login';
import Navbar from './components/nav/Navbar';
import Third_step from './components/admin/product/add_p/third_step';
import Second_step from './components/admin/product/add_p/second_step';
import Fourth_step from './components/admin/product/add_p/fourth_step';
import Main2 from './components/admin/product/add_p/Main2';
import Main from './components/admin/ingridients/add_i/main';
import { useEffect } from 'react';
import List from './components/admin/product/product_list/list';
import Forums from './components/forums/forums';
import Search from './components/search/search';
import Store from './components/store/store';
import Footer from './components/footer/footer';
import Admin from './components/admin/admin';
import Ing from './components/ingredients/ing';





function App() {
  
  return (
    <>
    {/* <Forums/> */}
   {/* <Admin/> */}
    <Navbar/>
   <Search/>
   <Store/>
   <Footer/> 
   <Ing/>
    </>
  );
}

export default App;
