import React, { MouseEvent } from 'react';
import './App.css';
import './App.css';
import Layout from './components/layout/layout'
import Image from './components/image'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Layout>
          <h2>
            content
          </h2>
        </Layout>
        <Image></Image>

      </header>

    </div>

  );
}

export default App;
