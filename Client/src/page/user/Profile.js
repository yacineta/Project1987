import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Profile = () => {

    const [auth, setAuth] = useAuth()
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phone,setPhone] = useState("");
    const [address,setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate("");
    
    
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
             const {data} =  await axios.put(
                "/api/v1/auth/profile",
                {   name,
                    email,
                    password,
                    phone,
                    address,});
                    if(data?.error){
                        toast.error(data?.error)

                    }else{
                        setAuth({...auth, user:data?.updatedUser});
                        let ls = localStorage.getItem("auth");
                        ls = JSON.parse(ls);
                        ls.user = data.updatedUser;
                        localStorage.setItem('auth',JSON.stringify(ls));
                        toast.success("Profile Updated Successfully");
                    }
        }catch(err){
            console.log(err)
            toast.error('Error Occured')

        }
        
    };
    useEffect(() => {
        // const {email,name,phone,address,password} = auth?.user;
        setName(name);
        setAddress(address);
        setPhone(phone);
        setEmail(email);
        setPassword(password);
    },[auth?.user]);




  return (
    <Layout titele={'Profile'}>
        <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <UserMenu />
                </div>
                <div className='col-md-3' >
                    <h1>Your Profile</h1>
                    <div className='from-container'>
           
           <form onSubmit={handleSubmit}>
            <h4>USER PROFILE</h4>
           <div className="mb-3">
      
           <input type="text" 
           value={name}
           onChange={(e) => setName(e.target.value)}
           className="form-control" 
           id="exampleInputEmail1"
           placeholder='Entre Your Name'
           required />
          
     </div>
     <div className="mb-3">
      
           <input type="email"
           value={email} 
           onChange={(e) => setEmail(e.target.value)}
           className="form-control" 
           id="exampleInputEmail1" 
           placeholder='Entre Your Email'
           autoFocus
           />
          
     </div>
     <div className="mb-3">
      
           <input type="text"
           value={phone} 
           onChange={(e) => setPhone(e.target.value)}
           className="form-control" 
           id="exampleInputEmail1" 
           placeholder='Entre your Phone'
           required />
          
     </div>
     <div className="mb-3">
   
           <input type="email" 
           value={address}
           onChange={(e) => setAddress(e.target.value)}
           className="form-control" 
           id="exampleInputEmail1" 
           placeholder='Entre Your Adress'
           required />
          
     </div>
     <div className="mb-3">
   
           <input type="password"
           value={password} 
           onChange={(e) => setPassword(e.target.value)}
           className="form-control" 
           id="exampleInputPassword1"
           placeholder='Entre Your Password'
           required/>
     </div>
     
    
     <button type="submit" className="btn btn-primary">Update</button>
   </form>
           </div>
                </div>
            </div>
        </div>

    </Layout>
  )
}

export default Profile