import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
// import fetchApi from '../services/fetchApi';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  const planetsFromApi = async () => {
    const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const data = await response.json();
    return data.results;
  };

  const alteredPlanets = async () => {
    const result = await planetsFromApi();
    result.map((planet) => delete planet.residents);
    setPlanets(result);
  };

  const contextValue = {
    planets,
  };

  useEffect(() => {
    alteredPlanets();
  }, []);

  return (
    <PlanetsContext.Provider value={ contextValue }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
