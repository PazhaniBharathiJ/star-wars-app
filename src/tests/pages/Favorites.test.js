import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FavoritesProvider } from '../../contexts/FavoritesContext';
import { Favorites } from '../../pages/Favorites';

describe('Favorites Component', () => {
  const mockCharacter = {
    name: 'Luke Skywalker',
    gender: 'male',
    homeworld: 'Tatooine',
    birth_year: '19BBY',
    hair_color: 'blond',
    height: '172',
    mass: '77',
    url: 'https://swapi.dev/api/people/1/'
  };

  test('renders no favorites message when empty', () => {
    render(
      <FavoritesProvider>
        <MemoryRouter>
          <Favorites />
        </MemoryRouter>
      </FavoritesProvider>
    );
    expect(screen.getByText('No favorites yet')).toBeInTheDocument();
  });

  test('renders favorite characters when present', () => {
    const mockFavoritesContext = {
      favorites: [mockCharacter],
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      updateFavorite: jest.fn()
    };
    jest.spyOn(React, 'useContext').mockReturnValue(mockFavoritesContext);

    render(
      <FavoritesProvider>
        <MemoryRouter>
          <Favorites />
        </MemoryRouter>
      </FavoritesProvider>
    );
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Remove')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  test('opens EditModal when Edit is clicked', () => {
    const mockFavoritesContext = {
      favorites: [mockCharacter],
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      updateFavorite: jest.fn()
    };
    jest.spyOn(React, 'useContext').mockReturnValue(mockFavoritesContext);

    render(
      <FavoritesProvider>
        <MemoryRouter>
          <Favorites />
        </MemoryRouter>
      </FavoritesProvider>
    );
    fireEvent.click(screen.getByText('Edit'));
    expect(screen.getByText('Edit Luke Skywalker')).toBeInTheDocument();
  });
});