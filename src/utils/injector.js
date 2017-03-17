const rhead = /(<head[^>]*>)/
const rbody = /(<body[^>]*>)/
const rhtml = /(<html[^>]*>)/

let externalScripts = '<script src="/web-driverify/assets/index.bundle.js"></script>'

function injectScript (html, script) {
  if (rhead.exec(html)) {
    html = html.replace(rhead, '$1' + script)
  } else if (rbody.exec(html)) {
    html = html.replace(rbody, '$1' + script)
  } else if (rhtml.exec(html)) {
    html = html.replace(rhtml, '$1' + script)
  } else {
    html += script
  }
  return html
}

function injectWdScripts (html) {
  return injectScript(html, externalScripts)
}

export { injectWdScripts, injectScript }
