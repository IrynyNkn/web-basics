let lastRandomColor = "";
let isRandom = true;

function createTable() {
  let rows = 6;
  let cols = 6;
  let table = document.getElementById("changing-table");
  table.innerHTML = "";
  for (let i = 0; i < rows; i++) {
    var row = table.insertRow(i);
    for (let j = 0; j < cols; j++) {
      const newCell = row.insertCell(j);
      newCell.setAttribute('row', i.toString());
      newCell.setAttribute('cell', j.toString());
    }
  }
}

function printNumbers() {
  let rows = document.getElementById("changing-table").children[0].children;
  for (let i = 0; i < rows.length; i++) {
    let cols = rows[i].children;
    for (let j = 0; j < cols.length; j++) {
      let cell = cols[j];
      cell.innerHTML = `${i * 6 + j + 1}`;
      cell.addEventListener("mouseover", changeColorByHover);
      cell.addEventListener("mouseout", changeColorByUnhover);
      cell.addEventListener("click", changeColorByClick);
      cell.addEventListener("dblclick", changeColorByDbclick);
    }
  }
}

function changeColorByHover(e) {
  if (e.srcElement.innerHTML !== "6") {
    return;
  }

  this.style.background = getRandomRgbColor();
}

function changeColorByUnhover(e) {
  if (e.srcElement.innerHTML !== "6") {
    return;
  }

  if (this.style.background === lastRandomColor) {
    this.style.background = "white";
  }
}

function changeColorByClick(e) {
  if (e.srcElement.innerHTML !== "6") {
    return;
  }
  this.style.background = document.getElementById("palit").value;
}

function changeColorByDbclick() {
  const dbClickedRow = Number(this.getAttribute('row'));
  const dbClickedCell = Number(this.getAttribute('cell'));

  const tds = document.querySelectorAll("td");
  const color = isRandom ? getRandomRgbColor() : "#FFFFFF";
  tds.forEach((td) => {
    const curRow = Number(td.getAttribute('row'));
    const curCell = Number(td.getAttribute('cell'));
    if (curRow >= dbClickedRow && curCell >= dbClickedCell) {
      td.style.background = color;
    }
  });

  isRandom = !isRandom;
}

function getRandomRgbColor() {
  const o = Math.round,
    r = Math.random,
    s = 255;
  const color =
    "rgb(" + o(r() * s) + ", " + o(r() * s) + ", " + o(r() * s) + ")";
  lastRandomColor = color;

  return color;
}

createTable();
printNumbers();
