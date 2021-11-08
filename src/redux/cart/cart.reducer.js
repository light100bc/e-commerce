//reducer used to store the current dropdown box state
import {CartActionTypes} from './cart.types';

const INITIAL_STATE={
    hidden:true
}

const cartReducer=(state=INITIAL_STATE, action)=>{
    switch (action.type){
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return{
                ...state, //keep all state the same as before
                hidden:!state.hidden //diff from user.reducer. Here we change state at reducer not in actions.js

            };
        default:
            return state;
    }
};

export default cartReducer;