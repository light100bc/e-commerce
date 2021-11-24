import {createSelector} from 'reselect';

const selectCart=state=>state.cart; //input selector, this is a function, state is the input


export const selectCartItems=createSelector( //output selector(arg1=other selectors, arg2=func the return of the func is the output of output selector)
    [selectCart],
    (cart)=>cart.cartItems
); //createSelector make the output a memoize selector

export const selectCartItemsCount= createSelector(
    [selectCartItems],
    cartItems=>
        cartItems.reduce(
            (accumulateQuantity,cartItem)=>
                accumulateQuantity+cartItem.quantity,
                0
        )
);

export const selectCartHidden=createSelector(
    selectCart,
    cart=>cart.hidden
    
);

export const selectCartTotal=createSelector(
    [selectCartItems],
    cartItems=>
        cartItems.reduce(
            (accumulateQuantity,cartItem)=>accumulateQuantity+cartItem.quantity*cartItem.price,0
        )
);
