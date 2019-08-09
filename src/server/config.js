import convict from 'convict'
import path from 'path'
import pick from 'lodash/pick'
import { getAssets } from 'server/utils/webpack'

const DEFAULT_PUBLIC_PATH = path.join(__dirname, '../../public')

const config = convict({
  env: {
    doc: 'The application environment',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  server: {
    secure: {
      doc: 'Specify if the server is using https or not.',
      format: Boolean,
      default: false,
    },
    externalUrl: {
      doc: 'The server external url',
      format: 'url',
      default: 'http://localhost:8000',
      env: 'EXTERNAL_URL',
    },
    assets: {
      webpackAssets: {
        doc: 'Use webpack-assets.json file',
        format: Boolean,
        default: false,
        env: 'WEBPACK_ASSETS',
      },
      main: {
        js: {
          doc: 'Main JS file',
          format: String,
          default: '/dist/main.js',
        },
      },
    },
    port: {
      doc: 'The server port number',
      format: 'port',
      default: 8000,
      env: 'PORT',
    },
    publicPath: {
      doc: 'The public path',
      format: String,
      default: DEFAULT_PUBLIC_PATH,
    },
    graphql: {
      playground: {
        doc: 'Enable GraphiQL',
        format: Boolean,
        default: false,
      },
    },
  },
})

const env = config.get('env')
config.loadFile(path.join(__dirname, `../../config/${env}.json`))

config.validate()

if (config.get('server.assets.webpackAssets')) {
  config.set(
    'server.assets',
    getAssets({ publicPath: config.get('server.publicPath') }),
  )
}

export const getClientConfig = () => ({
  baseUrl: config.get('server.externalUrl'),
})

export const getClientUser = user =>
  user
    ? pick(user, ['id', 'email', 'firstName', 'lastName', 'username', 'role'])
    : null

export default config
