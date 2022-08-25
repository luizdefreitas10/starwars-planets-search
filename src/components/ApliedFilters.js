import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import RemoveFilter from './RemoveFilter';

function ApliedFilters() {
  const { filteredObj,
    handleDeleteFilter } = useContext(PlanetsContext);
  console.log(filteredObj);

  return (

    <div>

      <h1>Filtros aplicados:</h1>

      { filteredObj.map((f, index) => (
        <p
          key={ index }
          data-testid="filter"
        >
          { `${f.column}, ${f.comparison} ${f.value}` }
          <button
            type="button"
            onClick={ () => handleDeleteFilter(f) }
          >
            Delete Filter
          </button>
        </p>
      )) }
      <RemoveFilter />
    </div>

  );
}

export default ApliedFilters;
