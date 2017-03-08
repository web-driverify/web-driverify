import { init } from './utils/driver.js';
import './drivers/session.js';
import './drivers/navigation.js';
import './drivers/element-state.js';
import './drivers/element-retrieval.js';
import './drivers/element-interaction.js';
import './drivers/screen-capture.js';
import './utils/driver.js';

if (window.top !== window) {
    console.log('window not top (maybe iframe?) skipping...');
} else {
    console.log('web-driverify loaded');
    window.addEventListener('pageshow', init);
}
