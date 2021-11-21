import './sign-in.styles.scss';
import React from 'react';
import FormInput from '../form-input/form-input.components';
import CustomButton from '../custom-button/custom-button.component';
import {connect} from 'react-redux';

import {signInWithGoogle} from '../../firebase/firebase.utils';
import {auth} from '../../firebase/firebase.utils';
import {googleSignInStart,emailSignInStart} from '../../redux/user/user.actions';


 
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
        const {emailSignInStart}=this.props;
        emailSignInStart(email,password);
        // try{
        //     await auth.signInWithEmailAndPassword(email,password);
        //     this.setState({email:'',password:''});//clear the state after sign in
        // }catch(error){
        //     console.log(error);
        // }

    }

    handleChange=event=>{
        const {value,name}=event.target;
        
        this.setState({[name]:value})//https://medium.com/@bretdoucette/understanding-this-setstate-name-value-a5ef7b4ea2b4
        //because if name:value, then the key is "name"
        //"[]" means name is a variable. here is the name in the {value,name}
        //dynamic set value, if pwd.[name] is pwd. If email ,[name] is email.
    }


    render(){
        const{googleSignInStart}=this.props;
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
                    <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>Sign in with Google</CustomButton>
                    </div>
                </form>
            </div>
        )

    }

}

const mapDispatchToProps = dispatch =>({
    googleSignInStart:()=>dispatch(googleSignInStart()),//这里dispatch的是一个func
    emailSignInStart:(email,password)=>dispatch(emailSignInStart({email,password}))
})

export default connect(null,mapDispatchToProps)(SignIn);