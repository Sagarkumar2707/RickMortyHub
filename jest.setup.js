import 'react-native-gesture-handler/jestSetup';

jest.mock('@op-engineering/op-sqlite', () => ({
  open: jest.fn().mockReturnValue({
    execute: jest.fn().mockResolvedValue({
      rows: [],
      rowsAffected: 0,
    }),
    executeAsync: jest.fn().mockResolvedValue({
      rows: [],
      rowsAffected: 0,
    }),
    transaction: jest.fn().mockImplementation(cb => cb({
      execute: jest.fn().mockResolvedValue({
        rows: [],
        rowsAffected: 0,
      }),
    })),
    close: jest.fn(),
    delete: jest.fn(),
  }),
}));

// Mock NetInfo
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn().mockReturnValue(jest.fn()),
  fetch: jest.fn().mockResolvedValue({
    isConnected: true,
    isInternetReachable: true,
  }),
  useNetInfo: jest.fn().mockReturnValue({
    isConnected: true,
    isInternetReachable: true,
  }),
}));

// Mock Reanimated & Worklets
jest.mock('react-native-worklets', () => require('react-native-worklets/src/mock'));
require('react-native-reanimated').setUpTests();

// Mock Safe Area Context
jest.mock('react-native-safe-area-context', () => {
  return require('react-native-safe-area-context/jest/mock').default;
});

// Mock Fast Image
jest.mock('react-native-fast-image', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: (props) => React.createElement(View, props),
    resizeMode: {
      contain: 'contain',
      cover: 'cover',
      stretch: 'stretch',
      center: 'center',
    },
    priority: {
      low: 'low',
      normal: 'normal',
      high: 'high',
    },
    cacheControl: {
      immutable: 'immutable',
      web: 'web',
      cacheOnly: 'cacheOnly',
    },
  };
});

// Silence specific warnings
const originalWarn = console.warn;
console.warn = (...args) => {
  if (args[0]?.includes?.('Fetch API is being used')) return;
  originalWarn(...args);
};
