export function createMatrix() {
  const matrix = [];
  for (let index = 0; index < 31; index++) {
    let tempMatrix = [];
    // check the index and add backround img accordingly
    for (let y = 0; y < 101; y++) {
      tempMatrix.push("div");
    }
    matrix.push(tempMatrix);
  }
  return matrix;
}

export function addleaf(x) {
  let startX = x + 100;
  let innerSteps = 3;
  const element = document.getElementsByClassName("box");
  for (let index = 0; index < 3; index++) {
    for (let i = 0; i < 2; i++) {
      for (let l = 0; l < innerSteps; l++) {
        if (startX >= 0 && startX + l !== x + 600 + 1) {
          element[startX + l].classList.add("leaf");
        }
      }
      startX += 100;
    }
    startX -= 1;
    innerSteps += 2;
  }
}

export function addTree(x) {
  addleaf(x - 1);
  const y = 1;
  const element = document.getElementsByClassName("box");
  for (let i = 0; i < 4; i++) {
    element[x + (y + 5 + i) * 100].classList.add("wood");
  }
}

const body = document.body;

body.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  const target = e.target;
  const currsors = {
    'url("http://127.0.0.1:5500/buttonsImagges/axe.webp"), pointer': "wood",
    'url("http://127.0.0.1:5500/buttonsImagges/pickaxe.webp"), pointer':
      "stone",
    'url("http://127.0.0.1:5500/buttonsImagges/shovel.webp"), pointer': "dirt",
    'url("http://127.0.0.1:5500/buttonsImagges/shears.webp"), pointer': "leaf",
  };

  const blockCurrsor = {
    'url("http://127.0.0.1:5500/images/wood.webp"), pointer': "wood",
    'url("http://127.0.0.1:5500/images/leaf.webp"), pointer': "leaf",
    'url("http://127.0.0.1:5500/images/stone.webp"), pointer': "stone",
    'url("http://127.0.0.1:5500/images/dirt.webp"), pointer': "dirt",
    'url("http://127.0.0.1:5500/images/grass.webp"), pointer': "grass",
  };

  // reduce from localStorage i
  const cursorType = window.getComputedStyle(e.target).cursor;
  const isContains = target.classList.contains(currsors[cursorType]);
  const storage = localStorage;
  if (isContains) {
    addBlockToMemory(storage, currsors[cursorType]);
    target.classList = "box";
  } else if (
    currsors[cursorType] === "dirt" &&
    target.classList.contains("grass")
  ) {
    addBlockToMemory(storage, "grass");
    target.classList = "box";
  } else if (blockCurrsor[cursorType] && target.classList.length <= 1) {
    e.target.classList.add(blockCurrsor[cursorType]);
    localStorageReducer(blockCurrsor[cursorType],storage)
  }

  console.log(storage);
});

const [menu, menu2] = document.querySelectorAll("nav");
menu2.addEventListener("click", (e) => {
  const target = e.target;
  changeTheCursor(target.classList[0]);
});

function addBlockToMemory(storage, type) {
  const subjectItems = Number(storage.getItem(type));
  storage.setItem(type, subjectItems + 1);
  if (subjectItems) {
    const button = document.querySelector(`button.${type}`);
    console.log('addBlockToMemory',button);
    button.textContent = subjectItems + 1;
  } else {
    const button = document.createElement("button");
    button.classList.add(type);
    button.id = `button${type}`;
    button.textContent = subjectItems + 1;
    aside.appendChild(button);
  }
}

const aside = document.querySelector("aside");
aside.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  changeTheCursor(e.target.classList[0]);
});

function changeTheCursor(type) {
  const currsors = {
    axe: 'url("http://127.0.0.1:5500/buttonsImagges/axe.webp"), pointer',
    pickaxe:
      'url("http://127.0.0.1:5500/buttonsImagges/pickaxe.webp"), pointer',
    shovel: 'url("http://127.0.0.1:5500/buttonsImagges/shovel.webp"), pointer',
    shears: 'url("http://127.0.0.1:5500/buttonsImagges/shears.webp"), pointer',
    wood: 'url("http://127.0.0.1:5500/images/wood.webp"), pointer',
    leaf: 'url("http://127.0.0.1:5500/images/leaf.webp"), pointer',
    stone: 'url("http://127.0.0.1:5500/images/stone.webp"), pointer',
    dirt: 'url("http://127.0.0.1:5500/images/dirt.webp"), pointer',
    grass: 'url("http://127.0.0.1:5500/images/grass.webp"), pointer',
  };
  body.style.cursor = currsors[type];
}

function localStorageReducer(type, storage) {
  console.log('type: ',`#button${type}`);
  
  const subjectItems = Number(storage.getItem(type));
  const newN = subjectItems - 1;
  storage.setItem(type, newN);
  console.log(`#button${type}`);
  
  const button = document.querySelector(`#button${type}`);
  button.textContent = newN;
  if (newN === 0) {
    button.remove();
    storage.removeItem(type)
    document.body.style.cursor = 'auto'
  }
}
