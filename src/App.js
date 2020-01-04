import React  from "react";
import "./App.css";

import Nav from "./Components/Nav";
import Recipe from "./Components/Recipes/GetRecipe";
import List from "./Components/List/List";
import Chat from "./Components/Chat/Chat";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
function App(){
  return(
    <Router>
      <Nav/>
      <Switch>
      <Route path="/" exact component={Recipe}/>
      <Route path="/list" component={List}/>
      <Route path="/chat" component={Chat}/>
      </Switch>
   
    </Router>
  )
}



export default App;