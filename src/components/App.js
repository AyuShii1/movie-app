import React from 'react';
import {data} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import {addMovies, setShowFavourites} from '../actions'
import {StoreContext} from '../index';
class App extends React.Component{
  componentDidMount(){
    const {store}=this.props;
    store.subscribe(()=>{
      console.log('UPDATED',store);
      this.forceUpdate();
    });
    //make api call
    //dispatch action
    store.dispatch(addMovies(data));
    console.log('STATE',this.props.store.getState());
  }

  isMovieFavourite=(movie)=>{
    const {movies}=this.props.store.getState();

    const index=movies.favourites.indexOf(movie);

    if(index!==-1){
        //found the movie
        return true;
    }
    return false;
}
onChangeTab=(val)=>{
  this.props.store.dispatch(setShowFavourites(val))
}
  render(){
    // const movies=this.props.store.getState();//earlier our state was an array
    const {movies,search}=this.props.store.getState();//{movies:{},search:{}}

    const {list,favourites,showFavourites}=movies; //{movies:{},search:{}}
    console.log('RENDER',this.props.store.getState());

    const displayMovies=showFavourites?favourites:list;

    // return(
    //   <StoreContext.Consumer>
    //     {(store)=>{
     return (
      <div className="App">
       {/* Project Setup */}
         {/* <Navbar dispatch={this.props.store.dispatch} search={search} /> */}
         <Navbar search={search} />
       <div className='main'>
         <div className='tabs'>
           <div className={`tab ${showFavourites?'':'active-tabs'}`} onClick={()=>this.onChangeTab(false)}>Movies</div>
           <div className={`tab ${showFavourites?'active-tabs':''}`} onClick={()=>this.onChangeTab(true)}>Favourites</div>
         </div>
         <div className='List'>
           {displayMovies.map((movie,index)=>(//data.js file mai movie objects hai
            <MovieCard 
              movie={movie} 
              key={`movies-${index}`} 
              dispatch={this.props.store.dispatch}
              //passing isFavourie as prop to moviecard
              isFavourite={this.isMovieFavourite(movie)}
            />//passing movie via props to moviecard
            ))}
         </div>
         {displayMovies.length===0?<div className='no-movies'>No movies to display!</div>:null}
       </div>
      </div>
    );
      //  }}
      // {/* </StoreContext.Consumer> */}
      }
}


class AppWrapper extends React.Component{
  render(){
    return(
      <StoreContext>
        {(store)=><App store={store}/>}
      </StoreContext>
    )
  }
}

export default AppWrapper;
