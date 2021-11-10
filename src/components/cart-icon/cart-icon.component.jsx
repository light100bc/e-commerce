import React from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';

import{toggleCartHidden} from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import { ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon=({toggleCartHidden,itemCount})=>( //"toggleCartHidden" is the function defined in the mapDispatchToProps(the first one)
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>{itemCount}</span>
    </div>
)

const mapDispatchToProps=dispatch=>({
    toggleCartHidden:()=>dispatch(toggleCartHidden()) //the first "toggleCartHidden" is defined as a function here
})

// const mapStateToProps=({cart:{cartItems}})=>({
//     itemCount:cartItems.reduce((accumulatedQuantity,cartItem)=>(accumulatedQuantity+cartItem.quantity),0)})

// const mapStateToProps=(state)=>({ //the reason of passing state is in word
//     itemCount:selectCartItemsCount(state)//the output of selectCartItemCount is the same as the above line
// })

const mapStateToProps = createStructuredSelector ({ 
    itemCount:selectCartItemsCount
});

export default connect(mapStateToProps,mapDispatchToProps)(CartIcon);