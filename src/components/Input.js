import React from 'react';
import '../styles/components/Input.css';
export const Input = ({ label, value, onChange, ariaLabel }) => (
  <div className="input-wrapper">
    <label>{label}</label>
    <input
      value={value}
      onChange={onChange}
      aria-label={ariaLabel}
      className="input"
    />
  </div>
);