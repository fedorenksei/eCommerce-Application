import { useState } from 'react';

export const useToggle = (
  initialState: boolean = false,
): [boolean, () => void] => {
  const [state, setState] = useState(initialState);
  const toggle = () => {
    setState((s) => !s);
  };
  return [state, toggle];
};
