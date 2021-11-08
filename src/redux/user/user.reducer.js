//reducer used to store the currentUser state.
import {UserActionTypes} from './user.types';

const INITIAL_STATE={
    currentUser:null
}

const UserReducer=(state=INITIAL_STATE, action)=>{
    switch (action.type){
        case UserActionTypes.SET_CURRENT_USER:
            return{
                ...state, //keep all state the same as before
                currentUser:action.payload //only change the one(currentUser) we want to change. set the attri in new state. The new value is in action.

            };
        default:
            return state;
    }
};

export default UserReducer;