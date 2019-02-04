function attackEnemy (id,x,y) { 

 let playerIndex =  worldData.findIndex(elem => elem.id === id); 
 let player = worldData[playerIndex];
 let playerHP =  player.HP;

 let monsterIndex = worldData.findIndex(elem => elem.pos.x === x &&  elem.pos.y === y); 
 let monster = worldData[monsterIndex];
 let monsterHP = monster.HP;

 playerHP  -= 1; 
 monsterHP -= 1;

 let newStatePlayer =   Object.assign({}, player, {"HP": playerHP}); 

 let newStateMonster =  Object.assign({}, monster,{"HP": monsterHP});

 return [newStatePlayer,newStateMonster];

 }; 
var test = require("tape");

test("attackEnemy test", function(t){
    t.plan(1);
    t.equal(typeof attackEnemy(),"number","attackEnemy() should return a number." );
    t.end();
});
