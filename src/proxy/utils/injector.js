import path from 'path';
import fs from 'fs';
import env from '../../utils/env.js';
import Debug from 'debug';

const wdPath = path.resolve(__dirname, './wd-in-client.js');
const rhead = /(<head[^>]*>)/;
const rbody = /(<body[^>]*>)/;
const rhtml = /(<html[^>]*>)/;

let debug = Debug('proxy:utils:injector');
let wdContent = fs.readFileSync(wdPath);

function contents(session) {
    if (env.name === 'development') {
        wdContent = fs.readFileSync(wdPath, 'utf8');
    }
    wdContent = injectSession(wdContent, session);
    return [wdContent];
}

function createScript(textArr) {
    var text = textArr.join(';\n');
    return `<script>${text}</script>`;
}

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

function injectSession(html, session) {
    var dto = session ? session.dto() : {};
    var str = JSON.stringify(dto);
    // wrap "" to be compatible with javascript syntax
    return html.replace('"{{session}}"', str);
}

function injectWdScripts(html, session) {
    var strs = contents(session);
    var script = createScript(strs);
    var result = injectScript(html, script);

    debug('script injected, before:', html.length, 'after:', result.length);
    return result;
}

export default { injectWdScripts };
