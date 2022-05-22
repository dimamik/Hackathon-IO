import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import MapProvider, { MapContext, SecondPlayerMapContext } from './context/Context';
import BoardScreen from './screens/Board/BoardScreen';
// import LocalBoardScreen from './screens/Board/LocalBoardScreen';
import ConfigurationScreen from './screens/Configuration/ConfigurationScreen';
import QuestionComponents from './components/Modals/QuestionComponents';
import GameOverComponts from './components/Modals/GameOverComponts';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sound from 'react-sound';
import backgroundSound from './assets/sounds/backgroundSound.mp3';

import AdditionalQuestionScreen from './screens/AdditionalQuestion/AdditionalQuestionScreen';

function App() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <BrowserRouter>
      <MapProvider contextInstance={MapContext}>
        <MapProvider contextInstance={SecondPlayerMapContext}>
          <Header />
          <Sound
            url={backgroundSound}
            playStatus={isPlaying ? 'PLAYING' : 'PAUSED'}
            playFromPosition={0}
          />
          <div className="mainBackground">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/board" element={<BoardScreen />} />
              {/* <Route path="/boardLocal" element={<LocalBoardScreen />} /> */}
              <Route path="/configuration" element={<ConfigurationScreen />} />
              <Route path="/add_question" element={<AdditionalQuestionScreen />} />
            </Routes>
            {/* <Footer /> */}
          </div>
        </MapProvider>
      </MapProvider>
    </BrowserRouter>
  );
}

export default App;
