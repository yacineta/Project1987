
import { useState,useContext,createContext, useEffect } from "react";


const CartContext = createContext();


const CartProvider = ({children}) => {
    const [cart, setCart]= useState([]);
    useEffect(() =>{
        let exisitingCartItem = localStorage.getItem('cart');
        if(exisitingCartItem) setCart(JSON.parser(exisitingCartItem));
    },[]);


return (
    <CartContext.Provider value={[cart,setCart] }>
       {children}

    </CartContext.Provider>
);
};

const useCart = () => useContext(CartContext);

export {useCart,CartProvider };
