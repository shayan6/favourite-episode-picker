import React from 'react';
import { IAction, IState } from "./interfaces";

const initialState:IState = {
    episodes:[],
    favourites:[],
};

export const Store = React.createContext<IState | any>(initialState);

//reducer who take action then perform to set state on that action what to do
function reducer(state:IState,action:IAction):IState{
    switch(action.type){
        case 'FETCH_DATA':
            return { ...state, episodes: action.payload }
        case 'ADD_FAV':
            return { ...state, favourites: [ ...state.favourites, action.payload] }
        case 'REMOVE_FAV':
            return { ...state, favourites: action.payload }
        default:
            return state
    }
}

export function StoreProvider(props:any):JSX.Element{
    //take an initial state of the state and setState function in dispatch
    const [state, dispatch] = React.useReducer(reducer, initialState);
    return <Store.Provider value={{state, dispatch}}>{props.children}</Store.Provider>
}