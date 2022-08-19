import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function NumberFilter() {
  const {
    handelClickFilter,
    column,
    comparison,
    value,
    setColumn,
    setComparison,
    setValue } = useContext(PlanetsContext);

  return (
    <div>
      <label htmlFor="select-id">
        Coluna:
        <select
          name="column"
          id="select-id"
          data-testid="column-filter"
          value={ column }
          onChange={ (event) => setColumn(event.target.value) }
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
      </label>
      <label htmlFor="operator-id">
        Operador:
        <select
          name="comparison"
          id="operator-id"
          data-testid="comparison-filter"
          value={ comparison }
          onChange={ (event) => setComparison(event.target.value) }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>
      <input
        name="value"
        type="number"
        data-testid="value-filter"
        value={ value }
        onChange={ (event) => setValue(event.target.value) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handelClickFilter }
      >
        Filtrar
      </button>
    </div>
  );
}

export default NumberFilter;