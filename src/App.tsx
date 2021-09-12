import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from 'pages/Home';
import Reader from 'pages/Reader';
import Layout from './components/Layout'

function App() {

  return (
    <Router>
      <Layout>
          <Switch>
            <Route exact path="/"><Home/></Route>
            <Route path="/read/:mangafile/:chapter/:page"><Reader/></Route>
          </Switch>
      </Layout>
    </Router>
  );
}

export default App;
