import React from 'react';
import './App.css';
import ApiLyrics from './ApiLyrics'
import Speech from "speak-tts"

// import './voicerss-tts.min.js'





function App() {
  return (
    <div className="App">
      main app
  

    <ApiLyrics
        buttonText={"SEND SPEECH"}
  
        placeholder={"enter lyrics"}
      />
      
    </div>
  );
}

export default App;