import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CharacterCard } from '../../components/CharacterCard';

describe('CharacterCard Component', () => {
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

  test('renders character details', () => {
    render(<CharacterCard character={sampleCharacter} onViewDetails={() => {}} />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Gender: male')).toBeInTheDocument();
    expect(screen.getByText('Homeworld: Tatooine')).toBeInTheDocument();
    expect(screen.getByText('Birth Year: 19BBY')).toBeInTheDocument();
    expect(screen.getByText('Hair Color: blond')).toBeInTheDocument();
    expect(screen.getByText('Height: 172')).toBeInTheDocument();
    expect(screen.getByText('Mass: 77')).toBeInTheDocument();
  });

  test('calls onViewDetails when View Details is clicked', () => {
    const handleViewDetails = jest.fn();
    render(<CharacterCard character={sampleCharacter} onViewDetails={handleViewDetails} />);
    fireEvent.click(screen.getByText('View Details'));
    expect(handleViewDetails).toHaveBeenCalledTimes(1);
  });

  test('renders and calls onAddToFavorites', () => {
    const handleAdd = jest.fn();
    render(<CharacterCard character={sampleCharacter} onViewDetails={() => {}} onAddToFavorites={handleAdd} />);
    const addButton = screen.getByText('Add to Favorites');
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);
    expect(handleAdd).toHaveBeenCalledTimes(1);
  });

  test('renders and calls onRemoveFromFavorites', () => {
    const handleRemove = jest.fn();
    render(<CharacterCard character={sampleCharacter} onViewDetails={() => {}} onRemoveFromFavorites={handleRemove} />);
    const removeButton = screen.getByText('Remove');
    expect(removeButton).toBeInTheDocument();
    fireEvent.click(removeButton);
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });

  test('renders and calls onEdit', () => {
    const handleEdit = jest.fn();
    render(<CharacterCard character={sampleCharacter} onViewDetails={() => {}} onEdit={handleEdit} />);
    const editButton = screen.getByText('Edit');
    expect(editButton).toBeInTheDocument();
    fireEvent.click(editButton);
    expect(handleEdit).toHaveBeenCalledTimes(1);
  });
});