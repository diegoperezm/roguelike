const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
/*
 list of objects  and his positions x y
 */

let state = {
     "id": "humanInstance",
     "pos": {
       "x": 60,
       "y": 50
      },
      "width": 20,
      "height": 20
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
    "sideEffect": "xPlusOne", 
   },
   {
    "action": "attack",
    "what":  [ objects[0].HP, 11],
    "condition": true,
    "operator": ">",
    "sideEffect": "attackEnemy" 
   },
];

let xPlusOne = (a,b) =>  {
 let  newState = Object
                       .assign(
                        {},
                        state,
                         {"pos": {"x": state.pos.x + 1, "y": state.pos.y}} 
  ); 
state = newState;
console.log('xplusone',state);
};
let attackEnemy = () => { return 2;};
 /* 
       id , action => input { id: id , action: action}
  */
function INTERFACE(id, action ) {
   let input = Object.assign({"id":id}, {"action":action}, {});
   INPUTHANDLER(input); 
 }
  /*
    input  = event
  */

  function INPUTHANDLER(input) {
    let event = input; 
//  console.log('inputhandler => event', event); 
    EVENTHANDLER(event); 
  }
function EVENTHANDLER(event) {

// event { id: 'human', action: 'walk' }

 let rule          =   rules.filter(el => el.action === event.action);
 let fnName        =   rule[0].sideEffect; 
 let what          =   rule[0].what; 
 let condition     =   rule[0].condition; 

// update  state 
 eval(`${fnName}(${what},${condition})`); 

// update frame
 UPDATER();

// console.log(state);
}

function UPDATER() {

ctx.clearRect(0,0, 150,150);
ctx.strokeRect(state.pos.x,
               state.pos.y,
               state.width,
               state.height);
};



INTERFACE("human" ,  "walk");
