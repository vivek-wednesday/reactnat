/**
 *
 * Tests for HomeScreen
 *
 */

import React from 'react';
import { renderProvider } from 'app/utils/testUtils';
import { RootScreen as RootScreenTest } from '../index';

describe('<HomeScreen /> container', () => {
  let submitSpy;

  beforeAll(() => {
    submitSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const baseElement = renderProvider(<RootScreenTest startup={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call the startup prop on mount', () => {
    renderProvider(<RootScreenTest startup={submitSpy} />);
    expect(submitSpy).toHaveBeenCalled();
  });

  it('should not render rootSceen Container', () => {
    const { getByTestId } = renderProvider(
      <RootScreenTest startup={submitSpy} />
    );
    expect(getByTestId('root-screen').type).toBe('View');
    expect(submitSpy).toHaveBeenCalled();
  });
});
