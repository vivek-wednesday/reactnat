import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

export const selectExampleDomain = state =>
  (state.example || initialState).toJS();

export const selectData = () =>
  createSelector(selectExampleDomain, substate => get(substate, 'data'));

export const selectDataIsLoading = () =>
  createSelector(selectExampleDomain, substate =>
    get(substate, 'dataIsLoading')
  );

export const selectDataErrorMessage = () =>
  createSelector(selectExampleDomain, substate =>
    get(substate, 'dataErrorMessage')
  );
