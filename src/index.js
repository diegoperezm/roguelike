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
const { Machine, actions } = window.XState;
const { interpret } = window.XStateInterpreter;
const { assign, log } = actions;

const fsm = Machine(
  {
    id: "fsmOne",

    initial: "idle",

    context: {
      nextMove: {
        x: 6,
        y: 5
      },
      nextAttack: [],
      isAlive: ""
    },

    states: {
      idle: {
        on: {
          LEFT: {
            target: "collisiondetection"
          },

          UP: {
            target: "collisiondetection"
          },

          RIGHT: {
            target: "collisiondetection"
          },

          DOWN: {
            target: "collisiondetection"
          }
        },

        onExit: ["nextMoveFn"]
      },

      collisiondetection: {
        invoke: {
          src: (ctx, event) => (callback, onEvent) => {
            const result = collisionDetection(ctx, event);
            callback(result);
          }
        },
        on: {
          WALK: {
            target: "moving"
          },
          WALL: {
            target: "idle"
          },
          MONSTER: {
            target: "isAlive"
          }
        }
      },

      moving: {
        invoke: {
          src: (ctx, event) => (callback, onEvent) => {
            callback("WALK");
          }
        },
        on: {
          WALK: {
            target: "idle",
            actions: ["updater"]
          }
        }
      },

      isAlive: {
        invoke: {
          src: (ctx, event) => (callback, onEvent) => {
            const isAliveResult = isAlive();
            callback(isAliveResult);
          }
        },

        on: {
          YES: {
            target: "attacking",
            actions: "nextAttackFn"
          },
          NO: { target: "remove" }
        }
      },

      attacking: {
        on: {
          ATTACK: {
            target: "isAlive"
          }
        },
        onExit: "updater"
      },

      remove: {
        invoke: {
          src: (ctx, event) => (callback, onEvent) => {
            callback("REMOVE");
          }
        },
        on: {
          REMOVE: {
            target: "idle"
          }
        },
        onExit: "updater"
      }
    }
  },
  {
    actions: {
      nextMoveFn: assign({ nextMove: (ctx, event) => move(ctx, event) }),
      nextAttackFn: assign({
        nextAttack: (ctx, event) => attackEnemy(ctx, event)
      }),
      attackEnemy,
      updater,
      move
    }
  }
);

const fsmService = interpret(fsm);

function interface(id, keyCode) {
  let input = Object.assign({ id: id }, { keyCode: keyCode }, {});
  inputHandler(input);
}

function inputHandler(inputObj) {
  let input;
  let id = inputObj.id;

  switch (inputObj.keyCode) {
    case 37:
      input = "LEFT";
      break;

    case 72:
      input = "LEFT";
      break;

    case 38:
      input = "UP";
      break;

    case 75:
      input = "UP";
      break;

    case 39:
      input = "RIGHT";
      break;

    case 76:
      input = "RIGHT";
      break;

    case 40:
      input = "DOWN";
      break;

    case 74:
      input = "DOWN";
      break;

    case 88:
      input = "ATTACK";
      break;
  }

  fsmService.send(input);
}

function collisionDetection(extendedState, event) {
  let nextMove = extendedState.nextMove;

  let x = nextMove.x;
  let y = nextMove.y;

  if (map[y][x] === 0) {
    return "WALK";
  } else if (map[y][x] === 1) {
    return "WALL";
  } else if (typeof map[y][x] === "string") {
    return "MONSTER";
  }
}

function updater(extendedState, event) {
  let action = event.type;

  switch (action) {
    case "WALK":
      let index = worldData.findIndex(elem => elem.id === "player");
      worldData[index].pos.x = extendedState.nextMove.x;
      worldData[index].pos.y = extendedState.nextMove.y;
      break;

    case "ATTACK":
      extendedState.nextAttack.forEach(elem => {
        let index = worldData.findIndex(elem2 => elem2.id === elem.id);
        worldData[index] = elem;
      });
      break;

    case "REMOVE":
      let indx = extendedState.nextAttack.findIndex(elem => elem.HP <= 0);
      let arr = [];
      arr[0] = extendedState.nextAttack[indx];
      let newWorldData = differenceArray(worldData, arr);
      worldData = newWorldData;
      monsterInfoRemove(arr[0]);
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
  let monstersIndex = allIndxTypeMonster(worldData, "monster");

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
  let monsterId = removeMonster.id;
  let monsterToRemove = document.getElementById(monsterId);

  monsterToRemove.remove();
}

function move(extendedState, event) {
  let direction = event.type;

  let x;
  let y;

  let indexId = worldData.findIndex(element => element.id === "player");

  switch (direction) {
    case "LEFT":
      x = worldData[indexId].pos.x - 1;
      y = worldData[indexId].pos.y;
      break;

    case "UP":
      x = worldData[indexId].pos.x;
      y = worldData[indexId].pos.y - 1;
      break;

    case "RIGHT":
      x = worldData[indexId].pos.x + 1;
      y = worldData[indexId].pos.y;
      break;

    case "DOWN":
      x = worldData[indexId].pos.x;
      y = worldData[indexId].pos.y + 1;
      break;
  }

  return { x: x, y: y };
}

function attackEnemy(extendedState) {
  let playerIndex = worldData.findIndex(elem => elem.id === "player");
  let player = worldData[playerIndex];
  let playerHP = player.HP;

  let x = extendedState.nextMove.x;
  let y = extendedState.nextMove.y;

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

function isAlive() {
  let index = worldData.findIndex(elem => elem.HP <= 0);
  if (index === -1) {
    return "YES";
  } else {
    return "NO";
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
  document.addEventListener(
    "keydown",
    _.throttle(keyDown => interface("player", keyDown.keyCode), 100, {
      trailing: false
    })
  );

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

fsmService.start();

start();
