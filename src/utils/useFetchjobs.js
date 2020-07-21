import { useReducer, useEffect } from 'react';
import axios from 'axios';

//=> BAse url
const baseUrl =
  'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json';

//=>Actions
const ACTIONS = {
  MAKE_REQUEST: 'make-request',
  GET_DATA: 'get-data',
  ERROR: 'error',
};
const { MAKE_REQUEST, GET_DATA, ERROR } = ACTIONS;

//=> Reducer
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case MAKE_REQUEST:
      return { loading: true, jobs: [] };
    case GET_DATA:
      return { ...state, loading: false, jobs: payload };
    case ERROR:
      return { ...state, loading: false, error: payload, jobs: [] };
    default:
      return state;
  }
};
export default (params, page) => {
  const intialState = { jobs: [], loading: true };
  const [state, dispatch] = useReducer(reducer, intialState);
  useEffect(() => {
    dispatch({ type: MAKE_REQUEST });
    axios
      .get(baseUrl, {
        params: { markdown: true, page: page, ...params },
      })
      .then((res) => {
        dispatch({ type: GET_DATA, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: GET_DATA, payload: err });
      });
  }, [params, page]);
  return state;
};
