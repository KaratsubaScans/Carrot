import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from 'pages/Home';
import Reader from 'pages/Reader';
import Navbar from 'components/Navbar';
// import Layout from './components/layout/layout'

function App() {

  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <Navbar/>
      </header>
        <div className="page-mount">
          <Switch>
            <Route exact path="/"><Home/></Route>
            <Route path="/read/:mangafile/:chapter/:page"><Reader/></Route>
          </Switch>
        </div>
    </div>
    </Router>
  );
}

export default App;
