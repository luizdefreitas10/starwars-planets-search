import React from 'react';
import {  screen, waitFor } from '@testing-library/react';
import App from '../App';
import {renderWithContext} from './RenderWithContext';
import mock from './mock';
import {act} from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

describe('Verificando App', () => {
  test('se renderiza o botão corretamente',async() =>{
    jest.spyOn(global,"fetch");
    global.fetch.mockResolvedValue({
      json:jest.fn().mockResolvedValue(mock),
    });

await act(async () => renderWithContext(<App/>));

  const filterButton = screen.getByRole('button',{name:/filtrar/i})
  expect(filterButton).toBeInTheDocument();
  userEvent.click(filterButton)
  screen.logTestingPlaygroundURL()
})
test('se renderiza os planetas filtrados', async() => {
  jest.spyOn(global,"fetch");
  global.fetch.mockResolvedValue({
    json:jest.fn().mockResolvedValue(mock),
});

await act(async() => renderWithContext(<App/>));

const valueFilter = screen.getByTestId('value-filter')
const columnFilter = screen.getByTestId('column-filter')
const comparisonFilter = screen.getByTestId('comparison-filter')
const filterButton = screen.getByRole('button',{name:/Filtrar/i})

userEvent.selectOptions(columnFilter, 'surface_water')
userEvent.selectOptions(comparisonFilter, 'igual a')
userEvent.type(valueFilter, '1')
await waitFor(() => screen.getByText('Tatooine'))
userEvent.click(filterButton)

expect(columnFilter).toBeInTheDocument();
expect(comparisonFilter).toBeInTheDocument();
expect(valueFilter).toBeInTheDocument();
expect(filterButton).toBeInTheDocument();

});
test('se os filtros funcionam corretamente', async() => {
  jest.spyOn(global,"fetch");
  global.fetch.mockResolvedValue({
    json:jest.fn().mockResolvedValue(mock),
  });

await act(async() => renderWithContext(<App/>));

const valueFilter = screen.getByTestId('value-filter')
const columnFilter = screen.getByTestId('column-filter')
const comparisonFilter = screen.getByTestId('comparison-filter')
const filterButton = screen.getByRole('button',{name:/Filtrar/i})

userEvent.selectOptions(columnFilter,'surface_water')
userEvent.selectOptions(comparisonFilter,'menor que')
userEvent.type(valueFilter,'1')
await waitFor(() => screen.getByText('Tatooine'))
userEvent.click(filterButton)

expect(columnFilter).toBeInTheDocument();
expect(comparisonFilter).toBeInTheDocument();
expect(valueFilter).toBeInTheDocument();
expect(filterButton).toBeInTheDocument();
});
});