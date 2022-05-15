import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import MapProvider from './context/Context';
import BoardScreen from './screens/Board/BoardScreen';
import ConfigurationScreen from './screens/Configuration/ConfigurationScreen';
import QuestionComponents from './components/Modals/QuestionComponents';
import GameOverComponts from './components/Modals/GameOverComponts';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sound from 'react-sound';
import backgroundSound from './assets/sounds/backgroundSound.mp3'


function App() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    
    <BrowserRouter>
      <MapProvider>
        <Header />
        <Sound url={backgroundSound} playStatus={isPlaying ? 'PLAYING' : 'PAUSED'} playFromPosition={0} />
        <div className="mainBackground">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/board" element={<BoardScreen />} />
            <Route path="/configuration" element={<ConfigurationScreen />} />
            <Route path="/question" element={<QuestionComponents />} />
          </Routes>
          {/* <Footer /> */}
        </div>
      </MapProvider>
    </BrowserRouter>
  );
}

export default App;
