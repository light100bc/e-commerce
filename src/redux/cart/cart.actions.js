//functions(actions) that will tigger the reducer
//call the action in the component
import {CartActionTypes} from './cart.types';

export const toggleCartHidden=()=>(
    {
        type:CartActionTypes.TOGGLE_CART_HIDDEN
        //no input because this action only pass the "type". And in reducer the state will be read and changed.
        //no need input 
    }
);