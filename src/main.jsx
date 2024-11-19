import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import './index.css';
import Forms from './Pages/Home/Forms';
import Frotas from './Pages/Frotas/Frotas';
import Ferramentas from './Pages/Ferramentas/Ferramentas';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Forms />} /> 
        <Route path="/Frotas" element={<Frotas />} /> 
        <Route path="/Ferramentas" element={<Ferramentas />} /> 

      </Routes>
    </Router>
  </StrictMode>,
);
