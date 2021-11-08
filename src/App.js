import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component.jsx';
import {Switch,Route,Redirect} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import { connect } from 'react-redux';

import {auth,createUserProfileDocument} from './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.actions';

class App extends React.Component{
  // constructor(){
  //   super();

  //   this.state={
  //     currentUser:null
  //   }
  // }
  
  unsubscribeFromAuth = null

  //before use componentDidMount, use fetch, fetch data from other source
  //here we want no the state(login in state) instead of fetch data.
  componentDidMount(){
    //here when we assign the func to unsubscribeFromAuth, it is also runned. Because it is a function with input. If funcName without "()", it just assign func without run.
    //async becasue it is API func
    //userAuth is the whole user obj return by event onAuthStateChange.
    const {setCurrentUser}=this.props;//distruct props,get setCurrentUser which is a function

    this.unsubscribeFromAuth=auth.onAuthStateChanged(async userAuth=>{//this is an open subscription,which means as long as the app is mounted, the connection is there
      // console.log(userAuth);//we find from development tool that the userAuth obj is in stored
      if(userAuth){//if userAuth is not null
        //create user in db
        const userRef=await createUserProfileDocument(userAuth);
        
        //get user data from db and put into state
        userRef.onSnapshot(snapShot=>{
          // this.setState({
          setCurrentUser({
            currentUser:{
              id:snapShot.id,
              ...snapShot.data()
              }
            }
            //,console.log("inner")
            // ,()=>{console.log(this.state);}//check the state , path func as 2n para in setState,previent asyn
          );
          console.log("inner");
        });
      }
      setCurrentUser(userAuth);//if userAuth is null, set state.currentuser to null
      console.log("outter");
      //if not null, set state agian...by userAuth
    })
  }

  componentWillUnmount(){ //when unMount App, keep login
    this.unsubscribeFromAuth();
  }


  render(){
    return (
      <div>
        <Header /> 
        <Switch>
          <Route exact path='/' component= {HomePage}/>
          <Route exact path='/shop' component={ShopPage}/>
          {/* <Route exact path='/signin' component={SignInAndSignUpPage}/> */}
          <Route exact path='/signin' render={()=>this.props.currentUser?(<Redirect to='/'/>):(<SignInAndSignUpPage/>)}/>
          {/*if exist currentUser, redirect '/signin' to '/'. Otherwise direct to SignInAndSignUpPage
          render*/}
        </Switch>
      </div>
    );
  }
}

//add mapStateToProps because we nee read the state from redux
const mapStateToProps=({user})=>({
  currentUser:user.currentUser
})

const mapDispatchToProps=dispatch=>({//use Disppatch because it set state but not use state to display
  setCurrentUser:user=>dispatch(setCurrentUser(user)) 
  //set a function to setCurrentUser?? the first setCurrentUser is the funciton in this file
  //the second is the function in user.actions.js
  //setCurrentUser(user) return an action obj, pass it into dispatch(). dispatch pass this action obj into all the reducer.
  //user=>dispatch(setCurrentUser(user) is a function that input user, return state(called reducer)
  //??where is user,where is dispatch
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
