/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import useFetchJobs from '../../utils/useFetchjobs';
import { Container } from 'react-bootstrap';
import Job from '../../components/Job';
import JobsPagination from '../../components/JobPagination';

const Home = () => {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error } = useFetchJobs(params, page);
  return (
    <Container className='my-4'>
      <h1>Github Jobs</h1>
      <JobsPagination page={page} setPage={setPage} hasNextPage={true} />
      {loading && <h1>Loading...</h1>}
      {error && <h1>error... Try refreshing</h1>}
      {jobs.map((job) => (
        <Job key={job.id} job={job} />
      ))}
      
    </Container>
  );
};

export default Home;
