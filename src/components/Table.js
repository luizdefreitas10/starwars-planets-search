import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { planets } = useContext(PlanetsContext);
  const planetHeaders = ['name', 'rotation_period', 'orbital_period',
    'diameter', 'climate', 'gravity', 'terrain',
    'surface_water', 'population', 'films', 'created', 'edited', 'url'];
  // console.log(planets);
  // console.log(planetHeaders);
  return (
    <table border="1">
      <thead>
        <tr>
          { planetHeaders.map((header) => (
            <th key={ header }>{ header }</th>
          )) }
        </tr>
      </thead>
      <tbody>
        { planets.map((planet, index) => (
          <tr key={ index }>
            <td>{planet.name}</td>
            <td>{planet.rotation_period}</td>
            <td>{planet.orbital_period}</td>
            <td>{planet.diameter}</td>
            <td>{planet.climate}</td>
            <td>{planet.gravity}</td>
            <td>{planet.terrain}</td>
            <td>{planet.surface_water}</td>
            <td>{planet.population}</td>
            <td>{planet.films}</td>
            <td>{planet.created}</td>
            <td>{planet.edited}</td>
            <td>{planet.url}</td>
          </tr>
        )) }
      </tbody>
    </table>
  );
}

export default Table;
