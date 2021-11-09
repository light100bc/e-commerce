import {createSelector} from 'reselect';

const selectCart=state=>state.cart; //input selector

const selectUser =state=>state.user;

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


