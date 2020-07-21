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
      return { ...state, loading: false, jobs: payload.jobs };
    case ERROR:
      return { ...state, loading: false, error: payload.error, jobs: [] };
    default:
      return state;
  }
};
export default (params, page) => {
  const intialState = { jobs: [], loading: true };
  const [state, dispatch] = useReducer(reducer, intialState);
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch({ type: MAKE_REQUEST });
    axios
      .get(baseUrl, {
        params: { markdown: true, page: page, ...params },
      })
      .then((res) => {
        dispatch({ type: GET_DATA, payload: { jobs: res.data } });
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        dispatch({ type: ERROR, payload: { error: err } });
      });
    return () => {
      cancelToken.cancel();
    };
  }, [params, page]);
  return state;
};
