const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('public/index.html', 'utf8');
const script = fs.readFileSync('public/main.js', 'utf8');

const dom = new JSDOM(html, { runScripts: "outside-only" });
try {
    dom.window.eval(script);
    console.log("SUCCESS");
} catch(e) {
    console.error("JS ERROR:", e);
}
