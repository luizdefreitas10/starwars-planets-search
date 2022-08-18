export default async function fetchApi() {
  const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const data = await response.json();
  console.log(data.results);
  console.log('chamou api');
  return data.results;
}
