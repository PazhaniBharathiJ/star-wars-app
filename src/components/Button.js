import React from 'react';
import '../styles/components/Button.css';

export const Button = ({ onClick, children, disabled, variant }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`button ${variant || ''}`}
    role="button"
  >
    {children}
  </button>
);