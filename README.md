- [GRAPH](#orgbf252b3)
- [IMPLEMENTATION HTML](#org0d94841)
- [IMPLEMENTATION JS](#org6c2e7f4)
  - [first GOAL make the player move (any direction)](#org97e1c43)
    - [canvas](#orga20272e)
    - [variables](#org6aeb68a)
    - [interface and handlers](#org7933680)
    - [functions](#org3534c25)


<a id="orgbf252b3"></a>

# GRAPH

![img](testing_dot.png)


<a id="org0d94841"></a>

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
	width: 150px;
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


<a id="org6c2e7f4"></a>

# IMPLEMENTATION JS


<a id="org97e1c43"></a>

## first GOAL make the player move (any direction)


<a id="orga20272e"></a>

### canvas

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
```


<a id="org6aeb68a"></a>

### variables

1.  state

    ```js
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


<a id="org7933680"></a>

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

// update  state 
 eval(`${fnName}(${what},${condition})`); 

// update frame
 UPDATER();

// console.log(state);
}
```

```js

function UPDATER() {

ctx.clearRect(0,0, 150,150);
ctx.strokeRect(state.pos.x,
	       state.pos.y,
	       state.width,
	       state.height);
};

```


<a id="org3534c25"></a>

### functions

```js

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
```

```js
let attackEnemy = () => { return 2;};
```

1.  MAIN FUNCTION

    ```js
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
    
    
    ```
    
