/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */

import { takeLatest, call, put } from 'redux-saga/effects';
import { apiResponseGenerator } from 'app/utils/testUtils';
import exampleScreenSaga, { fetchData } from '../saga';
import { exampleScreenTypes } from '../reducer';
import { getRepos } from '../../../services/RepoService';

describe('Tests for the sagas used in the ExampleScreen', () => {
  const generator = exampleScreenSaga();

  it('should start task to watch for REQUEST_FETCH_REPO action', () => {
    expect(generator.next().value).toEqual(
      takeLatest(exampleScreenTypes.REQUEST_FETCH_REPO, fetchData)
    );
  });

  it('should ensure that the action FAILURE_FETCH_REPO is dispatched when the api call fails', () => {
    const action = { name: 'react' };
    const method = fetchData(action);
    const res = method.next().value;
    expect(res).toEqual(call(getRepos, action.name));
    expect(method.next(apiResponseGenerator(false)).value).toEqual(
      put({
        type: exampleScreenTypes.FAILURE_FETCH_REPO,
        errorMessage: 'There was an error while fetching repo informations.'
      })
    );
  });

  it('should ensure that the action SUCCESS_FETCH_REPO is dispatched when the api call succeeds', () => {
    const action = { name: 'react' };
    const method = fetchData(action);
    const res = method.next().value;
    expect(res).toEqual(call(getRepos, action.name));
    expect(method.next(apiResponseGenerator(true)).value).toEqual(
      put({ type: exampleScreenTypes.SUCCESS_FETCH_REPO })
    );
  });
});
