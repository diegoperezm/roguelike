let attackEnemy = () => { return 2;}; 
var test = require("tape");

test("attackEnemy test", function(t){
    t.plan(1);
    t.equal(typeof attackEnemy(),"number","attackEnemy() should return a number." );
    t.end();
});
