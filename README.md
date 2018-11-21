- [:noexport:](#orgb4860ab)
- [GRAPH](#org07309cc)
- [GRAPH EXPLANATION](#orged1342c)
  - [GLOBAL:](#org8216afd)
  - [PROGRAM](#org0e54d39)
  - [WORLD](#orgf1b765c)
  - [ORDER OF EXECUTION  [N]](#org2ce9c7a)
- [IMPLEMENTATION HTML](#orgd8533f0)
- [IMPLEMENTATION JS](#org57effb7)
  - [first GOAL make the player move (any direction)](#orgba65f68)
    - [canvas](#orgc6941cc)
    - [variables](#orgbb0f1d7)
    - [map](#org56e180d)
    - [interface and handlers](#org7a31b0a)
    - [functions](#orgfd5d60d)
    - [MAIN FUNCTION](#org3458ee7)



<a id="orgb4860ab"></a>

# TODO :noexport:

-   <code>[1/4]</code> GENERAL TODO
    -   [ ] Interactivity:
        -   [ ] remove? INPUTHANDLER
        -   [ ] make INTERFACE interactive
            -   [ ] Add document.eventListner
    -   [ ] complete objects:
        -   [ ] obj
        -   [ ] actions
        -   [ ] rules
        -   [ ] state
            -   [ ] 
            
            -   [ ]
    -   [ ] clean the README
        -   [ ] -   [ ] 
            
            -   [ ] 
            
            -   [ ] 
            
            -   [ ]
    -   [X] Add testing
        -   [X] change folder structure
            -   [X] add src folder
            -   [X] add test folder
        -   [X] add package.json
            -   [X] add tapejs
        -   [X] modify literate document:
            -   [X] modify tangle paths
            -   [X] add a test section for every function

-   <code>[0/3]</code> roguelike: implement player movements
    -   [ ] INTERFACE and INPUTHANDLER
        -   [ ] pass direction to EVENTHANDLER
    -   [ ] EVENTHANDLER
        -   [ ] pass direction to move fn
    -   [ ] create a move fn:
        -   [ ] arguments:
            -   [ ] dir

-   [ ] refactor rules object:
    -   [ ] action.acttack, sideEffect:move

-   [ ] move function
    -   [ ] 
    
    -   [ ] 
    
    -   [ ] 
    
    -   [ ]

testing workflow:

1.  tangle fn to test to src/file
2.  use nodemon on a terminal emulator
3.  only check map[array] (not canvas)

action: if not movement is attack INTERFACE, need to pass:

-   id
-   action
-   direction


<a id="org07309cc"></a>

# GRAPH

![img](updaterupdating.png)


<a id="orged1342c"></a>

# GRAPH EXPLANATION


<a id="org8216afd"></a>

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


<a id="org0e54d39"></a>

## PROGRAM

-   INTERFACE

-   INPUTHANDLER

-   EVENTHANDLER

-   UPDATER

-   DRAW


<a id="orgf1b765c"></a>

## WORLD

-   CANVAS


<a id="org2ce9c7a"></a>

## ORDER OF EXECUTION  [N]

-   [1] INTERFACE

-   [2] INPUTHANDLER

-   [3] EVENTHANDLER

-   [4] UPDATER

-   [5] GLOBAL STATE

-   [6] DRAW

-   [7] CANVAS


<a id="orgd8533f0"></a>

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


<a id="org57effb7"></a>

# IMPLEMENTATION JS


<a id="orgba65f68"></a>

## first GOAL make the player move (any direction)


<a id="orgc6941cc"></a>

### canvas

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
```


<a id="orgbb0f1d7"></a>

### variables


<a id="org56e180d"></a>

### map

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

1.  state

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

2.  objects

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

3.  actions

    ```js
    const actions = ["walk"];
    
    ```

4.  rules

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


<a id="org7a31b0a"></a>

### interface and handlers

1.  INTERFACE

    ```js
     /* 
           id , action => input { id: id , action: action}
      */
    function INTERFACE(id, action ) {
       let input = Object.assign({"id":id}, {"action":action}, {});
       INPUTHANDLER(input); 
     }
    ```

2.  INPUTHANDLER

    ```js
      /*
        input  = event
      */
    
      function INPUTHANDLER(input) {
        let event = input; 
    //  console.log('inputhandler => event', event); 
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


<a id="orgfd5d60d"></a>

### functions

1.  xPlusOne

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

2.  attackEnemy

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


<a id="org3458ee7"></a>

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
let xPlusOne = (a,b) =>  {
 let  newState = Object
		     .assign(
		      {},
		      state,
		       {"pos": {"x": state.pos.x +1, "y": state.pos.y}} 
  ); 

return newState;
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

function UPDATER(newState) {
 let prevState = state;

  map[prevState.pos.y][prevState.pos.x] = 0; // update map
  map[newState.pos.y][newState.pos.x] = 1;  // update map

  state = newState;

  draw();

};



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

draw();

//INTERFACE("human" ,  "walk");
```