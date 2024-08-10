import React, { useState } from 'react'
import '../Style/login.css'
import logo from '../Images/logoImage.png'
import { Link } from 'react-router-dom'
import eyes from '../Images/eye.png'
import noeye from '../Images/noeye.png'
import {
    createUserWithEmailAndPassword,
    getAuth
  } from "firebase/auth";

const Login = () => {

    const [eye, setEye] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

  // instantiate the auth service SDK
  const auth = getAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  // Handle user sign up with email and password
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Pull out user's data from the userCredential property
    //   const user = userCredential.user;
    } catch (err) {
      // Handle errors here
      const errorMessage = err.message;
      const errorCode = err.code;

      setError(true);

      switch (errorCode) {
        case "auth/weak-password":
          setErrorMessage("The password is too weak.");
          break;
        case "auth/email-already-in-use":
          setErrorMessage(
            "This email address is already in use by another account."
          );
          break;
        case "auth/invalid-email":
          setErrorMessage("This email address is invalid.");
          break;
        case "auth/operation-not-allowed":
          setErrorMessage("Email/password accounts are not enabled.");
          break;
        default:
          setErrorMessage(errorMessage);
          break;
      }
    }
  };


    const handlerOnSee = () => {
        if(eye === false){
            setEye(true)
        } else {
            setEye(false)
        }
    }


  return (
    <div className='login-container'>
        <div className='login-content'>
            <div className='login-image'>
                <img src={logo} alt="logo"/>
            </div>
            <form onSubmit={handleSubmit} className='login-form'>
                <div className='login-fields'>
                <input
                type='email'
                placeholder='Email'
                onChange={handleChange}
                name='email'
                value={email}
                />

                </div>
                <div className='login-fields-password'>
                    <div className='login-fields-content'>
                    <input
                    type='password'
                    placeholder='Password'
                    onChange={handleChange}
                    name='password'
                    value={password}
                    />
                    <p onClick={() => handlerOnSee()}><img src={eye === false ? noeye : eyes} alt="eyes"/></p>
                    </div>
                </div>
                <div className='login-fields-button'>
                    <button type='submit'>Sign Up</button>
                </div>
                {error && <p>{errorMessage}</p>}
            </form>
        </div>
        <Link to="/registro" className='login-link-reg'>¿Aún no tienes cuenta? Haz clic aquí</Link>
    </div>
  )
}

export default Login