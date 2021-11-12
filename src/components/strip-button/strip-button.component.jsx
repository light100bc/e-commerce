import React from 'react';

import StripeCheckout from 'react-stripe-checkout';

const onToken=token=>{
    console.log(token);//after pay successfully
    alert('Paymenkt Successful')

}

const StripeCheckoutButton=({price})=>{
    const priceForStripe=price*100;
    const publishableKey=
    "pk_test_51JurBUIyLorgi01THfLVHRY7LNkofQVBFoKHoxdYuU5POG5pqXMM42lwfFVT4PPBVUlrPEz56kYZc6O4a4gp17iz003OHGZUwt";
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