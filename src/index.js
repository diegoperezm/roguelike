const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

/*
  canvas 150x150 , tileSize 10

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

let w = 400;
let h = 400;
let tileSize = 13;

/*
 list of objects  and his positions x y
 */

let state = [
  {
    id: "player",
    pos: {
      x: 6,
      y: 5
    },
    width: 10,
    height: 10,
    HP: 10
  },
  {
    id: "monster",
    pos: {
      x: 12,
      y: 3
    },
    width: 10,
    height: 10,
    HP: 3
  }
];

/**
  Functions
 */
function playerInfo() {
  let playerInfo = document.getElementById("playerInfo");
  let playerId = document.getElementById("playerId");
  let playerPosX = document.getElementById("playerPosX");
  let playerPosY = document.getElementById("playerPosY");
  let playerHP = document.getElementById("playerHP");

  playerId.textContent = `id: ${state[0].id}`;
  playerPosX.textContent = ` x: ${state[0].pos.x}`;
  playerPosY.textContent = ` y: ${state[0].pos.y}`;
  playerHP.textContent = `HP: ${state[0].HP}`;
}

function monsterInfoFn() {
  let monsterInfo = document.getElementById("monsterInfo");
  let monsterInfoList = document.getElementById("monsterInfoList");
  let monsterId = document.getElementById("monsterId");
  let monsterPosX = document.getElementById("monsterPosX");
  let monsterPosY = document.getElementById("monsterPosY");
  let monsterHP = document.getElementById("monsterHP");

  if (state[1] !== undefined) {
    monsterId.textContent = `id: ${state[1].id}`;
    monsterPosX.textContent = ` x: ${state[1].pos.x}`;
    monsterPosY.textContent = ` y: ${state[1].pos.y}`;
    monsterHP.textContent = `HP: ${state[1].HP}`;
  } else if (monsterInfoList != null) {
    monsterInfoList.remove();
  }
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

  let monsterIndex = state.findIndex(element => element.id === "monster");
  let monster = state[monsterIndex];
  let monsterHP = monster.HP;

  playerHP -= 1;
  monsterHP -= 1;

  let newStatePlayer = Object.assign({}, player, { HP: playerHP });
  let newStateMonster = Object.assign({}, monster, { HP: monsterHP });
  return [newStatePlayer, newStateMonster];
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

// event { id: 'human', input: 'left||up||right||down' }
function eventHandler(event) {
  let newState;

  // is monster alive?
  if (state[1] != undefined && state[1].HP === 0) {
    newState = state.pop();
    updater(newState);
  }

  newState = move(event.id, event.input);

  if (map[newState.pos.y][newState.pos.x] === 0) {
    updater(newState); // update state
  } else if (map[newState.pos.y][newState.pos.x] === "M") {
    newState = attackEnemy(newState.id, newState.pos.x, newState.pos.y);
    updater(newState);
  } else {
    console.log("collision detected");
  }
}

function updater(newState) {
  if (Array.isArray(newState)) {
    newState.forEach(function(elem) {
      let indx = state.findIndex(ele => ele.id === elem.id);
      state[indx] = elem;
    });
  } else {
    let indx = state.findIndex(ele => ele.id === newState.id);
    indx != -1 ? (state[indx] = newState) : console.log("nothing to update");
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

  // update state
  state.forEach(function(elem) {
    let symbol = elem.id === "player" ? "P" : "M";
    map[elem.pos.y][elem.pos.x] = symbol;
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
  let color;

  map.forEach(function(row, i) {
    row.forEach(function(tile, j) {
      if (tile !== 0) {
        //if tile is not walkable

        switch (tile) {
          // Player
          case "P":
            color = "rgba(255,0,0,1)";
            break;

          // Monster
          case "M":
            color = "rgba(0,0,255,1)";
            break;

          // Wall
          default:
            color = "RGBA(200, 200, 200, 1)";
        }
        ctx.fillStyle = color;
        drawTile(j, i); //draw a rectangle at j,i
      }
    });
  });
}

function drawTile(x, y) {
  ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
}

function start() {
  // LISTENER
  document.addEventListener("keydown", function(keyDown) {
    interface("player", keyDown.keyCode);
  });

  // Add  player and monster using state
  state.forEach(function(elem) {
    let symbol = elem.id === "player" ? "P" : "M";
    map[elem.pos.y][elem.pos.x] = symbol;
  });

  drawMap();
  playerInfo();
  monsterInfoFn();
}

start();
