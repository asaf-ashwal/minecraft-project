import { addTree } from "./function.js";

const rows = 31
const column = 101

for (let i = 1; i < rows; i++) {
  for (let j = 1; j < column; j++) {
    const element = document.createElement("div");
    element.classList.add("box");
    if (i === 11) {
      element.classList.add("grass");
    }
    else if (i>=12 && i<=15) {
      element.classList.add("dirt");
    }
    else if (i>=16 && i<=28) {
      element.classList.add("stone");
    }
     else if (i>=29 && i<=30) {
      element.classList.add("bedrock");
    }
    element.style.gridRow = i / (i + 1);
    element.style.gridColumn = j / (j + 1);
    document.body.appendChild(element);
  }
}


addTree(5)
addTree(20)