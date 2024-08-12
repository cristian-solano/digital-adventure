import React, { useCallback, useEffect, useState } from 'react'
import '../Style/posts.css'
import { getImages, updateReaction } from '../Services/gallery'
import like from '../Images/likeBlank.png'
import love from '../Images/loveBlank.png'
import fire from '../Images/fire.png'
import { getProfile } from '../Services/profile'

const Posts = () => {

    const [dataPost, setDataPost] = useState([])
    const userId = sessionStorage.getItem("id")
    

    const fetchPost = useCallback(async() => {
        const data = await getImages()
        setDataPost(data)
    }, []) 

  


    const postReactions = useCallback(async(gallery_id, reaction_type) => {
        // const reaction = {reaction_type: reaction_type, user_id: userId}
        // const data = await updateReaction(gallery_id, reaction)
        // return data
    })

    useEffect(() => {
        fetchPost()
        postReactions()
    }, [])



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
                                <button onClick={() => postReactions(items.id,"LOVED")}><img src={love} alt="love"/> </button>                       
                            </div>
                            <div className='post-reaction-type'>
                                <button onClick={() => postReactions(items.id, "LIKED")}><img src={like} alt="like"/></button>
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