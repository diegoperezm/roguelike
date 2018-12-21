var test = require("tape");
const jsdom = require("jsdom");
const sinon = require("sinon");
const { JSDOM } = jsdom;
const dom = new JSDOM(`<!doctype html><html><head></head><body></body></html>`);
const document = dom.window.document;
const ArrowUp = new dom.window.KeyboardEvent("keydown", { keyCode: 38 });

const INTERFACE = sinon.spy();
const draw = sinon.spy();

dom.window.document.dispatchEvent(ArrowUp);

test("START test", function(t) {
  t.end();
});
