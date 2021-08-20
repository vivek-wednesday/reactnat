import { put, call, takeLatest } from 'redux-saga/effects';
import { getRepos } from 'app/services/RepoService';
import { exampleScreenActions, exampleScreenTypes } from './reducer';

/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch fake user informations.
 * Feel free to remove it.
 */
export function* fetchData(action) {
  const response = yield call(getRepos, action.name);
  if (response.ok) {
    const { data } = response;
    yield put(exampleScreenActions.successFetchRepo(data));
  } else {
    yield put(
      exampleScreenActions.failureFetchRepo(
        'There was an error while fetching repo informations.'
      )
    );
  }
}

export default function* searchListContainerSaga() {
  yield takeLatest(exampleScreenTypes.REQUEST_FETCH_REPO, fetchData);
}
