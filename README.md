# web-driverify

This is a common webdriver for any browser to provide Web Driver interface.
Especially useful for browsers that does NOT support Web Driver API.

Web-driverify supports most of the Web Driver Commands,
and can work without browser-specific binaries.

## Differences with Selenium

The data format could be different. 
Web-driverify is compliant with the Web Driver Protocol,
while certain Selemium versions use the JSON wire protocol,
see: https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol

The representation of result status could be different.
JSON wire protocol uses `status` property of the response JSON body,
while web-driverify (as in Web Driver protocol) uses HTTP response status code.

Web-driverify cannot launch your browser,
you need setup the proxy to Web-driverify server, and initiate the session.

## Implementation Status

Method | URI Template | Command | Status
--- | --- | --- | ---
POST | `/session` | [New Session](https://www.w3.org/TR/webdriver/#dfn-new-session) | Ready
DELETE | `/session/{session id}` | [Delete Session](https://www.w3.org/TR/webdriver/#dfn-delete-session) | Not Implemented
GET | `/status` | [Status](https://www.w3.org/TR/webdriver/#dfn-status) | Not Implemented
GET | `/session/{session id}/timeouts` | [Get Timeouts](https://www.w3.org/TR/webdriver/#dfn-get-timeouts) | Not Implemented
POST | `/session/{session id}/timeouts` | [Set Timeouts](https://www.w3.org/TR/webdriver/#dfn-set-timeouts) | Not Implemented
POST | `/session/{session id}/url` | [Go](https://www.w3.org/TR/webdriver/#dfn-go) | Not Implemented
GET | `/session/{session id}/url` | [Get Current URL](https://www.w3.org/TR/webdriver/#dfn-get-current-url) | Not Implemented
POST | `/session/{session id}/back` | [Back](https://www.w3.org/TR/webdriver/#dfn-back) | Not Implemented
POST | `/session/{session id}/forward` | [Forward](https://www.w3.org/TR/webdriver/#dfn-forward) | Not Implemented
POST | `/session/{session id}/refresh` | [Refresh](https://www.w3.org/TR/webdriver/#dfn-refresh) | Not Implemented
GET | `/session/{session id}/title` | [Get Title](https://www.w3.org/TR/webdriver/#dfn-get-title) | Not Implemented
GET | `/session/{session id}/window` | [Get Window Handle](https://www.w3.org/TR/webdriver/#dfn-get-window-handle) | Not Implemented
DELETE | `/session/{session id}/window` | [Close Window](https://www.w3.org/TR/webdriver/#dfn-close-window) | Not Implemented
POST | `/session/{session id}/window` | [Switch To Window](https://www.w3.org/TR/webdriver/#dfn-switch-to-window) | Not Implemented
GET | `/session/{session id}/window/handles` | [Get Window Handles](https://www.w3.org/TR/webdriver/#dfn-get-window-handles) | Not Implemented
POST | `/session/{session id}/frame` | [Switch To Frame](https://www.w3.org/TR/webdriver/#dfn-switch-to-frame) | Not Implemented
POST | `/session/{session id}/frame/parent` | [Switch To Parent Frame](https://www.w3.org/TR/webdriver/#dfn-switch-to-parent-frame) | Not Implemented
GET | `/session/{session id}/window/rect` | [Get Window Rect](https://www.w3.org/TR/webdriver/#dfn-get-window-rect) | Not Implemented
POST | `/session/{session id}/window/rect` | [Set Window Rect](https://www.w3.org/TR/webdriver/#dfn-set-window-rect) | Not Implemented
POST | `/session/{session id}/window/maximize` | [Maximize Window](https://www.w3.org/TR/webdriver/#dfn-maximize-window) | Not Implemented
POST | `/session/{session id}/window/minimize` | [Minimize Window](https://www.w3.org/TR/webdriver/#dfn-minimize-window) | Not Implemented
POST | `/session/{session id}/window/fullscreen` | [Fullscreen Window](https://www.w3.org/TR/webdriver/#dfn-fullscreen-window) | Not Implemented
GET | `/session/{session id}/element/active` | [Get Active Element](https://www.w3.org/TR/webdriver/#dfn-get-active-element) | Not Implemented
POST | `/session/{session id}/element` | [Find Element](https://www.w3.org/TR/webdriver/#dfn-find-element) | Not Implemented
POST | `/session/{session id}/elements` | [Find Elements](https://www.w3.org/TR/webdriver/#dfn-find-elements) | Not Implemented
POST | `/session/{session id}/element/{element id}/element` | [Find Element From Element](https://www.w3.org/TR/webdriver/#dfn-find-element-from-element) | Not Implemented
POST | `/session/{session id}/element/{element id}/elements` | [Find Elements From Element](https://www.w3.org/TR/webdriver/#dfn-find-elements-from-element) | Not Implemented
GET | `/session/{session id}/element/{element id}/selected` | [Is Element Selected](https://www.w3.org/TR/webdriver/#dfn-is-element-selected) | Not Implemented
GET | `/session/{session id}/element/{element id}/attribute/{name}` | [Get Element Attribute](https://www.w3.org/TR/webdriver/#dfn-get-element-attribute) | Not Implemented
GET | `/session/{session id}/element/{element id}/property/{name}` | [Get Element Property](https://www.w3.org/TR/webdriver/#dfn-get-element-property) | Not Implemented
GET | `/session/{session id}/element/{element id}/css/{property name}` | [Get Element CSS Value](https://www.w3.org/TR/webdriver/#dfn-get-element-css-value) | Not Implemented
GET | `/session/{session id}/element/{element id}/text` | [Get Element Text](https://www.w3.org/TR/webdriver/#dfn-get-element-text) | Not Implemented
GET | `/session/{session id}/element/{element id}/name` | [Get Element Tag Name](https://www.w3.org/TR/webdriver/#dfn-get-element-tag-name) | Not Implemented
GET | `/session/{session id}/element/{element id}/rect` | [Get Element Rect](https://www.w3.org/TR/webdriver/#dfn-get-element-rect) | Not Implemented
GET | `/session/{session id}/element/{element id}/enabled` | [Is Element Enabled](https://www.w3.org/TR/webdriver/#dfn-is-element-enabled) | Not Implemented
POST | `/session/{session id}/element/{element id}/click` | [Element Click](https://www.w3.org/TR/webdriver/#dfn-element-click) | Not Implemented
POST | `/session/{session id}/element/{element id}/clear` | [Element Clear](https://www.w3.org/TR/webdriver/#dfn-element-clear) | Not Implemented
POST | `/session/{session id}/element/{element id}/value` | [Element Send Keys](https://www.w3.org/TR/webdriver/#dfn-element-send-keys) | Not Implemented
GET | `/session/{session id}/source` | [Get Page Source](https://www.w3.org/TR/webdriver/#dfn-get-page-source) | Not Implemented
POST | `/session/{session id}/execute/sync` | [Execute Script](https://www.w3.org/TR/webdriver/#dfn-execute-script) | Not Implemented
POST | `/session/{session id}/execute/async` | [Execute Async Script](https://www.w3.org/TR/webdriver/#dfn-execute-async-script) | Not Implemented
GET | `/session/{session id}/cookie` | [Get All Cookies](https://www.w3.org/TR/webdriver/#dfn-get-all-cookies) | Not Implemented
GET | `/session/{session id}/cookie/{name}` | [Get Named Cookie](https://www.w3.org/TR/webdriver/#dfn-get-named-cookie) | Not Implemented
POST | `/session/{session id}/cookie` | [Add Cookie](https://www.w3.org/TR/webdriver/#dfn-add-cookie) | Not Implemented
DELETE | `/session/{session id}/cookie/{name}` | [Delete Cookie](https://www.w3.org/TR/webdriver/#dfn-delete-cookie) | Not Implemented
DELETE | `/session/{session id)/cookie` | [Delete All Cookies](https://www.w3.org/TR/webdriver/#dfn-delete-all-cookies) | Not Implemented
POST | `/session/{session id}/actions` | [Perform Actions](https://www.w3.org/TR/webdriver/#dfn-perform-implementation-specific-action-dispatch-steps) | Not Implemented
DELETE | `/session/{session id}/actions` | [Release Actions](https://www.w3.org/TR/webdriver/#dfn-release-actions) | Not Implemented
POST | `/session/{session id}/alert/dismiss` | [Dismiss Alert](https://www.w3.org/TR/webdriver/#dfn-dismiss-alert) | Not Implemented
POST | `/session/{session id}/alert/accept` | [Accept Alert](https://www.w3.org/TR/webdriver/#dfn-accept-alert) | Not Implemented
GET | `/session/{session id}/alert/text` | [Get Alert Text](https://www.w3.org/TR/webdriver/#dfn-get-alert-text) | Not Implemented
POST | `/session/{session id}/alert/text` | [Send Alert Text](https://www.w3.org/TR/webdriver/#dfn-send-alert-text) | Not Implemented
GET | `/session/{session id}/screenshot` | [Take Screenshot](https://www.w3.org/TR/webdriver/#dfn-take-screenshot) | Not Implemented
GET | `/session/{session id}/element/{element id}/screenshot` | [Take Element Screenshot](https://www.w3.org/TR/webdriver/#dfn-take-element-screenshot) | Not Implemented
See for the full list of endpoints: https://www.w3.org/TR/webdriver/#list-of-endpoints

