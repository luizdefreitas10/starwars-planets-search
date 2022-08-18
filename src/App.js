import React, { useContext, useEffect } from 'react';
import Table from './components/Table';
import PlanetsContext from './context/PlanetsContext';
import fetchApi from './services/fetchApi';

function App() {
  const { filterByName, setFilterByName } = useContext(PlanetsContext);
  useEffect(() => {
    fetchApi();
  }, []);
  return (
    <div>
      <span>Star Wars Planets</span>
      <input
        value={ filterByName }
        placeholder="planet name"
        data-testid="name-filter"
        onChange={ (event) => setFilterByName(event.target.value) }
      />
      <Table />
    </div>
  );
}

export default App;
