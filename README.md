- [Diagram](#orgfea0c7f)
- [Diagram Explanation](#org2efcaa8)
  - [GLOBAL](#org8693a44)
  - [PROGRAM](#org58bda65)
  - [WORLD](#orgca1a478)
  - [ORDER](#orgc94ac6a)
- [Setup](#orgb43a2ed)
  - [Dependencies](#org1986ce5)
- [HTML](#orgc884507)
- [JavaScript](#orgd887cd5)
    - [canvas](#org36fe5b2)
    - [variables](#org41966e5)
    - [INTERFACE and HANDLERS](#org442e60e)
    - [UPDATER](#org194f9e0)
    - [functions](#org6773e02)
    - [MAIN FUNCTION](#org57b3ee1)
- [Demo](#org2805582)



<a id="orgfea0c7f"></a>

# Diagram

![img](diagram.png)


<a id="org2efcaa8"></a>

# Diagram Explanation


<a id="org8693a44"></a>

## GLOBAL

-   GLOBAL

From [MDN documentation:](https://developer.mozilla.org/en-US/docs/Glossary/Global_variable)

> A global variable is a variable that is declared in the global scope in other words, a variable that is visible from all other scopes.
> 
> In JavaScript it is a property of the global object.

From [Wikipedia:](https://en.wikipedia.org/wiki/Global_variable)

> In computer programming, a global variable is a variable with global scope, meaning that it is visible (hence accessible) throughout the program, unless shadowed. The set of all global variables is known as the global environment or global state. In compiled languages, global variables are generally static variables, whose extent (lifetime) is the entire runtime of the program, though in interpreted languages (including command-line interpreters), global variables are generally dynamically allocated when declared, since they are not known ahead of time.

-   STATE
    
    From [Wikipedia:](https://en.wikipedia.org/wiki/State_(computer_science))

> In information technology and computer science, a program is described as stateful if it is designed to remember preceding events or user interactions;[1] the remembered information is called the state of the system.


<a id="org58bda65"></a>

## PROGRAM

-   INTERFACE
    -   The entry point of player data
    
    -   Called by an event listener
    
    -   Ouput:
        -   Object

-   INPUTHANDLER
    -   Transform the input into a custom event
    
    -   Input:
        -   Object
    
    -   Ouput:
        -   Object

-   EVENTHANDLER
    -   Apply the rules for:
        -   object persistence
        
        -   move
        
        -   attack
        
        -   collision detection
    
    -   Send a new state and an action to UPDATER
    
    -   Input:
        -   Object
    
    -   Ouput:
        -   Object , string || Array of Objects, string

-   UPDATER
    -   Update:
        -   STATE
        
        -   MAP
        
        -   DOM
        
        -   CANVAS

-   DRAW
    -   Helper function:
        -   Draw canvas


<a id="orgca1a478"></a>

## WORLD

-   [CANVAS](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas)

> Use the HTML <canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.

-   [CANVAS API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

> The Canvas API provides a means for drawing graphics via JavaScript and the HTML <canvas> element. Among other things, it can be used for animation, game graphics, data visualization, photo manipulation, and real-time video processing.


<a id="orgc94ac6a"></a>

## ORDER

-   [1] INTERFACE
    -   Called by an event listener

-   [2] INPUTHANDLER
    -   Called by INTERFACE

-   [3] EVENTHANDLER
    -   Called by INPUTHANDLER

-   [4] FUNCTIONS
    -   Called by:
        -   EVENTHANDLER to get a new state
        -   UPDATER to update:
            -   state
            
            -   canvas
            
            -   DOM

-   [5] UPDATER
    -   Called by EVENTHANDLER passing a new state

-   [6] GLOBAL STATE
    -   Updated by UPDATER

-   [7] CANVAS


<a id="orgb43a2ed"></a>

# Setup


<a id="org1986ce5"></a>

## Dependencies

-   jsdom

-   sinon

-   tape


<a id="orgc884507"></a>

# HTML

```html
<!doctype html>
<html lang="en">
    <head>
	<meta charset="UTF-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Roguelike</title>
    </head>
    <style>
     body {
      overflow: hidden;
     }
      *, *:after, *:before {
	  -webkit-box-sizing: border-box;
	  -moz-box-sizing: border-box;
	 box-sizing: border-box;
      }
     .container {
	 max-width: 1024px;
	 margin: 0 auto;
	 display: grid;
	 grid-template-columns: repeat(12, [col-start] 1fr);
	 row-gap: 10px;
	 column-gap: 50px;
      }

     .canvas {
	 grid-column: col-start 3/span 4;
     } 
     .playerInfo {
	 grid-column: col-start 8/span 4;
	 max-width: 100%; 
	 border: 10px solid black;
     }
     .worldInfo {
	 grid-column: col-start 3/span 9;
	 grid-row: 3/6;
	 max-width: 100%; 
	 max-height: 100%; 
	 min-height: 300px; 
	 border: 10px solid black;
	 overflow-y: auto; 
    } 

    </style>
    <body>
     <div class="container">
     <canvas id="canvas" class="canvas" width="400" height="400"></canvas>
     <div class="playerInfo" id="playerInfo">
      <table>
       <tr>
	 <td id="playerId"></td>
       </tr>
       <tr>
	 <th>X:</th>
	 <td id="playerPosX"></td>
       </tr>
       <tr>
	 <th>Y:</th>
	 <td id="playerPosY"></td>
       </tr>
       <tr>
	 <th>HP</th>
	 <td id="playerHP"></td>
       </tr>
     </table>
     </div>
      <div class="worldInfo"  id="worldInfo">
	<div class="monsterInfo" id="monsterInfo">
	 <table id="monsterTable">
	  <tr>
	   <th>id</th>
	   <th>X</th>
	   <th>Y</th>
	   <th>HP</th>
	  </tr>
	 </table>
	</div> 
      </div>
     </body>
     <script src="index.js"></script>
</html>
```


<a id="orgd887cd5"></a>

# JavaScript


<a id="org36fe5b2"></a>

### canvas

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
```


<a id="org41966e5"></a>

### variables

1.  map

    
    
    -   Examples:
    
    
    
    |     | x0 | x1 | x2 | x3 | x4 | x5 | x6 | x7 | x8 | x9 | x10 |
    |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |
    | y0  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1   |
    | y1  | 1  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0   |
    | y2  | 1  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0   |
    | y3  | 1  | 0  | 0  | 0  | 1  | 1  | 1  | 1  | 1  | 1  | 0   |
    | y4  | 1  | 0  | 0  | 0  | 1  | 1  | 1  | 1  | 1  | 1  | 0   |
    | y5  | 1  | 0  | 0  | 0  | 0  | 0  | 0  | 1  | 0  | 0  | 0   |
    | y6  | 1  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0   |
    | y7  | 1  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0   |
    | y8  | 1  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 1  | 1   |
    | y9  | 1  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 1  | 1   |
    | y10 | 1  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 1   |
    
    
    
    | map[y][x]  | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
    |---------- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |
    | map[0][x]  | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1  |
    | map[1][x]  | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0  |
    | map[2][x]  | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0  |
    | map[3][x]  | 1 | 0 | 0 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 0  |
    | map[4][x]  | 1 | 0 | 0 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 0  |
    | map[5][x]  | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0  |
    | map[6][x]  | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0  |
    | map[7][x]  | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0  |
    | map[8][x]  | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 1  |
    | map[9][x]  | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 1  |
    | map[10][x] | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1  |
    
    
    
    -   Code:
    
    
    
    ```js
    /*
      0 : walkable
      1 : not walkable (a wall)
     */ 
    
    // prettier-ignore
    var map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];
    
    ```

2.  state

    ![img](state_diagram.png)
    
    ```js
    /*
     list of objects  and his positions x y
     */
    
    let state = [];
    
    ```


<a id="org442e60e"></a>

### INTERFACE and HANDLERS

![img](interface_and_handlers.png)

1.  INTERFACE

    ```js
    function interface(id, keyCode ) {
       let input = Object.assign({"id":id}, {"keyCode": keyCode}, {});
       inputHandler(input); 
     }
    ```

2.  INPUTHANDLER

    
    
    | key        | keyCode | input | coordinates |
    |---------- |------- |----- |----------- |
    | ArrowLeft  | 37      | Left  | x - 1       |
    | ArrowUp    | 38      | up    | y - 1       |
    | ArrowRight | 39      | right | x + 1       |
    | ArrowDown  | 40      | down  | y + 1       |
    
    
    
    ```js
    function inputHandler(inputObj) {
    
    let input;
    let id = inputObj.id;
    
     switch (inputObj.keyCode) {
    
      case 37:
        input = "left"; 
       break;
    
      case 72:
        input = "left"; 
       break;
    
      case 38:
        input = "up";
       break;
    
    
      case 75:
        input = "up";
       break;
    
      case 39:
       input = "right";
       break;
    
      case 76:
       input = "right";
       break;
    
      case 40:
        input = "down";
       break;
    
      case 74:
        input = "down";
       break;
    
    } 
    
    let event =   Object.assign({"id":id}, {"input":input}, {});
    eventHandler(event); 
      }
    ```

3.  EVENTHANDLER

    ![img](eventhandler_diagram.png)
    
    ```js
    function eventHandler(event) {
      let newState;
      let nextMove;
      let action;
    
      let didSomethingDie =
        state.findIndex(ele => ele.HP === 0) != -1 ? true : false;
    
      /*
       * Check for dead object
       */ 
    
      if (didSomethingDie) {
        action = "remove";
        newState = state.filter(ele => ele.HP != 0);
        updater(newState, action);
      } 
    
    
      /*
       * Select action  based on nextMove
       */
    
      nextMove = move(event.id, event.input);
    
       if (map[nextMove.pos.y][nextMove.pos.x] === 0) {
        action   = "walk";
    
      } else if (typeof map[nextMove.pos.y][nextMove.pos.x] === "string") {
        action   = "attack";
    
      } else {
        action = "collision detection";
      }
    
    
      /*
       * send newState  based on action
       */
      switch (action) {
        case "walk":
          newState = nextMove;
          updater(newState, "walk");
          break;
    
        case "attack":
          newState = attackEnemy(nextMove.id, nextMove.pos.x, nextMove.pos.y);
          updater(newState, "attack");
          break;
    
        case "collision detection":
          console.log("collision detected");
          break;
      }
    }
    ```


<a id="org194f9e0"></a>

### UPDATER

![img](updater_diagram.png)

![img](updater_canvas_diagram.png)

```js
function updater(newState, action) {
  switch (action) {
    case "remove":
      monsterInfoFn();
      state = newState;
      break;

    case "walk":
      let indx = state.findIndex(ele => ele.id === newState.id);
      state[indx] = newState;
      break;

    case "attack":
      newState.forEach(function(elem) {
	let indx = state.findIndex(ele => ele.id === elem.id);
	state[indx] = elem;
      });
      break;
  }

  // clean map
  map.forEach(function(elem) {
    for (let i = 0; i < elem.length; i++) {
      if (elem[i] != 1) {
	// don't remove the walls
	elem[i] = 0;
      }
    }
  });

  // update map
  state.forEach(function(elem) {
    if (elem.id != 1 ) { 
   map[elem.pos.y][elem.pos.x] = elem.id;
   }
  });

  // draw map with the current state
  drawMap();

  // update player info with current state
  playerInfo();

  // update monster info with current state
  monsterInfoFn();
}
```


<a id="org6773e02"></a>

### functions

1.  start

    1.  Declaration
    
        ```js
        function start() {
          // LISTENER
          document.addEventListener("keydown", function(keyDown) {
            interface("player", keyDown.keyCode);
          });
        
          /* Add wall id to state.
             At the moment the walls are hardcoded (map) 
          */
          state.push(objects.wall);
        
          // Create monsters (no more than 12) 
          let monsters = createMonsters(8);
        
          // Add monsters to state
          monsters.forEach(function(elem) {
            state.push(elem);
          });
        
          // Add player to state
          state.push(objects.player);   
        
          // Add  player and monsters to map using state
          state.forEach(function(elem) {
            if (elem.id != 1) {
              map[elem.pos.y][elem.pos.x] = elem.id;
            }
          });
        
          drawMap();
          playerInfo();
          monsterInfoFn();
        }
        
        
        ```

2.  playerInfo

    1.  Declaration
    
        ```js
        function playerInfo()  {
        
        let playerIndex =  state.findIndex(element => element.id==="player"); 
        let player = state[playerIndex];
        
        let playerInfo = document.getElementById("playerInfo");
        let playerId   = document.getElementById("playerId");
        let playerPosX = document.getElementById("playerPosX");
        let playerPosY = document.getElementById("playerPosY");
        let playerHP   = document.getElementById("playerHP");
        
        playerId.textContent   =   player.id;
        playerPosX.textContent =   player.pos.x;
        playerPosY.textContent =   player.pos.y;
        playerHP.textContent   =   player.HP;
        }
        ```

3.  monsterInfoFn

    1.  Declaration
    
        ```js
        function monsterInfoFn()  {
        
         let allIndx  = (arr, val ) => {
        
            var indexes = [];
            for(let i = 0; i < arr.length; i++)
        	if (arr[i].type === val)
        	    indexes.push(i);
             return indexes;
        
        }
        
         let monstersIndex  = allIndx(state, "monster");
        
        
         monstersIndex.forEach( index => {
        
         let monster = state[index];
        
         if (monster != undefined ) { 
        
          let monsterTable   = document.getElementById("monsterTable");
          let monsterDOM     = document.getElementById(monster.id);
        
          let row = document.createElement('tr');
        
          let monsterId   = document.createElement('td');
          let monsterPosX = document.createElement('td');
          let monsterPosY = document.createElement('td');
          let monsterHP   = document.createElement('td');
        
        
          if(monsterDOM === null) {
        
            monsterId.id    = `${monster.id}ID`;  
            monsterPosX.id  = `${monster.id}X`;
            monsterPosY.id  = `${monster.id}Y`;
            monsterHP.id    = `${monster.id}HP`; 
        
            row.id = monster.id;
        
            row.appendChild(monsterId); 
            row.appendChild(monsterPosX); 
            row.appendChild(monsterPosY); 
            row.appendChild(monsterHP); 
        
            monsterId.textContent   = monster.id; 
            monsterPosX.textContent = monster.pos.x ;
            monsterPosY.textContent = monster.pos.y;
            monsterHP.textContent   = monster.HP;
            monsterTable.appendChild(row);
          } 
        
        
         if (monsterId != null) {
        
          let tdId = document.getElementById(`${monster.id}ID`);
          let tdX  = document.getElementById(`${monster.id}X`);
          let tdY  = document.getElementById(`${monster.id}Y`);
          let tdHP = document.getElementById(`${monster.id}HP`);
        
          if (tdHP.textContent === '0') {
           let removeRow = document.getElementById(monster.id);
           removeRow.remove();
          } 
        
        
          tdId.textContent    = monster.id; 
          tdX.textContent     = monster.pos.x ;
          tdY.textContent     = monster.pos.y;
          tdHP.textContent    = monster.HP;
        
        
           }
          } 
         });
        
         }
        ```

4.  move

    1.  Declaration
    
        ```js
        function move (id, direction) {
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

5.  attackEnemy

    1.  Declaration
    
        ```js
        function attackEnemy (id,x,y) { 
        
         let playerIndex =  state.findIndex(element => element.id===id); 
         let player = state[playerIndex];
         let playerHP =  player.HP;
        
         let monsterIndex = state.findIndex(el => el.pos.x === x &&  el.pos.y === y); 
         let monster = state[monsterIndex];
         let monsterHP = monster.HP;
        
         playerHP  -= 1; 
         monsterHP -= 1;
        
         let newStatePlayer =   Object.assign({}, player, {"HP": playerHP}); 
        
         let newStateMonster =  Object.assign({}, monster,{"HP": monsterHP});
        
         return [newStatePlayer,newStateMonster];
        
         }; 
        ```

6.  drawMap

    1.  Declaration
    
        ```js
        function drawMap (){
            ctx.clearRect(0, 0, w, h);
            map.forEach(function(row,i){
        	row.forEach(function(tile,j){
        
        	 if(tile != 0) {
        	    let index = state.findIndex(ele => ele.id === tile);
        	    let color = state[index].color;
        	    ctx.fillStyle = color;
        	    drawTile(j,i);
        	 }
        
        	})});
          } 
        ```

7.  drawTile

    1.  Declaration
    
        ```js
        function drawTile (x,y){
          ctx.fillRect(
            x * tileSize, y * tileSize,
            tileSize, tileSize
          );
        }
        ```


<a id="org57b3ee1"></a>

### MAIN FUNCTION

```js
/******************************************************************************* 

		    _       _     _           
		   (_)     | |   | |          
   __   ____ _ _ __ _  __ _| |__ | | ___  ___ 
   \ \ / / _` | '__| |/ _` | '_ \| |/ _ \/ __|
    \ V / (_| | |  | | (_| | |_) | |  __/\__ \
     \_/ \__,_|_|  |_|\__,_|_.__/|_|\___||___/


********************************************************************************/


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let w = 400;
let h = 400;
let tileSize = 13;

const objects = {
    "wall": {
      id: 1, // wall
      color: "rgba(200, 200, 200, 1)",
      pos: {
	x: 0,
	y: 0
      },
    },
    "monster" : {
     id: "monster",
     type: "monster",
     color: "rgba(0,0,255,1)",
     pos: {
       x: 0, 
       y: 0
     },
     width: 10,
     height: 10,
     HP: 3
    },
    "player": 
    {
    id: "player",
    type: "player",
    color: "rgba(255,0,0,1)",
    pos: {
      x: 6,
      y: 5
    },
    width: 10,
    height: 10,
    HP: 100
  }
};

/******************************************************************************* 

    _____  _     ___________  ___   _     
   |  __ \| |   |  _  | ___ \/ _ \ | |    
   | |  \/| |   | | | | |_/ / /_\ \| |    
   | | __ | |   | | | | ___ \  _  || |    
   | |_\ \| |___\ \_/ / |_/ / | | || |____
    \____/\_____/\___/\____/\_| |_/\_____/


********************************************************************************/


/*
 list of objects  and his positions x y
 */

let state = [];



/*
  0 : walkable
  1 : not walkable (a wall)
 */ 

// prettier-ignore
var map = [
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];




/******************************************************************************* 


    _ __  _ __ ___   __ _ _ __ __ _ _ __ ___  
   | '_ \| '__/ _ \ / _` | '__/ _` | '_ ` _ \ 
   | |_) | | | (_) | (_| | | | (_| | | | | | |
   | .__/|_|  \___/ \__, |_|  \__,_|_| |_| |_|
   | |               __/ |                    
   |_|              |___/     


********************************************************************************/


function interface(id, keyCode ) {
   let input = Object.assign({"id":id}, {"keyCode": keyCode}, {});
   inputHandler(input); 
 }

function inputHandler(inputObj) {

let input;
let id = inputObj.id;

 switch (inputObj.keyCode) {

  case 37:
    input = "left"; 
   break;

  case 72:
    input = "left"; 
   break;

  case 38:
    input = "up";
   break;


  case 75:
    input = "up";
   break;

  case 39:
   input = "right";
   break;

  case 76:
   input = "right";
   break;

  case 40:
    input = "down";
   break;

  case 74:
    input = "down";
   break;

} 

let event =   Object.assign({"id":id}, {"input":input}, {});
eventHandler(event); 
  }

function eventHandler(event) {
  let newState;
  let nextMove;
  let action;

  let didSomethingDie =
    state.findIndex(ele => ele.HP === 0) != -1 ? true : false;

  /*
   * Check for dead object
   */ 

  if (didSomethingDie) {
    action = "remove";
    newState = state.filter(ele => ele.HP != 0);
    updater(newState, action);
  } 


  /*
   * Select action  based on nextMove
   */

  nextMove = move(event.id, event.input);

   if (map[nextMove.pos.y][nextMove.pos.x] === 0) {
    action   = "walk";

  } else if (typeof map[nextMove.pos.y][nextMove.pos.x] === "string") {
    action   = "attack";

  } else {
    action = "collision detection";
  }


  /*
   * send newState  based on action
   */
  switch (action) {
    case "walk":
      newState = nextMove;
      updater(newState, "walk");
      break;

    case "attack":
      newState = attackEnemy(nextMove.id, nextMove.pos.x, nextMove.pos.y);
      updater(newState, "attack");
      break;

    case "collision detection":
      console.log("collision detected");
      break;
  }
}

function updater(newState, action) {
  switch (action) {
    case "remove":
      monsterInfoFn();
      state = newState;
      break;

    case "walk":
      let indx = state.findIndex(ele => ele.id === newState.id);
      state[indx] = newState;
      break;

    case "attack":
      newState.forEach(function(elem) {
	let indx = state.findIndex(ele => ele.id === elem.id);
	state[indx] = elem;
      });
      break;
  }

  // clean map
  map.forEach(function(elem) {
    for (let i = 0; i < elem.length; i++) {
      if (elem[i] != 1) {
	// don't remove the walls
	elem[i] = 0;
      }
    }
  });

  // update map
  state.forEach(function(elem) {
    if (elem.id != 1 ) { 
   map[elem.pos.y][elem.pos.x] = elem.id;
   }
  });

  // draw map with the current state
  drawMap();

  // update player info with current state
  playerInfo();

  // update monster info with current state
  monsterInfoFn();
}

function drawMap (){
    ctx.clearRect(0, 0, w, h);
    map.forEach(function(row,i){
	row.forEach(function(tile,j){

	 if(tile != 0) {
	    let index = state.findIndex(ele => ele.id === tile);
	    let color = state[index].color;
	    ctx.fillStyle = color;
	    drawTile(j,i);
	 }

	})});
  }

function drawTile (x,y){
  ctx.fillRect(
    x * tileSize, y * tileSize,
    tileSize, tileSize
  );
}


/******************************************************************************* 


     __                  _   _                 
    / _|                | | (_)                
   | |_ _   _ _ __   ___| |_ _  ___  _ __  ___ 
   |  _| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
   | | | |_| | | | | (__| |_| | (_) | | | \__ \
   |_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|___/


********************************************************************************/

function createMonsters(thisManyMonsters) {
    let min = 2;
    let max = 29;
    let monsters = [];
    let y = randomY([],thisManyMonsters);

    for (let i = 0; i < thisManyMonsters; i++) {
     let x = Math.floor(Math.random() * (max - min) + min);
      monsters.push(
	Object.assign(
	  {},
	  objects.monster,
	  { id: "monster" + i },
	  { pos: { x: x, y: y[i] } }
	)
      );
    };
    return monsters;
 }

function randomY(arr, thisManyMonsters ) {
    let min = 9;
    let max = 29;
    let y = arr;

    while (y.length < thisManyMonsters) {
      let n = Math.floor(Math.random() * (max - min) + min);
      if (!y.includes(n)) {
	y.push( n);
      } else {
	randomY(y, y.length);
      }
    }

     return y;
}

function playerInfo()  {

let playerIndex =  state.findIndex(element => element.id==="player"); 
let player = state[playerIndex];

let playerInfo = document.getElementById("playerInfo");
let playerId   = document.getElementById("playerId");
let playerPosX = document.getElementById("playerPosX");
let playerPosY = document.getElementById("playerPosY");
let playerHP   = document.getElementById("playerHP");

playerId.textContent   =   player.id;
playerPosX.textContent =   player.pos.x;
playerPosY.textContent =   player.pos.y;
playerHP.textContent   =   player.HP;
}

function monsterInfoFn()  {

 let allIndx  = (arr, val ) => {

    var indexes = [];
    for(let i = 0; i < arr.length; i++)
	if (arr[i].type === val)
	    indexes.push(i);
     return indexes;

}

 let monstersIndex  = allIndx(state, "monster");


 monstersIndex.forEach( index => {

 let monster = state[index];

 if (monster != undefined ) { 

  let monsterTable   = document.getElementById("monsterTable");
  let monsterDOM     = document.getElementById(monster.id);

  let row = document.createElement('tr');

  let monsterId   = document.createElement('td');
  let monsterPosX = document.createElement('td');
  let monsterPosY = document.createElement('td');
  let monsterHP   = document.createElement('td');


  if(monsterDOM === null) {

    monsterId.id    = `${monster.id}ID`;  
    monsterPosX.id  = `${monster.id}X`;
    monsterPosY.id  = `${monster.id}Y`;
    monsterHP.id    = `${monster.id}HP`; 

    row.id = monster.id;

    row.appendChild(monsterId); 
    row.appendChild(monsterPosX); 
    row.appendChild(monsterPosY); 
    row.appendChild(monsterHP); 

    monsterId.textContent   = monster.id; 
    monsterPosX.textContent = monster.pos.x ;
    monsterPosY.textContent = monster.pos.y;
    monsterHP.textContent   = monster.HP;
    monsterTable.appendChild(row);
  } 


 if (monsterId != null) {

  let tdId = document.getElementById(`${monster.id}ID`);
  let tdX  = document.getElementById(`${monster.id}X`);
  let tdY  = document.getElementById(`${monster.id}Y`);
  let tdHP = document.getElementById(`${monster.id}HP`);

  if (tdHP.textContent === '0') {
   let removeRow = document.getElementById(monster.id);
   removeRow.remove();
  } 


  tdId.textContent    = monster.id; 
  tdX.textContent     = monster.pos.x ;
  tdY.textContent     = monster.pos.y;
  tdHP.textContent    = monster.HP;


   }
  } 
 });

 }

function move (id, direction) {
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

function attackEnemy (id,x,y) { 

 let playerIndex =  state.findIndex(element => element.id===id); 
 let player = state[playerIndex];
 let playerHP =  player.HP;

 let monsterIndex = state.findIndex(el => el.pos.x === x &&  el.pos.y === y); 
 let monster = state[monsterIndex];
 let monsterHP = monster.HP;

 playerHP  -= 1; 
 monsterHP -= 1;

 let newStatePlayer =   Object.assign({}, player, {"HP": playerHP}); 

 let newStateMonster =  Object.assign({}, monster,{"HP": monsterHP});

 return [newStatePlayer,newStateMonster];

 };

function start() {
  // LISTENER
  document.addEventListener("keydown", function(keyDown) {
    interface("player", keyDown.keyCode);
  });

  /* Add wall id to state.
     At the moment the walls are hardcoded (map) 
  */
  state.push(objects.wall);

  // Create monsters (no more than 12) 
  let monsters = createMonsters(8);

  // Add monsters to state
  monsters.forEach(function(elem) {
    state.push(elem);
  });

  // Add player to state
  state.push(objects.player);   

  // Add  player and monsters to map using state
  state.forEach(function(elem) {
    if (elem.id != 1) {
      map[elem.pos.y][elem.pos.x] = elem.id;
    }
  });

  drawMap();
  playerInfo();
  monsterInfoFn();
}





/*
    _____ _____ ___  ______ _____ 
   /  ___|_   _/ _ \ | ___ \_   _|
   \ `--.  | |/ /_\ \| |_/ / | |  
    `--. \ | ||  _  ||    /  | |  
   /\__/ / | || | | || |\ \  | |  
   \____/  \_/\_| |_/\_| \_| \_/  
*/                              




start();

```


<a id="org2805582"></a>

# Demo

[Live link](https://diegoperezm.github.io/roguelike/src/index.html)
