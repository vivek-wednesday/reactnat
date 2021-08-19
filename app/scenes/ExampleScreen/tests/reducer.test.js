import { fromJS } from 'immutable';
import {
  exampleContainerReducer,
  initialState,
  exampleScreenTypes
} from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('Tests for reducers used in the ExampleScreen', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(exampleContainerReducer(undefined, {})).toEqual(state);
  });

  it('should ensure that dataIsLoading = false when an action of type REQUEST_FETCH_REPO is dispatched', () => {
    const expectedResult = state
      .set('dataIsLoading', true)
      .set('dataErrorMessage', null);
    expect(
      exampleContainerReducer(state, {
        type: exampleScreenTypes.REQUEST_FETCH_REPO
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the data data is present and dataLoading = false when SUCCESS_FETCH_REPO is dispatched', () => {
    const data = fromJS({});
    const expectedResult = state
      .set('data', fromJS({}))
      .set('dataIsLoading', false)
      .set('dataErrorMessage', null);
    expect(
      exampleContainerReducer(state, {
        type: exampleScreenTypes.SUCCESS_FETCH_REPO,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the dataErrorMessage has some data and dataLoading = false when FAILURE_FETCH_REPO is dispatched', () => {
    const expectedResult = state
      .set('data', {})
      .set('dataIsLoading', false)
      .set('dataErrorMessage', 'There was some error bro');
    expect(
      exampleContainerReducer(state, {
        type: exampleScreenTypes.FAILURE_FETCH_REPO,
        errorMessage: 'There was some error bro'
      })
    ).toEqual(expectedResult);
  });
});
