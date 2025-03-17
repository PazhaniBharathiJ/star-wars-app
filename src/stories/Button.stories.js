import React from 'react';
import { Button } from '../components/Button';

export default {
  title: 'Components/Button',
  component: Button,
};

export const Primary = () => <Button onClick={() => {}}>Click Me</Button>;
export const Secondary = () => <Button variant="secondary" onClick={() => {}}>Click Me</Button>;
export const Disabled = () => <Button disabled onClick={() => {}}>Click Me</Button>;