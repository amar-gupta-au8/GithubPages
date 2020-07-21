import React, { useState } from 'react';
import useFetchJobs from '../utils/useFetchjobs';
import { Container } from 'react-bootstrap';
import Job from '../components/Job';

const App = () => {
  const [params, setParams] = useState({});
  const [page, setPage] = useState({});
  const { jobs, loading, error } = useFetchJobs(params, page);
  return (
    <Container>
      {loading && <h1>Loading...</h1>}
      {error && <h1>error... Try refreshing</h1>}
      {jobs.map((job) => (
        <Job key={job.id} job={job}/>
      ))}
      <h1>{jobs.length}</h1>
    </Container>
  );
};

export default App;
