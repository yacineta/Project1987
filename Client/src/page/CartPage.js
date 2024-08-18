import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'

const CartPage = () => {
    const [auth,setAuth] = useAuth();
    const [cart,setCart] = useCart();
    const navigate = useNavigate();

    const totalPrice = () => {
        try{
            let total = 0
            cart?.map((item) => {
                total = total + item.price;
            });
                return total.toLocaleString("en-US", {
                    style:"currency",
                    currency:'USD',
                });
        }catch(error){
            console.log(error)
        }
    }

    const removCartItem = (pid) => {
        try{
            let mayCart = [...cart];
           let index = mayCart.findIndex(item => item._id === pid)
           mayCart.splice(index, 1);
           setCart(mayCart);
           localStorage.setItem('cart', JSON.stringify(mayCart));
        }catch(error){
            console.log(error)
        }
    }    
  return (
    <Layout>
        <div className='comtainer'>
            <div className='row'>
                <h1>Your Cart</h1>
                <div className='col-md-12'>
                    <h1 className='text-center bg-light  p-2 mb-1'>
                        {`hello ${auth?.token && auth?.user?.name}`}
                    </h1>
                    <h4 className='text-center'>
                         {cart?.length  
                         ? `YOU HAVE ${cart.length} items in your cart ${
                            auth?.token ? " " : " please login to checkout" 
                           } `
                        :"your Cart Is Empty" }
                    </h4>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-8'>
                    Cart Item {
                        cart?.map(p  => (
                            <div className='row mb-2 p-3 card flex-row'>
                              <div className='col-md-4'>
                               <img 
                                src={`/api/v1/product/product-photo/${p._id}`}
                                className='img-100'
                                alt={p.name}
                                width="100px"
                                height={'100px'}
                               />
                              </div>
                              <div className='col-md-8'>
                               <p>{p.name} </p>
                               <p>{p.description.substring(0,50)}</p>
                               <p>Price : {p.price}</p>
                               <button className='btn btn-danger' onClick={() =>removCartItem(p._id)}>Remove</button>
                              </div>
                            </div>
                        ))
                    }
                </div>
                <div className='col-md-4 text-center'>
                    <h2>cart Summary</h2>
                    <p>Total  | Checkout | Payment</p>
                    <hr/>
                    <h4>total : {totalPrice()}</h4>
                     {auth?.user?.address ? (
                        <>
                        <div className='mb-3'>
                            <h4>Address</h4>
                            <h5>{auth?.user?.address}</h5>
                            onClick={}
                            <button className='btn btn-outline-warning'
                            onClick={() => navigate('/dashboard/user/profile')}>
                                Edit Address
                            </button>
                        </div>
                        </>
                        
                     ) : (
                        <div className='mb-3'>
                            {
                                auth?.token ? (
                                    <button className='btn btn-outline-warning'
                                    onClick={() =>navigate('/dashboard/user/profile')}> Edit Address</button>
                                ):(
                                    <button onClick={() =>navigate('/login',{
                                        state:'/cart',
                                    })}>Pleas login to checkout</button>
                                )
                               }
                        </div>
                     )}
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CartPage