/*
 * Categories refering to: https://www.w3.org/TR/webdriver
 */

export * from './session/new-session.js'
export * from './session/delete-session.js'

export * from './navigation/go.js'
export * from './navigation/back.js'
export * from './navigation/refresh.js'
export * from './navigation/forward.js'
export * from './navigation/get-current-url.js'
export * from './navigation/get-title.js'

export * from './element-retrieval/find-element.js'
export * from './element-retrieval/find-elements.js'

export * from './element-state/get-element-text.js'
export * from './element-state/get-element-attribute.js'
export * from './element-state/get-element-rect.js'
export * from './element-state/get-element-size.js'
export * from './element-state/get-element-location.js'
export * from './element-state/get-element-displayed.js'

export * from './element-interaction/element-click.js'
export * from './element-interaction/element-clear.js'
export * from './element-interaction/element-send-keys.js'
export * from './element-interaction/element-submit.js'

export * from './document-handling/execute-script.js'

export * from './actions/touch-click.js'

export * from './screen-capture/screenshot.js'
