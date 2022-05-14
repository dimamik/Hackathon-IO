import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import MapProvider from './context/Context';
import BoardScreen from './screens/Board/BoardScreen';
import ConfigurationScreen from './screens/Configuration/ConfigurationScreen';
import QuestionComponents from './components/Modals/QuestionComponents';
import 'bootstrap/dist/css/bootstrap.min.css';
import WaitingForPlayer from './components/Modals/WaitingForPlayer';

function App() {
  // const [roomId, setRoomId] = useState('');

  // const socket = io('http://localhost:4000');

  // socket.on('created', ({ roomId }) => {
  //   console.log(roomId);
  // });

  // socket.on('round', ({ board, isMyMove }) => {
  //   console.log(isMyMove);
  //   console.log(board);
  // });

  // const create = () => {
  //   socket.emit('create', {});
  // };

  // const join = () => {
  //   console.log(roomId);
  //   const joinParams = { roomId };
  //   socket.emit('join', joinParams);
  // };

  // const sendSomething = () => {
  //   // Write to local storage
  //   // localStorage.setItem('test', 'Hello there');
  //   console.log(localStorage.getItem('test'));
  //   socket.emit('create', {});
  // };

  return (
    <BrowserRouter>
      <MapProvider>
        <Header />
        <div className="mainBackground">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/board" element={<BoardScreen />} />
            <Route path="/configuration" element={<ConfigurationScreen />} />
            <Route path="/question" element={<QuestionComponents />} />
            <Route path='/waiting' element={<WaitingForPlayer />} />
          </Routes>
        </div>
      </MapProvider>
    </BrowserRouter>
  );
}

export default App;
