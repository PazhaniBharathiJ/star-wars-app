import React from 'react';
import { CharacterCard } from '../components/CharacterCard';

export default {
  title: 'Components/CharacterCard',
  component: CharacterCard,
};

const sampleCharacter = {
  name: 'Luke Skywalker',
  gender: 'male',
  homeworld: 'Tatooine',
  birth_year: '19BBY',
  hair_color: 'blond',
  height: '172',
  mass: '77',
  url: 'https://swapi.dev/api/people/1/'
};

export const Default = () => (
  <CharacterCard
    character={sampleCharacter}
    onViewDetails={() => alert('View Details clicked')}
    onAddToFavorites={() => alert('Add to Favorites clicked')}
  />
);

export const WithRemoveAndEdit = () => (
  <CharacterCard
    character={sampleCharacter}
    onViewDetails={() => alert('View Details clicked')}
    onRemoveFromFavorites={() => alert('Remove clicked')}
    onEdit={() => alert('Edit clicked')}
  />
);