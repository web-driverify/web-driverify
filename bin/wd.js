import fixtures from '../test/fixtures';

Promise
    .all([
        fixtures.setupWD(),
        fixtures.setupProxy()
    ])
    .then(() => console.log('wd started'))
    .catch(err => console.error(err));
