/* 
                    _       _     _           
                   (_)     | |   | |          
   __   ____ _ _ __ _  __ _| |__ | | ___  ___ 
   \ \ / / _` | '__| |/ _` | '_ \| |/ _ \/ __|
    \ V / (_| | |  | | (_| | |_) | |  __/\__ \
     \_/ \__,_|_|  |_|\__,_|_.__/|_|\___||___/
*/

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let w = 400;
let h = 400;
let tileSize = 13;

const objects = {
  wall: {
    id: 1, // wall
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
    HP: 3
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

/* GLOBAL */
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

/*
 list of objects  and his positions x y
 */

let state = [];

/*
    _ __  _ __ ___   __ _ _ __ __ _ _ __ ___  
   | '_ \| '__/ _ \ / _` | '__/ _` | '_ ` _ \ 
   | |_) | | | (_) | (_| | | | (_| | | | | | |
   | .__/|_|  \___/ \__, |_|  \__,_|_| |_| |_|
   | |               __/ |                    
   |_|              |___/     
*/

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

  let event = Object.assign({ id: id }, { input: input }, {});
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
    action = "walk";
  } else if (typeof map[nextMove.pos.y][nextMove.pos.x] === "string") {
    action = "attack";
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
    if (elem.id != 1) {
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

function drawMap() {
  ctx.clearRect(0, 0, w, h);
  map.forEach(function(row, i) {
    row.forEach(function(tile, j) {
      if (tile != 0) {
        let index = state.findIndex(ele => ele.id === tile);
        let color = state[index].color;
        ctx.fillStyle = color;
        drawTile(j, i);
      }
    });
  });
}

function drawTile(x, y) {
  ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
}

/*
     __                  _   _                 
    / _|                | | (_)                
   | |_ _   _ _ __   ___| |_ _  ___  _ __  ___ 
   |  _| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
   | | | |_| | | | | (__| |_| | (_) | | | \__ \
   |_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|___/
 */

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

function playerInfo() {
  let playerIndex = state.findIndex(element => element.id === "player");
  let player = state[playerIndex];

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

function monsterInfoFn() {
  let allIndx = (arr, val) => {
    var indexes = [];
    for (let i = 0; i < arr.length; i++)
      if (arr[i].type === val) indexes.push(i);
    return indexes;
  };

  let monstersIndex = allIndx(state, "monster");

  monstersIndex.forEach(index => {
    let monster = state[index];

    if (monster != undefined) {
      let monsterTable = document.getElementById("monsterTable");
      let monsterDOM = document.getElementById(monster.id);

      let row = document.createElement("tr");

      let monsterId = document.createElement("td");
      let monsterPosX = document.createElement("td");
      let monsterPosY = document.createElement("td");
      let monsterHP = document.createElement("td");

      if (monsterDOM === null) {
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
      }

      if (monsterId != null) {
        let tdId = document.getElementById(`${monster.id}ID`);
        let tdX = document.getElementById(`${monster.id}X`);
        let tdY = document.getElementById(`${monster.id}Y`);
        let tdHP = document.getElementById(`${monster.id}HP`);

        if (tdHP.textContent === "0") {
          let removeRow = document.getElementById(monster.id);
          removeRow.remove();
        }

        tdId.textContent = monster.id;
        tdX.textContent = monster.pos.x;
        tdY.textContent = monster.pos.y;
        tdHP.textContent = monster.HP;
      }
    }
  });
}

function move(id, direction) {
  let x;
  let y;
  let indexId = state.findIndex(element => element.id === id);

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

  let newState = Object.assign({}, state[indexId], {
    id: id,
    pos: { x: x, y: y }
  });
  return newState;
}

function attackEnemy(id, x, y) {
  let playerIndex = state.findIndex(element => element.id === id);
  let player = state[playerIndex];
  let playerHP = player.HP;

  let monsterIndex = state.findIndex(el => el.pos.x === x && el.pos.y === y);
  let monster = state[monsterIndex];
  let monsterHP = monster.HP;

  playerHP -= 1;
  monsterHP -= 1;

  let newStatePlayer = Object.assign({}, player, { HP: playerHP });

  let newStateMonster = Object.assign({}, monster, { HP: monsterHP });

  return [newStatePlayer, newStateMonster];
}

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
