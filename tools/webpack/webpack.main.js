const path = require('path');

module.exports = {
  entry: ['./apps/main/src/main.ts'],
  module: {
    rules: require('./webpack.rules'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    alias: {
      '@ide/shared/constants': path.resolve(
        'libs/shared/constants/src/index.ts'
      ),
      '@ide/nest': path.resolve('libs/nest/src/index.ts'),
      '@ide/shared/types': path.resolve('libs/shared/types/src/index.ts'),
    },
  },
  stats: 'minimal',
};
