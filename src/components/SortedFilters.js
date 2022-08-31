import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function SortedFilters() {
  const columnSort = ['population',
    'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];

  const {
    setSortFilter,
    setColumnSort, handleSort } = useContext(PlanetsContext);

  return (
    <div>
      <label htmlFor="column-sort">
        Ordenar por colunas:
        <select
          data-testid="column-sort"
          id="column-sort"
          onChange={ ({ target: { value } }) => setColumnSort(value) }
        >
          { columnSort.map((column) => (
            <option key={ column } value={ column }>{ column }</option>
          )) }
        </select>
      </label>
      <label htmlFor="sort-ascendent">
        Ascendente:
        <input
          id="sort-ascendent"
          type="radio"
          value="ASC"
          data-testid="column-sort-input-asc"
          onChange={ ({ target: { value } }) => setSortFilter(value) }
        />
      </label>
      <label htmlFor="sort-ascendent">
        Descendente:
        <input
          id="sort-descendent"
          type="radio"
          value="DESC"
          data-testid="column-sort-input-desc"
          onChange={ ({ target: { value } }) => setSortFilter(value) }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleSort }
      >
        ORDER
      </button>
    </div>
  );
}

export default SortedFilters;
