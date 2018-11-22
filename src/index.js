const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
/*
 list of objects  and his positions x y
 */

let state = {
     "id": "humanInstance",
     "pos": {
       "x": 6,
       "y": 5
      },
      "width": 10,
      "height": 10
  };
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

let move = ( id, direction) => {
let x;
let y;


switch (direction) {
  case "left":
   x = state.pos.x - 1;
   y = state.pos.y;
   break;

  case "up":
   x = state.pos.x;    
   y = state.pos.y - 1;
   break;


  case "right":
   x = state.pos.x + 1;
   y = state.pos.y;
   break;

  case "down":
   x = state.pos.x;    
   y = state.pos.y + 1;
   break;
}

 let newState = Object.assign({}, state, {"pos": {"x": x , "y": y}}); 

 return newState;
};
let attackEnemy = () => { return 2;};
 /* 
       id , action => input { id: id , action: action}
  */

function INTERFACE(id, keyCode ) {
   let input = Object.assign({"id":id}, {"keyCode": keyCode}, {});
   INPUTHANDLER(input); 
 }
  /*
    input  = event
  */

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
/*
  let rule = 'walk'; 
  let fnName = rules[0].sideEffect;
  let what = rules[0].what;
  let condition = rules[0].condition;
  let input = event;
*/
  let newState = move({},event.input);

  // collision detection
  if (map[newState.pos.y][newState.pos.x] === 0) {
    UPDATER(newState); // update state
  } else {
    console.log("collision detected");
  }


}

function UPDATER(newState) {
 let prevState = state;

  map[prevState.pos.y][prevState.pos.x] = 0; // update map
  map[newState.pos.y][newState.pos.x] = 1;  // update map
   
  state = newState;

  draw();

};


function START() {
// LISTENER
 document.addEventListener("keydown", function(keyDown) {
   INTERFACE("human",keyDown.keyCode);
  });
  
// Draw map
 draw();
}

let w = 150;
let h = 150;
let tileSize = 10;


/*
  0 : walkable
  1 : not walkable (a wall)
 */ 
// canvas 150x150 , tileSize 10
var map = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,1,1,1,1,1,1,0,0,0,0,1],
  [1,0,0,0,1,1,1,1,1,1,0,0,0,0,1],
  [1,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
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

  
function draw (){
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "rgba(255,0,0,0.6)";

  map.forEach(function(row,i){
    row.forEach(function(tile,j){
      if(tile !== 0){ //if tile is not walkable
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

START();

//INTERFACE("human" ,  "walk");
