import React from 'react';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {selectCartItems, selectCartTotal} from '../../redux/cart/cart.selectors';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/strip-button/strip-button.component';
import './checkout.styles.scss';

const CheckoutPage=({cartItems,total})=>{
    const headerBlockTitles=['Product','Description','Quantity','Price','Remove'];
    return(  
        <div className='checkout-page'>
            <div className='checkout-header'>
                {headerBlockTitles.map((headBlockTitle,idx)=>(
                    <div key={idx} className='header-block'>
                        <span>
                            {headBlockTitle}
                        </span>
                    </div>
                ))}         
            </div>
            {cartItems.map(cartItem=>(<CheckoutItem key={cartItem.id} cartItem={cartItem}/>))}
            <div className='test-warning'>
                *Please Use the following test credit card for payments*
                <br/>
                4242424242424242, exp-date, any future date
            </div>
            <div className='total'>
                <span>TOTAL: ${total}</span>              
            </div>
            <StripeCheckoutButton price={total}/>
        </div>
    )
}

const mapStateToProps=createStructuredSelector({
    cartItems:selectCartItems,
    total:selectCartTotal
})


export default connect(mapStateToProps)(CheckoutPage);