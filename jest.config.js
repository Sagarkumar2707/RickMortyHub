module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
    '^@api/(.*)$': '<rootDir>/src/api/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@database/(.*)$': '<rootDir>/src/database/$1',
    '^@navigation/(.*)$': '<rootDir>/src/navigation/$1',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@reduxjs/toolkit|immer|react-redux|@tanstack/react-query)/',
  ],
};
