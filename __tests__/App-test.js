import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';
import SplashScreen from '../screens/SplashScreen';

it('opens the app on the splash screen', () => {
  const tree = renderer.create(<App />);
  expect(tree.root.findAllByType(SplashScreen)).toHaveLength(1);
  tree.unmount();
  jest.clearAllTimers();
});
