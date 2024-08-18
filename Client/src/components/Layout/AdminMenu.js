import React from 'react'
import { Link,  } from 'react-router-dom'


const AdminMenu = () => {
  return (
    <>
    <div className='text-center'>

   
    <ul className="list-group">
        <h4>Admin Menu</h4>
     
      <Link to="/dashboard/admin/Creat-Category" className="list-group-item  list-group-item-action  mb-2 bg-secondary text-white">
        Create Category
        </Link>
      <Link to="/dashboard/admin/Creat-Product" className="list-group-item  group-item-action  mb-2 bg-black text-white">
        Create prodduct
        </Link>
      <Link to="/dashboard/admin/users" className="list-group-item   group-item-action mb-2 bg-secondary text-white">
         Users
        </Link>
      <Link to="/dashboard/admin/Products" className="list-group-item  group-item-action bg-dark  text-white" >
        All Products
        </Link>
   </ul>
     </div>
    </>
  )
}

export default AdminMenu