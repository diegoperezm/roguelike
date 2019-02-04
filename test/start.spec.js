var test = require("tape");
const jsdom = require("jsdom");
const sinon = require("sinon");
const { JSDOM } = jsdom;
const dom = new JSDOM(`<!doctype html><html><head></head><body></body></html>`);
const document = dom.window.document;
const ArrowUp = new dom.window.KeyboardEvent('keydown', {keyCode: 38});

const INTERFACE = sinon.spy(); 
const draw      = sinon.spy();

function start() {
  // LISTENER
  document.addEventListener("keydown", function(keyDown) {
    interface("player", keyDown.keyCode);
  });

  /* Add wall id to state.
     At the moment the walls are hardcoded (map) 
  */
  worldData.push(objects.wall);

  // Create monsters (no more than 12) 
  let monsters = createMonsters(8);

  // Add monsters to state
  monsters.forEach(function(elem) {
    worldData.push(elem);
  });

  // Add player to state
  worldData.push(objects.player);   

  // Add  player and monsters to map using state
  worldData.forEach(function(elem) {
    if (elem.id != 1) {
      map[elem.pos.y][elem.pos.x] = elem.id;
    }
  });

  drawMap();
  playerInfo();
  monsterInfoCreateDOM();
}

START();

dom.window.document.dispatchEvent(ArrowUp);



test("START test", function(t){
  t.plan(2);
  t.equal(INTERFACE.callCount, 1,"START() should call INTERFACE only once" );
  t.equal(draw.callCount, 1,"START() should call draw only once" );
  t.end();
});
