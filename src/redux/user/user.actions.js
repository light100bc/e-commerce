//functions(actions) that will tigger the reducer
//call the action in the component
import {UserActionTypes} from './user.types';

export const setCurrentUser=user=>(
    {
        type:UserActionTypes.SET_CURRENT_USER,
        payload:user
    }
);

