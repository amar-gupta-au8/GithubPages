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
  UPDATE_HAS_NEXT_PAGE: 'update-has-nextpage',
};
const { MAKE_REQUEST, GET_DATA, ERROR, UPDATE_HAS_NEXT_PAGE } = ACTIONS;

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
    case UPDATE_HAS_NEXT_PAGE:
      return { ...state, hasNextPage: payload.hasNextPage };
    default:
      return state;
  }
};
export default (params, page) => {
  const intialState = { jobs: [], loading: true };
  const [state, dispatch] = useReducer(reducer, intialState);
  useEffect(() => {
    const cancelToken1 = axios.CancelToken.source();
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

    const cancelToken2 = axios.CancelToken.source();
    axios
      .get(baseUrl, {
        params: { markdown: true, page: page + 1, ...params },
      })
      .then((res) => {
        dispatch({
          type: UPDATE_HAS_NEXT_PAGE,
          payload: { hasNextPage: res.data.length !== 0 },
        });
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        dispatch({ type: ERROR, payload: { error: err } });
      });
    return () => {
      cancelToken1.cancel();
      cancelToken2.cancel();
    };
  }, [params, page]);
  return state;
};
