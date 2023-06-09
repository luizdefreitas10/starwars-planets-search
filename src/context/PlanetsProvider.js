import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [columnFilterArray, setcolumnFilterArray] = useState(['population',
    'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');
  const [renderFilter, setRenderFilter] = useState(false);
  const [filteredObj, setFilteredObj] = useState([]);
  const [originalApiPlanets, setOriginalApiPlanets] = useState([]);
  const [sortFilter, setSortFilter] = useState('');
  const [columnSort, setColumnSort] = useState('population');

  const handelClickFilter = () => {
    const id = filteredObj.length;
    const filterNumericValuesObj = {
      column,
      comparison,
      value,
      id,
    };
    const filteredColumn = columnFilterArray.filter((option) => option !== column);
    // console.log(filteredColumn);
    if (comparison === 'maior que') {
      setPlanets(planets.filter((planet) => (+planet[column]) > (+value)));
    }
    if (comparison === 'menor que') {
      setPlanets(planets.filter((planet) => (+planet[column]) < (+value)));
    }
    if (comparison === 'igual a') {
      setPlanets(planets.filter((planet) => (+planet[column]) === (+value)));
    }
    setColumn(filteredColumn[0]);
    setFilteredObj([...filteredObj, filterNumericValuesObj]);
    setcolumnFilterArray(filteredColumn);
    setRenderFilter(true);
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
    setOriginalApiPlanets(result);
  };

  const handleSort = () => {
    if (sortFilter === 'ASC') {
      return setPlanets([...[...planets.filter((e) => e[columnSort] !== 'unknown')
        .sort((a, b) => a[columnSort] - b[columnSort])],
      ...[...planets.filter((e) => e[columnSort] === 'unknown')]]);
    }
    return setPlanets([...[...planets.filter((e) => e[columnSort] !== 'unknown')
      .sort((a, b) => b[columnSort] - a[columnSort])],
    ...[...planets.filter((e) => e[columnSort] === 'unknown')]]);
  };

  const handleDeleteFilter = (obj) => {
    if (obj === 'deleteFilters') {
      setcolumnFilterArray(['population',
        'orbital_period', 'diameter',
        'rotation_period', 'surface_water']);
      setFilteredObj([]);
      setPlanets(originalApiPlanets);
      return true;
    }

    const columnFilterSelected = filteredObj.filter((o) => o.column === obj.column);
    setcolumnFilterArray([...columnFilterArray, columnFilterSelected[0].column]);
    const deleteFilterSelected = filteredObj.filter((o) => o.column !== obj.column);
    console.log(deleteFilterSelected);
    setFilteredObj(deleteFilterSelected);
    console.log(columnFilterSelected);
    console.log(filteredObj);
  };

  useEffect(() => {
    const filterPlanets = () => {
      if (filteredObj.length === 0) {
        setPlanets(originalApiPlanets);
        return;
      }
      let original = [...originalApiPlanets];
      console.log(original);
      filteredObj.forEach((o) => {
        console.log(o);
        const filterForeach = (columnForeach, valueForeach) => {
          if (o.comparison === 'maior que') {
            return (+columnForeach) > (+valueForeach);
          }
          if (o.comparison === 'menor que') {
            return (+columnForeach) < (+valueForeach);
          }
          if (o.comparison === 'igual a') {
            return (+columnForeach) === (+valueForeach);
          }
        };
        original = original.filter((p) => filterForeach(p[o.column], o.value));
        setPlanets(original);
      });
    };
    filterPlanets();
  }, [filteredObj]);

  const contextValue = {
    originalApiPlanets,
    planets,
    filterByName,
    setFilterByName,
    column,
    comparison,
    value,
    setColumn,
    setComparison,
    setValue,
    handelClickFilter,
    columnFilterArray,
    setcolumnFilterArray,
    renderFilter,
    setRenderFilter,
    filteredObj,
    handleDeleteFilter,
    setSortFilter,
    setColumnSort,
    handleSort,
  };

  useEffect(() => {
    alteredPlanets();
    // console.log(alteredPlanets);
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
