// src/contexts/FavoritesContext.js
import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  updateFavorite: () => {},
});

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (character) => {
    setFavorites((prev) => {
      // Prevent duplicates based on URL
      if (prev.some((fav) => fav.url === character.url)) return prev;
      return [...prev, character];
    });
  };

  const removeFavorite = (url) => {
    setFavorites((prev) => prev.filter((fav) => fav.url !== url));
  };

  const updateFavorite = (url, updates) => {
    setFavorites((prev) =>
      prev.map((fav) => (fav.url === url ? { ...fav, ...updates } : fav))
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, updateFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);