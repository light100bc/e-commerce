import {createStore,applyMiddleware} from 'redux';//middleware is between action and root reducer
import logger from 'redux-logger';//middlewares stored init?

import rootReducer from './root.reducer';


//set middleware, if we add middleware, we add it into [logger] array.
const middlewares=[logger];

const store=createStore(rootReducer,applyMiddleware(...middlewares)); //create store
//the 2nd arg is the return of applyMiddleware(), it is NOT callback function


export default store;