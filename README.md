- [GRAPH](#org6111f39)
- [GRAPH EXPLANATION](#orgc123284)
  - [GLOBAL:](#orgc02eb8f)
  - [PROGRAM](#org0f666e7)
  - [WORLD](#orge64814f)
  - [ORDER OF EXECUTION  [N]](#orgd676234)
- [SETUP](#org2718dea)
  - [Dependencies](#org073a9d3)
- [IMPLEMENTATION HTML](#orgbf35159)
- [IMPLEMENTATION JS](#org0f2bcde)
  - [first GOAL make the player move (any direction)](#org2789d7a)
    - [canvas](#org563d61c)
    - [variables](#org5440625)
    - [interface and handlers](#org10636c4)
    - [functions](#orgfb94604)
    - [MAIN FUNCTION](#org7ec4f52)



<a id="org6111f39"></a>

# GRAPH

![img](updaterupdating.png)


<a id="orgc123284"></a>

# GRAPH EXPLANATION


<a id="orgc02eb8f"></a>

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


<a id="org0f666e7"></a>

## PROGRAM

-   INTERFACE

-   INPUTHANDLER

-   EVENTHANDLER

-   UPDATER

-   DRAW


<a id="orge64814f"></a>

## WORLD

-   CANVAS


<a id="orgd676234"></a>

## ORDER OF EXECUTION  [N]

-   [1] INTERFACE

-   [2] INPUTHANDLER

-   [3] EVENTHANDLER

-   [4] UPDATER

-   [5] GLOBAL STATE

-   [6] DRAW

-   [7] CANVAS


<a id="org2718dea"></a>

# SETUP


<a id="org073a9d3"></a>

## Dependencies

-   jsdom

-   sinon

-   tape


<a id="orgbf35159"></a>

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


<a id="org0f2bcde"></a>

# IMPLEMENTATION JS


<a id="org2789d7a"></a>

## first GOAL make the player move (any direction)


<a id="org563d61c"></a>

### canvas

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
```


<a id="org5440625"></a>

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
    var map = [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,1,1,1,1,1,1,0,0,0,0,1],
      [1,0,0,0,1,1,1,1,1,1,0,0,0,0,1],
      [1,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,1,1,1,0,0,1],
      [1,0,0,0,0,0,0,0,0,1,1,1,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,1,1,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
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
    
    let state = {
         "id": "humanInstance",
         "pos": {
           "x": 6,
           "y": 5
          },
          "width": 10,
          "height": 10
      };
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
    ```


<a id="org10636c4"></a>

### interface and handlers

1.  INTERFACE

    ```js
     /* 
           id , action => input { id: id , action: action}
      */
    
    function INTERFACE(id, action ) {
       let input = Object.assign({"id":id}, {"action": action}, {});
       INPUTHANDLER(input); 
     }
    ```

2.  INPUTHANDLER

    ```js
      /*
        input  = event
      */
    
    function INPUTHANDLER(input) {
    
    let playerAction;
    let id = input.id;
    
     switch (input.action) {
    
      case 37:
        playerAction = "walk"; 
       break;
    
      case 38:
        playerAction = "walk";
       break;
    
      case 39:
       playerAction = "walk";
       break;
    
      case 40:
        playerAction = "walk";
       break;
    
    } 
    
    let event =   Object.assign({"id":id}, {"action": playerAction}, {});
    EVENTHANDLER(event); 
      }
    ```

3.  EVENTHANDLER

    -   select:
        -   rule
        -   fn
        -   what
        -   condition
    
    -   collision detection
    
    -   send newState to UPDATER
    
    ```js
    function EVENTHANDLER(event) {
      // event { id: 'human', action: 'walk' }
    
      let rule = rules.filter(el => el.action === event.action);
      let fnName = rule[0].sideEffect;
      let what = rule[0].what;
      let condition = rule[0].condition;
      let newState = eval(`${fnName}(${what},${condition})`); 
    
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
     let prevState = state;
    
      map[prevState.pos.y][prevState.pos.x] = 0; // update map
      map[newState.pos.y][newState.pos.x] = 1;  // update map
    
      state = newState;
    
      draw();
    
    };
    
    
    ```


<a id="orgfb94604"></a>

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
           INTERFACE("human",keyDown.keyCode);
          });
        
        // Draw map
         draw();
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
           INTERFACE("human",keyDown.keyCode);
          });
        
        // Draw map
         draw();
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

2.  xPlusOne

    1.  Declaration
    
        ```js
        let xPlusOne = (a,b) =>  {
         let  newState = Object
        		     .assign(
        		      {},
        		      state,
        		       {"pos": {"x": state.pos.x +1, "y": state.pos.y}} 
          ); 
        
        return newState;
        };
        ```
    
    2.  Test
    
        ```js
        var test = require("tape");
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
        let xPlusOne = (a,b) =>  {
         let  newState = Object
        		     .assign(
        		      {},
        		      state,
        		       {"pos": {"x": state.pos.x +1, "y": state.pos.y}} 
          ); 
        
        return newState;
        };
        
        test("xPlusOne test", function(t){
           t.plan(1);
           t.equal(typeof xPlusOne(), "object","xPlusOne() should return an object." );
           t.end();
        });
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


<a id="org7ec4f52"></a>

### MAIN FUNCTION

```js
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
```