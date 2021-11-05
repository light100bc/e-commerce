import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './pages/homepage/homepage.component.jsx';
import {Switch,Route} from 'react-router-dom';

const HatsPage=({history})=>{
  console.log(history);
  return(
  <div>
    <h1>Hats Page</h1>
  </div>
  );
};


function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component= {HomePage}/>
        <Route exact path='/hats' component={HatsPage}/>
      </Switch>
    </div>
  );
}

export default App;
