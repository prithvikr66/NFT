import React from 'react'
import { Link } from 'react-router-dom'
const home = () => {
  return (
    <div className=''>
      Home
    <Link to="/login"><button className='block border  '>Login</button></Link>
    <Link to="/forgot"><button className='block border'>Forgot</button></Link>
    </div>
  )
}

export default home