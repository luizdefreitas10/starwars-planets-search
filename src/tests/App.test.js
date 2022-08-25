import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import PlanetsProvider from '../context/PlanetsProvider';
import mock from './mock';

const fetchApi = () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mock),
  });
}

describe('Testando App', () => {
  beforeEach(fetchApi);
  afterEach(() => jest.clearAllMocks());
  it('verifica se realiza a requisicao a api e se retorna uma tabela de informacoes', async () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    );
    await waitFor(() => {
      const table = screen.getAllByRole('row');
      expect(table).toHaveLength(11);
      const nameFilter = screen.getByTestId('name-filter');
      expect(nameFilter).toBeInTheDocument();
      const columnFilter = screen.getByTestId('column-filter');
      expect(columnFilter).toBeInTheDocument();
      const comparisonFilter = screen.getByTestId('comparison-filter');
      expect(comparisonFilter).toBeInTheDocument();
      const valueFilter = screen.getByTestId('value-filter');
      expect(valueFilter).toBeInTheDocument();
      const buttonFilter = screen.getByTestId('button-filter');
      expect(buttonFilter).toBeInTheDocument();
    });
  });

  it('verificando inputs', () => {
    render(
    <PlanetsProvider>
      <App />
    </PlanetsProvider>
    );

    const inputFilter = screen.getByPlaceholderText('planet name');
    expect(inputFilter).toBeInTheDocument();
    const columnFilter = screen.getByTestId('column-filter');
    expect(columnFilter).toBeInTheDocument();
    const comparisonFilter = screen.getByTestId('comparison-filter');
    expect(comparisonFilter).toBeInTheDocument();
    const valueFilter = screen.getByTestId('value-filter');
    expect(valueFilter).toBeInTheDocument();
    const buttonFilter = screen.getByTestId('button-filter');
    expect(buttonFilter).toBeInTheDocument();
  });

})

