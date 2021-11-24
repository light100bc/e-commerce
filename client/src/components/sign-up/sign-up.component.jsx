import React,{useState} from "react";

import FormInput from "../form-input/form-input.components";

import CustomButton from "../custom-button/custom-button.component";

import {auth, createUserProfileDocument} from '../../firebase/firebase.utils';
import {connect} from 'react-redux';
import {signUpStart} from '../../redux/user/user.actions';

import './sign-up.styles.scss';

const SignUp =({signUpStart})=>{
    const [userCredentials,setUserCredentials]=useState({            
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''});

    const {displayName,email,password,confirmPassword}=userCredentials;


    const handleSubmit=async (e)=>{
        e.preventDefault();
        
        if(password!==confirmPassword){
            alert("passwords don't match");
            return;//stop outter func. Do nothing(not submit)
        }
        signUpStart({displayName,email,password});

        //submit
        // try{
        //     const {user} = await auth.createUserWithEmailAndPassword(email,password);//??instead of use form submit,use state to submit        
        //     //create auth

        //     await createUserProfileDocument(user,{displayName});//create profile in db
        //     this.setState({ //clear the form
        //         displayName:'',
        //         email:'',
        //         password:'',
        //         confirmPassword:''
        //     });
            

        // }catch(error){
        //     console.log(error);
        // }
    }

    const handleChange=(e)=>{
        const {name,value}=e.target;

        setUserCredentials({...userCredentials,[name]:value});

    }

    return(
        <div className='sign-up'>
            <h2 className='title'>
                I do not have an account
            </h2>
            <span>Sign up with your email and pwd</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
            <FormInput 
                    name='displayName' 
                    type='text' 
                    value={displayName} 
                    handleChange={handleChange} 
                    label="Display Name"
                    required 
                />
                <FormInput 
                    name='email' 
                    type='email' 
                    value={email} 
                    handleChange={handleChange} 
                    label="email"
                    required 
                />
                <FormInput
                    name='password'
                    type='password'
                    value={password}
                    handleChange={handleChange}
                    label='password'
                    required
                />
                <FormInput
                    name='confirmPassword'
                    type='password'
                    value={confirmPassword}
                    handleChange={handleChange}
                    label='Confirm Password'
                    required
                />
                <div className='button'>
                <CustomButton type='submit'>Sign Up</CustomButton>
                </div>
            </form>

        </div>

    )
}



const mapDispatchToProps=dispatch=>({
    signUpStart:(userCredentials)=>dispatch(signUpStart(userCredentials))
})

export default connect(null,mapDispatchToProps)(SignUp);