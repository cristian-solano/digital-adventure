import React, { useState } from 'react'
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { app } from '../Auth/firebase';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';


const Galllery = () => {

    const [archivoUrl, setArchivoUrl] = useState(null)
    const db = getFirestore(app)
    const storage = getStorage(app)
    const archivoHandler = async (e) => {
        const archivo = e.target.files[0];
        const storageRef = ref(storage, archivo.name);
        await uploadBytes(storageRef, archivo);
        console.log("archivo cargado:", archivo.name);
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
            await addDoc(collection(db, "gallery"), {
                description: nombreArchivo,
                photo_url: archivoUrl,
                reaction_count: [
                    { reaction_type: "" }
                ]
            });
            console.log("archivo cargado:", nombreArchivo, "url:", archivoUrl);
        } catch (error) {
            console.error('Error al agregar el documento: ', error);
        }
      };

  return (
    <form onSubmit={submitHandler}>
        <input type="file" onChange={archivoHandler} />
        <input type="text" name="nombre" placeholder="nombra tu archivo" />
        <button>Enviar</button>
    </form>
  )
}

export default Galllery