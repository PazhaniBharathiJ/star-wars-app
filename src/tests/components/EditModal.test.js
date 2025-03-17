import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { EditModal } from '../../components/EditModal';

describe('EditModal Component', () => {
  const sampleCharacter = {
    name: 'Luke Skywalker',
    gender: 'male',
    height: '172'
  };

  test('does not render when isOpen is false', () => {
    render(<EditModal character={sampleCharacter} isOpen={false} onClose={() => {}} onSave={() => {}} />);
    expect(screen.queryByText('Edit Luke Skywalker')).not.toBeInTheDocument();
  });

  test('renders when isOpen is true', () => {
    render(<EditModal character={sampleCharacter} isOpen={true} onClose={() => {}} onSave={() => {}} />);
    expect(screen.getByText('Edit Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender')).toHaveValue('male');
    expect(screen.getByLabelText('Height')).toHaveValue('172');
  });

  test('calls onClose when Cancel is clicked', () => {
    const handleClose = jest.fn();
    render(<EditModal character={sampleCharacter} isOpen={true} onClose={handleClose} onSave={() => {}} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('calls onSave with updated values when Save is clicked', () => {
    const handleSave = jest.fn();
    render(<EditModal character={sampleCharacter} isOpen={true} onClose={() => {}} onSave={handleSave} />);
    fireEvent.change(screen.getByLabelText('Gender'), { target: { value: 'female' } });
    fireEvent.change(screen.getByLabelText('Height'), { target: { value: '180' } });
    fireEvent.click(screen.getByText('Save'));
    expect(handleSave).toHaveBeenCalledWith({ gender: 'female', height: '180' });
  });
});