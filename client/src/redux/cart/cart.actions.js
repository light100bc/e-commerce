//functions(actions) that will tigger the reducer
//call the action in the component
import CartActionTypes from './cart.types';

export const toggleCartHidden=()=>(
    {
        type:CartActionTypes.TOGGLE_CART_HIDDEN
        //no input because this action only pass the "type". And in reducer the state will be read and changed.
        //no need input 
    }
);

export const addItem=(item)=>(
    {
        type:CartActionTypes.ADD_ITEM,
        payload:item
    }
);

export const clearItemFromCart=item=>({ //remove all the items of that type
    type:CartActionTypes.CLEAR_ITEM_FROM_CART,
    payload:item
})

export const removeItem=item=>({
    type:CartActionTypes.REMOVE_ITEM,
    payload:item
})

export const clearCart=()=>({
    type:CartActionTypes.CLEAR_CART
})

