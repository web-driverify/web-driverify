function isMobile () {
  let ua = window.webDriverifySetDevice || navigator.userAgent
  return /Mobile|Android|BlackBerry/.test(ua)
}

export {isMobile}
