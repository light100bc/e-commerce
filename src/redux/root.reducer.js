//The mega state object in redux combine all state objects

import { combineReducers } from "redux";

import userReducer from './user/user.reducer';

export default combineReducers({
    user:userReducer
});
