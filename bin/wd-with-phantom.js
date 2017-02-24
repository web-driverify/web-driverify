import child_process from 'child_process';
import process from 'process';
import fixtures from '../test/fixtures';

fixtures.setupWDWithPhantom()
    .then(() => console.log('wd and phantom started'))
    .catch(err => console.error(err));
