import React from 'react'
import {  Link} from 'react-router-dom'
import { FaShoppingBag } from "react-icons/fa";
import { useAuth } from '../../context/auth';
import  Toast  from 'react-hot-toast';
import SearchInput from '../from/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import { Badge } from 'antd';
import Avatar from 'antd/es/avatar/avatar';

const Header = () => {
    const [auth,setAuth] = useAuth();
    const [cart] = useCart();
    const categories = useCategory( )
    const handlelogout = () => {
        setAuth({
            ...auth, user:null, token:''
        })
        localStorage.removeItem('auth');
        Toast.success("Logged Out Successfully");
    }
  return (
    // 
    < >
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button
     className="navbar-toggler" 
     type="button" data-bs-toggle="collapse" 
     data-bs-target="#navbarTogglerDemo01" 
     aria-controls="navbarTogglerDemo01" 
     aria-expanded="false" 
     aria-label="Toggle navigation">

      <span className="navbar-toggler-icon"> </span>
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link  to='/' className="navbar-brand" >
         <FaShoppingBag/>  Shoop
         </Link>
         
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <SearchInput />
        <li className="nav-item">
          <Link 
          to='/' 
          className="nav-link  "  >Home</Link>

        </li>

        <li className="nav-item dropdown">
          <Link 
          className="nav-link dropdown-toggle"
           to={"/categories"}  
           data-bs-toggle="dropdown" 
          >
            Categories
          </Link>
          <ul className="dropdown-menu">

            <li>
              <Link 
                className="dropdown-item" 
                to={"/categories"}>
               All Categories
              </Link>
            </li>
          {categories?.map(c => (
          
            <li>
              

              <Link 
                className="dropdown-item" 
                to={`/category/${c.slug}`}>
                {c.name}
              </Link>
            </li>
            
          

          ))}
          </ul>
        </li>

        <li className="nav-item">
          <Link 
          to='/Category' 
          className="nav-link "  >Category</Link>
        </li>
        { !auth?.user ? (
        <>
         <li className="nav-item">
          <Link to='/register'  className="nav-link" href="#">Register</Link>
        </li>
        <li className="nav-item">
          <Link to='/login'  className="nav-link" href="#">Login</Link>
        </li>
        </>) : (
        <>
        
        <li className="nav-item dropdown">
            <Link 
            className="nav-link dropdown-toggle" 
            href="#" role="button" 
            data-bs-toggle="dropdown" 
            style={{border:"none "}}
            > 
            {auth?.user?.name}
            </Link> 
          
          <ul class="dropdown-menu">
            <li><Link to=
            //  "/dashboard"
              {`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}

            className="dropdown-item" >Dashboard</Link></li>
            <li><Link  to="" className="dropdown-item" >Admin</Link></li>
            <li><Link className="dropdown-item" href="#">Something else here</Link></li>
            <li><Link onClick={handlelogout} to='/login'  className="dropdown-item" href="#">Logout</Link></li>
          </ul>
          
        </li>
       

        <li className="nav-item">
          <Link to='/register'  className="nav-link" href="#">Register</Link>
        </li>
        <li className="nav-item">
          
        </li>
        </>)}
        
        <li className="nav-item">
          <Badge count={cart?.lenght} showZero>
            <Link to='/cart'  className="nav-link" href="#">
            Cart {}
          </Link>
          </Badge>
         
        </li>
        
      </ul>
      
    </div>
  </div>
</nav>
    </>
  )
}

export default Header