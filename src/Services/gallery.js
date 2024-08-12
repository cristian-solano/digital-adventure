import React from 'react'
import { db } from '../Auth/firebase'
import {addDoc, collection, getDocs} from "firebase/firestore";


const savePhoto = async(nombreArchivo, archivoUrl, userId) => {

    try {
        await addDoc(collection(db, "gallery"), {
            description: nombreArchivo,
            photo_url: archivoUrl,
            userId: userId,
            reaction_count: [
                { reaction_type: "", profile: "" }
            ]
        });
    } catch (error) {
        throw new Error('An error ocurred save the photo:', error)
    }
    
}

export default savePhoto

export const getImages = async() => {
    try {
        const galleryRef = collection(db, "gallery");
        const dataImages = await getDocs(galleryRef);
        const images = [];
        
        dataImages.forEach((doc) => {  
            images.push({ id: doc.id, ...doc.data() }); // Incluye el ID del documento si lo necesitas
        });      
        
        return images; // Retorna todas las imágenes
    }
    catch (error) {
        throw new Error("An error occurred fetching the images");
    }
};
