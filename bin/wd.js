#!/usr/bin/env babel-node

import fixtures from '../test/fixtures';

Promise
    .all([
        fixtures.setupWD(),
        fixtures.setupProxy(),
        fixtures.setupStub()
    ])
    .then(() => console.log('wd started'))
    .catch(err => console.error(err));
