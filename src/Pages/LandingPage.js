import React from 'react'
import '../Style/landingpage.css'
import Login from './Login'
import ipad from '../Images/pageipad.jpeg'

const LandingPage = () => {
  return (
    <div className='landing-container'>
        <div className='landing-content'>
            <div className='landing-image'>
                <img src={ipad} alt="principal"/>
            </div>  
            <Login/>
        </div> 
        <div className='landing-phrase'>
          <p>© 2024 Image</p>
        </div>
    </div>
  )
}

export default LandingPage