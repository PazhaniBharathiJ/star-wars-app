import React, { useState } from 'react';
import { CharacterCard } from '../components/CharacterCard';
import { EditModal } from '../components/EditModal';
import { useFavorites } from '../contexts/FavoritesContext';
import '../styles/pages/Favorites.css';
const Favorites = () => {
  const { favorites, removeFavorite, updateFavorite } = useFavorites();
  const [editCharacter, setEditCharacter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (character) => {
    setEditCharacter(character);
    setIsModalOpen(true);
  };

  const handleSave = (updates) => {
    updateFavorite(editCharacter.url, updates);
    setIsModalOpen(false);
  };

  return (
    <div className="favorites">
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites yet</p>
      ) : (
        <div className="character-grid">
          {favorites.map((character) => (
            <CharacterCard
              key={character.url}
              character={character}
              onViewDetails={() => window.location.href = `/character/${character.url.split('/')[5]}`}
              onRemoveFromFavorites={() => removeFavorite(character.url)}
              onEdit={() => handleEdit(character)}
            />
          ))}
        </div>
      )}
      {editCharacter && (
        <EditModal
          character={editCharacter}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Favorites;