import './sign-in-and-sign-up.styles.scss';
import '../../components/sign-in/sign-in.component';
import React from 'react';
import SignIn from '../../components/sign-in/sign-in.component';

const SignInAndSignUpPage=()=>{
    return(
        <div className='sign-in-and-sign-up'>
            <SignIn/>
        </div>
    );
}

export default SignInAndSignUpPage;