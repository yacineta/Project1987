import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from 'react-helmet'
// import { ToastContainer} from 'react-toastify';

import {Toaster} from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css';



function Layout({children,titele,description,keywords,authr}) {
  return (
    <div >

        <Helmet>
            <meta charSet='utf-8'/>
            
               <meta name="description" content={description}/>
               <meta name="keywords" content={keywords}/>
               <meta name="authr" content={authr}/>
           
            <title>{titele}</title>
        </Helmet>
        <Header/>
        <main style={{minHeight:'95vh'}}>
            <Toaster/>
            {/* <ToastContainer/> */}
            {children}</main>
        <Footer/>
        
    </div>
  );
};

Layout.defaultProps = {
    titele: 'Ecommerce',
    description:'This is the default description for Site Ecommerc',
    keywords:'ecommerce site ,online shooping',
    authr: 'Kakachi Rina 3alele',
};

export default Layout;