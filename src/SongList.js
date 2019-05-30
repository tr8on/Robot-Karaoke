import React, {Component} from 'react';
import './App.css'

const SongList = (props) => {
    return (
        <>

        <ul>
            {props.mySongs.map (  ({track}, index) => (

                <div className='track-song' key={index}>
                {console.log(track)}
                    <h2>{track.track_name} <br></br> {track.artist_name}</h2>
                    <button onClick={() => props.updateSong(track.track_id)}>Play</button>
                </div>
            )
            )}
             {/* {this.state.allSongs &&

this.state.allSongs.map((track, id) => <Link to={`/Track/${id + 1}`}><h2>{track.track_name}</h2></Link>)} */}
        </ul>

        </>
    )
}

export default SongList