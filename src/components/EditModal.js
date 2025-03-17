import React, { useState } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import '../styles/components/EditModal.css';

export const EditModal = ({ character, isOpen, onClose, onSave }) => {
  const [gender, setGender] = useState(character.gender);
  const [height, setHeight] = useState(character.height);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit {character.name}</h2>
        <Input
          label="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <Input
          label="Height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <div className="modal-actions">
          <Button onClick={() => onSave({ gender, height })}>Save</Button>
          <Button onClick={onClose} variant="secondary">Cancel</Button>
        </div>
      </div>
    </div>
  );
};