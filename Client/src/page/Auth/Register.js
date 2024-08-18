import React, { useState } from 'react'

import Layout from '../../components/Layout/Layout'
// import {toast} from 'react-toastify';
import toast  from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../styles/AuthStyles.css"


const Register = () => {
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
             const res =  await axios.post(
                "/api/v1/auth/register",
                {name,email,password,phone,address,answer});
                 if(res && res.data.success){
                    toast.success(
                         res.data && res.data.message,
                        "Register Succesffully"
                         );
                    navigate("/login");
                 }else{
                    toast.error(res.data.message)
                }
        }catch(err){
            console.log(err)
            toast.error('Error Occured')

        }
        
    };
    

  return (
    <Layout titele={'Register'}>
      
        <div className='from-container'>
           
        <form onSubmit={handleSubmit}>
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
        id="exampleInputEmail1" placeholder='Entre Your Email'
        required/>
       
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
  <div className="mb-3">

        <input type="text"
        value={answer} 
        onChange={(e) => setAnswer(e.target.value)}
        className="form-control" 
        id="exampleInputPassword1"
        placeholder='what is Your Favorit  Sport'
        required/>
  </div>
  <div className="mb-3 form-check">
   
        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
        </div>
       
    </Layout>
  )
}

export default Register