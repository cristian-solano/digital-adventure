import { db } from '../Auth/firebase'
import {addDoc, collection, getDocs, updateDoc, arrayUnion, doc, increment} from "firebase/firestore";
import { getProfile } from './profile';




const savePhoto = async(nombreArchivo, archivoUrl, userId) => {

    try {
        await addDoc(collection(db, "gallery"), {
            description: nombreArchivo,
            photo_url: archivoUrl,
            owner: userId,
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
        let images = []

        
        for (const doc of dataImages.docs) {  
            let imageData = doc.data();
            
            const profile = await getProfile(imageData.owner);
            imageData.profile = profile;
            imageData.id = doc.id;
            images.push(imageData);
        } 
        
        return images; 
    }
    catch (error) {
        throw new Error(`An error occurred fetching the images ${error}`);
    }
};

export const updateReaction = async(galleryId, reaction) => {
    try {
        const galleryRef = doc(db, "gallery", galleryId);  
        await updateDoc(galleryRef, {
            reaction_count: increment(1),
            reactions: arrayUnion(reaction)  
        });
    } catch (error) {
        console.log(error)
        throw new Error(`An error occurred while updating images: ${error}`);
    }
}


