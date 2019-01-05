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

/******************************************************************************* 

    _____  _     ___________  ___   _     
   |  __ \| |   |  _  | ___ \/ _ \ | |    
   | |  \/| |   | | | | |_/ / /_\ \| |    
   | | __ | |   | | | | ___ \  _  || |    
   | |_\ \| |___\ \_/ / |_/ / | | || |____
    \____/\_____/\___/\____/\_| |_/\_____/


********************************************************************************/

let worldData = [];

var nextAttack;

const objects = {
  wall: {
    id: 1,
    color: "rgba(200, 200, 200, 1)",
    pos: {
      x: 0,
      y: 0
    }
  },
  monster: {
    id: "monster",
    type: "monster",
    color: "rgba(0,0,255,1)",
    pos: {
      x: 0,
      y: 0
    },
    width: 10,
    height: 10,
    HP: 1
  },
  player: {
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

var fsm = {
  currentState: "IDLE",
  states: {
    IDLE: {
      left: "COLLISIONDETECTION",
      up: "COLLISIONDETECTION",
      right: "COLLISIONDETECTION",
      down: "COLLISIONDETECTION"
    },
    COLLISIONDETECTION: {
      left: "COLLISIONDETECTION",
      up: "COLLISIONDETECTION",
      right: "COLLISIONDETECTION",
      down: "COLLISIONDETECTION",
      walk: "MOVING",
      attack: "ISALIVE"
    },

    MOVING: {
      left: "COLLISIONDETECTION",
      up: "COLLISIONDETECTION",
      right: "COLLISIONDETECTION",
      down: "COLLISIONDETECTION",
      walk: "IDLE"
    },

    ISALIVE: {
      yes: "ATTACKING",
      no: "REMOVE"
    },

    ATTACKING: {
      x: "ISALIVE"
    },

    REMOVE: {
      left: "COLLISIONDETECTION",
      up: "COLLISIONDETECTION",
      right: "COLLISIONDETECTION",
      down: "COLLISIONDETECTION"
    }
  }
};

function transition(nextMove, currentState, action, id) {
  console.log("transition ^", nextMove, currentState, action, id);

  var state = currentState;
  let newState;

  if (fsm.states[state][action]) {
    var nextState = fsm.states[state][action];
    fsm.currentState = nextState;

    switch (nextState) {
      case "IDLE":
        console.log("STATE IDLE");

        break;

      case "COLLISIONDETECTION":
        console.log("COLLISIONDETECTION state ");
        collisionDetection(action, id);
        break;

      case "MOVING":
        console.log("MOVING state ");
        newState = nextMove;
        updater(newState, "walk");
        break;

      case "ISALIVE":
        console.log("ISALIVE state nextMove ", nextMove, nextAttack);

        nextAttack =
          (Object.keys(nextMove).length === 0) &
          (nextMove.constructor === Object)
            ? nextAttack
            : nextMove;

        isAlive(nextAttack);
        break;

      case "ATTACKING":
        console.log("ATTACKING STATE ", nextMove);
        updater(nextMove, "attack");
        break;

      case "REMOVE":
        console.log("REMOVE state", nextMove);
        updater(nextMove, "remove");
        break;
    }
  }
}

function interface(id, keyCode) {
  let input = Object.assign({ id: id }, { keyCode: keyCode }, {});
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

    case 88:
      input = "x";
      break;
  }

  let event = Object.assign({ id: id }, { input: input }, {});

  transition({}, fsm.currentState, event.input, event.id);
}

function collisionDetection(input, id) {
  let nextMove = move(id, input);

  switch (fsm.currentState) {
    case "COLLISIONDETECTION":
      if (map[nextMove.pos.y][nextMove.pos.x] === 0) {
        transition(nextMove, fsm.currentState, "walk", {});

        break;
      } else if (typeof map[nextMove.pos.y][nextMove.pos.x] === "string") {
        transition(nextMove, fsm.currentState, "attack", {});

        break;
      } else {
        console.log("collision detected");
        break;
      }
  }
}

function updater(newState, action) {
  console.log("updater", newState, action);

  switch (action) {
    case "walk":
      let index = worldData.findIndex(elem => elem.id === newState.id);
      worldData[index] = newState;
      break;

    case "attack":
      newState.forEach(function(elem) {
        let index = worldData.findIndex(ele => ele.id === elem.id);
        worldData[index] = elem;
      });
      break;

    case "remove":
      console.log("remove remove  ", newState);

      let removeMonsterInfo = differenceArray(worldData, newState);

      monsterInfoRemove(removeMonsterInfo);
      worldData = newState;
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
  worldData.forEach(function(elem) {
    if (elem.id != 1) {
      map[elem.pos.y][elem.pos.x] = elem.id;
    }
  });

  // draw map with the current state
  drawMap();

  // update player info with current state
  playerInfo();

  // update monster info with current state
  monsterInfoUpdate();
}

function drawMap() {
  ctx.clearRect(0, 0, w, h);
  map.forEach(function(row, i) {
    row.forEach(function(tile, j) {
      if (tile != 0) {
        let index = worldData.findIndex(ele => ele.id === tile);
        let color = worldData[index].color;
        ctx.fillStyle = color;
        drawTile(j, i);
      }
    });
  });
}

function drawTile(x, y) {
  ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
}

/******************************************************************************* 


     __                  _   _                 
    / _|                | | (_)                
   | |_ _   _ _ __   ___| |_ _  ___  _ __  ___ 
   |  _| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
   | | | |_| | | | | (__| |_| | (_) | | | \__ \
   |_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|___/


********************************************************************************/

function playerInfo() {
  let playerIndex = worldData.findIndex(elem => elem.id === "player");
  let player = worldData[playerIndex];

  let playerInfo = document.getElementById("playerInfo");
  let playerId = document.getElementById("playerId");
  let playerPosX = document.getElementById("playerPosX");
  let playerPosY = document.getElementById("playerPosY");
  let playerHP = document.getElementById("playerHP");

  playerId.textContent = player.id;
  playerPosX.textContent = player.pos.x;
  playerPosY.textContent = player.pos.y;
  playerHP.textContent = player.HP;
}

function createMonsters(thisManyMonsters) {
  let min = 2;
  let max = 29;
  let monsters = [];
  let y = randomY([], thisManyMonsters);

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
  }
  return monsters;
}

function monsterInfoCreateDOM() {
  console.log("monsterInfoCreateDOM");

  let monstersIndex = allIndxTypeMonster(worldData, "monster");
  console.log("monsterInfoCreateDOM", monstersIndex);

  monstersIndex.forEach(index => {
    let monster = worldData[index];

    let monsterTable = document.getElementById("monsterTable");
    let monsterDOM = document.getElementById(monster.id);

    let row = document.createElement("tr");
    let monsterId = document.createElement("td");
    let monsterPosX = document.createElement("td");
    let monsterPosY = document.createElement("td");
    let monsterHP = document.createElement("td");

    monsterId.id = `${monster.id}ID`;
    monsterPosX.id = `${monster.id}X`;
    monsterPosY.id = `${monster.id}Y`;
    monsterHP.id = `${monster.id}HP`;

    row.id = monster.id;

    row.appendChild(monsterId);
    row.appendChild(monsterPosX);
    row.appendChild(monsterPosY);
    row.appendChild(monsterHP);

    monsterId.textContent = monster.id;
    monsterPosX.textContent = monster.pos.x;
    monsterPosY.textContent = monster.pos.y;
    monsterHP.textContent = monster.HP;

    monsterTable.appendChild(row);
  });
}

function monsterInfoUpdate() {
  console.log("monsterinfoUpdate");

  let monstersIndex = allIndxTypeMonster(worldData, "monster");

  monstersIndex.forEach(index => {
    let monster = worldData[index];
    let monsterTable = document.getElementById("monsterTable");
    let monsterDOM = document.getElementById(monster.id);

    let tdId = document.getElementById(`${monster.id}ID`);
    let tdX = document.getElementById(`${monster.id}X`);
    let tdY = document.getElementById(`${monster.id}Y`);
    let tdHP = document.getElementById(`${monster.id}HP`);

    tdId.textContent = monster.id;
    tdX.textContent = monster.pos.x;
    tdY.textContent = monster.pos.y;
    tdHP.textContent = monster.HP;
  });
}

function monsterInfoRemove(removeMonster) {
  let monsterId = removeMonster[0].id;
  let monsterToRemove = document.getElementById(monsterId);

  monsterToRemove.remove();
}

function move(id, direction) {
  let x;
  let y;
  let indexId = worldData.findIndex(element => element.id === id);

  switch (direction) {
    case "left":
      x = worldData[indexId].pos.x - 1;
      y = worldData[indexId].pos.y;
      break;

    case "up":
      x = worldData[indexId].pos.x;
      y = worldData[indexId].pos.y - 1;
      break;

    case "right":
      x = worldData[indexId].pos.x + 1;
      y = worldData[indexId].pos.y;
      break;

    case "down":
      x = worldData[indexId].pos.x;
      y = worldData[indexId].pos.y + 1;
      break;
  }

  let newState = Object.assign({}, worldData[indexId], {
    id: id,
    pos: { x: x, y: y }
  });
  return newState;
}

function attackEnemy(id, x, y) {
  let playerIndex = worldData.findIndex(elem => elem.id === id);
  let player = worldData[playerIndex];
  let playerHP = player.HP;

  let monsterIndex = worldData.findIndex(
    elem => elem.pos.x === x && elem.pos.y === y
  );
  let monster = worldData[monsterIndex];
  let monsterHP = monster.HP;

  playerHP -= 1;
  monsterHP -= 1;

  let newStatePlayer = Object.assign({}, player, { HP: playerHP });

  let newStateMonster = Object.assign({}, monster, { HP: monsterHP });

  return [newStatePlayer, newStateMonster];
}

function isAlive(input) {
  console.log("isAlive input ", input);

  let notAliveIndex = worldData.findIndex(elem => elem.HP <= 0);

  console.log("isAlive notAlive", notAliveIndex);

  if (notAliveIndex === -1) {
    let nextAttack = attackEnemy(input.id, input.pos.x, input.pos.y);
    transition(nextAttack, fsm.currentState, "yes", {});
  } else {
    let newState = worldData.filter(
      elem => elem.id != worldData[notAliveIndex].id
    );
    transition(newState, fsm.currentState, "no", {});
  }
}

function differenceArray(a, b) {
  return a.filter(function(elem) {
    return b.indexOf(elem) < 0;
  });
}

function allIndxTypeMonster(arr, val) {
  let indexes = [];

  for (let index = 0; index < arr.length; index++)
    if (arr[index].type === val) indexes.push(index);

  return indexes;
}

function randomY(arr, thisManyMonsters) {
  let min = 9;
  let max = 29;
  let y = arr;

  while (y.length < thisManyMonsters) {
    let n = Math.floor(Math.random() * (max - min) + min);
    if (!y.includes(n)) {
      y.push(n);
    } else {
      randomY(y, y.length);
    }
  }

  return y;
}

function start() {
  // LISTENER
  document.addEventListener("keydown", function(keyDown) {
    interface("player", keyDown.keyCode);
  });

  /* Add wall id to state.
     At the moment the walls are hardcoded (map) 
  */
  worldData.push(objects.wall);

  // Create monsters (no more than 12)
  let monsters = createMonsters(8);

  // Add monsters to state
  monsters.forEach(function(elem) {
    worldData.push(elem);
  });

  // Add player to state
  worldData.push(objects.player);

  // Add  player and monsters to map using state
  worldData.forEach(function(elem) {
    if (elem.id != 1) {
      map[elem.pos.y][elem.pos.x] = elem.id;
    }
  });

  drawMap();
  playerInfo();
  monsterInfoCreateDOM();
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
