import React, { useState } from 'react'
import '../Style/gallery.css'
import image from '../Images/newImage.png'
import "firebase/compat/storage";
import "firebase/compat/firestore";
import {getFirestore } from 'firebase/firestore';
import { app } from '../Auth/firebase';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import savePhoto from '../Services/gallery';


const Gallery = () => {

    const userId = sessionStorage.getItem("id")
    const [archivoUrl, setArchivoUrl] = useState(null)
    const [nameFile, setNameFile] = useState(null)
    const db = getFirestore(app)
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
        
        <button className='gallery-button'>Enviar</button>
    </form>
  )
}

export default Gallery