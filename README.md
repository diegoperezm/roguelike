- [GRAPH](#orgf197901)
- [GRAPH EXPLANATION](#org934b1d0)
  - [GLOBAL:](#org069ba34)
  - [PROGRAM](#orgd3602d8)
  - [WORLD](#org0090286)
  - [ORDER OF EXECUTION  [N]](#orgd6fd635)
- [SETUP](#org517e007)
  - [Dependencies](#orgf942c52)
- [IMPLEMENTATION HTML](#orgd41d0fc)
- [IMPLEMENTATION JS](#org27553b2)
  - [first GOAL make the player move (any direction)](#org1ea13e1)
    - [canvas](#orgbff49a2)
    - [variables](#orge25f61d)
    - [interface and handlers](#org527285b)
    - [functions](#orgc8fa826)
    - [MAIN FUNCTION](#org810209e)



<a id="orgf197901"></a>

# GRAPH

![img](updaterupdating.png)


<a id="org934b1d0"></a>

# GRAPH EXPLANATION


<a id="org069ba34"></a>

## GLOBAL:

-   GLOBAL

From [MDN documentation:](https://developer.mozilla.org/en-US/docs/Glossary/Global_variable)

> A global variable is a variable that is declared in the global scope in other words, a variable that is visible from all other scopes.
> 
> In JavaScript it is a property of the global object.

From [Wikipedia:](https://en.wikipedia.org/wiki/Global_variable)

> In computer programming, a global variable is a variable with global scope, meaning that it is visible (hence accessible) throughout the program, unless shadowed. The set of all global variables is known as the global environment or global state. In compiled languages, global variables are generally static variables, whose extent (lifetime) is the entire runtime of the program, though in interpreted languages (including command-line interpreters), global variables are generally dynamically allocated when declared, since they are not known ahead of time.

-   OBJS

-   ACTIONS

-   RULES

> A rule is one or more condition applied to an event.

-   STATE
    
    From [Wikipedia:](https://en.wikipedia.org/wiki/State_(computer_science))

> In information technology and computer science, a program is described as stateful if it is designed to remember preceding events or user interactions;[1] the remembered information is called the state of the system.


<a id="orgd3602d8"></a>

## PROGRAM

-   INTERFACE

-   INPUTHANDLER

-   EVENTHANDLER

-   UPDATER

-   DRAW


<a id="org0090286"></a>

## WORLD

-   CANVAS


<a id="orgd6fd635"></a>

## ORDER OF EXECUTION  [N]

-   [1] INTERFACE

-   [2] INPUTHANDLER

-   [3] EVENTHANDLER

-   [4] UPDATER

-   [5] GLOBAL STATE

-   [6] DRAW

-   [7] CANVAS


<a id="org517e007"></a>

# SETUP


<a id="orgf942c52"></a>

## Dependencies

-   jsdom

-   sinon

-   tape


<a id="orgd41d0fc"></a>

# IMPLEMENTATION HTML

```html
<!doctype html>
<html lang="en">
    <head>
	<meta charset="UTF-8"/>
	<title>Roguelike</title>
    </head>
    <style>
     .container {
	margin: 0 auto;
	width:  150px;
	height: 150px;
      }
     .canvas {
      margin: 0 auto;
      border: 1px solid black;
     } 
    </style>
    <body>
     <div class="container">
     <canvas id="canvas" class="canvas" width="150" height="150"></canvas>
     </div>
    </body>
    <script src="index.js"></script>
</html>
```


<a id="org27553b2"></a>

# IMPLEMENTATION JS


<a id="org1ea13e1"></a>

## first GOAL make the player move (any direction)


<a id="orgbff49a2"></a>

### canvas

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
```


<a id="orge25f61d"></a>

### variables

1.  map

    -   Table example A:
        
        |     | x0 | x1 | x2 | x3 | x4 | x5 | x6 | x7 | x8 | x9 | x10 | x11 | x12 | x13 | x14 |
        |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |
        | y0  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1   | 1   | 1   | 1   | 1   |
        | y1  | 1  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0   | 0   | 0   | 0   | 1   |
        | y2  | 1  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0   | 0   | 0   | 0   | 1   |
        | y3  | 1  | 0  | 0  | 0  | 1  | 1  | 1  | 1  | 1  | 1  | 0   | 0   | 0   | 0   | 1   |
        | y4  | 1  | 0  | 0  | 0  | 1  | 1  | 1  | 1  | 1  | 1  | 0   | 0   | 0   | 0   | 1   |
        | y5  | 1  | 0  | 0  | 0  | 0  | 0  | 0  | 1  | 0  | 0  | 0   | 0   | 0   | 0   | 1   |
        | y6  | 1  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0   | 0   | 0   | 0   | 1   |
        | y7  | 1  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0   | 0   | 0   | 0   | 1   |
        | y8  | 1  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 1  | 1   | 1   | 0   | 0   | 1   |
        | y9  | 1  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 1  | 1   | 1   | 0   | 0   | 1   |
        | y10 | 1  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 1   | 1   | 0   | 0   | 1   |
        | y11 | 1  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0   | 0   | 0   | 0   | 1   |
        | y12 | 1  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0   | 0   | 0   | 0   | 1   |
        | y13 | 1  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0   | 0   | 0   | 0   | 1   |
        | y14 | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1   | 1   | 1   | 1   | 1   |
    
    -   Table example B:
        
        | map[y][x]  | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 |
        |---------- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |
        | map[0][x]  | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1  | 1  | 1  | 1  | 1  |
        | map[1][x]  | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0  | 0  | 0  | 0  | 1  |
        | map[2][x]  | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0  | 0  | 0  | 0  | 1  |
        | map[3][x]  | 1 | 0 | 0 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 0  | 0  | 0  | 0  | 1  |
        | map[4][x]  | 1 | 0 | 0 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 0  | 0  | 0  | 0  | 1  |
        | map[5][x]  | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0  | 0  | 0  | 0  | 1  |
        | map[6][x]  | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0  | 0  | 0  | 0  | 1  |
        | map[7][x]  | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0  | 0  | 0  | 0  | 1  |
        | map[8][x]  | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 1  | 1  | 0  | 0  | 1  |
        | map[9][x]  | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 1  | 1  | 0  | 0  | 1  |
        | map[10][x] | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1  | 1  | 0  | 0  | 1  |
        | map[11][x] | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0  | 0  | 0  | 0  | 1  |
        | map[12][x] | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0  | 0  | 0  | 0  | 1  |
        | map[13][x] | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0  | 0  | 0  | 0  | 1  |
        | map[14][x] | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1  | 1  | 1  | 1  | 1  |
    
    -   Code example:
    
    ```js
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
    ```

2.  state

    -   pos:
        -   x:
        -   y:
    
    ```js
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
    ```

3.  objects

    ```js
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
    ```

4.  actions

    ```js
    const actions = ["walk"];
    
    ```

5.  rules

    ```js
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
    ```


<a id="org527285b"></a>

### interface and handlers

1.  INTERFACE

    ```js
    function INTERFACE(id, keyCode ) {
       let input = Object.assign({"id":id}, {"keyCode": keyCode}, {});
       INPUTHANDLER(input); 
     }
    ```

2.  INPUTHANDLER

    ```js
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
    ```

3.  EVENTHANDLER

    -   select:
        -   rule (hardcoded)
        -   fn
        -   what
        -   condition
    
    -   collision detection
    
    -   send newState to UPDATER
    
    ```js
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
    ```

4.  UPDATER

    -   Update:
        -   state
    
    -   Call:
        -   draw
    
    ```js
    
    function UPDATER(newState) {
    
      let indexId = state.findIndex( element => element.id===newState.id);
      let prevState = state[indexId];
    
      map[prevState.pos.y][prevState.pos.x] = 0; // update map
      map[newState.pos.y][newState.pos.x] = "P";  // update map
    
      state[indexId] = newState;
    
      drawMap();
    
    };
    
    
    ```


<a id="orgc8fa826"></a>

### functions

1.  START

    -   Add to DOM:
        -   Event listener
    
    -   Call:
        -   INTERFACE
        
        -   draw
    
    -   Send:
        -   keyCode to INTERFACE
    
    1.  Declaration
    
        ```js
        function START() {
        // LISTENER
         document.addEventListener("keydown", function(keyDown) {
           INTERFACE("player",keyDown.keyCode);
          });
        
         drawMap();
        }
        ```
    
    2.  Test
    
        ```js
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
           INTERFACE("player",keyDown.keyCode);
          });
        
         drawMap();
        }
        
        START();
        
        dom.window.document.dispatchEvent(ArrowUp);
        
        
        
        test("START test", function(t){
          t.plan(2);
          t.equal(INTERFACE.callCount, 1,"START() should call INTERFACE only once" );
          t.equal(draw.callCount, 1,"START() should call draw only once" );
          t.end();
        });
        
        ```

2.  move

    1.  Declaration
    
        ```js
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
        ```

3.  attackEnemy

    1.  Declaration
    
        ```js
        let attackEnemy = () => { return 2;};
        ```
    
    2.  Test
    
        ```js
        let attackEnemy = () => { return 2;}; 
        var test = require("tape");
        
        test("attackEnemy test", function(t){
            t.plan(1);
            t.equal(typeof attackEnemy(),"number","attackEnemy() should return a number." );
            t.end();
        });
        ```

4.  drawMap

    1.  Declaration
    
        ```js
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
        ```

5.  drawTile

    1.  Declaration
    
        ```js
        function drawTile (x,y){
          ctx.fillRect(
            x * tileSize, y * tileSize,
            tileSize, tileSize
          );
        }
        ```


<a id="org810209e"></a>

### MAIN FUNCTION

```js
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
```