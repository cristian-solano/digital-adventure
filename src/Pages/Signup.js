import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createUserWithEmailAndPassword
} from "firebase/auth";
import { useState } from "react";
import '../Style/signup.css'
import { auth } from '../Auth/firebase'
import logo from '../Images/logoImage.png'
import eye from '../Images/eye.png'
import noeye from '../Images/noeye.png'

const SignUp = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [eyes, setEyes] = useState(false)
  

  // instantiate the auth service SDK
 

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
      const user = userCredential.user;
      
      navigate(`/profile`)
      sessionStorage.setItem('id', user.uid)
      sessionStorage.setItem('email', user.email)
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

  
  const handleOnSee = () => {
    if(eyes === true){
        setEyes(false)
    }else {
        setEyes(true)
    }
  }




  return (
    <div className='register-container'>
      <div className='register-content'>
          <div className="register-image">
            <img src={logo} alt="logo"/>
          </div>
          <form className='register-form' onSubmit={handleSubmit}>
            <div className="register-title">
              <h3>Nueva cuenta</h3>
            </div>
            <div className="register-fields">
              <input
                type='email'
                placeholder='email@email.com'
                onChange={handleChange}
                name='email'
                value={email}
              />
              <label>Nuevo Correo</label>
            </div>
           <div className="register-fields-password">
            <div className="register-fields-content">
              <input
                type={eyes === false ? 'text' : 'password'}
                placeholder='nueva contraseña'
                onChange={handleChange}
                name='password'
                value={password}
              />
              <p onClick={() => handleOnSee()}><img src={eyes === false ? noeye : eye} alt="eye"/></p>
            </div>
            <label>Nueva Contraseña</label>
           </div>
            <div className="register-fields-button">
              <button type='submit' >Registrarse</button>
            </div>
            
            {error && <p className="register-error">{errorMessage}</p>}
          </form>
          
          <Link to='/' className="register-back">¿Ya tienes cuenta? Ingresa</Link>
          
      </div>
    </div>
  );
};

export default SignUp;
