import { db } from '../Auth/firebase'
import {addDoc, collection, getDocs, where, query} from "firebase/firestore";
const profileRef = collection(db, "profile")

const createProfile = async(fullName, phone, uid, email, dateBirth, photoUrl) => {

    try {
        await addDoc(profileRef, {
            full_name: fullName,
            mobile: phone,
            date_birth: dateBirth,
            user_id: uid,
            email: email,
            profile_photo: photoUrl !== null ? photoUrl : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
        });
    } catch (error) {
        throw new Error('An error ocurred storing the profile:', error)
    }
    
}

export default createProfile


export const getProfile = async(userId) => {

    try {
        const q = query(profileRef, where("user_id", "==", userId))
        const dataProfile = await getDocs(q)
        const data = []
        
        dataProfile.forEach((doc) => {  
            data.push(doc) 
        })      
        if(data.length > 0){
            let profileData = data[0].data()
            profileData.id = data[0].id
            return profileData
        } else {
            return {}
        }
        
    }
     catch (error) {
        throw new Error(`An error ocurred fetching the profile by userId: ${error}`)
    }
}



