/**
 *
 * Tests for ExampleScreen
 *
 */

import React from 'react';
import { renderProvider } from 'app/utils/testUtils';
import { ExampleScreenTest } from '../index';

describe('<ExampleScreen /> Container tests', () => {
  let submitSpy;

  beforeAll(() => {
    submitSpy = jest.fn();
    jest.mock('./__mocks__/react-native-splash-screen');
  });

  it('should render and match the snapshot', () => {
    const baseElement = renderProvider(
      <ExampleScreenTest fetchData={submitSpy} />
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should fetch the user data on mount', () => {
    renderProvider(<ExampleScreenTest fetchData={submitSpy} />);
    expect(submitSpy).toHaveBeenCalled();
  });

  it('should render container', () => {
    const { getByTestId } = renderProvider(
      <ExampleScreenTest fetchData={submitSpy} />
    );
    expect(getByTestId('container')).toBeTruthy();
    expect(submitSpy).toHaveBeenCalled();
  });

  it('should wait for data', () => {
    const { getByTestId } = renderProvider(
      <ExampleScreenTest fetchData={submitSpy} data={{ items: undefined }} />
    );
    expect(getByTestId('wait').type).toBe('Text');
    expect(submitSpy).toHaveBeenCalled();
  });

  it('should render repo if data is present', () => {
    const { getByTestId } = renderProvider(
      <ExampleScreenTest fetchData={() => 0} data />
    );
    expect(getByTestId('example-container-content').type).toBe('View');
    expect(submitSpy).toHaveBeenCalled();
  });
});
