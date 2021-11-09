import React from "react";
import './custom-button.styles.scss';



const customButton=({children,isGoogleSignIn,inverted,...otherProps})=>(
    <button className={`${inverted ?'inverted':''} custom-button`} {...otherProps}>
        {children}
    </button>
)


export default customButton;
