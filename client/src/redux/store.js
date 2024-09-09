import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import initialState from './initialState';
import { thunk } from "redux-thunk";
import adsReducer from "./adsRedux";
import usersReducer from "./userRedux";


const subreducers = {
  ads: adsReducer,
  user: usersReducer,
}

const reducer = combineReducers(subreducers);


const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;