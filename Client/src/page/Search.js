import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/search'


const Search = () => {
    const [values,setValues] = useSearch()
  return (
   <Layout titele={'Search resaults'}>
     <div className='container'>
        <div className='text-center'>
            <h1>Search Results</h1>
            <h6>{values?.results.length < 1 ? 'results founds' : `found ${values?.results.length}results`}</h6>

            <div className='d-flex flex-wrap mt-4'>
           
            {values?.results.map(p => ( 
             <>  
                <div className='card m-2' style={{with:'18rm'}} >
                    <img src={`/api/v1/product/photo/${p._id}`} className='card-img-top' alt={p.name}/>
                    <div className='card-body'>
                        <h5 className='card-titel'>{p.name}</h5>
                        <p className='card-text'> {p.description.subString(0,30)}...</p>
                        <p className='card-text'> $ {p.price}</p>
                        <button  class="btn btn-primary ms-2">Mor details</button>
                        <button  class="btn btn-success ms-2">Add to cart</button>
                    </div>
                </div>
               </> 
            ))}
            <button  class="btn btn-primary ms-2">Mor details</button>
            <button  class="btn btn-success ms-2">Add to cart</button>
          </div>
        </div>
     </div>
   </Layout>
  )
}

export default Search