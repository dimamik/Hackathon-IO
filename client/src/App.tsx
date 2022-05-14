import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screen/HomeScreen';
import MapProvider from './context/Context';
import BoardScreen from './screen/BoardScreen';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <MapProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/board" element={<BoardScreen />} />
        </Routes>
        <Footer />
      </MapProvider>
    </BrowserRouter>
  );
}

export default App;
