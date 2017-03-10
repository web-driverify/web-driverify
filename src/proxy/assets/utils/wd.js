function getWD () {
  if (typeof window !== 'undefined') {
    return window.webDriverify
  } else {
    return null
  }
}

export { getWD }
