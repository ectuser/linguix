import type { Configuration } from 'webpack';
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    background: 'src/background/background.ts',
    content: 'src/content/content.ts'
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {from: 'src/content/content-styles.css', to: './'}
      ]
    })
  ]
} as Configuration;
