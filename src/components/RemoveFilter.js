import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function RemoveFilter() {
  const { handleDeleteFilter } = useContext(PlanetsContext);
  return (
    <div>
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ () => handleDeleteFilter('deleteFilters') }
      >
        Remove Filters
      </button>
    </div>
  );
}

export default RemoveFilter;
