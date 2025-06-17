import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Confirmacao from './pages/Confirmacao';
import EscolhaComidas from './pages/EscolhaComidas';
import './App.css';
import backgroundImage from './assets/background.jpeg';

function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/confirmacao" element={<Confirmacao />} />
          <Route path="/comidas" element={<EscolhaComidas />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
