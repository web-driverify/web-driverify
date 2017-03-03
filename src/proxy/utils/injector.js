import Debug from 'debug';

const rhead = /(<head[^>]*>)/;
const rbody = /(<body[^>]*>)/;
const rhtml = /(<html[^>]*>)/;

let debug = Debug('wd:proxy:utils:injector');

let externalScripts = [
        // 3rd party libs
        'node_modules/es6-promise/dist/es6-promise.auto.min.js',
        'assets/html2canvas.js',

        // implementations
        'assets/session.js',
        'assets/element-retrieval.js',
        'assets/element-state.js',
        'assets/navigation.js',
        'assets/screen-capture.js',

        // driver
        'assets/driver.js'
    ]
    .map(src => `/web-driverify/${src}`)
    .map(src => `<script src="${src}"></script>`)
    .join('\n');

function injectScript(html, script) {
    if (rhead.exec(html)) {
        html = html.replace(rhead, "$1" + script);
    } else if (rbody.exec(html)) {
        html = html.replace(rbody, "$1" + script);
    } else if (rhtml.exec(html)) {
        html = html.replace(rhtml, "$1" + script);
    } else {
        html += script;
    }
    return html;
}

function initScript(session) {
    var dto = session ? session.dto() : {};
    var str = JSON.stringify(dto);
    var html = `window.webDriverify={session:${str}, handlers:{}, elements:{}}`;
    debug('injecting session:', str);
    return `<script>${html}</script>`;
}

function injectWdScripts(html, session) {
    html = injectScript(html, initScript(session) + externalScripts);
    return html;
}

export default { injectWdScripts };
