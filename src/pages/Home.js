import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CharacterCard } from '../components/CharacterCard';
import { EditModal } from '../components/EditModal';
import { Pagination } from '../components/Pagination';
import { fetchCharacters } from '../services/api';
import { useFavorites } from '../contexts/FavoritesContext';
import '../styles/pages/Home.css';

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editCharacter, setEditCharacter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { favorites, addFavorite, removeFavorite, updateFavorite } = useFavorites();

  useEffect(() => {
    setLoading(true);
    fetchCharacters(page)
      .then((data) => setCharacters(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [page]);

  const handleEdit = (character) => {
    setEditCharacter(character);
    setIsModalOpen(true);
  };

  const handleSave = (updates) => {
    setCharacters((prev) =>
      prev.map((char) => (char.url === editCharacter.url ? { ...char, ...updates } : char))
    );
    if (favorites.some((fav) => fav.url === editCharacter.url)) {
      updateFavorite(editCharacter.url, updates);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (url) => {
    setCharacters((prev) => prev.filter((char) => char.url !== url));
    if (favorites.some((fav) => fav.url === url)) {
      removeFavorite(url);
    }
  };

  return (
    <div className="home">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="character-grid">
            {characters.map((character) => {
              const isFavorite = favorites.some((fav) => fav.url === character.url);
              return (
                <CharacterCard
                  key={character.url}
                  character={character}
                  onViewDetails={() => navigate(`/character/${character.url.split('/')[5]}`)}
                  onAddToFavorites={!isFavorite ? () => addFavorite(character) : null}
                  onRemoveFromFavorites={isFavorite ? () => removeFavorite(character.url) : null}
                  onEdit={() => handleEdit(character)}
                  onDelete={() => handleDelete(character.url)} // Add Delete handler
                />
              );
            })}
          </div>
          <Pagination
            currentPage={page}
            onPrevious={() => setPage((p) => Math.max(1, p - 1))}
            onNext={() => setPage((p) => p + 1)}
          />
          {editCharacter && (
            <EditModal
              character={editCharacter}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSave={handleSave}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Home;