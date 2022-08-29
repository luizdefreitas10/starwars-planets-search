import React from 'react';
import {  screen, waitFor } from '@testing-library/react';
import App from '../App';
import {renderWithContext} from './RenderWithContext';
import mock from './mock';
import {act} from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import fetchApi from '../services/fetchApi';

describe('Verificando App', () => {
  const ENDPOINT = 'https://swapi-trybe.herokuapp.com/api/planets/';

  test('se a quantidade de linhas da tabela está correto', async () => {
    renderWithContext(<App />);

    expect(screen.queryAllByRole('row')).toHaveLength(1);
});

// test('verificando o valor dos filtros', async () => {
//   renderWithContext(<App />);
//       await waitFor(() => expect(fetch).toHaveBeenCalled());

//       userEvent.selectOptions(screen.getByTestId('column-filter'), ['population']);
//       userEvent.selectOptions(screen.getByTestId('comparison-filter'), ['igual a']);
//       userEvent.type(screen.getByTestId('value-filter'), '200000');
//       userEvent.click(screen.getByTestId('button-filter'));

//       expect(screen.getByText(/population igual a 0200000/i))
//         .toBeInTheDocument();

//       const tableRow = screen.getAllByRole('row');

//       expect(tableRow).toHaveLength(2);
//       expect(tableRow[1]).toHaveTextContent('Tatooine');
//   });

  test('teste do table', () => {
    const arrayOfHeaders = [
      'name', 'rotation_period', 'orbital_period', 'diameter', 'climate',
      'gravity', 'terrain', 'surface_water', 'population', 'films', 'created',
      'edited', 'url',
    ];
    renderWithContext(<App/>);

    arrayOfHeaders.forEach((header) => {
      expect(screen.getByRole('columnheader', { name: header })).toBeInTheDocument();
    });
  });

  test('verifica se a api é chamada com o endpoint correto',async() =>{
    jest.spyOn(global,"fetch");
    global.fetch.mockResolvedValue({
      json:jest.fn().mockResolvedValue(mock),
    });

    const planetsFromApi = await fetchApi();

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(ENDPOINT);
    // expect(planetsFromApi).toEqual(mock);

})

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

const remove = screen.getByTestId('button-remove-filters');

expect(columnFilter).toBeInTheDocument();
expect(comparisonFilter).toBeInTheDocument();
expect(valueFilter).toBeInTheDocument();
expect(filterButton).toBeInTheDocument();
expect(remove).toBeInTheDocument();

// userEvent.click(remove);



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