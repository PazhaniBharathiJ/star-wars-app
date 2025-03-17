import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../../components/Input';

describe('Input Component', () => {
  test('renders input with label', () => {
    render(<Input label="Test Label" value="Test" onChange={() => {}} />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test')).toBeInTheDocument();
  });

  test('calls onChange when value changes', () => {
    const handleChange = jest.fn();
    render(<Input label="Test Label" value="" onChange={handleChange} />);
    const input = screen.getByLabelText('Test Label');
    fireEvent.change(input, { target: { value: 'New Value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('applies aria-label for accessibility', () => {
    render(<Input label="Test Label" value="Test" onChange={() => {}} ariaLabel="Test input" />);
    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('aria-label', 'Test input');
  });
});