let selectedColor = '';

const boards = [
  [
    [
      [1, 2, 1],
      [2, 3, 2],
      [1, 2, 1],
    ],
    {
      1: 'red',
      2: 'blue',
      3: 'green',
    },
  ],
  [
    [
      [2, 1, 2],
      [3, 1, 3],
      [2, 1, 2],
    ],
    {
      1: 'green',
      2: 'blue',
      3: 'red',
    },
  ],
  [
    [
      [3, 2, 2],
      [1, 3, 2],
      [1, 1, 3],
    ],
    {
      1: 'blue',
      2: 'red',
      3: 'green',
    },
  ],
];

const createColors = colors => {
  const colorsEl = document.querySelector('.colors');
  for (const [key, value] of Object.entries(colors)) {
    let color = document.createElement('li');
    color.className = 'color';
    color.textContent = key;
    color.style.backgroundColor = value;
    color.addEventListener('click', e => {
      if (selectedColor !== '');
        document.querySelectorAll('.color').forEach(x => {
          x.style.border = '';
        });
      selectedColor = value;
      color.style.border = '4px solid #000';
    })
    colorsEl.appendChild(color);
  }
}

const createBoard = board => {
  const rootEl = document.querySelector('.root');
  const boardEl = document.querySelector('.board');
  let rows = board[0].length;
  let columns = board[0][0].length;
  for (let r = 0; rows > r; r++) {
    let row = document.createElement('div');
    row.className = 'row';
    boardEl.appendChild(row);
    for (let c = 0; columns > c; c++) {
      let blockValue = board[0][r][c];
      let block = document.createElement('div');
      block.className = 'block';
      block.textContent = `${blockValue}`;
      block.dataset.color = board[1][blockValue];
      block.addEventListener('click', e => {
        if (selectedColor === block.dataset.color) {
          block.dataset.completed = true;
          block.style.backgroundColor = selectedColor;
        } else {
          if (!block.dataset.completed) block.style.backgroundColor = 'gray';
        }
        if (
          document.querySelectorAll('[data-completed]').length ===
          rows * columns
        ) {
          rootEl.children[rootEl.children.length - 2].className = 'finish';
          rootEl.children[rootEl.children.length - 2].innerHTML =
            '<div style="">FINISHED!</div>';
          rootEl.lastElementChild.addEventListener('click', e => {
            location.reload();
          })
          rootEl.lastElementChild.innerHTML =
            '<button class="block">RESTART</button>';
        }
      });
      row.appendChild(block);
    }
  }
  createColors(board[1]);
};

const chosenBoard = Math.floor(Math.random() * boards.length);
console.log(chosenBoard);
createBoard(boards[chosenBoard]);
