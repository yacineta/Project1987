import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';


const ForgotPassword = () => {
    
    const [email,setEmail] = useState("");
    const [answer,setAnswer] = useState("");
    const [newPassword,setNewPassword] = useState("");
  
    const navigate = useNavigate("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
             const res =  await axios.post(
                "/api/v1/auth/forgot-password",
                {
                    email,
                    newPassword,
                    answer
                });
                 if(res && res.data.success){
                    toast.success(res.data && res.data.message);
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
    <Layout titele={'Forgot Password'}>
         <div className='from-container'>
           <form onSubmit={handleSubmit}>
            <h4>Reset Your Password</h4>

           
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
           value={answer} 
           onChange={(e) => setAnswer(e.target.value)}
           className="form-control" 
           id="exampleInputPassword1"
           placeholder='Entre Your Answer'
           required/>
     </div>
    
    
    
     <div className="mb-3">
   
           <input type="password"
           value={newPassword} 
           onChange={(e) => setNewPassword(e.target.value)}
           className="form-control" 
           id="exampleInputPassword1"
           placeholder='Entre Your Password'
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

export default ForgotPassword