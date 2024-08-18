import React from 'react'
import Layout from '../components/Layout/Layout'
import { FaPhone } from "react-icons/fa";
import { BsEnvelopeOpen } from "react-icons/bs";

const Contact = () => {
  return (
    <Layout titele={'Contact us'}>
        <div className='row contactus'>
            <div className='col-md-6'>
                <img 
                src='https://images.pexels.com/photos/12231824/pexels-photo-12231824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                alt='Conatact Us'
                style={{width: "95%"}}
                />  
            </div>
            <div className='col-md-4'>
                <h1 className='bg-drak p2 text-white text-center'> Contact User </h1>
                <p className='text-justify mt-2'>
                    any query and info about prodduct feel free to call anytime
                    24x7 vaialible
                </p>
                <p className='mt-3'>
                     <FaPhone/> : www.phonebook.com
                </p>
                <p className='mt-3'>
                 <BsEnvelopeOpen/>  : user@email.com
                </p>
                <p className='mt-3'>
                 <BsEnvelopeOpen/>  : 21322-1206-7590 (toll free)
                </p>
            </div>

        </div>
    </Layout>
  )
}

export default Contact