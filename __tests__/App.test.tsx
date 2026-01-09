/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

test('renders correctly', async () => {
  // Basic smoke test: App should render without throwing.
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
