import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
// import fetchApi from '../services/fetchApi';

function PlanetsProvider({ children }) {
  // const columnFilterArray = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');
  const [filteredObj, setFilteredObj] = useState([]);

  // const [filterByNumericValues, setFilterByNumericValues] = useState([{
  //   column: 'population',
  //   comparison: 'maior que',
  //   value: 0,
  // }]);

  const handelClickFilter = () => {
    const filterNumericValuesObj = {
      column,
      comparison,
      value,
    };
    // const filteredColumn = columnFilterArray.filter((option) => option === column);
    // console.log(filteredColumn);
    if (comparison === 'maior que') {
      setPlanets(planets.filter((planet) => Number(planet[column]) > Number(value)));
    }
    if (comparison === 'menor que') {
      setPlanets(planets.filter((planet) => Number(planet[column]) < Number(value)));
    }
    if (comparison === 'igual a') {
      setPlanets(planets.filter((planet) => Number(planet[column]) === Number(value)));
    }
    setFilteredObj(...filteredObj, filterNumericValuesObj);
  };

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
    setFilterByName,
    column,
    comparison,
    value,
    setColumn,
    setComparison,
    setValue,
    handelClickFilter,
  };

  useEffect(() => {
    alteredPlanets();
    // console.log(planets);
  }, []);

  useEffect(() => {
    if (filterByName === '') {
      alteredPlanets();
    } else {
      const getPlanets = async () => {
        const data = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
          .then((response) => response.json());
        const resultPlanets = data.results;
        setPlanets(resultPlanets.filter((planet) => planet.name.toLowerCase()
          .includes(filterByName.toLowerCase())));
      };
      getPlanets();
    }
  }, [filterByName]);

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
