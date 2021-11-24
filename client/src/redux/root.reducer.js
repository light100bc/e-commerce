//The mega state object in redux combine all state objects

import { combineReducers } from "redux";
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';

import userReducer from './user/user.reducer';
import cartReducer from "./cart/cart.reducer";
import directoryReducer from './directory/directory.reducer';
import shopReducer from "./shop/shop.reducer";

const persistConfig={
    key:'root',
    storage,
    whitlist:['cart'] //user is stored on firebase, no need to do so
}

const rootReducer=combineReducers({
    user:userReducer,
    cart:cartReducer,
    directory:directoryReducer,
    shop:shopReducer
});


export default persistReducer(persistConfig,rootReducer) //now the reducer called in other componants is actually persistReducer

