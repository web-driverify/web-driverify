# web-driverify

This is a common webdriver for any browser to provide Web Driver interface.
Especially useful for browsers that does NOT support Web Driver API.

Web-driverify supports most of the Web Driver Commands,
and can work without browser-specific binaries.

## Get Started

Install

```bash
npm i -g web-driverify
```

Start Server

```bash
wd
```

## ENV variables

* `WD_PORT`: Port for the WebDriver Protocol, test runners like [webdriver.io][wdio] should connect to this port. Default: `8089`
* `PROXY_PORT`: Port for the browser proxy. Default: `8088`
* `DEBUG`: Used by [debug][debug] utility. To enable web-driverify debug, set `DEBUG=wd:*`

Here's a boilerplate project: <https://github.com/web-driverify/wdio-boilerplate>

## Development

Download

```bash
git clone https://github.com/web-driverify/web-driverify.git
```

Install

```bash
# fibers in wdio requires -std=gnu++0x, thus make sure gcc4.3+ installed.
cd web-driverify && npm install
```

Run test

```bash
# Run all test cases
npm test

# run unit/integration test cases separately
# attach phantom.js
npm run debug:phantom
# run cases, in another shell
npm run test:unit
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

### Session

| Method | URI Template          | Command        | wdio API             | Status |
| ------ | --------------------- | -------------- | -------------------- | ------ |
| POST   | `/session`            | New Session    | `.session()`         | Ready  |
| DELETE | `/session/:sessionId` | Delete Session | `.session('delete')` | Ready  |

### Navigation

| Method | URI Template                  | Command         | wdio API     | Status |
| ------ | ----------------------------- | --------------- | ------------ | ------ |
| POST   | `/session/:sessionId/url`     | Go              | `.url()`     | Ready  |
| GET    | `/session/:sessionId/url`     | Get Current Url | `.getUrl()`  | Ready  |
| POST   | `/session/:sessionId/back`    | Back            | `.back()`    | Ready  |
| POST   | `/session/:sessionId/forward` | Forward         | `.forward()` | Ready  |
| POST   | `/session/:sessionId/refresh` | Refresh         | `.refresh()` | Ready  |
| GET    | `/session/:sessionId/title`   | getTitle        | `.title()`   | Ready  |

### Element Retrieval

| Method | URI Template                             | Command                    | wdio API          | Status |
| ------ | ---------------------------------------- | -------------------------- | ----------------- | ------ |
| POST   | `/session/:sessionId/element`            | Find Element               | `.element()`      | Ready  |
| POST   | `/session/:sessionId/elements`           | Find Elements              | `.elements()`     | Ready  |
| POST   | `/session/:sessionId/element/:id/element` | Find Element From Element  | `.$(foo).$(bar)`  | Ready  |
| POST   | `/session/:sessionId/element/:id/elements` | Find Elements From Element | `.$(foo).$$(bar)` | Ready  |

### Element Interaction

| Method | URI Template                             | Command           | wdio API            | Status |
| ------ | ---------------------------------------- | ----------------- | ------------------- | ------ |
| POST   | `/session/:sessionId/element/:id/click`  | Element Click     | `.elementIdClick()` | Ready  |
| POST   | `/session/:sessionId/element/:id/value`  | Element Send Keys | `.elementIdValue()` | Ready  |
| POST   | `/session/:sessionId/element/:id/clear`  | Element Clear     | `.elementIdClear()` | Ready  |
| POST   | `/session/:sessionId/element/:id/submit` | Element Submit    | `.submit()`         | Ready  |

### Element State

| Method | URI Template                             | Command               | wdio API                 | Status |
| ------ | ---------------------------------------- | --------------------- | ------------------------ | ------ |
| GET    | `/session/:sessionId/element/:id/text`   | Get Element Text      | `.elementIdText()`       | Ready  |
| GET    | `/session/:sessionId/element/:id/attribute/:name` | Get Element Attribute | `.elementIdAttribute())` | Ready  |
| GET    | `/session/:sessionId/element/:id/size`   | Get Element Size      | `.elementIdSize()`       | Ready  |
| GET    | `/session/:sessionId/element/:id/location` | Get Element Location  | `.elementIdLocation()`   | Ready  |
| GET    | `/session/:sessionId/element/:id/rect`   | Get Element Rect      | `.elementIdRect()`       | Ready  |
| GET    | `/session/:sessionId/element/:id/displayed` | Get Element Displayed | `.elementIdDisplayed()`  | Ready  |

### Actions

| Method | URI Template                      | Command     | wdio API        | Status |
| ------ | --------------------------------- | ----------- | --------------- | ------ |
| POST   | `/session/:sessionId/touch/click` | Touch Click | `.touchClick()` | Ready  |

### Document Handling

| Method | URI Template                  | Command        | wdio API     | Status |
| ------ | ----------------------------- | -------------- | ------------ | ------ |
| POST   | `/session/:sessionId/execute` | Execute Script | `.execute()` | Ready  |

### Screen Capture

| Method | URI Template                     | Command    | wdio API        | Status |
| ------ | -------------------------------- | ---------- | --------------- | ------ |
| GET    | `/session/:sessionId/screenshot` | Screenshot | `.screenshot()` | Ready  |

[jsonwire]: https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol
[wdio]: http://webdriver.io
[selenium]: http://www.seleniumhq.org
[debug]: https://github.com/visionmedia/debug
