// Board.js - 遊戲板類別
export class Board {
  constructor(rows = 20, cols = 10) {
    this.rows = rows;
    this.cols = cols;
    this.grid = this.createEmptyGrid();
  }

  createEmptyGrid() {
    return Array(this.rows).fill(0).map(() => Array(this.cols).fill(0));
  }

  canPlace(tetromino) {
    for (let row = 0; row < tetromino.shape.length; row++) {
      for (let col = 0; col < tetromino.shape[row].length; col++) {
        if (tetromino.shape[row][col]) {
          const boardRow = tetromino.y + row;
          const boardCol = tetromino.x + col;

          // Check boundaries
          if (boardRow < 0 || boardRow >= this.rows || 
              boardCol < 0 || boardCol >= this.cols) {
            return false;
          }

          // Check collision with existing blocks
          if (this.grid[boardRow][boardCol]) {
            return false;
          }
        }
      }
    }
    return true;
  }

  place(tetromino) {
    for (let row = 0; row < tetromino.shape.length; row++) {
      for (let col = 0; col < tetromino.shape[row].length; col++) {
        if (tetromino.shape[row][col]) {
          const boardRow = tetromino.y + row;
          const boardCol = tetromino.x + col;
          if (boardRow >= 0 && boardRow < this.rows && 
              boardCol >= 0 && boardCol < this.cols) {
            this.grid[boardRow][boardCol] = 1;
          }
        }
      }
    }
  }

  clearLines() {
    let linesCleared = 0;
    
    for (let row = this.rows - 1; row >= 0; row--) {
      if (this.grid[row].every(cell => cell !== 0)) {
        // Remove the completed line
        this.grid.splice(row, 1);
        // Add new empty line at top
        this.grid.unshift(Array(this.cols).fill(0));
        linesCleared++;
        row++; // Check the same row again
      }
    }
    
    return linesCleared;
  }

  reset() {
    this.grid = this.createEmptyGrid();
  }
}
