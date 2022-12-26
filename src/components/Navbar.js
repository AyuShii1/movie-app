import React from 'react';
// class Navbar extends React.Component{
//     render(){
//         return(
//             <div className="nav">
//                 <div className='search-container'>
//                     <input />
//                     <button id='search-btn' >Search</button>
//                 </div>
//             </div>
//         )
//     }
// }

import {StoreContext} from '../index';
import { addMovieToList,handleMovieSearch } from '../actions';
import { data } from '../data';


class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // showSearchResults:false,
      searchText:''
    };
  }
  handleAddToMovies = (movie) => {
    this.props.dispatch(addMovieToList(movie));
    this.setState({
        showSearchResults:false
    });
  };

  handleSearchClick=()=>{
      const {searchText}=this.state;
      this.props.dispatch(handleMovieSearch(searchText));
  };
  handleChange=(e)=>{
      this.setState({
        
          searchText:e.target.value
        
      });
  //     console.log('aaa',e.target.value);
   }

  render() {
    // const {showSearchResults}  = this.state;
    const {result:movie,showSearchResults} =this.props.search;
    return (
      <div className="nav">
        <div className="search-container">
          <input onChange={this.handleChange}/>
          <button id="search-btn" onClick={this.handleSearchClick}>
            Search
          </button>

          {showSearchResults && (
            <div className="search-results">
              <div className="search-result">
                {/* <img src={data[0].Poster} alt="search-pic" /> */}
                {/* <img src={result.Poster} alt="search-pic" /> */}
                <img src={movie.Poster} alt="search-pic" />
                <div className="movie-info">
                  <span>{data[0].Title}</span>
                  <button onClick={() => this.handleAddToMovies(data[0])}>
                    Add to Movies
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

class NavbarWrapper extends React.Component {
  render() {
    return (
      <StoreContext.Consumer>
        {(store) => (
          <Navbar dispatch={store.dispatch} search={this.props.search} />
        )}
      </StoreContext.Consumer>
    );
  }
}

export default NavbarWrapper;
// export default Navbar;