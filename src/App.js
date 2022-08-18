import React, { useEffect } from 'react';
import Table from './components/Table';
import fetchApi from './services/fetchApi';

function App() {
  useEffect(() => {
    fetchApi();
  }, []);
  return (
    <div>
      <span>App</span>
      <Table />
    </div>
  );
}

export default App;
