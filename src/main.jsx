import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Forms from './Pages/Home/Forms';
import Frotas from './Pages/Frotas/Frotas';
import Ferramentas from './Pages/Ferramentas/Ferramentas';
import Emprestado from './Pages/Emprestados/Emprestado';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true
    }}>
      <Routes>
        <Route path="/" element={<Forms />} />
        <Route path="/Frotas" element={<Frotas />} />
        <Route path="/Ferramentas" element={<Ferramentas />} />
        <Route path="/Emprestado" element={<Emprestado />} />
      </Routes>
    </Router>
  </StrictMode>,
);
