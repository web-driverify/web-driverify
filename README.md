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
wd          # equivalent to web-driverify
wd-phantom  # equivalent to web-driverify-phantom
```

`wd-phantom` will attach a phantomjs (one of the brilliant headless browsers) instance automatically everytime NewSession requested.

## ENV variables

* `WD_PORT`: Port for the WebDriver Protocol, test runners like [webdriver.io][wdio] should connect to this port. Default: `8089`
* `PROXY_PORT`: Port for the browser proxy. Default: `8088`
* `DEBUG`: Used by [debug][debug] utility. To enable web-driverify debug, set `DEBUG=wd:*`
* `WD_CONFIG`: config yml file

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

Due to limitaions of Javascript, we can't do the same things as selenium.

## Implementation Status

APIs are categorized as [WebDriver W3C Working Draft][wd-w3c].

### Sessions


| Command Name                   | API Endpoint                             | wdio API                  | Progress    |
| ------------------------------ | ---------------------------------------- | ------------------------- | ----------- |
| Status                         | GET [/status](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#status) | `.status()`               | Not Started |
| New Session                    | POST [/session](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#session) | `.session()`              | Completed   |
| *Get Active Sessions*          | GET [/sessions](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessions) | `.sessions()`             | Not Started |
| *Get Session*                  | GET [/session/:sessionId](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionid) | `.session(id)`            | Not Started |
| Delete Session                 | DELETE [/session/:sessionId](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionid) | `.session('delete')`      | Completed   |
| Set Timeouts                   | POST [/session/:sessionId/timeouts](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtimeouts) | `.timeouts()`             | Not Started |
| *Set Timeout for Async Script* | POST [/session/:sessionId/timeouts/async_script](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtimeoutsasync_script) | `.timeoutsAsyncScript()`  | Completed   |
| *Set Timout for Implicit Wait* | POST [/session/:sessionId/timeouts/implicit_wait](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtimeoutsimplicit_wait) | `.timeoutsImplicitWait()` | Not Started |


### Navigation

| Command Name    | API Endpoint                             | wdio API     | Progress    |
| --------------- | ---------------------------------------- | ------------ | ----------- |
| Go              | POST [/session/:sessionId/url](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidurl) | `.url()`     | Completed   |
| Get Current URL | GET [/session/:sessionId/url](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidurl) | `.getUrl()`  | Completed   |
| Back            | POST [/session/:sessionId/back](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidback) | `.back()`    | In Progress |
| Forward         | POST [/session/:sessionId/forward](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidforward) | `.forward()` | Completed   |
| Refresh         | POST [/session/:sessionId/refresh](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidrefresh) | `.refresh()` | Completed   |
| Get Title       | GET [/session/:sessionId/title](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtitle) | `.title()`   | Completed   |


### Document Handling

| Command Name          | API Endpoint                             | wdio API          | Progress    |
| --------------------- | ---------------------------------------- | ----------------- | ----------- |
| Getting Page Source   | GET [/session/:sessionId/source](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidsource) | `.source()`       | Not Started |
| Execute Script        | POST [/session/:sessionId/execute](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidexecute) | `.execute()`      | Completed   |
| Excecute Async Script | POST [/session/:sessionId/execute_async](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidexecute_async) | `.executeAsync()` | Not Started |


### Screen Capture


| Command Name    | API Endpoint                             | wdio API        | Progress  |
| --------------- | ---------------------------------------- | --------------- | --------- |
| Take Screenshot | GET [/session/:sessionId/screenshot](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidscreenshot) | `.screenshot()` | Completed |

Notes:

- Screenshots are taken by [html2cavans](https://html2canvas.hertzen.com/), which may difference with real web page.

### Input Sources

| Command Name            | API Endpoint                             | wdio API                 | Progress |
| ----------------------- | ---------------------------------------- | ------------------------ | -------- |
| *Get Available Engines* | GET [/session/:sessionId/ime/available_engines](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidimeavailable_engines) | `.imeAvailableEngines()` | Never    |
| *Get Active Engine*     | GET [/session/:sessionId/ime/active_engine](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidimeactive_engine) | ` .imeActiveEngine()`    | Never    |
| *Is IME Activated*      | GET [/session/:sessionId/ime/activated](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidimeactivated) | `.imeActivated()`        | Never    |
| *Deactivate IME*        | POST [/session/:sessionId/ime/deactivate](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidimedeactivate) | `.imeDeactivate()`       | Never    |
| *Activate IME*          | POST [/session/:sessionId/ime/activate](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidimeactivate) | `.imeActivate()`         | Never    |

Notes:

* Due to Javascript Limitaions, no input sources APIs will support.

### Command Contexts

| Command Name           | API Endpoint                             | wdio API                  | Progress |
| ---------------------- | ---------------------------------------- | ------------------------- | -------- |
| Get Window Handle      | GET [/session/:sessionId/window_handle](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidwindow_handle) | `.window()`               | Never    |
| Get Window Handles     | GET [/session/:sessionId/window_handles](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidwindow_handles) | `.windowHandles()`        | Never    |
| Switch To Frame        | POST [/session/:sessionId/frame](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidframe) | `.frame()`                | Never    |
| Switch To Parent Frame | POST [/session/:sessionId/frame/parent](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidframeparent) | `.frameParent()`          | Never    |
| Switch To Window       | POST [/session/:sessionId/window](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidwindow) | `.window()`               | Never    |
| Close Window           | DELETE [/session/:sessionId/window](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidwindow) | `.close()`                | Never    |
| *Set Window Size*      | POST [/session/:sessionId/window/:windowHandle/size](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidwindowwindowhandlesize) | `.windowHandleSize()`     | Never    |
| *Get Window Size*      | GET [/session/:sessionId/window/:windowHandle/size](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidwindowwindowhandlesize) | `.windowHandleSize()`     | Never    |
| *Set Window Position*  | POST [/session/:sessionId/window/:windowHandle/position](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidwindowwindowhandleposition) | `.windowHandlePosition()` | Never    |
| *Get Window Position*  | GET [/session/:sessionId/window/:windowHandle/position](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidwindowwindowhandleposition) | `.windowHandlePosition()` | Never    |
| Maximize Window        | POST [/session/:sessionId/window/:windowHandle/maximize](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidwindowwindowhandlemaximize) | `.windowMaximize()`       | Never    |

Notes:

- Due to Javascript Limitaions, no window APIs will support.

### Cookies

| Command Name       | API Endpoint                             | wdio API          | Progress    |
| ------------------ | ---------------------------------------- | ----------------- | ----------- |
| Get All Cookies    | GET [/session/:sessionId/cookie](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidcookie) | `.cookie()`       | Not Started |
| Add Cookie         | POST [/session/:sessionId/cookie](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidcookie) | `.setCookie()`    | Not Started |
| Delete Cookie      | DELETE [/session/:sessionId/cookie](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidcookie) | `.deleteCookie()` | Not Started |
| Delete All Cookies | DELETE [/session/:sessionId/cookie/:name](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidcookiename) | `.deleteCookie()` | Not Started |

Notes:

- Http-only cookies will fetched from http proxy.

### Elements

| Command Name       | API Endpoint                             | wdio API           | Progress    |
| ------------------ | ---------------------------------------- | ------------------ | ----------- |
| Get Active Element | POST [/session/:sessionId/element/active](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementactive) | `.elementActive()` | Not Started |
| *Is Elements Same* | GET [/session/:sessionId/element/:id/equals/:other](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidequals/:other) |                    | Not Started |


### Element Retrieval

| Command Name               | API Endpoint                             | wdio API          | Progress  |
| -------------------------- | ---------------------------------------- | ----------------- | --------- |
| Find Element               | POST [/session/:sessionId/element](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelement) | `.element()`      | Completed |
| Find Elements              | POST [/session/:sessionId/elements](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelements) | `.elements()`     | Completed |
| *Get Element By Id*        | GET [/session/:sessionId/element/:id](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementid) |                   | Never     |
| Find Element From Element  | POST [/session/:sessionId/element/:id/element](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidelement) | `.$(foo).$(bar)`  | Completed |
| Find Elements From Element | POST [/session/:sessionId/element/:id/elements](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidelements) | `.$(foo).$$(bar)` | Completed |

Notes:

* Get element by id is a reserved api.

### Element Interaction

| Command Name      | API Endpoint                             | wdio API            | Progress  |
| ----------------- | ---------------------------------------- | ------------------- | --------- |
| Element Click     | POST [/session/:sessionId/element/:id/click](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidclick) | `.elementIdClick()` | Completed |
| Element Clear     | POST [/session/:sessionId/element/:id/clear](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidclear) | `.elementIdClear()` | Completed |
| Element Send Keys | POST [/session/:sessionId/element/:id/value](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidvalue) | `.elementIdValue()` | Completed |
| *Element Submit*  | POST [/session/:sessionId/element/:id/submit](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidsubmit) | `.submit()`         | Completed |


### Element State

| Command Name                   | API Endpoint                             | wdio API                     | Progress    |
| ------------------------------ | ---------------------------------------- | ---------------------------- | ----------- |
| Is Element Selected            | GET [/session/:sessionId/element/:id/selected](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidselected) | `.elementIdSelected()`       | Not Started |
| Get Element Attribute          | GET [/session/:sessionId/element/:id/attribute/:name](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidattribute/:name) | `.elementIdAttribute()`      | Completed   |
| Get Element CSS Value          | GET [/session/:sessionId/element/:id/css/:propertyName](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidcss/:propertyName) | `.elementIdCssProperty()`    | Not Started |
| Get Element Text               | GET [/session/:sessionId/element/:id/text](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidtext) | `.elementIdText()`           | Completed   |
| Get Element Tag Name           | GET [/session/:sessionId/element/:id/name](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidname) | `.elementIdName()`           | Not Started |
| *Get Element Size*             | GET [/session/:sessionId/element/:id/size](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidsize) | `.elementIdSize()`           | Completed   |
| Is Element Enabled             | GET [/session/:sessionId/element/:id/enabled](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidenabled) | `.elementIdEnabled()`        | Not Started |
| *Is Element Displayed*         | GET [/session/:sessionId/element/:id/displayed](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementiddisplayed) | `.elementIdDisplayed()`      | Completed   |
| *Get Element Location*         | GET [/session/:sessionId/element/:id/location](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidlocation) | `.elementIdLocation()`       | Completed   |
| *Get Element Rect*             | GET /session/:sessionId/element/:id/rect | `.elementIdRect()`           | Completed   |
| *Get Element Location In View* | GET [/session/:sessionId/element/:id/location_in_view](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidelementidlocation_in_view) | `.elementIdLocationInView()` | Not Started |


### User Prompts

| Command Name    | API Endpoint                             | wdio API           | Progress    |
| --------------- | ---------------------------------------- | ------------------ | ----------- |
| Dismiss Alert   | POST [/session/:sessionId/dismiss_alert](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessioniddismiss_alert) | `.alertDismiss()`  | Never       |
| Accept Alert    | POST [/session/:sessionId/accept_alert](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidaccept_alert) | `.alertAccept()`   | Never       |
| Get Alert Text  | GET [/session/:sessionId/alert_text](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidalert_text) | `.alertText()`     | Not Started |
| Send Alert Text | POST [/session/:sessionId/alert_text](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidalert_text) | `.alertText(text)` | Never       |


### Low-level Interactions

| Command Name                      | API Endpoint                             | wdio API            | Progress    |
| --------------------------------- | ---------------------------------------- | ------------------- | ----------- |
| *Get Orientation*                 | GET [/session/:sessionId/orientation](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidorientation) | `.getOrientation()` | Not Started |
| *Set Orientation*                 | POST [/session/:sessionId/orientation](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidorientation) | `.setOrientation()` | Never       |
| *Move the Mouse*                  | POST [/session/:sessionId/moveto](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidmoveto) | `.moveTo()`         | Not Started |
| *Click the Mouse Button*          | POST [/session/:sessionId/click](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidclick) | `.buttonPress()`    | Not Started |
| *Click and Hold the Mouse Button* | POST [/session/:sessionId/buttondown](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidbuttondown) | `.buttonDown()`     | Not Started |
| *Releases the Mouse Button*       | POST [/session/:sessionId/buttonup](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidbuttonup) | `.buttonUp()`       | Not Started |
| *Double-click the Mouse Button*   | POST [/session/:sessionId/doubleclick](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessioniddoubleclick) | `.doDoubleClick()`  | Not Started |
| *Tap the Screen*                  | POST [/session/:sessionId/touch/click](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtouchclick) | `.touchClick()`     | Completed   |
| *Finger Down*                     | POST [/session/:sessionId/touch/down](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtouchdown) | `.touchDown()`      | Not Started |
| *Finger Up*                       | POST [/session/:sessionId/touch/up](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtouchup) | `.touchUp()`        | Not Started |
| *Finger Move*                     | POST [session/:sessionId/touch/move](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtouchmove) | `.touchMove()`      | Not Started |
| *Finger Scroll*                   | POST [session/:sessionId/touch/scroll](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtouchscroll) | `.touchScroll()`    | Not Started |
| *Double Tap*                      | POST [session/:sessionId/touch/doubleclick](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtouchdoubleclick) |                     | Not Started |
| *Long Tap*                        | POST [session/:sessionId/touch/longclick](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtouchlongclick) | `.touchLongClick()` | Not Started |
| *Flick*                           | POST [session/:sessionId/touch/flick](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidtouchflick) | `.touchFlick()`     | Not Started |
| *Get Geo Location*                | GET [/session/:sessionId/location](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlocation) | `.getGeoLocation()` | Not Started |
| *Set Geo Location*                | POST [/session/:sessionId/location](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlocation) | `.setGeoLocation()` | Never       |

Notes:

- Touch and cliks will simulated via Javascript and may not work.
- Set geo locations are not possible when you are using real devices.

### Storages

| Command Name              | API Endpoint                             | wdio API                | Progress    |
| ------------------------- | ---------------------------------------- | ----------------------- | ----------- |
| *Get Localstorage*        | GET [/session/:sessionId/local_storage](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlocal_storage) | `.localStorage()`       | Not Started |
| *Set Localstorage*        | POST [/session/:sessionId/local_storage](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlocal_storage) | `.localStorage()`       | Not Started |
| *Clear Localstorage*      | DELETE [/session/:sessionId/local_storage](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlocal_storage) | `.localStorage()`       | Not Started |
| *Get Localstorage Item*   | GET [/session/:sessionId/local_storage/key/:key](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlocal_storagekeykey) | `.localStorage()`       | Not Started |
| *Set Localstorage Item*   | DELETE [/session/:sessionId/local_storage/key/:key](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlocal_storagekeykey) | `.localStorage()`       | Not Started |
| *Get Localstorage size*   | GET [/session/:sessionId/local_storage/size](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlocal_storagesize) | `.localStorageSize()`   | Not Started |
| *Get Sessionstorage*      | GET [/session/:sessionId/session_storage](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidsession_storage) | `.sessionStorage()`     | Not Started |
| *Set Sessionstorage*      | POST [/session/:sessionId/session_storage](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidsession_storage) | `.sessionStorage()`     | Not Started |
| *Clear Sessionstorage*    | DELETE [/session/:sessionId/session_storage](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidsession_storage) | `.sessionStorage()`     | Not Started |
| *Get Sessionstorage Item* | GET [/session/:sessionId/session_storage/key/:key](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidsession_storagekeykey) | `.sessionStorage()`     | Not Started |
| *Set Sessionstorage Item* | DELETE [/session/:sessionId/session_storage/key/:key](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidsession_storagekeykey) | `.sessionStorage()`     | Not Started |
| *Get Sessionstorage Size* | GET [/session/:sessionId/session_storage/size](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidsession_storagesize) | `.sessionStorageSize()` | Not Started |

### Logs

| Command Name    | API Endpoint                             | wdio API      | Progress    |
| --------------- | ---------------------------------------- | ------------- | ----------- |
| *Get Log*       | POST [/session/:sessionId/log](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlog) | `.log()`      | Not Started |
| *Get Log Types* | GET [/session/:sessionId/log/types](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlogtypes) | `.logTypes()` | Not Started |


### Application Cache

| Command Name                   | API Endpoint                             | wdio API                    | Progress    |
| ------------------------------ | ---------------------------------------- | --------------------------- | ----------- |
| *Get Application Cache Status* | GET [/session/:sessionId/application_cache/status](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidapplication_cachestatus) | `.applicationCacheStatus()` | Not Started |



[jsonwire]: https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol
[wdio]: http://webdriver.io
[selenium]: http://www.seleniumhq.org
[debug]: https://github.com/visionmedia/debug

[wd-w3c]: https://www.w3.org/TR/webdriver/
