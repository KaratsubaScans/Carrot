import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from 'pages/home';
import Reader from 'pages/reader';
import Navbar from 'components/navbar';
// import Layout from './components/layout/layout'

function App() {

  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <Navbar/>
        <div className="page-mount">
          <Switch>
            <Route exact path="/"><Home/></Route>
            <Route path="/read"><Reader/></Route>
          </Switch>
        </div>
      </header>
    </div>
    </Router>
  );
}

export default App;
