import React from 'react';
import {SpinnerContainer,SpinnerOverlay} from './with-spinner.styles.jsx';

//input component. out put a function. 
const WithSpinner=WrappedComponent=>({isLoading,...otherProps})=>{
    return isLoading?(
        <SpinnerOverlay>
            <SpinnerContainer />
        </SpinnerOverlay>
    ):(
        <WrappedComponent {...otherProps}/>
    )
}

//the above is equivalent to the below:
// const WithSpinner=WrappedComponent=>{
//     const Spinner=({isLoading,...otherProps})=>{
//         return isLoading?(
//             <SpinnerOverlay>
//                 <SpinnerContainer />
//             </SpinnerOverlay>
//         ):(
//             <WrappedComponent {...otherProps}/>
//         )
//     }
//     return Spinner;
// }


export default WithSpinner;