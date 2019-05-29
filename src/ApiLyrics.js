import React, {Component} from 'react';
import './App.css';
import axios from 'axios'
import Speech from 'speak-tts'



class ApiLyrics extends Component {
  constructor(props){
    super(props)
    this.state ={
      text:'testing',
      lyrics: 'testing',
    }

    this.handleUpdate = this.handleUpdate.bind(this)
  }
  
componentDidMount(){
  const songURL = 'https://api.musixmatch.com/ws/1.1/track.lyrics.get?format=jsonp&callback=callback&track_id=162470278&apikey=1f014cafc572cf2ca97527bd6fa9633a'
  
  axios.get(songURL)
  .then( res => {
    let dataRes = JSON.parse(res.data.slice(9, res.data.length -2))
    this.setState({
      lyrics: dataRes.message.body.lyrics.lyrics_body
    })
  })
  .catch( err => console.log(err))
  
 
}

handleUpdate(event){
  event.preventDefault()
  const speech = new Speech()
  speech.init({
    'volume': 1,
       'lang': 'en-GB',
       'rate': 1,
       'pitch': 1,
       'voice':'Google UK English Male',
       'splitSentences': true,
       'listeners': {
           'onvoiceschanged': (voices) => {
               console.log("Event voiceschanged", voices)
           }
       }
})
console.log(this.state.lyrics)
speech.speak({
  text: this.state.lyrics
}).then(() => {
  console.log("Success !")
}).catch(e => {
  console.error("An error occurred :", e)
})

 
}
render () {
  return(
    <div> 
    
    <form onSubmit={this.handleUpdate}>
      <button onClick={this.handleUpdate}> {this.props.buttonText}</button>
      <h1> {this.state.lyrics}</h1>
    </form>
  
    

    </div>
  )
}


}
export default ApiLyrics;
