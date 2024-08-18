import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const Products = () => {
    const [products, setProducts] = useState([]);


    const getAllProducts = async () => {
        try{
            const {data} = await axios.get('/api/v1/product/get-product');
            setProducts(data.products);

        }catch(error){
            console.log(error)
            toast.error('Someething went Wrong!')
        }
    };
    useEffect (()=> {
        getAllProducts();
    },[]);
  return (
    <Layout >
        <div className='row'>
          <div className='col-md-3'>
          <AdminMenu />
          </div>
          <div className='col-md-9 '>
            <h1 className='text-center'> All  Products List</h1>
          <div className='d-flex'>
            {products?.map(p => ( 
             <>  
              <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} 
              className='product-link'>

             
                <div className='card m-2' style={{with:'18rm'}} >
                    <img 
                    src={`/api/v1/product/photo/${p._id}`} 
                    className='card-img-top'
                     alt={p.name}/>
                    <div className='card-body'>
                        <h5 className='card-titel'>{p.name}</h5>
                        <p className='card-text'> {p.description}</p>
                       
                    </div>

                </div>
               </Link>
               </> 
            ))}
           </div>
            {/* <div className=' col-md-9'>
            <div className='d-flex'>
                <div className='card' style={{with:'18rm'}} >
                    <img src={''} className='card-img-top' alt=''/>
                    <div className='card-body'>
                        <h5 className='card-titel'>Card Titel</h5>
                        <p className='card-text'> bzmxklmlZ''z,;.z.zè</p>
                       
                    </div>

                </div>
            </div>
            </div> */}
          </div>

        </div>
    </Layout>
  )
}

export default Products