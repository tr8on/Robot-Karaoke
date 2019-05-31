import React from 'react';
import './App.css';
import ApiLyrics from './ApiLyrics'
import Speech from "speak-tts"
import { Route, Link } from "react-router-dom"
import home from './react-app/home'

// import './voicerss-tts.min.js'





function App() {
  return (
    
<div>

           
      <Route exact path = '/' component = {home} />
        <Route exact path = '/ApiLyrics' component = {ApiLyrics} />
           {/* {<home />} */}
             {/* <ApiLyrics
        buttonText={"SEND SPEECH"}
        placeholder={"enter lyrics"}
      /> */}
            
            </div>
      
    

    
  );
}

export default App;