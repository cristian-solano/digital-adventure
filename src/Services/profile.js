import React from 'react'
import { db } from '../Auth/firebase'
import {addDoc, collection, getDocs, where, query } from "firebase/firestore";
const profileRef = collection(db, "profile")

const createProfile = async(fullName, country, uid, email, profilePhoto) => {

    try {
        await addDoc(profileRef, {
            full_name: fullName,
            country: country,
            user_id: uid,
            email: email,
            profile_photo: profilePhoto
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
            data.push(doc.data()) 
        })      
        return data[0]
    }
     catch (error) {
        throw new Error(`An error ocurred fetching the profile by userId: ${userId}`)
    }
}

