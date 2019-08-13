import React from 'react';
import { IAction, IEpisode, IEpisodeProps } from "./interfaces";
import {Store} from './Store';
import {Link} from '@reach/router';

const EpisodesList = React.lazy<any>(() => import('./EpisodesList') )

export default function App():JSX.Element {

  //function returning object value = {state, dispatch} which we take
  const {state, dispatch} = React.useContext(Store);

  // any time the state change, the function will run consistently so get rid of it we use hook useEffect
  React.useEffect(() => {
    state.episodes.length === 0 && fetchDataAction()
  });

  // fetch url
  const fetchDataAction = async() => {
    const data = await fetch('https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes')
    const dataJSON = await data.json();
    return dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON._embedded.episodes
    });
  }

  const toggleFavAction = (episode:IEpisode):IAction => {
    if(state.favourites.includes(episode)){  
      const favouriteWithoutEpisode = state.favourites.filter( (fav:IEpisode) => fav.id !== episode.id )
      return dispatch({
        type: 'REMOVE_FAV',
        payload: favouriteWithoutEpisode
      })      
    }
    return dispatch({
      type: 'ADD_FAV',
      payload: episode
    })
  }
  
  const props:IEpisodeProps = {
    episodes: state.episodes,
    toggleFavAction,
    favourites: state.favourites
  }

  return (
    <React.Fragment>
      {console.log(state)}
      <header className="header">
        <div>
          <h1>Rick and Morty</h1>
          <p>Pick Your Favorite Episode</p>
        </div>
        <div>
          {/* <Link to='/'>Home</Link> */}
          <Link to='/Faves'>Favourite(s): {state.favourites.length}</Link>
        </div>
      </header>
      <React.Suspense fallback={<div>loading...</div>}>
        <section className="episode-layout">
          <EpisodesList {...props} />
        </section>
      </React.Suspense>
    </React.Fragment>
  )
}
