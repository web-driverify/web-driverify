import path from 'path'
import glob from 'glob'

import Endpoint from '.'

glob.sync(path.join(__dirname, '**/*.js'))
  .map(require)
  .forEach((endpoint) => { Endpoint.register(endpoint) })
