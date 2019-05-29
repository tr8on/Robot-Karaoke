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
      searchText: 'Justin Bieber',
      allSongs: []
  
    }

    this.handleUpdate = this.handleUpdate.bind(this)
    this.pauseButton = this.pauseButton.bind(this)
    this.resumeButton = this.resumeButton.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.searchSong = this.searchSong.bind(this)

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

handleSubmit(event){
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

handleUpdate(event){

  this.setState({
   searchText: event.currentTarget.value
  
  })
  console.log(event.currentTarget.value)
  
}

pauseButton(){
  const speech = new Speech()
  speech.pause();
}
resumeButton(){
  const speech = new Speech()
  speech.resume();
}
searchSong(event){
  event.preventDefault()
  console.log(this.state.searchText)
    const searchURL = `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_artist=${this.state.searchText}&page_size=3&page=1&s_track_rating=desc&apikey=1f014cafc572cf2ca97527bd6fa9633a`

  axios.get(searchURL)
  .then( res => {
    //let searchResults = res.data
    console.log(res.data.message.body.track_list)
    this.setState({
      allSongs: res.data.message.body.track_list
    })
    console.log(allSongs)
  })
  .catch( err => console.log(err))
}

render () {
  return(
    <div> 
    
    <form onSubmit={this.handleSubmit}>
      <button onClick={this.handleSubmit}> {this.props.buttonText}</button>
      <button onClick={this.pauseButton}> Pause </button>
      <button onClick={this.resumeButton}> Resume </button>
    </form>
    <form onSubmit={this.searchSong}>
    <input placeholder="enter Artist" onChange={this.handleUpdate}></input>
    <button> Search Artist </button>
    </form>
    <h1> {this.state.lyrics}</h1>  
    </div>
  )
}


}
export default ApiLyrics;
