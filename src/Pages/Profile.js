import React, { useCallback, useEffect, useState } from 'react'
import '../Style/profile.css'
import "firebase/compat/storage";
import "firebase/compat/firestore";
import { useNavigate } from 'react-router-dom';
import createProfile, { getProfile, savePhotoProfile } from '../Services/profile';
import profileImage from '../Images/collage.jpeg'
import logo from '../Images/logoImage.png'
import photoDefault from '../Images/photodefault.png'
import { app } from '../Auth/firebase';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const Profile = () => {

    const navigate = useNavigate()
    const [todo, setTodo] = useState([]);
    const uid = sessionStorage.getItem("id")
    const mail = sessionStorage.getItem("email")
    const storage = getStorage(app)
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [profileInfo, setProfileInfo] = useState({})
    const [dateBirth, setDateBirth] = useState('')
    const [photoProfile, setPhotoProfile] = useState(null)
    const [nameFile, setNameFile] = useState(null)


    
    

    const archivoHandler = async (e) => {
        const archivo = e.target.files[0];
        const storageRef = ref(storage, archivo.name);
        await uploadBytes(storageRef, archivo);
        setNameFile(archivo.name);
        const enlaceUrl = await getDownloadURL(storageRef);
        setPhotoProfile(enlaceUrl);
    };
   


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
           
            await createProfile(fullName, phone, uid, mail, dateBirth, photoProfile)
            navigate(`/homepage`);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    

    const handleOnChangeName = (e) => {
        setFullName(e.target.value);
    };

    const handleOnChangePhone = (e) => {
        setPhone(e.target.value);
    };

    const handleOnChangeBirth = (e) => {
        setDateBirth(e.target.value);
    };
    

    // const getProfile = async() => {
    //     const q = query(profileRef, where("user_id", "==", `${uid}`))
    //     const dataProfile = await getDocs(q)
    //     console.log(dataProfile)   
    //     setTodo(dataProfile)
    // }

    const fetchProfile = useCallback(async() => {
        const profileData = await getProfile(uid)
        setProfileInfo(profileData)
    }) 

    useEffect(() => {
        fetchProfile()
    }, [])

    
    


  return (
    <div className='profile-container'>
        <div className='profile-content'>
            <form onSubmit={handleSubmit} className='profile-form'>
                
                <h3>Nuevos datos</h3>
                <div className='profile-fields'>
                    <div className='profile-field-photo'>
                        <label htmlFor='photoPro'>
                            <img src={profileInfo?.profile_photo !== "" ? profileInfo?.profile_photo : photoDefault} alt="photo"/>
                        </label>
                        {profileInfo?.profile_photo !== "" ? "" : <input type='text' value={nameFile !== null ? nameFile : "sin archivo"} alt="photoPicture"/>}
                        <input type="file" id="photoPro" onChange={archivoHandler} style={{display: "none"}} name="profile"  accept='.jpg, .jpeg, .png'/>
                    </div>
                    <div className='profile-field'>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder='Nombre Completo' 
                            onChange={handleOnChangeName} 
                            value={profileInfo?.full_name} 
                        />
                        <label>Nombre Completo</label>
                    </div>
                    <div className='profile-field'>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder='Telefono' 
                            onChange={handleOnChangePhone} 
                            value={profileInfo?.mobile} 
                        />
                        <label>Telefono</label>
                    </div>
                    <div className='profile-field'>
                        <input 
                            type="date" 
                            name="name" 
                            onChange={handleOnChangeBirth} 
                            value={profileInfo?.date_birth} 
                        />
                        <label>Fecha de nacimiento</label>
                    </div>
                    <div className='profile-button'>
                        <button type='submit'>Guardar</button>
                    </div>
                </div>
                
            </form>
        </div>
            
        </div>
  )
}

export default Profile