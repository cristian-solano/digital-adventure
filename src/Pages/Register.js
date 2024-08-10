import React, { useState } from 'react'
import '../Style/register.css'
import logo from '../Images/logoImage.png'
import eyes from '../Images/eye.png'
import noeye from '../Images/noeye.png'
import mistake from '../Images/mistake.png'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

const Register = () => {

  const {register, handleSubmit, formState: {errors, isValid}, watch} = useForm()
  const [eye, setEye] = useState(false)
  const [eye2, setEye2] = useState(false)


  const handleOnSee = () => {
    if(eye === false){
      setEye(true)
    } else {
      setEye(false)
    }
    
  }

  const handleOnVerify = () => {
    if(eye2 === false){
      setEye2(true)
    } else {
      setEye2(false)
    }
    
  }




  const onSubmit = (res) => {
    console.log(res)
  }

  const passwords = watch("password");

  return (
    <div className='register-container'>
      <div className='register-content'>
        <div className='register-image'>
            <img src={logo} alt="logo"/>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='register-form'>
          <div className='register-fields'>
            <input type='text' id="name" placeholder='Nombres' {...register('name', {
                required: true
            })}/>
            {errors.name?.type === "required" ? <div className='register-error'><img src={mistake} alt="error"/><p>Este campo no debe estar vacío</p></div> : <label htmlFor='name'>Nombres</label>}
          </div>
          <div className='register-fields'>
            <input type='text' id="last-name" placeholder='Apellidos' {...register('last_name', {
                required: true
            })}/>
            {errors.last_name?.type === "required" ? <div className='register-error'><img src={mistake} alt="error"/><p>Este campo no debe estar vacío</p></div> : <label htmlFor='last-name'>Apellidos</label>}
          </div>
          <div className='register-fields'>
            <input type='email' id="email" placeholder='mail@mail.com' {...register('email', {
                required: true
            })}/>
            {errors.email?.type === "required" ? <div className='register-error'><img src={mistake} alt="error"/><p>Este campo no debe estar vacío</p></div> : <label htmlFor='email'>Correo</label>}
          </div>
          <div className='register-fields-password'>
            <div className='register-fields-content'>
              <input type={eye === false ? 'password' : 'text'} id="password" placeholder='Nueva contraseña' {...register('password', {
                  required: true,
                  minLength: 8
              })}/>
              <p onClick={() => handleOnSee()}><img src={eye === false ? eyes : noeye}/></p>
            </div>
            {errors.password?.type === "required" ? <div className='register-error'><img src={mistake} alt="error"/><p>Este campo no debe estar vacío</p></div> : <label htmlFor='password'>Nueva contraseña</label>}
            {errors.password?.type === "minLength" && <div className='register-error'><img src={mistake} alt="error"/><p>Minimo 8 caracteres</p></div>}
          </div>
          <div className='register-fields-password'>
            <div className='register-fields-content'>
              <input type={eye2 === false ? 'password' : 'text'} id="password-two" placeholder='Repetir contraseña' {...register('password2', {
                  required: true,
                  minLength: 8,
                  validate: (value) =>
                  value === passwords || "Las contraseñas no coinciden"
              })}/>
              <p onClick={() => handleOnVerify()}><img src={eye2 === false ? eyes : noeye} alt="noeye"/></p>
            </div>
            
            {errors.password2?.type === "required" ? <div className='register-error'><img src={mistake} alt="error"/><p>Este campo no debe estar vacío</p></div> : <label htmlFor='password-two'>Repetir contraseña</label>}
            {errors.password2?.type === "minLength" && <div className='register-error'><img src={mistake} alt="error"/><p>Minimo 8 caracteres</p></div>}
            {errors.password2 && <div className='register-error'><img src={mistake} alt="error"/><p>{errors.password2.message}</p></div>}
          </div>
          {isValid === true && <div className='register-complete'><p>Datos completos</p></div>}
          <div className='register-fields-button'>
            <input type='submit' value="Registrarme" onClick={() => {
              if(isValid){
                Swal.fire({
                  title: 'Registro completo',
                  text: 'Regresa a Login para ingresar',
                  timer: 5000,
                  confirmButtonText: 'Aceptar',
                  icon: "success"
                })
              }
            }}/>
          </div>
          <Link to="/" className="register-back">Ir a login</Link>
        </form>
      </div>
    </div>
  )
}

export default Register