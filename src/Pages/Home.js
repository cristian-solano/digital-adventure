import React from 'react'
import '../Style/home.css'
import Galllery from '../Components/Galllery';
import Navbar from '../Components/Navbar';

const Home = () => {
    

    return (
        <div className='home-container'>
            <Navbar/>
            <Galllery/>
            <section className='home'>
            <div className='home__container'>
                   
            </div>
            </section>
        </div>
        
    );
}

export default Home