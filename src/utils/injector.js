const rhead = /(<head[^>]*>)/
const rbody = /(<body[^>]*>)/
const rhtml = /(<html[^>]*>)/

let externalScripts = [
  'assets/index.bundle.js',
  'node_modules/html2canvas/dist/html2canvas.min.js'
]
    .map(src => '/web-driverify/' + src)
    .map(src => `<script src="${src}"></script>`)
    .join('\n')

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
  let initScript = `<script>window.webDriverify={handlers:{}, elements:{}}</script>`
  return injectScript(html, initScript + externalScripts)
}

export { injectWdScripts, injectScript }
