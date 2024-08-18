import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom'

const Categories = () => {
    const categories = useCategory()
    const [c, setC] = useState();
    const [name, setName] = useState();
    
  return (
    <Layout titele={"All Categoris"}>
        <h1> All Categories</h1>
        <div className='container'>
            {categories?.map((c) =>(
                <div className='col-md-6 mt-5 mb-3 gx-3 gy-3'key={c.id}>
               
                    <Link to={`/category/${c.slug}`} className='btn btn-primary'>
                        {c.name} 
                    </Link>
               
            </div>
            ))}
            <div className='col-md-6 mt-5 mb-3 gx-3 gy-3' >
                <button className='btn btn-danger text-light '>
                    <Link to={`/category/${'new'}`} className='btn btn-primar'>
                       All Errorr
                    </Link>
                </button>

            </div>
           
            
        </div>

    </Layout>
  )
}

export default Categories