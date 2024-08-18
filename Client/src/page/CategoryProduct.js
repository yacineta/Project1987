import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';

const CategoryProduct = () => {
  const params = useParams()
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [total,setTotal] = useState(0);
  const [page,setPage] = useState(1);
  const [loading,setLoading] = useState(1);
  const [p,setP] = useState();

  useEffect(() => {
    if(params?.slug) getProductsByCat();
  },[params?.slug])
  const getProductsByCat = async () => {

    try{
      const {data} = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
        );
      setProducts(data?.products);
      setCategory(data?.category);
    }catch(error){
      console.log(error);
    }
  }
  return (
   <Layout>
    <div className='container mt-3'>
      <h4 className='text-center'> Category{category?.name}</h4>
      <h6 className='text-center'>{products?.length} Results</h6>
      <div className='row'>
        
      <div className='col-md-9 offset-1'>
        
        <h1 className='text-center'>All Products</h1>
        <div className='d-flex flex-wrap'>
         
          {products?.map(p => ( 
           <>  
              <div className='card m-2' style={{with:'18rm'}} >
                  <img src={`/api/v1/product/photo/${p._id}`} className='card-img-top' alt={p.name}/>
                  <div className='card-body'>
                      <h5 className='card-titel'>{p.name}</h5>
                      <p className='card-text'> {p.description.subString(0,30)}...</p>
                      <p className='card-text'> $ {p.price}</p>
                      <button  class="btn btn-primary ms-2" onClick={() => Navigate(`/product/${p.slug}`)}>Mor details</button>
                      <button  class="btn btn-success ms-2">Add to cart</button>
                  </div>
              </div>
             </> 
          ))}
           <button  class="btn btn-primary ms-2" onClick={() => Navigate(`/product/${p.slug}`)}> details</button>
        </div>
        <div className='m-2 p-3'>{products && products.length < total && (
          <button className='btn btn-warning'
          onClick={(e) => {
            e.preventDefault();
            setPage(page + 1);
          }}>
            {loading ? "loading ..." : "Loadmore"  } 
          </button>
        )} ...</div>
      </div>
      


      </div>
    </div>
    
    
   </Layout>
  )
}

export default CategoryProduct