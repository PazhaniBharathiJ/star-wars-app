import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { fetchCharacterDetails } from '../services/api';
import { useFavorites } from '../contexts/FavoritesContext';
import '../styles/pages/CharacterDetails.css';

const CharacterDetails = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(false);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    setLoading(true);
    fetchCharacterDetails(id)
      .then((data) => setCharacter(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!character) return <p>No character found</p>;

  const isFavorite = favorites.some((fav) => fav.url === character.url);

  return (
    <div className="character-details">
      <h1>{character.name}</h1>
      <div className="details-grid">
        <p>Gender: {character.gender}</p>
        <p>Hair Color: {character.hair_color}</p>
        <p>Eye Color: {character.eye_color}</p>
        <p>Height: {character.height}</p>
        <p>Birth Year: {character.birth_year}</p>
        <p>Homeworld: {character.homeworld}</p>
        <p>Skin Color: {character.skin_color}</p>
        <p>Mass: {character.mass}</p>
      </div>
      <h2>Films</h2>
      <ul>
        {character.films.map((film) => (
          <li key={film}>{film}</li>
        ))}
      </ul>
      <h2>Starships</h2>
      <ul>
        {character.starships.map((ship) => (
          <li key={ship}>{ship}</li>
        ))}
      </ul>
      <Button
        onClick={() => (isFavorite ? removeFavorite(character.url) : addFavorite(character))}
      >
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </Button>
    </div>
  );
};

export default CharacterDetails;