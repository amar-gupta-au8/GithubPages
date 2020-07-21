/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import useFetchJobs from '../../utils/useFetchjobs';
import { Container } from 'react-bootstrap';
import Job from '../../components/Job';
import JobsPagination from '../../components/JobPagination';
import ContentLoader from 'react-content-loader'
 

const Home = () => {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);
  return (
    <Container className='my-4'>
      <h1>Github Jobs</h1>
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {loading && <ContentLoader />}
      {error && <h1>error... Try refreshing</h1>}
      {jobs.map((job) => (
        <Job key={job.id} job={job} />
      ))}
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>
  );
};

export default Home;
