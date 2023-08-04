import { render, screen } from "@testing-library/react";
import React from "react";
import '@testing-library/jest-dom'
import App from "./App";


describe('Test that tests work', () => {

  it('two plus two is four', () => {
    expect(2 + 2).toBe(4);
  });

  it('Element renders', () => {
    render(<App />);
    expect(screen.getByText('Name')).toBeInTheDocument();
  })
});