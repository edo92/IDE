const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');
const path = require('path');

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: {
      '@ide/util': path.resolve('libs/util/src/index.ts'),
      '@ide/shared/constants': path.resolve(
        'libs/shared/constants/src/index.ts'
      ),
      '@ide/shared/types': path.resolve('libs/shared/types/src/index.ts'),
    },
  },
  stats: 'minimal',
  devtool: 'inline-source-map',
};
