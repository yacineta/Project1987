import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
        <h1 className='text-center'>à
       All Right Reserved &copy;{new Date().getFullYear()}
        </h1>
        <p className='text-center mt-3'>
            <Link to="/about">About</Link>
            <Link to="/Contact">Contat</Link>
            <Link to="/policy">Privacy Policy</Link>
        </p>


    </div>
  )
}

export default Footer