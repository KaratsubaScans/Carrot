import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'

import Home from 'pages/Home';
import Reader from 'pages/Reader';
import Manga from 'pages/Manga';
import Layout from './components/Layout'
import NotFound from 'pages/NotFound'

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route exact path="/read/:mangafile/:chapter/:page"><Reader /></Route>
            <Route exact path="/manga/:mangafile"><Manga /></Route>
            <Route exact><NotFound /></Route>
          </Switch>
        </Layout>
      </Router>
    </HelmetProvider>
  );
}

export default App;
