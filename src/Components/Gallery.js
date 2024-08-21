import React, { useState } from 'react'
import '../Style/gallery.css'
import image from '../Images/newImage.png'
import "firebase/compat/storage";
import "firebase/compat/firestore";
import { app } from '../Auth/firebase';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import savePhoto from '../Services/gallery';
import logo from '../Images/logoImage.png'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const Gallery = () => {

    const userId = sessionStorage.getItem("id")
    const [archivoUrl, setArchivoUrl] = useState(null)
    const [nameFile, setNameFile] = useState(null)
    const navigate = useNavigate()
    const storage = getStorage(app)
    const archivoHandler = async (e) => {
        const archivo = e.target.files[0];
        const storageRef = ref(storage, archivo.name);
        await uploadBytes(storageRef, archivo);
        setNameFile(archivo.name);
        const enlaceUrl = await getDownloadURL(storageRef);
        setArchivoUrl(enlaceUrl);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(e)
        const nombreArchivo = e.target.nombre.value;
        if (!nombreArchivo) {
            alert("coloca un nombre");
            return;
        }

        try {
            await savePhoto(nombreArchivo, archivoUrl, userId)
            console.log("archivo cargado:", nombreArchivo, "url:", archivoUrl, "id:", userId);
        } catch (error) {
            console.error('Error al agregar el documento: ', error);
        }
      };


  return (
    <form onSubmit={submitHandler} className='gallery-form'>
        <div className='gallery-upload'>
            <label htmlFor='fileCreate' className='gallery-label'>
                <img src={image} alt='plus'/>
                <p>Agrega una imagen</p>
            </label>
            <input type="file" id="fileCreate" onChange={archivoHandler} style={{display: "none"}} accept='.jpg, .jpeg, .png'/>
            {archivoUrl !== null && <img className='gallery-new-image' src={archivoUrl} alt="newImage"/>}
        </div>
        <div className='gallery-names'>
            <input type='text' name="photo" value={nameFile !== null ? nameFile : "Sin documento"}/>
            <input type="text" name="nombre" placeholder="Descripción" minLength="5"/>
        </div>
        
        <button className='gallery-button' onClick={() => {
            if(nameFile !== null && archivoUrl !== null){
                Swal.fire({
                    imageUrl: logo,
                    imageHeight: 200,
                    imageWidth: 200,
                    title: 'Nueva publicación',
                    timer: 3000, 
                    showConfirmButton: false
                })
                setTimeout(() => {
                    navigate('/homepage')
                }, 2000)
                
            }
        }}>Enviar</button>
    </form>
  )
}

export default Gallery