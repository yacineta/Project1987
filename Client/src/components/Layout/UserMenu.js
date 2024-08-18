import React from 'react'
import { Link} from 'react-router-dom'

const UserMenu = () => {
  return (
    <>
    <div className='text-center'>

   
    <ul class="list-group">
        <h4>Dashboard</h4>
     
      <Link to="/dashboard/user/profile" className="list-group-item  list-group-item-action">
        Portfile
        </Link>
      <Link to="/dashboard/user/orders" className="list-group-item  group-item-action">
        Orders
        </Link>
        <Link to="/dashboard /user/Creat-Category" className="list-group-item  group-item-action">
        Category
        </Link>
     
   </ul>
     </div>
    </>
  )
}

export default UserMenu