import React from 'react';

import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';



const StripeCheckoutButton=({price})=>{
    const priceForStripe=price*100;
    const publishableKey=
    "pk_test_51JurBUIyLorgi01THfLVHRY7LNkofQVBFoKHoxdYuU5POG5pqXMM42lwfFVT4PPBVUlrPEz56kYZc6O4a4gp17iz003OHGZUwt";
    
    
    const onToken=token=>{
        //after pay successfully
        console.log("token:",priceForStripe);
        axios({
            url:'payment',//send to /payment endpoint at backend
            method:'post',
            data:{
                amount:priceForStripe,
                token
            }
        }).then(response=>{
            alert("payment successful")
        }).catch(error=>{
            console.log('payment error:', JSON.parse(error));
            alert(
                'There was an issue with your payment.'
            );
        });
    };
          
    
    
    return(
        <StripeCheckout label='Pay Now' name='CRWN Clothing Ltd.' 
        billingAddress 
        shippingAddress 
        image='https://svgshare.com/i/CUz.svg'
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}
        />
    );
}

export default StripeCheckoutButton;