import { ADD_MOVIES,ADD_TO_FAVOURITES,REMOVE_FROM_FAVOURITES,SET_SHOW_FAVOURITES,ADD_MOVIE_TO_LIST, ADD_SEARCH_RESULT } from "../actions";

import { combineReducers } from "redux";


// export default function movies(state=[],action){
////  if(action.type==='ADD_MOVIES'){//ideally we should avoid string comparisons and we should store string in a variable
//    if(action.type===ADD_MOVIES){
//      return action.movies;
//  }
//  return state;
// }
// const ADD_MOVIES='ADD_MOVIES';//move this to actions index file 
//so our movie reducer will get 2 things, the first is the state(this will be the current state of our store and this
//will never be undefined but if it  is then set it as empty array because our global state will be an array of movies
//we will get and action as well 
//inside reducer we will perform some action , change state , modify state by expressing an intent 


//movies reducer
const initialMovieState={
    list:[],
    favourites:[],
    showFavourites:false
}
export function movies(state=initialMovieState,action){
    // if(action.type===ADD_MOVIES){
    //     return {
    //        ...state,
    //        list:action.movies
    //     }
    // }
    // return state;
    //console.log('asdfghjkl;',action.movies);
    switch(action.type){
        case ADD_MOVIES:
            return{
                ...state,
                list:action.movies
            }
        case ADD_TO_FAVOURITES:
            return {
                ...state,
                favourites:[action.movie,...state.favourites]
            } 
        case REMOVE_FROM_FAVOURITES:
            const fiteredArray=state.favourites.filter(
                movie=>movie.Title!==action.movie.Title
            );
            return{
                ...state,
                favourites:fiteredArray//this is a new array
            }
        case SET_SHOW_FAVOURITES:
            return{
                ...state,
                showFavourites:action.val
            } 
        case ADD_MOVIE_TO_LIST:
            return{
                ...state,
                list:[action.movies,...state]
            }       

        default:
            return state;
    }
   }


//result reducer
const initialSearchState={
    result:{},
    showSearchResults:false
};

export function search(state=initialSearchState,action){
   
    switch(action.type){
        case ADD_SEARCH_RESULT:
            return {
                ...state,
                result:action.movie,
                showSearchResults:true
            }
        case ADD_MOVIE_TO_LIST:
            return{
                ...state,
                showSearchResults:false
            }       
        default:
            return state;
    }
}

//root reducer
// const initialRootState={
//     movies:initialMovieState,
//     search:initialSearchState
// }
// export default function rootReducer(state=initialRootState,action){
//     return{
//         movies:movies(state.movies,action),
//         search:search(state.search,action)
//     }
// }

export default combineReducers({
    movies:movies,
    search:search
})