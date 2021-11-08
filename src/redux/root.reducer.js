//The mega state object in redux combine all state objects

import { combineReducers } from "redux";

import userReducer from './user/user.reducer';
import cartReducer from "./cart/cart.reducer";

export default combineReducers({
    user:userReducer,
    cart:cartReducer
});
