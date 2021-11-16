import React from "react";
// import './custom-button.styles.scss';
import {CustomButtonContainer}from './custom-button.styles.jsx';


// const customButton=({children,isGoogleSignIn,inverted,...otherProps})=>(
//     <button 
//     className={`${inverted ?'inverted':''} 
//         ${isGoogleSignIn?'google-sign-in':''} 
//         custom-button`} 
//         {...otherProps}
//     >
//         {children}
//     </button>
// )
const customButton=({children, ...props})=>(
    <CustomButtonContainer {...props}>
        {children}
    </CustomButtonContainer>
)


export default customButton;
