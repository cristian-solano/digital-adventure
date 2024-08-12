import React from 'react'
import '../Style/navbar.css'
import { signOut, getAuth } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Images/imageLetter.png'
import profile from '../Images/profle.png'
import signoutImage from '../Images/signoutImage.png'

const Navbar = () => {

  const auth = getAuth();
  const navigate = useNavigate()


  return (
    <div className='navbar-container'>
      <div className='navbar-logo'>
        <img src={logo} alt="logo"/>
      </div>
      <div className='navbar-options'>
        <Link to="/profile">
          <img src={profile} alt="profile"/>
        </Link>
        <button onClick={() => {
            signOut(auth)
            setTimeout(() => {
                navigate('/')
            }, 1000)
        }}>
          <img src={signoutImage} alt="signout"/>
        </button>
      </div>
    </div>
  )
}

export default Navbar