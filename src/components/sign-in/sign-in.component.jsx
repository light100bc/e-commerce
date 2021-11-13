import './sign-in.styles.scss';
import React from 'react';
import FormInput from '../form-input/form-input.components';
import CustomButton from '../custom-button/custom-button.component';

import {signInWithGoogle} from '../../firebase/firebase.utils';
import {auth} from '../../firebase/firebase.utils';

class SignIn extends React.Component{
    constructor(props){
        super(props);

        this.state={
            email:'',
            password:''
        }
    }
    handleSubmit=async event=>{
        event.preventDefault();

        const {email,password}=this.state;

        try{
            await auth.signInWithEmailAndPassword(email,password);
            this.setState({email:'',password:''});//clear the state after sign in
        }catch(error){
            console.log(error);
        }

    }

    handleChange=event=>{
        const {value,name}=event.target;

        this.setState({[name]:value})//https://medium.com/@bretdoucette/understanding-this-setstate-name-value-a5ef7b4ea2b4
        //because if name:value, then the key is "name"
        //"[]" means name is a variable. here is the name in the {value,name}
        //dynamic set value, if pwd.[name] is pwd. If email ,[name] is email.
    }


    render(){
        return(
            <div className='sign-in'>
                <h2> I already have an acoount</h2>
                <span>Sign in with your email and pwd</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        name='email' 
                        type='email' 
                        value={this.state.email} 
                        handleChange={this.handleChange} 
                        label="email"
                        required 
                    />
                    <FormInput
                        name='password'
                        type='password'
                        value={this.state.password}
                        handleChange={this.handleChange}
                        label='password'
                        required
                    />
                    <div className='button'>
                    <CustomButton type='submit'>Sign In</CustomButton>
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign in with Google</CustomButton>
                    </div>
                </form>
            </div>
        )

    }

}

export default SignIn;