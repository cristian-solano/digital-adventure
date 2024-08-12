import React, { useCallback, useEffect, useState } from 'react'
import '../Style/posts.css'
import { getImages } from '../Services/gallery'
import like from '../Images/likeBlank.png'
import love from '../Images/loveBlank.png'
import fire from '../Images/fire.png'
import { getProfile } from '../Services/profile'

const Posts = () => {

    const [dataPost, setDataPost] = useState([])
    

    const fetchPost = useCallback(async() => {
        const data = await getImages()
        setDataPost(data)
    }, []) 

    useEffect(() => {
        fetchPost()
    }, [])

    console.log(dataPost)


  return (
    <div className='post-container'>
        {dataPost && dataPost.map(items => (
            <div className='post-box' key={items.id}>
                <img src={items.photo_url} alt={`photono${items.id}`}/>
                <div className='post-owner'>
                    <p className='post-owner'><b>Publicado por: </b> {items.profile?.full_name}</p>
                </div>
                <div className='post-description'>
                    <p>{items.description}</p>
                </div>
                <div className='post-box-content'>
                    <div className='post-reactions'>
                        <div className='post-reactions-likes'>
                            <div className='post-reaction-type'>
                                <img src={love} alt="love"/>                        
                            </div>
                            <div className='post-reaction-type'>
                                <img src={like} alt="like"/>
                            </div>
                        </div>
                        
                        <div className='post-reaction-type'>
                            <img src={fire} alt="like"/>
                            <span>{items.reaction_count}</span>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        ))}
    </div>
  )
}

export default Posts