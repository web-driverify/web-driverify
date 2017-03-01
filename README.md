# web-driverify

This is a common webdriver for any browser to provide Web Driver interface.
Especially useful for browsers that does NOT support Web Driver API.

Web-driverify supports most of the Web Driver Commands,
and can work without browser-specific binaries.

## Get Started

There should be a boilerplate project soon.

## Run the Tests

Download and install

```bash
git clone https://github.com/web-driverify/web-driverify.git
cd web-driverify && npm install
```

Run unit test

```bash
npm test
```

Run integration test

```bash
# Start integration test servers
npm run test:prepare
# Run test in another shell
npm run test:integration
```

## Differences with WebDriver Protocol

Web-driverify is implemented in comformance to [JSON Wire Protocol][jsonwire],
the HTTP APIs exposed by web-driverify are just like [Selenium 2][selenium],
thus compliant with selenium-based test runners like [Webdriverio][wdio].

Web-driverify cannot launch your browser by itself,
you need set your browser's proxy to the Web-driverify server
and open a session by visiting the given URL.

## Implementation Status

Method | URI Template | Command | Status
--- | --- | --- | ---
POST | `/session` | New Session | Ready
DELETE | `/session/:sessionId` | New Session | Ready
POST | `/session/:sessionId/url` | Go | Ready
GET | `/session/:sessionId/url` | Get Current Url | Ready
POST | `/session/:sessionId/back` | Back | Ready
POST | `/session/:sessionId/forward` | Forward | Ready
POST | `/session/:sessionId/screenshot` | Screenshot | Pending

[jsonwire]: https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol
[wdio]: http://webdriver.io
[selenium]: http://www.seleniumhq.org
