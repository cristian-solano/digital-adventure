import React, { useCallback, useEffect, useState } from 'react'
import '../Style/profile.css'
import { useNavigate, useParams } from 'react-router-dom';
import createProfile, { getProfile } from '../Services/profile';
import profileImage from '../Images/collage.jpeg'
import logo from '../Images/logoImage.png'

const Profile = () => {

    const navigate = useNavigate()
    const [todo, setTodo] = useState([]);
    const uid = sessionStorage.getItem("id")
    const mail = sessionStorage.getItem("email")
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
    <div className='profile-container'>
        <div className='profile-content'>
            <form onSubmit={handleSubmit} className='profile-form'>
                <div className='profile-logo'>
                    <img src={logo} alt="logo"/>
                </div>
                <h3>Nuevos datos</h3>
                <div className='profile-fields'>
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
                            placeholder='País' 
                            onChange={handleOnChangeCountry} 
                            value={profileInfo?.country} 
                        />
                        <label>País</label>
                    </div>
                    <div className='profile-button'>
                        <button type='submit'>Guardar</button>
                    </div>
                </div>
                
            </form>
            <div className='profile-image'>
                <img src={profileImage} alt="picPorfile"/>
            </div>
        </div>
            
        </div>
  )
}

export default Profile