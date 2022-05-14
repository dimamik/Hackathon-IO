import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { io, Socket } from 'socket.io-client';

function App() {
  const [count, setCount] = useState(0);

  const socket = io('http://localhost:4000');

  socket.on('created', ({ roomId }) => {
    console.log(roomId);
  });

  const sendSomething = () => {
    // Write to local storage
    // localStorage.setItem('test', 'Hello there');
    console.log(localStorage.getItem('test'));
    socket.emit('create', {});
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => sendSomething()}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer">
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer">
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
