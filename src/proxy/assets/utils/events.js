function ClickEvent () {
  if (typeof window.MouseEvent === 'function') {
    console.log('MouseEvent constructor supported')
    return new window.MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': false
    })
  } else {
    console.log('MouseEvent constructor not supported, using createEvent')
    let clickEvent = document.createEvent('MouseEvent')
    clickEvent.initEvent('click', true, false)
    return clickEvent
  }
}

export { ClickEvent }
