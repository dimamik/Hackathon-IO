import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { io, Socket } from 'socket.io-client';

function App() {
  const [count, setCount] = useState(0);

  const [roomId, setRoomId] = useState('');

  const socket = io('http://localhost:4000');

  socket.on('created', ({ roomId }) => {
    console.log(roomId);
  });

  socket.on('round', ({ board, isMyMove }) => {
    console.log(isMyMove);
    console.log(board);
  });

  const create = () => {
    socket.emit('create', {});
  };

  const join = () => {
    console.log(roomId);
    const joinParams = { roomId };
    socket.emit('join', joinParams);
  };

  const sendSomething = () => {
    // Write to local storage
    // localStorage.setItem('test', 'Hello there');
    console.log(localStorage.getItem('test'));
    socket.emit('create', {});
  };

  return (
    <div className="App">
      <button type="button" onClick={() => create()}>
        Create{' '}
      </button>
      <br />
      <input type="text" value={roomId} onChange={e => setRoomId(e.target.value)} />
      <button type="button" onClick={() => join()}>
        Join
      </button>
    </div>
  );
}

export default App;
