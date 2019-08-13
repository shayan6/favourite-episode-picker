import React from 'react';
import { IAction, IEpisode} from "./interfaces";
import {Store} from './Store';

export default function FavPage():JSX.Element {
        
    //function returning object value = {state, dispatch} which we take
    const {state, dispatch} = React.useContext(Store);

    const unFavAction = (episode:IEpisode):IAction => {
        const favouriteWithoutEpisode = state.favourites.filter( (fav:IEpisode) => fav.id !== episode.id )
        return dispatch({
            type: 'REMOVE_FAV',
            payload: favouriteWithoutEpisode
        })
    }
    
    return (
        <React.Fragment>
            <React.Suspense fallback={<div>loading...</div>}>
                <section className="episode-layout">
                 {state.favourites.map( (favourite:IEpisode) => (
                    <section key={favourite.id} className="episode-box">
                        <img src={favourite.image.medium} alt={favourite.name} />
                        <div>{favourite.name}</div>
                        <section style={{display:'flex', justifyContent:'space-between'}}>
                        <div>
                            Session: {favourite.season}
                            Number: {favourite.number}
                        </div>
                        <button type="button" onClick={ () => unFavAction(favourite) }> 
                            { 'Unfav' } 
                        </button>
                        </section>
                    </section>
                  ))}
                </section>
                <h1> {state.favourites.length === 0 && 'Not Added Yet!!!'} </h1>
            </React.Suspense>
        </React.Fragment>
    )
}