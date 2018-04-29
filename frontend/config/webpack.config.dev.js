const webpack = require('webpack');
const Html = require('html-webpack-plugin');
const path = require('path');

const Provide = webpack.ProvidePlugin;
const Define = webpack.DefinePlugin;
const NoEmitOnErrors = webpack.NoEmitOnErrorsPlugin;
const CommonsChunk = webpack.optimize.CommonsChunkPlugin;

const getPath = relativePath => path.resolve(__dirname, '..', ...relativePath.split('/'));

const basePath = '/';
const publicPath = getPath('public');

module.exports = {
  entry: {
    app: getPath('app/app.js'),
  },
  output: {
    path: publicPath,
    publicPath: basePath,
    filename: '[name].[hash].js',
  },
  resolve: {
    modules: [getPath('app'), getPath('../node_modules')],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                targets: ['> 1%', 'android >= 4.4.4', 'ios >= 9'],
                useBuiltIns: true,
              }],
              'react',
              'react-hmre',
            ],
            plugins: ['transform-object-rest-spread'],
          },
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'file-loader?name=images/[hash].[ext]',
      }, {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        loader: 'file-loader?name=fonts/[hash].[ext]',
      },
    ],
  },
  plugins: [
    new NoEmitOnErrors(),
    new Provide({
      React: 'react',
      Component: 'react/lib/ReactComponent',
      PropTypes: 'react/lib/ReactPropTypes',
      ReactDOM: 'react-dom',
      b: 'bem-react-helper',
    }),
    new Define({
      BASE_PATH: JSON.stringify(basePath),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new Html({
      template: getPath('app/index.ejs'),
      basePath,
    }),
    new CommonsChunk({
      name: 'vendor',
      minChunks({ userRequest }) {
        return typeof userRequest === 'string' && userRequest.split('!').pop().includes('node_modules');
      },
    }),
  ],
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    contentBase: publicPath,
    historyApiFallback: true,
  },
};
