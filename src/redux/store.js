import {createStore,applyMiddleware} from 'redux';//middleware is between action and root reducer
import logger from 'redux-logger';//middlewares stored init?
import {persistStore} from 'redux-persist';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './root-saga';

import rootReducer from './root.reducer';


//set middleware, if we add middleware, we add it into [logger] array.
// const middlewares=[thunk];

const sagaMiddleWare=createSagaMiddleware();
const middlewares=[sagaMiddleWare];

if(process.env.NODE_ENV=='development'){
    middlewares.push(logger);
}


export const store=createStore(rootReducer,applyMiddleware(...middlewares)); //create store
//the 2nd arg is the return of applyMiddleware(), it is NOT callback function

sagaMiddleWare.run(rootSaga);//可能要跑多个sagas，所以用rootSaga和all()。所有saga一起跑

export const persistor=persistStore(store);
