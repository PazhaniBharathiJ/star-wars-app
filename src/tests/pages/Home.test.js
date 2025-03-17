import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FavoritesProvider } from '../../contexts/FavoritesContext';
import { Home } from '../../pages/Home';
import * as api from '../../services/api';

// Mock the API calls
jest.mock('../../services/api');

describe('Home Component', () => {
  const mockCharacters = [
    { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/', gender: 'male', homeworld: 'Tatooine', birth_year: '19BBY', hair_color: 'blond', height: '172', mass: '77' }
  ];

  beforeEach(() => {
    api.fetchCharacters.mockResolvedValue(mockCharacters);
  });

  test('renders loading state initially', () => {
    render(
      <FavoritesProvider>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </FavoritesProvider>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders character cards after loading', async () => {
    render(
      <FavoritesProvider>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </FavoritesProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      expect(screen.getByText('View Details')).toBeInTheDocument();
      expect(screen.getByText('Add to Favorites')).toBeInTheDocument();
    });
  });

  test('renders pagination controls', async () => {
    render(
      <FavoritesProvider>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </FavoritesProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('Page 1')).toBeInTheDocument();
      expect(screen.getByText('Previous')).toBeDisabled();
      expect(screen.getByText('Next')).toBeInTheDocument();
    });
  });
});