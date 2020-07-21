import React from 'react';
import { Pagination } from 'react-bootstrap';

const JobPagination = ({ page, setPage }) => {
  return (
    <Pagination>
      <Pagination.Prev />
      <Pagination.Item />
      <Pagination.Item />
      <Pagination.Item />
      <Pagination.Next />
    </Pagination>
  );
};

export default JobPagination;
