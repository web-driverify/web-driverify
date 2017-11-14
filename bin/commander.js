import program from 'commander'
import pkg from '../package.json'
import process from 'process'
import config from '../src/utils/config.js'
import Endpoint from '../src/endpoints/export.js'

program
  .version(pkg.version)
  .usage('[options] [configFile]')
  .option('-p, --port [num]', 'port number [8089]')
  .option('--proxy-port [num]', 'proxy port number [8088]')
  .option('--stub-port [num]', 'stub port number for debug use [8087]')
  .option('--host [hostname]', 'hostname for the server')
  .parse(process.argv)

config.init(program, program.args[0])
Endpoint.loadPlugins(config.plugins)
