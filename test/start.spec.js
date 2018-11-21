var test = require("tape");
const jsdom = require("jsdom");
const sinon = require("sinon");
const { JSDOM } = jsdom;
const dom = new JSDOM(`<!doctype html><html><head></head><body></body></html>`);
const document = dom.window.document;
const ArrowUp = new dom.window.KeyboardEvent('keydown', {keyCode: 38});

const INTERFACE = sinon.spy(); 
const draw      = sinon.spy();

function START() {
// LISTENER
 document.addEventListener("keydown", function(keyDown) {
   INTERFACE(keyDown.keyCode);
  });
  
// Draw map
 draw();
}

START();

dom.window.document.dispatchEvent(ArrowUp);



test("START test", function(t){
  t.plan(3);
  t.equal(INTERFACE.callCount, 1,"START() should call INTERFACE only once" );
  t.equal(INTERFACE.calledWith(38), true, "START() should call INTERFACE with argument 38" );
  t.equal(draw.callCount, 1,"START() should call draw only once" );
  t.end();
});
