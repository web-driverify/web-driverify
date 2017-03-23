import { start, stop } from './utils/driver.js'
import './drivers/session.js'
import './drivers/navigation.js'
import './drivers/element-state.js'
import './drivers/element-retrieval.js'
import './drivers/element-interaction.js'
import './drivers/screen-capture.js'
import './drivers/actions.js'
import './drivers/document-handling.js'
import Log from './utils/log.js'
import $ from 'jquery'

let logger = new Log('index')

if (window.top !== window) {
  logger.log('window not top (maybe iframe?) skipping...')
} else {
  logger.log('web-driverify loaded')
  $(window).on('pagehide', stop)
  $(window).on('webDriverify.start DOMContentLoaded pageshow popstate', start)
}
