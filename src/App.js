import React,{useEffect} from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component.jsx';
import {Switch,Route,Redirect} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { connect } from 'react-redux';

import {auth,createUserProfileDocument} from './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.actions';
import CheckoutPage from './pages/checkout/checkout.component';
import { createStructuredSelector } from 'reselect';
import {selectCurrentUser} from './redux/user/user.selectors';
import {selectCollectionsForPreview} from './redux/shop/shop.selector';
import {checkUserSession} from './redux/user/user.actions';


const App=({checkUserSession,currentUser})=> {

  useEffect(()=>{
    checkUserSession()
  },[checkUserSession]);

  // componentDidMount(){
  //   const {checkUserSession} =this.props;
  //   checkUserSession();
  // }

  return (
    <div>
      <Header /> 
      <Switch>
        <Route exact path='/' component= {HomePage}/>
        <Route path='/shop' component={ShopPage}/>
        {/* <Route exact path='/signin' component={SignInAndSignUpPage}/> */}
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route exact path='/signin' render={()=>currentUser?(<Redirect to='/'/>):(<SignInAndSignUpPage/>)}/>
        {/*if exist currentUser, redirect '/signin' to '/'. Otherwise direct to SignInAndSignUpPage
        render*/}
      </Switch>
    </div>
  );
}

//add mapStateToProps because we nee read the state from redux
// const mapStateToProps=({user})=>({
//   currentUser:user.currentUser
// })

const mapStateToProps=createStructuredSelector({
  currentUser:selectCurrentUser,
  collectionsArray:selectCollectionsForPreview
})

const mapDispatchToProps=dispatch=>({//use Disppatch because it set state but not use state to display
  // setCurrentUser:user=>dispatch(setCurrentUser(user))之前的setCurrentUser变为现在的checkUserSession 
  checkUserSession:()=>dispatch(checkUserSession())
  //set a function to setCurrentUser?? the first setCurrentUser is the funciton in this file
  //the second is the function in user.actions.js
  //setCurrentUser(user) return an action obj, pass it into dispatch(). dispatch pass this action obj into all the reducer.
  //user=>dispatch(setCurrentUser(user) is a function that input user, return state(called reducer)
  //??where is user,where is dispatch
});


export default connect(mapStateToProps,mapDispatchToProps)(App);
