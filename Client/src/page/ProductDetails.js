import React, {useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const ProductDetails = () => {
    const params = useParams();
    const [product, setProduct] = useState({});
    const [relatedProduct,setRelatedProduct] = useState([]);
    
   
    



    useEffect(() => {
          if(params?.slug) getProduct()
    },[params?.slug])
    const getProduct = async () => {
        try{
           const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`);
           setProduct(data?.product);
           getSimilarProducts(data?.product._id,data?.product.category._id);
        }catch(error){
            console.log(error)
        }
    };


    const getSimilarProducts = async (pid,cid) => {
        try{
            const {data} = await axios.get(
                `/api/v1/product/related-product/${pid}/${cid}`
                );
                setRelatedProduct(data?.products);
        }catch(error){
            console.log(error)
        }
    };

  return (
    <Layout>
       <div className='row container mt-2'>
        <div className='col-md-6'>
        <img 
                    src={`/api/v1/product/product-photo/${product._id}`} 
                    className='card-img-top'
                     alt={product.name}
                     height="300"
                     width='250px'/>
        </div>
        <div className='col-md-6 '>
            <h1 className='text-center'>Product Details</h1>
            <h6>Name : {product.name}</h6>
            <h6>Description : {product.description}</h6>
            <h6>Price : {product.price}</h6>
            <h6>Category : {product.category?.name}</h6>
            <boutton className ='btn btn-secondary ms-1'> ADD TO CART</boutton>
        </div>
       </div>
       <hr/>
       <div className='row container'>
         <h6>Similar Products</h6>
         {relatedProduct.length < 1 && (<p className='text-center'>No Similar Products</p>)}
         <div className='d-flex flex-wrap'>
           
           {relatedProduct?.map(p => ( 
            <>  
               <div className='card m-2' style={{with:'18rm'}} >
                   <img src={`/api/v1/product/photo/${p._id}`} className='card-img-top' alt={p.name}/>
                   <div className='card-body'>
                       <h5 className='card-titel'>{p.name}</h5>
                       <p className='card-text'> {p.description.subString(0,30)}...</p>
                       <p className='card-text'> $ {p.price}</p>
                       <button  class="btn btn-success ms-2">Add to cart</button>
                   </div>
               </div>
              </> 
           ))}
          
           <button  class="btn btn-success ms-2">Add to cart</button>
         </div>
         </div>
    </Layout>
  )
}

export default ProductDetails