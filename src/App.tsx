import React, { MouseEvent } from 'react';
import './App.css';
import { fetchZip, getFileList } from './services/archive.service';

function App() {
  function testingClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    // fetchZip('https://files.karatsubascans.com/girls_last_tour/jpg/chapter1.zip');
    // fetchZip('https://files.karatsubascans.com/testing_zip.zip');
    getFileList();
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <button onClick={testingClick}>test</button>
      </header>
    </div>
  );
}

export default App;
