import 'react-native-gesture-handler/jestSetup';
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

// Native audio and wake-lock bindings are unavailable in the JavaScript runner.
jest.mock('react-native-sound', () => jest.fn());
jest.mock('react-native-keep-awake', () => ({
  activate: jest.fn(),
  deactivate: jest.fn(),
}));
jest.useFakeTimers();
