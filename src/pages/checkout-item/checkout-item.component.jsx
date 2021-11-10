import React from "react";
// import {connect} from 'react-redux';
// import {selector} from 'reselect';
// import {createStructuredSelector} from 'reselect';
// import {addItem} from '../../redux/cart/cart.actions';

import './checkout-item.styles.scss'

const CheckoutItem=({cartItem:{name,imageUrl,price,quantity}})=>{
    return(
        <div className='checkout-item'>
            <div className='image-container'>
                <img src={imageUrl} alt='item'/>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>{quantity}</span>
            <span className='price'>${price}</span>
            <span className='remove'>&#10005</span>
        </div>
    )
}


export default CheckoutItem;