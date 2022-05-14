import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screen/HomeScreen';
import MapProvider from './context/Context';
import BoardScreen from './screen/BoardScreen';
import ConfigurationScreen from './screen/ConfigurationScreen';
import QuestionComponents from './components/QuestionComponents';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <MapProvider>
        <Header />
        <div className='background'>
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
