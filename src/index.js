import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { createStore,applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

//curried type
//function logger (obj,next,action)
//redux will internally call logger like this-
//logger(obj)(next)(action)
// const logger = function({dispatch,getState}){
//   return function(next){
//     return function(action){
//       //middleware code
//       console.log('ACTION_TYPE=',action.type);
//       next(action);
//     }
//   }
// }

//2nd way of writing the middleware
const logger=({dispatch,getState})=>(next)=>(action)=>{
  //logger code
  if(typeof action!== 'function'){
    console.log('ACTION_TYPE',action.type);
  }
  next(action);
}

// const thunk=({dispatch,getState})=>(next)=>(action)=>{
//   //logger code
//  if(typeof action ==='function'){
//    action(dispatch);
//    return ;
//  }
//   next(action);
// }

const store=createStore(rootReducer,applyMiddleware(logger,thunk));//we will pass reducer in the arguement
console.log('store',store);// store is just an object with some properties
//dispatch , subscribe getstate etc 
console.log(' before state',store.getState());//default empty array
//we were passing movies reducer in createstore. createstore fn internally call
//my reducerto get initial state
//go to index.js reducers -> setting the state to empty array
//redux is calling movies(undefined,{})agar undefined hua toh
//initial state empty array leliya
//before we sent the action state


export const StoreContext=createContext();

console.log('StoreContext',StoreContext);

class Provider extends React.Component{
  render(){
    const{store}=this.props;
   return <StoreContext.Provider value={store}>
     {this.props.children}
     </StoreContext.Provider>
  }
}

// store.dispatch({
//   type:'ADD_MOVIES',
//   movies:[{name:'Superman'}]
// });//action object as an arguement

//after state
// console.log('after state',store.getState());

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
    </Provider>
    {/* passing store as prop */}
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
