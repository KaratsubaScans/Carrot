import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
          <div className='flex max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto'>
              <div className='w-2 bg-gray-800'></div>

              <div className='flex items-center px-2 py-3'>
                  <img className='w-10 h-10 object-cover rounded-full' alt='User avatar' src='https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200'/>
                  
                  <div className='mx-3'>
                      <p className='text-gray-600'>Sara has replied on the <a className='text-blue-500 hover:text-blue-400 hover:underline'>uploaded image</a>.</p>
                  </div>
              </div>
          </div>
      </div>
  </div>

  );
}

export default App;
