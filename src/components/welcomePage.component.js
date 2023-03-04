import React from 'react';
import './home.css'

function WelcomePage() {
    return (
        
        <div className='neoBody'>
           <div className='neoWelcomeContainer'>
            Welcome to Nio Class
            <a href='/dashboard'>
                <button className='startBtn'>Start JEE Preparation</button>
            </a>
           </div>
        </div>
    );
}

export default WelcomePage;