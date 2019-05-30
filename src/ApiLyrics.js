import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Speech from 'speak-tts'
import SongList from './SongList'
import seed from './SeedData'



class ApiLyrics extends Component {
  constructor(props) {

    super(props)
    this.state = {
      text: '',
      lyrics: '',
      searchText: '',
      allSongs: [],
      track_id: null


    }

    this.handleUpdate = this.handleUpdate.bind(this)
    this.pauseButton = this.pauseButton.bind(this)
    this.resumeButton = this.resumeButton.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.searchSong = this.searchSong.bind(this)
    this.updateSong = this.updateSong.bind(this)
    this.fetchLyrics = this.fetchLyrics.bind(this)


  }
componentDidMount(){
  console.log(seed)
  this.setState({
    allSongs: seed
  })
}
  fetchLyrics() {

    const songURL = `https://api.musixmatch.com/ws/1.1/track.lyrics.get?format=jsonp&callback=callback&track_id=${this.state.track_id}&apikey=1f014cafc572cf2ca97527bd6fa9633a`

    axios.get(songURL)
      .then(res => {
        let dataRes = JSON.parse(res.data.slice(9, res.data.length - 2))
        this.setState({
          lyrics: dataRes.message.body.lyrics.lyrics_body
        })
      })
      .catch(err => console.log(err))
  }

  handleSubmit(event) {
    event.preventDefault()
    const speech = new Speech()
    // const _addVoicesList = voices => {
    //   const list = window.document.createElement("div");
    //   let html =
    //     '<h2>Available Voices</h2><select id="languages"><option value="">autodetect language</option>';
    //   voices.forEach(voice => {
    //     html += `<option value="${voice.lang}" data-name="${voice.name}">${
    //       voice.name
    //     } (${voice.lang})</option>`;
    //   });
    //   list.innerHTML = html;
    //   window.document.body.appendChild(list);
    // };
    speech.init({
      'volume': 1,
      'lang': 'en-GB',
      'rate': .2,
      'pitch': 1,
      'voice': 'Google UK English Male',
      'splitSentences': true,
      'listeners': {
        'onvoiceschanged': (voices) => {
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

  handleUpdate(event) {

    this.setState({
      searchText: event.currentTarget.value

    })

  }
  async updateSong(newSong) {
    await this.setState({
      track_id: newSong
    })
    this.fetchLyrics();
  }
  pauseButton() {
    const speech = new Speech()
    speech.cancel()
    speech.pause()
    
  }
  resumeButton() {
    const speech = new Speech()
    speech.resume();
  }
  searchSong(event) {
    event.preventDefault()
    const searchURL = `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_artist=${this.state.searchText}&page_size=20&page=1&s_track_rating=desc&apikey=1f014cafc572cf2ca97527bd6fa9633a`
    axios.get(searchURL)
      .then(res => {
      //  console.log(JSON.stringify(res.data.message.body.track_list))
        //let searchResults = res.data
        this.setState({
          allSongs: res.data.message.body.track_list
        })

      })
      .catch(err => console.log(err))
  }

  render() {

    return (
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
        <SongList songLyrics={this.state.lyrics} updateSong={this.updateSong} mySongs={this.state.allSongs} />
        {/* <h1> {this.state.lyrics}</h1> */}

        
      </div>
    )
  }


}
export default ApiLyrics;
