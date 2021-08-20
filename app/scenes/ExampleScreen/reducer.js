import { createActions } from 'reduxsauce';
import { fromJS } from 'immutable';
import produce from 'immer';
export const {
  Types: exampleScreenTypes,
  Creators: exampleScreenActions
} = createActions({
  // Fetch user informations
  requestFetchRepo: ['name'],
  // User information was successfully fetched
  successFetchRepo: ['data'],
  // An error occurred
  failureFetchRepo: ['errorMessage']
});

export const initialState = fromJS({
  data: {},
  dataIsLoading: false,
  dataErrorMessage: null
});

export const fetchRepo = state =>
  state.set('dataIsLoading', true).set('dataErrorMessage', null);

export const successFetchRepo = (state, { data }) =>
  state
    .set('data', data)
    .set('dataIsLoading', false)
    .set('dataErrorMessage', null);

export const failureFetchRepo = (state, { errorMessage }) =>
  state
    .set('data', {})
    .set('dataIsLoading', false)
    .set('dataErrorMessage', errorMessage);

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const exampleContainerReducer = (state = initialState, action) =>
  produce(state, () => {
    switch (action.type) {
      case exampleScreenTypes.REQUEST_FETCH_REPO:
        return fetchRepo(state, action);
      case exampleScreenTypes.SUCCESS_FETCH_REPO:
        return successFetchRepo(state, action);
      case exampleScreenTypes.FAILURE_FETCH_REPO:
        return failureFetchRepo(state, action);
      default:
        return state;
    }
  });
