//reducer used to store the current dropdown box state
import {CartActionTypes} from './cart.types';
import { addItemToCart } from './cart.utils';

const INITIAL_STATE={
    hidden:true,
    cartItems: []
}

const cartReducer=(state=INITIAL_STATE, action)=>{
    switch (action.type){
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return{
                ...state, //keep all state the same as before
                hidden:!state.hidden //diff from user.reducer. Here we change state at reducer not in actions.js

            };
        case CartActionTypes.ADD_ITEM:
            return{
                ...state,
               // cartItems:[...state.cartItems,action.payload] //126 keep the previous state.cartItems, append new items in the payload attribute.
                cartItems:addItemToCart(state.cartItems,action.payload)//127
            };
        default:
            return state;
    }
};

export default cartReducer;