import React from 'react';
import '../App.css';
// import ApiLyrics from './ApiLyrics'
import Speech from "speak-tts"
import { Route, Link } from "react-router-dom"

function home() {
    return (
        <Link to="/ApiLyrics"> 
      <body className='home-pg'>
  <div className='home-title'>
             
  <h1 >Robot Karaoke</h1>
               {/* <ApiLyrics
          
        /> */}
              <p>Robot Karaoke app where you can find your favorite song and have a text to speech AI sing along</p>
              </div>
        
      
  
              </body>
              </Link>
    );
  }
  
  export default home;