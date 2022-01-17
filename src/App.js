import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import Login from './pages/Login';
import {Routes, Route } from "react-router-dom";
import CreateSalesOrder from './components/OderServices/createSalesOrder'
import AddProduct from './pages/Product/AddProduct';
import { UserInfoProvider } from './components/UserInfo/UserInfoProvider';
import NavBar from './pages/NavBar';
import ProductList from './pages/Product/ProductList';
import ViewOrder from './pages/ViewOrder'
import AllProducts from './pages/AllProducts';


function App() {

  const [loggedIn,setloggedIn] = useState(false);
  
  return (
    <UserInfoProvider>
      <Routes>
          <Route exact path="/" element={<NavBar loggedIn={loggedIn} />} />
          <Route path="/login" element={<Login setloggedIn={setloggedIn} />} />
          <Route path="/createSalesOrder" element={<CreateSalesOrder />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/productList" element={<ProductList />} />
          <Route path="/vieworder" element={<ViewOrder />} />
          <Route path="/allproducts" element={<AllProducts />} />
            
      </Routes>
    </UserInfoProvider>
  );
}

export default App;

