const webpack = require('webpack');
const Clean = require('clean-webpack-plugin');
const Html = require('html-webpack-plugin');
const path = require('path');

const Define = webpack.DefinePlugin;
const Provide = webpack.ProvidePlugin;
const NoEmitOnErrors = webpack.NoEmitOnErrorsPlugin;
const UglifyJS = webpack.optimize.UglifyJsPlugin;
const CommonsChunk = webpack.optimize.CommonsChunkPlugin;
const ModuleConcatenation = webpack.optimize.ModuleConcatenationPlugin;

const getPath = relativePath => path.resolve(__dirname, '..', ...relativePath.split('/'));

const basePath = '/';
const publicPath = getPath('public');
const env = process.env.NODE_ENV || 'dev';

module.exports = {
  entry: {
    app: getPath('app/app.js'),
  },
  output: {
    path: publicPath,
    publicPath: basePath,
    filename: '[name].[chunkhash].js',
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
            ],
            plugins: [
              'transform-object-rest-spread',
              'transform-react-constant-elements',
              'transform-react-remove-prop-types',
            ],
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
    new ModuleConcatenation(),
    ...(env === 'production' ? [new UglifyJS()] : []),
    new Clean(publicPath, {
      root: getPath(''),
      verbose: true,
      dry: false,
    }),
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
};
