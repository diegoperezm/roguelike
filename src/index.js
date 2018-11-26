const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

/*
  canvas 150x150 , tileSize 10

  0 : walkable
  1 : not walkable (a wall)
 */ 
var map = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,1,1,1,1,1,1,0,0,"M",0,1],
  [1,0,0,0,1,1,1,1,1,1,0,0,0,0,1],
  [1,0,0,0,0,0,"P",0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,1,1,1,0,0,1],
  [1,0,0,0,0,0,0,0,0,1,1,1,0,0,1],
  [1,1,1,1,1,1,1,1,0,0,1,1,0,0,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

let w = 150;
let h = 150;
let tileSize = 10;

/*
 list of objects  and his positions x y
 */

let state = [{
     "id": "player",
     "pos": {
       "x": 6,
       "y": 5
      },
      "width": 10,
      "height": 10
  },
  {
     "id": "monster",
     "pos": {
       "x": 2,
       "y": 12
      },
      "width": 10,
      "height": 10
   }
];

const objects = [
 {
   "id": "human",
   "parts": {
               "head": true,
               "arms": true,
               "legs": true
   },
   "HP": 10
 }
]; 

const actions = ["walk"];


const rules = [
   {
    "action": "walk",
    "what":  objects[0].parts.legs, // todo: check the object instance
    "condition": true,
    "operator": "=",
    "sideEffect": "move", 
   },
   {
    "action": "attack",
    "what":  [ objects[0].HP, 11],
    "condition": true,
    "operator": ">",
    "sideEffect": "attackEnemy" 
   },
];

/**
  Functions
 */

let move = (id, direction) => {
let x;
let y;
let indexId = state.findIndex( element => element.id===id );


switch (direction) {
  case "left":
   x = state[indexId].pos.x - 1;
   y = state[indexId].pos.y;
   break;

  case "up":
   x = state[indexId].pos.x;    
   y = state[indexId].pos.y - 1;
   break;


  case "right":
   x = state[indexId].pos.x + 1;
   y = state[indexId].pos.y;
   break;

  case "down":
   x = state[indexId].pos.x;    
   y = state[indexId].pos.y + 1;
   break;
}

 let newState = Object.assign({}, state[indexId], {"id": id, "pos": {"x": x , "y": y}}); 
 return newState;
};

let attackEnemy = () => { return 2;};

function INTERFACE(id, keyCode ) {
   let input = Object.assign({"id":id}, {"keyCode": keyCode}, {});
   INPUTHANDLER(input); 
 }

function INPUTHANDLER(inputObj) {

let input;
let id = inputObj.id;

 switch (inputObj.keyCode) {

  case 37:
    input = "left"; 
   break;
   
  case 38:
    input = "up";
   break;

  case 39:
   input = "right";
   break;

  case 40:
    input = "down";
   break;
  
} 

let event =   Object.assign({"id":id}, {"input":input}, {});
EVENTHANDLER(event); 
  }

// event { id: 'human', input: 'left||up||right||down' }
function EVENTHANDLER(event) {

 let newState = move(event.id,event.input);

  // collision detection
  if (map[newState.pos.y][newState.pos.x] === 0) {
    UPDATER(newState); // update state
  } else {
    console.log("collision detected");
  }


}


function UPDATER(newState) {

  let indexId = state.findIndex( element => element.id===newState.id);
  let prevState = state[indexId];
   
  map[prevState.pos.y][prevState.pos.x] = 0; // update map
  map[newState.pos.y][newState.pos.x] = "P";  // update map
   
  state[indexId] = newState;

  drawMap();

};



function drawMap (){
  ctx.clearRect(0, 0, w, h);
  let color;

  map.forEach(function(row,i){
    row.forEach(function(tile,j){

      if(tile !== 0){ //if tile is not walkable
      
      switch (tile) {

      // Player 
       case "P":
        color="rgba(255,0,0,1)";
       break;

      // Monster 
       case "M":
        color="rgba(0,0,255,1)";
       break;

      // Wall
       default:
        color=  "RGBA(200, 200, 200, 1)";
      }
       ctx.fillStyle = color;
       drawTile(j,i); //draw a rectangle at j,i
      }

    });
  });
}

function drawTile (x,y){
  ctx.fillRect(
    x * tileSize, y * tileSize,
    tileSize, tileSize
  );
}

function START() {
// LISTENER
 document.addEventListener("keydown", function(keyDown) {
   INTERFACE("player",keyDown.keyCode);
  });
  
 drawMap();
}

START();
