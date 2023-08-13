import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { TextInput } from '.';
import { userEvent } from '@storybook/testing-library';

describe('Test TextInput component', () => {
  test('input with placeholder', () => {
    const placeholderText = 'input text here';
    render(<TextInput placeholder={placeholderText} />);

    expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
  });

  test('change input value', async () => {
    const initialValue = 'aaa';
    render(
      <TextInput
        placeholder="type here"
        defaultValue={initialValue}
      />,
    );
    const input = screen.getByRole('textbox');

    const newValue = 'new input text';
    await userEvent.type(input, newValue, {
      initialSelectionStart: 0,
      initialSelectionEnd: 3,
    });
    expect(input).toHaveValue(newValue);
  });
});
