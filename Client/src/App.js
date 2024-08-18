import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './page/HomePage';
import About from './page/About';
import Contact from './page/Contact';
import Policy from './page/Policy';
import Pagenotfound from './page/Pagenotfound';
import Register from './page/Auth/Register';
// import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './page/Auth/Login';
import Dashboard from './page/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './page/Auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './page/Admin/AdminDashboard';
// import AdminMenu from './components/Layout/AdminMenu';

import CreactProduct from './page/Admin/CreatCategory';
import CreatCategory from './page/Admin/CreatProduct';
import Users from './page/Admin/Users';
import Orders from './page/user/Orders';
import Profile from './page/user/Profile';
import Products from './page/Admin/Products';
import UpdateProduct from './page/Admin/UpdateProduct';
import Search from './page/Search';
import ProductDetails from './page/ProductDetails';
import Categories from './page/Categories';
import CategoryProduct from './page/CategoryProduct';
import CartPage from './page/CartPage';





function App() {
  return (
    <>
   
    <Routes>
    <Route path='/' element={<HomePage/>} />
    <Route path='/product/:slug' element={<ProductDetails/>} />
    <Route path='/categories' element={<Categories/>} />
    <Route path='/cart' element={<CartPage/>} />
    <Route path='/category/:slug' element={<CategoryProduct/>} />
    <Route path='/search' element={<Search/>} />
    <Route path='/dashboard' element={<PrivateRoute/>}>
        <Route path='user' element={<Dashboard/>} />
        <Route path='user/orders' element={<Orders/>} />
        <Route path='user/profile' element={<Profile/>} />

    </Route>
    <Route path='/dashboard' element={<AdminRoute/>}>
        <Route path='admin' element={<AdminDashboard/>} />
        <Route path='admin/Creat-Category' element={<CreatCategory/>} />
        <Route path='admin/Creat-Product' element={<CreactProduct/>} />
        <Route path='admin/Product/:slug' element={<UpdateProduct/>} />
        <Route path='admin/Products' element={<Products/>} />
        <Route path='admin/Users' element={<Users/>} />

    </Route>
   
    <Route path='/Register' element={<Register/>} />
    <Route path='/forgot-password' element={<ForgotPassword/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/About' element={<About/>} />
    <Route path='/Contact' element={<Contact/>} />
    <Route path='/policy' element={<Policy/>} />
   <Route path='*' element={<Pagenotfound/>} />


     {/* <Route path='/AdminDashbaord' element ={<AdminDashboard/>}/>
      <Route path='/Creact-Product' element ={<CreactProduct/>}/>
      <Route path='/Creact-Category' element={<CreatCategory/>} />
      <Route path='/Users' element={<Users/>} />   */}


   

  


  </Routes>

  </>
   
  );
}

export default App;
