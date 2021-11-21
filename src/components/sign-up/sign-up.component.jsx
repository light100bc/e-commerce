import React from "react";

import FormInput from "../form-input/form-input.components";

import CustomButton from "../custom-button/custom-button.component";

import {auth, createUserProfileDocument} from '../../firebase/firebase.utils';
import {connect} from 'react-redux';
import {signUpStart} from '../../redux/user/user.actions';

import './sign-up.styles.scss';

class SignUp extends React.Component{
    constructor(){
        super();

        this.state={
            displayName:'',
            email:'',
            password:'',
            confirmPassword:''
        }
    }

    handleSubmie=async (e)=>{
        e.preventDefault();

        const {displayName,email,password,confirmPassword}=this.state;
        const {signUpStart}=this.props;

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

    handleChange=(e)=>{
        const {name,value}=e.target;

        this.setState({[name]:value});

    }

    render(){
        const {displayName,email,password,confirmPassword}=this.state;
        return(
            <div className='sign-up'>
                <h2 className='title'>
                    I do not have an account
                </h2>
                <span>Sign up with your email and pwd</span>
                <form className='sign-up-form' onSubmit={this.handleSubmie}>
                <FormInput 
                        name='displayName' 
                        type='text' 
                        value={displayName} 
                        handleChange={this.handleChange} 
                        label="Display Name"
                        required 
                    />
                    <FormInput 
                        name='email' 
                        type='email' 
                        value={email} 
                        handleChange={this.handleChange} 
                        label="email"
                        required 
                    />
                    <FormInput
                        name='password'
                        type='password'
                        value={password}
                        handleChange={this.handleChange}
                        label='password'
                        required
                    />
                    <FormInput
                        name='confirmPassword'
                        type='password'
                        value={confirmPassword}
                        handleChange={this.handleChange}
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
}


const mapDispatchToProps=dispatch=>({
    signUpStart:(userCredentials)=>dispatch(signUpStart(userCredentials))
})

export default connect(null,mapDispatchToProps)(SignUp);