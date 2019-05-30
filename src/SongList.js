import React, {Component} from 'react';
import './App.css'

const SongList = (props) => {
    return (
        <>

        <div className='song-Container'>
            {props.mySongs.map (  ({track}, index) => (
                
                <div >
                    {console.log(track)}
                    <h2 className='track-song' key={index} onClick={() => props.updateSong(track.track_id)}>{track.track_name} <br></br> {track.artist_name}</h2>
                    {/* <p> {isClicked && props.lyrics}</p> */}
                    <p> {props.songLyrics}</p>
                </div>
            )
            )}
            
        </div>

        </>
    )
}

export default SongList