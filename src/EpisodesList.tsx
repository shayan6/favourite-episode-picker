import React from 'react';
import { IEpisode } from "./interfaces";

export default function EpisodesList(props:any):JSX.Element {
    const { episodes, toggleFavAction, favourites } = props;
    return episodes.map( (episode:IEpisode) => (
        <section key={episode.id} className="episode-box">
            <img src={episode.image.medium} alt={episode.name} />
            <div>{episode.name}</div>
            <section style={{display:'flex', justifyContent:'space-between'}}>
            <div>
                Session: {episode.season}
                Number: {episode.number}
            </div>
            <button type="button" onClick={ () => toggleFavAction(episode) }> 
                {favourites.includes(episode) ? 'Unfav' : 'Fav'} 
            </button>
            </section>
        </section>
        ))
}