import './sign-in.styles.scss';
import React,{useState} from 'react';
import FormInput from '../form-input/form-input.components';
import CustomButton from '../custom-button/custom-button.component';
import {connect} from 'react-redux';

import {signInWithGoogle} from '../../firebase/firebase.utils';
import {auth} from '../../firebase/firebase.utils';
import {googleSignInStart,emailSignInStart} from '../../redux/user/user.actions';


 
const SignIn =({emailSignInStart,googleSignInStart})=>{ //change class to func, because no constructor for state any more, use hook
    const [userCredentials,setCredentials] = useState({email:'', password:''});
    const {email,password}=userCredentials;

    const handleSubmit=async event=>{
        event.preventDefault();
        

        emailSignInStart(email,password);
        // try{
        //     await auth.signInWithEmailAndPassword(email,password);
        //     this.setState({email:'',password:''});//clear the state after sign in
        // }catch(error){
        //     console.log(error);
        // }

    }

    const handleChange=event=>{
        const {value,name}=event.target;
        
        setCredentials({...userCredentials,[name]:value})//https://medium.com/@bretdoucette/understanding-this-setstate-name-value-a5ef7b4ea2b4
        //because if name:value, then the key is "name"
        //"[]" means name is a variable. here is the name in the {value,name}
        //dynamic set value, if pwd.[name] is pwd. If email ,[name] is email.
    }



        return(
            <div className='sign-in'>
                <h2> I already have an acoount</h2>
                <span>Sign in with your email and pwd</span>

                <form onSubmit={handleSubmit}>
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
                    <div className='button'>
                    <CustomButton type='submit'>Sign In</CustomButton>
                    <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>Sign in with Google</CustomButton>
                    </div>
                </form>
            </div>
        )

    }


const mapDispatchToProps = dispatch =>({
    googleSignInStart:()=>dispatch(googleSignInStart()),//这里dispatch的是一个func
    emailSignInStart:(email,password)=>dispatch(emailSignInStart({email,password}))
})

export default connect(null,mapDispatchToProps)(SignIn);