import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'
import axios from 'axios'
import { Checkbox,Radio } from 'antd'
import { Prices } from '../components/Prices'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart'
import toast from 'react-hot-toast'

const HomePage = () => {
      
      const Navigate = useNavigate();
      const [cart, setCart] = useState();
      const [products,setProducts] =useState([]);
      const [categories,setCategories] = useState([]);
      const [checked,setChecked] = useState([]);
      const [radio,setRadio] = useState([]);
      const [total,setTotal] = useState(0);
      const [page,setPage] = useState(1);
      const [loading,setLoading] = useState(1);
      const [p,setP] = useState();
     



      const getTotal = async () => {
        try{
          const {data} = await axios.get('/api/v1/product/product-count')
          setTotal(data?.total)

        }catch(error){
          console.log(error)
        }
      };


     

      const getAllCategory = async () => {
        try{
          const {data} = await axios.get("/api/v1/category/get-category")
          if(data?.success) {
            setCategories(data?.category);
          }

        }catch(error){
          console.log(error);
        }
      };
      
     


      const getAllProducts = async () => {
        try{
          setLoading(true);
          const {data} = axios.get(`/api/v1/product/product-list/${page}`);
          setProducts(data.products);
          setLoading(false);
        }catch(error){
          setLoading(false);
          console.log(error);
        }
      };

      useEffect(() => {
        getAllProducts();
        getTotal();
      } ,[]);
      

      // const getTotal = async () => {
      //   try{
      //     const {data} = await axios.get('/api/v1/product/product-count')
      //     setTotal(data?.total)

      //   }catch(error){
      //     console.log(error)
      //   }
      // }
      useEffect(() => {
        if(page === 1) return;
        loadMore();
      }, [page]);

      const loadMore = async () => {
        try{
          setLoading(true)
         const {data} = await axios.get(`/api/v1/product/product-list/${page}`);
         setLoading(false)
         setProducts([...products,...data.products])
        }catch(error){
          console.log(error)
          setLoading(false)
        }
      }
      
      const handelFilter = async (value,id) => {
        let all = [...checked];
        if(value){
          all.push(id);
        }else{
          all = all.filter(c => c !== id);
        }
        setChecked(all);
      };

      useEffect(() => {
      if(!checked.length || !radio.length)  getAllCategory();
      }, [checked.length,radio.length]);

      useEffect(() => {
      if(checked.length || radio.length)  filterProduct()

      },[checked,radio])



      const filterProduct = async () => {
        try{
          const {data} = await axios.post('/api/v1/product/product-filters',{checked,radio})
          setProducts(data?.products );

        }catch(error){
          console.log(error);
        }
      };
  return (
    <Layout titele={'All Products- Best Offeres'}>
      <div className='container-fluid row mt-3'>
        <div className='col-md-2'>
        <h4 className='text-center'>Filter By Category</h4>
        <div className='d-flex flex-column '>
        <h6>Rs</h6>
        {categories?.map(c => (
          <Checkbox key={c._id} onChange={(e)=> handelFilter(e.target.checked,c._id)}>
            {c.name}
          </Checkbox>
        ))}
        </div>

        <h4 className='text-center mt-4'>Filter By Price</h4>
        <div className='d-flex flex-column '>
        <Radio.Group onChange={e => setRadio(e.target.value)}>
          {Prices?.map(p => (
            <div key={p._id}>
               <Radio value={p.array}>{p.name}</Radio>
            </div>
           
          ))}
        </Radio.Group>
        </div>

       
        <div className='d-flex flex-column '>
         <button className='btn btn-danger' onClick={() =>window.location.reload()}>RESET FILTERS</button>
        </div>

        <>
        <Checkbox key={" "} onChange={(e)=> console.log('clecked',e)}>
            {categories.name}
          </Checkbox>
        </>
        </div>
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
                        <button  class="btn btn-success ms-2" onClick={() =>{setCart([...cart,p])
                        toast.success(`Item Added to Cart`)
                        }} >Add to cart</button>
                    </div>
                </div>
               </> 
            ))}
            <button  class="btn btn-primary ms-2" onClick={() => Navigate(`/product/${p.slug}`)}>Mor details</button>
            <button  class="btn btn-success ms-2" 
            onClick={() =>{
              setCart([...cart,p]);
              localStorage.setItem('cart')
              toast.success('Item Added to Cart',JSON.stringify([...cart, p]));
              }}>Add to cart</button>
          </div>
          <div className='m-2 p-3'>{products && products.length < total && (
            <button className='btn btn-warning'
            onClick={(e) => {
              e.preventDefault();
              setPage(page + 1);
            }}>
              {loading ? "loading ..." : "Loadmore" } 
            </button>
          )} ...</div>
        </div>

      </div>
    
             
        </Layout>
  )
}

export default HomePage