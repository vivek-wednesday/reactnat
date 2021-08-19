import { fromJS } from 'immutable';
import {
  selectData,
  selectDataIsLoading,
  selectDataErrorMessage
} from '../selectors';

describe('Tests for selectors to get data from state for the ExampleScreen', () => {
  let mockedState;
  let data;
  let dataIsLoading;
  let dataErrorMessage;

  beforeEach(() => {
    data = 'react';
    dataErrorMessage = 'Some error';
    dataIsLoading = false;

    mockedState = {
      example: fromJS({
        data: {
          data
        },
        dataErrorMessage,
        dataIsLoading
      })
    };
  });

  it('should select the data', () => {
    const userSelector = selectData();
    expect(userSelector(mockedState)).toEqual({ data });
  });

  it('should select dataIsLoading', () => {
    const userIsLoadingSelector = selectDataIsLoading();
    expect(userIsLoadingSelector(mockedState)).toEqual(dataIsLoading);
  });

  it('should select the dataErrorMessage', () => {
    const userErrorMessageSelector = selectDataErrorMessage();
    expect(userErrorMessageSelector(mockedState)).toEqual(dataErrorMessage);
  });
});
