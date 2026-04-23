module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@features': './src/features',
          '@hooks': './src/hooks',
          '@store': './src/store',
          '@types': './src/types',
          '@api': './src/api',
          '@components': './src/components',
          '@database': './src/database',
          '@navigation': './src/navigation',
          '@constants': './src/constants',
        },
      },
    ],
    'react-native-reanimated/plugin', // Must be last
  ],
};
