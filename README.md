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
$ wd -h
  Usage: wd [options] [configFile]

  Options:

    -V, --version       output the version number
    -p, --port [num]    port number [8089]
    --proxy-port [num]  proxy port number [8088]
    --stub-port [num]   stub port number for debug use [8087]
    --host [hostname]   hostname for the server
    -h, --help          output usage information
```

`configFile` defaults to `web-driverify.yaml` in currrent work directory, [here][conf]'s an example.
Here's a boilerplate project: <https://github.com/web-driverify/wdio-boilerplate>

> Set `DEBUG=wd:*` to enable [debug][debug] output. `wd-phantom` will attach a phantomjs (one of the brilliant headless browsers) instance automatically everytime NewSession requested.

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

# run unit/e2e test cases separately
# attach phantom.js
npm run debug:phantom
# run cases, in another shell
npm run test:unit
npm run test:e2e
```

## Differences with WebDriver Protocol

Web-driverify is implemented in comformance to [JSON Wire Protocol][jsonwire],
the HTTP APIs exposed by web-driverify are just like [Selenium 2][selenium],
thus compliant with selenium-based test runners like [Webdriverio][wdio].

Web-driverify cannot launch your browser by itself,
you need set your browser's proxy to the Web-driverify server
and open a session by visiting the given URL.

Due to limitaions of Javascript, we can't do the same things as selenium.

## Implementation Status

APIs are categorized as [WebDriver W3C Candidate Recommandation][wd-w3c].

### Sessions

| Command Name                   | API Endpoint                             | wdio API                  | Status      |
| ------------------------------ | ---------------------------------------- | ------------------------- | ----------- |
| Status                         | GET [/status](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#status) | `.status()`               | 🕑           |
| New Session                    | POST [/session](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#session) | `.session()`              | ✅           |
| *Get Active Sessions*          | GET [/sessions](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessions) | `.sessions()`             | 🕑           |
| *Get Session*                  | GET [/session/:sessionId](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionid) | `.session(id)`            | 🕑           |
| Delete Session                 | DELETE [/session/:sessionId](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionid) | `.session('delete')`      | ✅        |
| Set Timeouts                   | POST [/session/:sessionId/timeouts](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtimeouts) | `.timeouts()`             | 🕑           |
| *Set Timeout for Async Script* | POST [/session/:sessionId/timeouts/async_script](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtimeoutsasync_script) | `.timeoutsAsyncScript()`  | ✅           |
| *Set Timout for Implicit Wait* | POST [/session/:sessionId/timeouts/implicit_wait](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtimeoutsimplicit_wait) | `.timeoutsImplicitWait()` | 🕑           |


### Navigation

| Command Name    | API Endpoint                             | wdio API     | Status      |
| --------------- | ---------------------------------------- | ------------ | ----------- |
| Go              | POST [/session/:sessionId/url](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidurl) | `.url()`     | ✅           |
| Get Current URL | GET [/session/:sessionId/url](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidurl) | `.getUrl()`  | ✅           |
| Back            | POST [/session/:sessionId/back](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidback) | `.back()`    | 🕑           |
| Forward         | POST [/session/:sessionId/forward](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidforward) | `.forward()` | ✅           |
| Refresh         | POST [/session/:sessionId/refresh](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidrefresh) | `.refresh()` | ✅           |
| Get Title       | GET [/session/:sessionId/title](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtitle) | `.title()`   | ✅           |


### Document Handling

| Command Name          | API Endpoint                             | wdio API          | Status      |
| --------------------- | ---------------------------------------- | ----------------- | ----------- |
| Getting Page Source   | GET [/session/:sessionId/source](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidsource) | `.source()`       | 🕑           |
| Execute Script        | POST [/session/:sessionId/execute](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidexecute) | `.execute()`      | ✅           |
| Excecute Async Script | POST [/session/:sessionId/execute_async](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidexecute_async) | `.executeAsync()` | 🕑           |


### Screen Capture


| Command Name    | API Endpoint                             | wdio API        | Status    |
| --------------- | ---------------------------------------- | --------------- | --------- |
| Take Screenshot | GET [/session/:sessionId/screenshot](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidscreenshot) | `.screenshot()` | ✅           |

Notes:

- Screenshots are taken by [html2cavans](https://html2canvas.hertzen.com/), which may difference with real web page.

### Input Sources

| Command Name            | API Endpoint                             | wdio API                 | Status   |
| ----------------------- | ---------------------------------------- | ------------------------ | -------- |
| *Get Available Engines* | GET [/session/:sessionId/ime/available_engines](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidimeavailable_engines) | `.imeAvailableEngines()` | 💣    |
| *Get Active Engine*     | GET [/session/:sessionId/ime/active_engine](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidimeactive_engine) | ` .imeActiveEngine()`    | 💣    |
| *Is IME Activated*      | GET [/session/:sessionId/ime/activated](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidimeactivated) | `.imeActivated()`        | 💣    |
| *Deactivate IME*        | POST [/session/:sessionId/ime/deactivate](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidimedeactivate) | `.imeDeactivate()`       | 💣    |
| *Activate IME*          | POST [/session/:sessionId/ime/activate](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidimeactivate) | `.imeActivate()`         | 💣    |

Notes:

* Due to Javascript Limitaions, no input sources APIs will support.

### Command Contexts

| Command Name           | API Endpoint                             | wdio API                  | Status   |
| ---------------------- | ---------------------------------------- | ------------------------- | -------- |
| Get Window Handle      | GET [/session/:sessionId/window_handle](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidwindow_handle) | `.window()`               | 💣    |
| Get Window Handles     | GET [/session/:sessionId/window_handles](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidwindow_handles) | `.windowHandles()`        | 💣    |
| Switch To Frame        | POST [/session/:sessionId/frame](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidframe) | `.frame()`                | 💣    |
| Switch To Parent Frame | POST [/session/:sessionId/frame/parent](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidframeparent) | `.frameParent()`          | 💣    |
| Switch To Window       | POST [/session/:sessionId/window](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidwindow) | `.window()`               | 💣    |
| Close Window           | DELETE [/session/:sessionId/window](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidwindow) | `.close()`                | 💣    |
| *Set Window Size*      | POST [/session/:sessionId/window/:windowHandle/size](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidwindowwindowhandlesize) | `.windowHandleSize()`     | 💣    |
| *Get Window Size*      | GET [/session/:sessionId/window/:windowHandle/size](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidwindowwindowhandlesize) | `.windowHandleSize()`     | 💣    |
| *Set Window Position*  | POST [/session/:sessionId/window/:windowHandle/position](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidwindowwindowhandleposition) | `.windowHandlePosition()` | 💣    |
| *Get Window Position*  | GET [/session/:sessionId/window/:windowHandle/position](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidwindowwindowhandleposition) | `.windowHandlePosition()` | 💣    |
| Maximize Window        | POST [/session/:sessionId/window/:windowHandle/maximize](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidwindowwindowhandlemaximize) | `.windowMaximize()`       | 💣    |

Notes:

- Due to Javascript Limitaions, no window APIs will support.

### Cookies

| Command Name       | API Endpoint                             | wdio API          | Status      |
| ------------------ | ---------------------------------------- | ----------------- | ----------- |
| Get All Cookies    | GET [/session/:sessionId/cookie](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidcookie) | `.cookie()`       | 🕑           |
| Add Cookie         | POST [/session/:sessionId/cookie](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidcookie) | `.setCookie()`    | 🕑           |
| Delete Cookie      | DELETE [/session/:sessionId/cookie](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidcookie) | `.deleteCookie()` | 🕑           |
| Delete All Cookies | DELETE [/session/:sessionId/cookie/:name](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidcookiename) | `.deleteCookie()` | 🕑           |

Notes:

- Http-only cookies will fetched from http proxy.

### Elements

| Command Name       | API Endpoint                             | wdio API           | Status      |
| ------------------ | ---------------------------------------- | ------------------ | ----------- |
| Get Active Element | POST [/session/:sessionId/element/active](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementactive) | `.elementActive()` | 🕑           |
| *Is Elements Same* | GET [/session/:sessionId/element/:id/equals/:other](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidequals/:other) |                    | 🕑           |


### Element Retrieval

| Command Name               | API Endpoint                             | wdio API          | Status    |
| -------------------------- | ---------------------------------------- | ----------------- | --------- |
| Find Element               | POST [/session/:sessionId/element](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelement) | `.element()`      | ✅           |
| Find Elements              | POST [/session/:sessionId/elements](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelements) | `.elements()`     | ✅           |
| *Get Element By Id*        | GET [/session/:sessionId/element/:id](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementid) |                   | 💣     |
| Find Element From Element  | POST [/session/:sessionId/element/:id/element](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidelement) | `.$(foo).$(bar)`  | ✅           |
| Find Elements From Element | POST [/session/:sessionId/element/:id/elements](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidelements) | `.$(foo).$$(bar)` | ✅           |

Notes:

* Get element by id is a reserved api.

### Element Interaction

| Command Name      | API Endpoint                             | wdio API            | Status    |
| ----------------- | ---------------------------------------- | ------------------- | --------- |
| Element Click     | POST [/session/:sessionId/element/:id/click](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidclick) | `.elementIdClick()` | ✅           |
| Element Clear     | POST [/session/:sessionId/element/:id/clear](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidclear) | `.elementIdClear()` | ✅           |
| Element Send Keys | POST [/session/:sessionId/element/:id/value](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidvalue) | `.elementIdValue()` | ✅           |
| *Element Submit*  | POST [/session/:sessionId/element/:id/submit](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidsubmit) | `.submit()`         | ✅           |


### Element State

| Command Name                   | API Endpoint                             | wdio API                     | Status      |
| ------------------------------ | ---------------------------------------- | ---------------------------- | ----------- |
| Is Element Selected            | GET [/session/:sessionId/element/:id/selected](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidselected) | `.elementIdSelected()`       | 🕑           |
| Get Element Attribute          | GET [/session/:sessionId/element/:id/attribute/:name](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidattribute/:name) | `.elementIdAttribute()`      | ✅           |
| Get Element CSS Value          | GET [/session/:sessionId/element/:id/css/:propertyName](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidcss/:propertyName) | `.elementIdCssProperty()`    | ✅           |
| Get Element Text               | GET [/session/:sessionId/element/:id/text](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidtext) | `.elementIdText()`           | ✅           |
| Get Element Tag Name           | GET [/session/:sessionId/element/:id/name](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidname) | `.elementIdName()`           | 🕑           |
| *Get Element Size*             | GET [/session/:sessionId/element/:id/size](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidsize) | `.elementIdSize()`           | ✅           |
| Is Element Enabled             | GET [/session/:sessionId/element/:id/enabled](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidenabled) | `.elementIdEnabled()`        | 🕑           |
| *Is Element Displayed*         | GET [/session/:sessionId/element/:id/displayed](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementiddisplayed) | `.elementIdDisplayed()`      | ✅           |
| *Get Element Location*         | GET [/session/:sessionId/element/:id/location](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidlocation) | `.elementIdLocation()`       | ✅           |
| *Get Element Rect*             | GET /session/:sessionId/element/:id/rect | `.elementIdRect()`           | ✅           |
| *Get Element Location In View* | GET [/session/:sessionId/element/:id/location_in_view](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidlocation_in_view) | `.elementIdLocationInView()` | 🕑           |


### User Prompts

| Command Name    | API Endpoint                             | wdio API           | Status      |
| --------------- | ---------------------------------------- | ------------------ | ----------- |
| Dismiss Alert   | POST [/session/:sessionId/dismiss_alert](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessioniddismiss_alert) | `.alertDismiss()`  | 💣       |
| Accept Alert    | POST [/session/:sessionId/accept_alert](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidaccept_alert) | `.alertAccept()`   | 💣       |
| Get Alert Text  | GET [/session/:sessionId/alert_text](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidalert_text) | `.alertText()`     | 🕑           |
| Send Alert Text | POST [/session/:sessionId/alert_text](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidalert_text) | `.alertText(text)` | 💣       |


### Low-level Interactions

| Command Name                      | API Endpoint                             | wdio API            | Status      |
| --------------------------------- | ---------------------------------------- | ------------------- | ----------- |
| *Get Orientation*                 | GET [/session/:sessionId/orientation](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidorientation) | `.getOrientation()` | 🕑           |
| *Set Orientation*                 | POST [/session/:sessionId/orientation](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidorientation) | `.setOrientation()` | 💣       |
| *Move the Mouse*                  | POST [/session/:sessionId/moveto](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidmoveto) | `.moveTo()`         | 🕑           |
| *Click the Mouse Button*          | POST [/session/:sessionId/click](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidclick) | `.buttonPress()`    | 🕑           |
| *Click and Hold the Mouse Button* | POST [/session/:sessionId/buttondown](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidbuttondown) | `.buttonDown()`     | 🕑           |
| *Releases the Mouse Button*       | POST [/session/:sessionId/buttonup](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidbuttonup) | `.buttonUp()`       | 🕑           |
| *Double-click the Mouse Button*   | POST [/session/:sessionId/doubleclick](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessioniddoubleclick) | `.doDoubleClick()`  | 🕑           |
| *Tap the Screen*                  | POST [/session/:sessionId/touch/click](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtouchclick) | `.touchClick()`     | ✅           |
| *Finger Down*                     | POST [/session/:sessionId/touch/down](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtouchdown) | `.touchDown()`      | 🕑           |
| *Finger Up*                       | POST [/session/:sessionId/touch/up](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtouchup) | `.touchUp()`        | 🕑           |
| *Finger Move*                     | POST [session/:sessionId/touch/move](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtouchmove) | `.touchMove()`      | 🕑           |
| *Finger Scroll*                   | POST [session/:sessionId/touch/scroll](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtouchscroll) | `.touchScroll()`    | 🕑           |
| *Double Tap*                      | POST [session/:sessionId/touch/doubleclick](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtouchdoubleclick) |                     | 🕑           |
| *Long Tap*                        | POST [session/:sessionId/touch/longclick](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtouchlongclick) | `.touchLongClick()` | 🕑           |
| *Flick*                           | POST [session/:sessionId/touch/flick](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtouchflick) | `.touchFlick()`     | 🕑           |
| *Get Geo Location*                | GET [/session/:sessionId/location](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlocation) | `.getGeoLocation()` | 🕑           |
| *Set Geo Location*                | POST [/session/:sessionId/location](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlocation) | `.setGeoLocation()` | 👎      |

Notes:

- Touch and cliks will simulated via Javascript and may not work.
- Set geo locations are not possible when you are using real devices.

### Storages

| Command Name              | API Endpoint                             | wdio API                | Status      |
| ------------------------- | ---------------------------------------- | ----------------------- | ----------- |
| *Get Localstorage*        | GET [/session/:sessionId/local_storage](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlocal_storage) | `.localStorage()`       | 🕑           |
| *Set Localstorage*        | POST [/session/:sessionId/local_storage](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlocal_storage) | `.localStorage()`       | 🕑           |
| *Clear Localstorage*      | DELETE [/session/:sessionId/local_storage](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlocal_storage) | `.localStorage()`       | 🕑           |
| *Get Localstorage Item*   | GET [/session/:sessionId/local_storage/key/:key](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlocal_storagekeykey) | `.localStorage()`       | 🕑           |
| *Set Localstorage Item*   | DELETE [/session/:sessionId/local_storage/key/:key](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlocal_storagekeykey) | `.localStorage()`       | 🕑           |
| *Get Localstorage size*   | GET [/session/:sessionId/local_storage/size](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlocal_storagesize) | `.localStorageSize()`   | 🕑           |
| *Get Sessionstorage*      | GET [/session/:sessionId/session_storage](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidsession_storage) | `.sessionStorage()`     | 🕑           |
| *Set Sessionstorage*      | POST [/session/:sessionId/session_storage](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidsession_storage) | `.sessionStorage()`     | 🕑           |
| *Clear Sessionstorage*    | DELETE [/session/:sessionId/session_storage](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidsession_storage) | `.sessionStorage()`     | 🕑           |
| *Get Sessionstorage Item* | GET [/session/:sessionId/session_storage/key/:key](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidsession_storagekeykey) | `.sessionStorage()`     | 🕑           |
| *Set Sessionstorage Item* | DELETE [/session/:sessionId/session_storage/key/:key](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidsession_storagekeykey) | `.sessionStorage()`     | 🕑           |
| *Get Sessionstorage Size* | GET [/session/:sessionId/session_storage/size](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidsession_storagesize) | `.sessionStorageSize()` | 🕑           |

### Logs

| Command Name    | API Endpoint                             | wdio API      | Status      |
| --------------- | ---------------------------------------- | ------------- | ----------- |
| *Get Log*       | POST [/session/:sessionId/log](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlog) | `.log()`      | 🕑           |
| *Get Log Types* | GET [/session/:sessionId/log/types](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlogtypes) | `.logTypes()` | 🕑           |


### Application Cache

| Command Name                   | API Endpoint                             | wdio API                    | Status      |
| ------------------------------ | ---------------------------------------- | --------------------------- | ----------- |
| *Get Application Cache Status* | GET [/session/:sessionId/application_cache/status](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidapplication_cachestatus) | `.applicationCacheStatus()` | 🕑           |



[jsonwire]: https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol
[wdio]: http://webdriver.io
[selenium]: http://www.seleniumhq.org
[debug]: https://github.com/visionmedia/debug
[wd-w3c]: https://www.w3.org/TR/webdriver/
[conf]: https://github.com/web-driverify/web-driverify/blob/master/web-driverify.example.yaml
