import React from 'react'
import '../Style/home.css'
import Gallery from '../Components/Gallery';
import Navbar from '../Components/Navbar';
import plus from '../Images/plus.png'
import Posts from '../Components/Posts';

const Home = () => {
    

    return (
        <div className='home-container'>
            <Navbar/>
            <div className='home-content'>
                <div className='home-create'>
                    <label htmlFor='newPost' className='home-create-label'>
                        <img src={plus} alt="plus"/>
                    </label>
                    <Posts/>
                </div>
                <input type="checkbox" id="newPost" style={{display: "none"}}/>
                <div className='home-create-post'>
                    <Gallery/>
                    <label htmlFor='newPost' className='home-create-label-close'>
                        <p>X</p>
                    </label>
                </div>
                
                <section className='home'>
                <div className='home__container'>
                    
                </div>
                </section>
            </div>
            
        </div>
        
    );
}

export default Home