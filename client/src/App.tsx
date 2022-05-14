import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screen/HomeScreen';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
        <Header />
            <Routes>
              <Route path="/" element={<HomeScreen />} />
            </Routes>
        <Footer />
      </BrowserRouter>
  );
}

export default App;
