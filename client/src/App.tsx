import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screen/HomeScreen';
import MapProvider from './context/Context';
import Board from './screen/Board';
import ConfigurationScreen from './screen/ConfigurationScreen';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <MapProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path='/configuration' element={<ConfigurationScreen />} />
          <Route path="/board" element={<Board />} />
        </Routes>
        <Footer />
      </MapProvider>
    </BrowserRouter>
  );
}

export default App;
