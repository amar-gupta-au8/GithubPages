import React, { useState } from 'react';
import useFetchJobs from '../utils/useFetchjobs';
import { Container } from 'react-bootstrap';

const App = () => {
  const { jobs, loading, error } = useFetchJobs();
  const [params, setParams] = useState('');
  const [page, setPage] = useState('');
  return (
    <Container>
      {loading && <h1>Loading...</h1>}
      {error && <h1>error... Try refreshing</h1>}
      <h1>{jobs.length}</h1>
    </Container>
  );
};

export default App;
