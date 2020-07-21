/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import useFetchJobs from '../utils/useFetchjobs';
import { Container } from 'react-bootstrap';
import Job from '../components/Job';

const App = () => {
  const [params, setParams] = useState({});
  const [page, setPage] = useState({});
  const { jobs, loading, error } = useFetchJobs(params, page);
  return (
    <Container className='my-4'>
      <h1>Github Jobs</h1>
      {loading && <h1>Loading...</h1>}
      {error && <h1>error... Try refreshing</h1>}
      {jobs.map((job) => (
        <Job key={job.id} job={job} />
      ))}
    </Container>
  );
};

export default App;
