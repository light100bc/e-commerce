import React,{useEffect} from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component.jsx';
import {Switch,Route,Redirect} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { useSelector,useDispatch } from 'react-redux';

import {auth,createUserProfileDocument} from './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.actions';
import CheckoutPage from './pages/checkout/checkout.component';
import { createStructuredSelector } from 'reselect';
import {selectCurrentUser} from './redux/user/user.selectors';
import {selectCollectionsForPreview} from './redux/shop/shop.selector';
import {checkUserSession} from './redux/user/user.actions';


const App=()=> {

  const currentUser=useSelector(selectCurrentUser);//替代MapStateToProps
  const isHidden=useSelector((state)=>state.cart.hidden);

  const dispatch=useDispatch();//hook的dispatch()method仅update第一次。

  useEffect(()=>{
    dispatch(checkUserSession())
  },[dispatch]);//每次render,checkUserSessionHandler都会再次被defined。所以每次都会运行useEffect

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

// const mapStateToProps=createStructuredSelector({
//   currentUser:selectCurrentUser,
// })

// const mapDispatchToProps=dispatch=>({
//   checkUserSession:()=>dispatch(checkUserSession())
// });


export default App;
