import React from 'react';
import { Button } from './Button';
import '../styles/components/CharacterCard.css';

export const CharacterCard = ({
  character,
  onViewDetails,
  onAddToFavorites,
  onRemoveFromFavorites,
  onEdit,
  onDelete // New prop for delete
}) => (
  <div className="character-card">
    <h3>{character.name}</h3>
    <p>Gender: {character.gender}</p>
    <p>Homeworld: {character.homeworld}</p>
    <p>Birth Year: {character.birth_year}</p>
    <p>Hair Color: {character.hair_color}</p>
    <p>Height: {character.height}</p>
    <p>Mass: {character.mass}</p>
    <Button onClick={onViewDetails}>View Details</Button>
    {onAddToFavorites && (
      <Button onClick={onAddToFavorites} variant="secondary">
        Add to Favorites
      </Button>
    )}
    {onRemoveFromFavorites && (
      <Button onClick={onRemoveFromFavorites} variant="secondary">
        Remove from Favorites
      </Button>
    )}
    {onEdit && (
      <Button onClick={onEdit} variant="secondary">
        Edit
      </Button>
    )}
    {onDelete && (
      <Button onClick={onDelete} variant="secondary">
        Delete
      </Button>
    )}
  </div>
);