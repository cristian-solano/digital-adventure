import { Link, useNavigate } from "react-router-dom";
import '../Style/login.css'
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  getAuth
} from "firebase/auth";
import logo from '../Images/logoImage.png'
import eye from '../Images/eye.png'
import noeye from '../Images/noeye.png'
import warning from '../Images/mistake.png'

const Login = () => {
    const navigate = useNavigate("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [eyes, setEyes] = useState(false)
    
    // Instantiate the auth service SDK
    const auth = getAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sign in with email and password in firebase auth service
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate(`/homepage`);
      // The signed-in user info
      const user = userCredential.user;
      sessionStorage.setItem('id', user.uid)
      sessionStorage.setItem('email', user.email)
    } catch (err) {
     // Handle Errors here.
      const errorMessage = err.message;
      const errorCode = err.code;

      setError(true);
      console.log(errorCode)

      switch (errorCode) {
        case "auth/invalid-email":
          setErrorMessage("Esta dirección de correo electrónico no es válida.");
          break;
        case "auth/user-disabled":
          setErrorMessage("Esta dirección de correo electrónico está deshabilitada por el administrador.");
          break;
        case "auth/user-not-found":
          setErrorMessage("Esta dirección de correo electrónico no está registrada.");
          break;
        case "auth/wrong-password":
          setErrorMessage("La contraseña no es válida o el usuario no tiene contraseña.")
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
    <div className='login-container'>
      <div className='login-content'>
        <div className="login-image">
            <img src={logo} alt="logo"/>
        </div>

          <form className='login-form' onSubmit={handleSubmit}>
            <div className="login-fields">
                <input
                type='email'
                placeholder='Email'
                name='email'
                onChange={handleChange}
                />
                <label>Correo Electronico</label>
            </div>
            <div className="login-fields-password">
                <div className="login-fields-content">
                    <input
                        type={eyes === true ? 'text' : 'password'}
                        placeholder='Password'
                        name='password'
                        onChange={handleChange}
                    />
                    <p onClick={() => handleOnSee()}><img src={eyes === true ? noeye : eye} alt="eyes"/></p>
                </div>
                <label>Contraseña</label>
            </div>
            <div className="login-fields-button">
                <button type='submit'>Ingresar</button>
            </div>
            {error && <div className="login-error">
              <img src={warning} alt="mistake"/>
              <p>{errorMessage}</p></div>}
            <div className='login-link'>
                <Link className="login-link-reg" to='/signup'>¿No tienes aún una cuenta?  Registrate</Link>
            </div>
          </form>

          
       
      </div>
    </div>
  );
};

export default Login;