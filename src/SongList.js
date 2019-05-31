import React, {Component} from 'react';
import './App.css'

const SongList = (props) => {
    return (
        <>

        <div className='song-container'>
            {props.mySongs.map (  ({track}, index) => (
                
                <div className='track-song'>
                    {console.log(track)}
                    <h2  key={index} onClick={() => props.updateSong(track.track_id, index)}>{track.track_name} <br></br> {track.artist_name}</h2>
                    {/* {props.isClicked && <p>{props.songLyrics}</p>} */}
                    {props.clickedIndex === index && <p> {props.songLyrics}</p>}
                    {/* <p> {props.songLyrics}</p> */}
                </div>
            )
            )}
            
        </div>

        </>
    )
}

export default SongList