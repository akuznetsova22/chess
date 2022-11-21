class Board {
  #size
  #boardElement
  #player
  #movePlayed
  #cellSize
  #playerImages = []
  
  constructor(size, boardElement, player, movePlayed) {
    this.#size = size;
    this.#boardElement = boardElement;
    this.#player = player;
    this.#cellSize = Math.floor(this.#boardElement.clientWidth / size);    
    this.#movePlayed = movePlayed;
    this.#getImages();
  }

  #getImages() {
    this.#playerImages[0] = 'images/player-x.png';
    this.#playerImages[1] = 'images/player-o.png';
  }

  draw() {
    for (let i = 0; i < this.#size; i++) {
      const rowElement = document.createElement('div');
      rowElement.className = 'row';

      for (let j = 0; j < this.#size; j++) {
        const cellElement = document.createElement('div');
        cellElement.className = 'cell';
        cellElement.dataset.row = i;
        cellElement.dataset.column = j;
        cellElement.style.width = this.#cellSize + 'px';
        cellElement.style.height = this.#cellSize + 'px';
        rowElement.appendChild(cellElement);
      }
      this.#boardElement.appendChild(rowElement);
    }

    this.#boardElement.addEventListener('click', e => {
      this.#playMove(e);
    });
  }

  #playMove(e) {
    const cell = e.target;
    // Ignore clicks outside a cell
    if (cell.dataset.row === undefined) {
      return;
    }

    const row = Number(cell.dataset.row);
    const column = Number(cell.dataset.column);    
    this.#movePlayed(row, column);
  }

  updateBoard(player, row, column) {
    const selector = `div[data-row="${row}"][data-column="${column}"]`;
    const cellElement = this.#boardElement.querySelector(selector);

    const image = new Image();
    image.src = this.#playerImages[player - 1];
    image.width = 0.9 * this.#cellSize;
    cellElement.appendChild(image);
  }
}

export default Board;