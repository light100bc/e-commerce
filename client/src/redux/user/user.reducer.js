//reducer used to store the currentUser state.
import UserActionTypes from './user.types';

const INITIAL_STATE={
    currentUser:null,
    error:null
}

const UserReducer=(state=INITIAL_STATE, action)=>{
    switch (action.type){
        // case UserActionTypes.SET_CURRENT_USER:
        //     return{
        //         ...state, //keep all state the same as before
        //         currentUser:action.payload //only change the one(currentUser) we want to change. set the attri in new state. The new value is in action.

        //     };
        case UserActionTypes.SIGN_IN_SUCCESS://替代了SET_CURRENT_USER
        return {
            ...state,
            currentUser: action.payload,
            error: null
        };
        case UserActionTypes.SIGN_OUT_SUCCESS:
        return {
            ...state,
            currentUser: null,
            error: null
        };
        case UserActionTypes.SIGN_UP_SUCCESS:
        return {
            ...state,
            currentUser: action.payload,
            error: null
        };
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
        return {
            ...state,
            error: action.payload
        };
        default:
            return state;
    }
};

export default UserReducer;