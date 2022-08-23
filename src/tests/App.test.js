import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
// import PlanetsProvider from '../context/PlanetsProvider';

test('I am your test', () => {
  render(
<App />
  );
  const inputFilter = screen.getByPlaceholderText('planet name');
  expect(inputFilter).toBeInTheDocument();
});
