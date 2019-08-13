import React from 'react';
import {Store} from './Store';
import {Link} from '@reach/router';


export default function App(props:any):JSX.Element {
  
  //function returning object value = {state, dispatch} which we take
  const {state} = React.useContext(Store);

  return (
    <React.Fragment>
      {console.log({state,props})}
      <header className="header">
        <div>
          <h1>Rick and Morty</h1>
          <p>Pick Your Favorite Episode</p>
        </div>
        <h3>
          <Link to='/'> {" "} Home {" "}</Link> &nbsp;
          <Link to='/FavPage'> {" "} Favourite(s): {state.favourites.length} {" "}</Link>
        </h3>
      </header>
      {props.children}
    </React.Fragment>
  )
}
