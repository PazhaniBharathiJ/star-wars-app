import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './contexts/FavoritesContext';
import Home from './pages/Home';
import CharacterDetails from './pages/CharacterDetails';
import Favorites from './pages/Favorites';
import './styles/global.css';

const App = () => (
  <FavoritesProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character/:id" element={<CharacterDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  </FavoritesProvider>
);

export default App;