import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './pages/homepage/homepage.component.jsx';
import {Switch,Route} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'

import {auth} from './firebase/firebase.utils';

class App extends React.Component{
  constructor(){
    super();

    this.state={
      currentUser:null
    }
  }

  unsubscribeFromAuth = null

  //before use componentDidMount, use fetch, fetch data from other source
  //here we want no the state(login in state) instead of fetch data.
  componentDidMount(){
    //here when we assign the func to unsubscribeFromAuth, it is also runned. Because it is a function with input. If funcName without "()", it just assign func without run.
    this.unsubscribeFromAuth=auth.onAuthStateChanged(user=>{//this is an open subscription,which means as long as the app is mounted, the connection is there
      this.setState({currentUser:user});
      console.log(user);//we find from development tool that the user obj is in stored
    })
  }

  componentWillUnmount(){ //when unMount App, logout
    this.unsubscribeFromAuth();
  }


  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser}/> 
        <Switch>
          <Route exact path='/' component= {HomePage}/>
          <Route exact path='/shop' component={ShopPage}/>
          <Route exact path='/signin' component={SignInAndSignUpPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
