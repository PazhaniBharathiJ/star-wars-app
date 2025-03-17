import React from 'react';
import { EditModal } from '../components/EditModal';

export default {
  title: 'Components/EditModal',
  component: EditModal,
};

const sampleCharacter = {
  name: 'Luke Skywalker',
  gender: 'male',
  height: '172'
};

export const Open = () => (
  <EditModal
    character={sampleCharacter}
    isOpen={true}
    onClose={() => alert('Modal closed')}
    onSave={(updates) => alert(`Saved: ${JSON.stringify(updates)}`)}
  />
);

export const Closed = () => (
  <EditModal
    character={sampleCharacter}
    isOpen={false}
    onClose={() => {}}
    onSave={() => {}}
  />
);