- [GRAPH](#org665b1e1)
- [IMPLEMENTATION HTML](#orgaa56b56)
- [IMPLEMENTATION JS](#org2c37872)
  - [first GOAL make the player move (any direction)](#org78ae59c)
    - [canvas](#org7a1655d)
    - [variables](#orgb744b7b)
    - [map](#org8ae9064)
    - [interface and handlers](#org2434cad)
    - [functions](#org8c4b5cd)
    - [MAIN FUNCTION](#org98ab3fb)


<a id="org665b1e1"></a>

# GRAPH

![img](updaterupdating.png)


<a id="orgaa56b56"></a>

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


<a id="org2c37872"></a>

# IMPLEMENTATION JS


<a id="org78ae59c"></a>

## first GOAL make the player move (any direction)


<a id="org7a1655d"></a>

### canvas

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
```


<a id="orgb744b7b"></a>

### variables


<a id="org8ae9064"></a>

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


<a id="org2434cad"></a>

### interface and handlers

```js
 /* 
       id , action => input { id: id , action: action}
  */
function INTERFACE(id, action ) {
   let input = Object.assign({"id":id}, {"action":action}, {});
   INPUTHANDLER(input); 
 }
```

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

```js
function EVENTHANDLER(event) {

// event { id: 'human', action: 'walk' }

 let rule          =   rules.filter(el => el.action === event.action);
 let fnName        =   rule[0].sideEffect; 
 let what          =   rule[0].what; 
 let condition     =   rule[0].condition; 

// collision detection 
if (map[state.pos.x + 1][state.pos.y] === 0) {

map[state.pos.x][state.pos.y] = 0;

 eval(`${fnName}(${what},${condition})`); // update  state 

 UPDATER(); // update frame
} else {
  console.log("collision detected");
}

 console.log(state);
}
```

```js

function UPDATER() {
/*
ctx.strokeRect(state.pos.x,
	       state.pos.y,
	       state.width,
	       state.height);
 */

map[state.pos.x][state.pos.y] = 1;// update map

draw();
};

```


<a id="org8c4b5cd"></a>

### functions

```js
let xPlusOne = (a,b) =>  {
 let  newState = Object
		     .assign(
		      {},
		      state,
		       {"pos": {"x": state.pos.x +1, "y": state.pos.y}} 
  ); 

state = newState;
console.log(state);
};
```

```js
let attackEnemy = () => { return 2;};
```


<a id="org98ab3fb"></a>

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

state = newState;
console.log(state);
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

// collision detection 
if (map[state.pos.x + 1][state.pos.y] === 0) {

map[state.pos.x][state.pos.y] = 0;

 eval(`${fnName}(${what},${condition})`); // update  state 

 UPDATER(); // update frame
} else {
  console.log("collision detected");
}

 console.log(state);
}

function UPDATER() {
/*
ctx.strokeRect(state.pos.x,
	       state.pos.y,
	       state.width,
	       state.height);
 */

map[state.pos.x][state.pos.y] = 1;// update map

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
  [1,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
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