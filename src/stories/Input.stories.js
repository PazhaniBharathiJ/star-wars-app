import React from 'react';
import { Input } from '../components/Input';

export default {
  title: 'Components/Input',
  component: Input,
};

export const Default = () => (
  <Input
    label="Test Input"
    value="Hello"
    onChange={(e) => alert(`Input changed to: ${e.target.value}`)}
    ariaLabel="Test input"
  />
);

export const Empty = () => (
  <Input
    label="Empty Input"
    value=""
    onChange={() => {}}
    ariaLabel="Empty input"
  />
);