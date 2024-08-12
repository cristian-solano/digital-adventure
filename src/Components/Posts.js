import React, { useCallback, useEffect, useState } from 'react'
import '../Style/posts.css'
import { getImages } from '../Services/gallery'
import like from '../Images/likeBlank.png'
import love from '../Images/loveBlank.png'

const Posts = () => {

    const [dataPost, setDataPost] = useState([])
    

    const fetchPost = useCallback(async() => {
        const data = await getImages()
        setDataPost(data)
    }, [dataPost]) 

    useEffect(() => {
        fetchPost()
    }, [])


  return (
    <div className='post-container'>
        {dataPost && dataPost.map(items => (
            <div className='post-box' key={items.id}>
                <img src={items.photo_url} alt={`photono${items.id}`}/>
                <div className='post-box-content'>
                    <div className='post-reactions'>
                        <div className='post-reaction-type'>
                            <img src={love} alt="love"/>
                            {items.reaction_count && items.reaction_count.filter(info => info.reaction_type === "LOVE").map(info => (
                                info.length >= 0 ? <span>{info.length}</span> : <span>0</span>
                            ))}
                            
                        </div>
                        <div className='post-reaction-type'>
                            <img src={like} alt="like"/>
                            {items.reaction_count && items.reaction_count.filter(info => info.reaction_type === "LIKED").map(info => (
                                info.length >= 0 ? <span>{info.length}</span> : <span>0</span>
                            ))}
                        </div>
                    </div>
                    <div className='post-description'>
                        <p>{items.description}</p>
                    </div>
                </div>
                
            </div>
        ))}
    </div>
  )
}

export default Posts