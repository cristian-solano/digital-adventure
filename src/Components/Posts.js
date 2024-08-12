import React, { useCallback, useEffect, useState } from 'react'
import '../Style/posts.css'
import { getImages, updateReaction } from '../Services/gallery'
import like from '../Images/likeBlank.png'
import likeColor from '../Images/likeColor.png'
import love from '../Images/loveBlank.png'
import loveColor from '../Images/loveColor.png'
import fire from '../Images/fire.png'


const Posts = () => {

    const [dataPost, setDataPost] = useState([])
    const userId = sessionStorage.getItem("id")
    const [reactionsState, setReactionsState] = useState({});
    

    const fetchPost = useCallback(async() => {
        const dataImages = await getImages();
        const initialReactions = {};

        dataImages.forEach(image => {
            initialReactions[image.id] = {
                liked: image.reactions?.some(info => info.user_id === userId && info.reaction_type === "LIKED") || false,
                loved: image.reactions?.some(info => info.user_id === userId && info.reaction_type === "LOVED") || false
            };
        });

        setReactionsState(initialReactions);
        setDataPost(dataImages);
    }, [userId]) 

  


    const postReactions = useCallback(async(gallery_id, reaction_type) => {
        const newReactionsState = { ...reactionsState };
        const reaction = { reaction_type: reaction_type, user_id: userId };

        if (reaction_type === "LIKED") {
            if (!reactionsState[gallery_id]?.liked) {
                newReactionsState[gallery_id].liked = true;
                await updateReaction(gallery_id, reaction);
            }
        } else if (reaction_type === "LOVED") {
            if (!reactionsState[gallery_id]?.loved) {
                newReactionsState[gallery_id].loved = true;
                await updateReaction(gallery_id, reaction);
            }
        }

        setReactionsState(newReactionsState);

        
       
    }, [reactionsState, userId])

    useEffect(() => {
        fetchPost()
    }, [fetchPost])




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
                                <button type='button' onClick={() => postReactions(items.id,"LOVED")}><img id={`love-${items.id}`} src={reactionsState[items.id]?.loved ? loveColor : love} alt="love"/> </button>                       
                            </div>
                            <div className='post-reaction-type'>
                                <button type='button' onClick={() => postReactions(items.id, "LIKED")}><img id={`like-${items.id}`} src={reactionsState[items.id]?.liked ? likeColor : like} alt="like"/></button>
                            </div>
                        </div>
                        
                        <div className='post-reaction-type'>
                            <img src={fire} alt="like"/>
                            <span>{items?.reactions?.length > 0 ? items.reactions.length : 0}</span>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        ))}
    </div>
  )
}

export default Posts