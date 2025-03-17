import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { FavoritesProvider } from '../../contexts/FavoritesContext';
import { CharacterDetails } from '../../pages/CharacterDetails';
import * as api from '../../services/api';

// Mock the API calls
jest.mock('../../services/api');

describe('CharacterDetails Component', () => {
  const mockCharacter = {
    name: 'Luke Skywalker',
    gender: 'male',
    hair_color: 'blond',
    eye_color: 'blue',
    height: '172',
    birth_year: '19BBY',
    homeworld: 'Tatooine',
    skin_color: 'fair',
    mass: '77',
    films: ['A New Hope'],
    starships: ['X-wing'],
    url: 'https://swapi.dev/api/people/1/'
  };

  beforeEach(() => {
    api.fetchCharacterDetails.mockResolvedValue(mockCharacter);
  });

  test('renders loading state initially', () => {
    render(
      <FavoritesProvider>
        <MemoryRouter initialEntries={['/character/1']}>
          <Routes>
            <Route path="/character/:id" element={<CharacterDetails />} />
          </Routes>
        </MemoryRouter>
      </FavoritesProvider>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders character details after loading', async () => {
    render(
      <FavoritesProvider>
        <MemoryRouter initialEntries={['/character/1']}>
          <Routes>
            <Route path="/character/:id" element={<CharacterDetails />} />
          </Routes>
        </MemoryRouter>
      </FavoritesProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      expect(screen.getByText('Gender: male')).toBeInTheDocument();
      expect(screen.getByText('Hair Color: blond')).toBeInTheDocument();
      expect(screen.getByText('Eye Color: blue')).toBeInTheDocument();
      expect(screen.getByText('Height: 172')).toBeInTheDocument();
      expect(screen.getByText('Birth Year: 19BBY')).toBeInTheDocument();
      expect(screen.getByText('Homeworld: Tatooine')).toBeInTheDocument();
      expect(screen.getByText('Skin Color: fair')).toBeInTheDocument();
      expect(screen.getByText('Mass: 77')).toBeInTheDocument();
      expect(screen.getByText('Films')).toBeInTheDocument();
      expect(screen.getByText('A New Hope')).toBeInTheDocument();
      expect(screen.getByText('Starships')).toBeInTheDocument();
      expect(screen.getByText('X-wing')).toBeInTheDocument();
      expect(screen.getByText('Add to Favorites')).toBeInTheDocument();
    });
  });

  test('shows Remove from Favorites when character is in favorites', async () => {
    const mockFavoritesContext = {
      favorites: [mockCharacter],
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      updateFavorite: jest.fn()
    };
    jest.spyOn(React, 'useContext').mockReturnValue(mockFavoritesContext);

    render(
      <FavoritesProvider>
        <MemoryRouter initialEntries={['/character/1']}>
          <Routes>
            <Route path="/character/:id" element={<CharacterDetails />} />
          </Routes>
        </MemoryRouter>
      </FavoritesProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('Remove from Favorites')).toBeInTheDocument();
    });
  });
});