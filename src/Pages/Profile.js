import React, { useCallback, useEffect, useState } from 'react'
import { collection, getDocs, addDoc, setDoc, query, where, doc } from "firebase/firestore";
import {
    createUserWithEmailAndPassword
  } from "firebase/auth";
import {db} from '../Auth/firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { auth } from '../Auth/firebase'
import createProfile, { getProfile } from '../Services/profile';

const Profile = () => {

    const navigate = useNavigate()
    const [todo, setTodo] = useState([]);
    const uid = sessionStorage.getItem("id")
    const mail = sessionStorage.getItem("email")
    const {id} = useParams()
    const [fullName, setFullName] = useState('');
    const [country, setCountry] = useState('');
    const [profileInfo, setProfileInfo] = useState({})

    
   


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
           
            // await setDoc(doc(db, "profile"), {
            //     full_name: fullName,
            //     country: country,
            //     user_id: uid,
            //     email: mail
            // });
            await createProfile(fullName, country, uid, mail, "")

            navigate(`/homepage`);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const handleOnChangeName = (e) => {
        setFullName(e.target.value);
    };

    const handleOnChangeCountry = (e) => {
        setCountry(e.target.value);
    };
    

    // const getProfile = async() => {
    //     const q = query(profileRef, where("user_id", "==", `${uid}`))
    //     const dataProfile = await getDocs(q)
    //     console.log(dataProfile)   
    //     setTodo(dataProfile)
    // }

    const fetchProfile = useCallback(async() => {
        const data = await getProfile(uid)
        setProfileInfo(data)
    }) 

    useEffect(() => {
        fetchProfile()
    }, [])

    



  return (
    <div>
            <form onSubmit={handleSubmit}>
                
                    <div>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder='Nombre Completo' 
                            onChange={handleOnChangeName} 
                            value={profileInfo?.full_name} 
                        />
                        <label>Nombre Completo</label>
                </div>
               
               
                    <div>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder='País' 
                            onChange={handleOnChangeCountry} 
                            value={profileInfo?.country} 
                        />
                        <label>País</label>
                    </div>
              
                
                <div>
                    <button type='submit'>Guardar</button>
                </div>
            </form>
        </div>
  )
}

export default Profile