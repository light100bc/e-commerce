import React from 'react';
import {connect} from 'react-redux';

import{toggleCartHidden} from '../../redux/cart/cart.actions';

import { ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon=({toggleCartHidden})=>( //"toggleCartHidden" is the function defined in the mapDispatchToProps(the first one)
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>0</span>
    </div>
)

const mapDispatchToProps=dispatch=>({
    toggleCartHidden:()=>dispatch(toggleCartHidden()) //the first "toggleCartHidden" is defined as a function here
})


export default connect(null,mapDispatchToProps)(CartIcon);