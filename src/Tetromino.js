// Tetromino.js - 方塊類別
export const TETROMINO_TYPES = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    color: '#00f0f0'
  },
  O: {
    shape: [
      [1, 1],
      [1, 1]
    ],
    color: '#f0f000'
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: '#a000f0'
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    color: '#00f000'
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ],
    color: '#f00000'
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: '#0000f0'
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: '#f0a000'
  }
};

export class Tetromino {
  constructor(type = null) {
    const types = Object.keys(TETROMINO_TYPES);
    this.type = type || types[Math.floor(Math.random() * types.length)];
    
    const tetrominoData = TETROMINO_TYPES[this.type];
    this.shape = JSON.parse(JSON.stringify(tetrominoData.shape));
    this.color = tetrominoData.color;
    
    this.x = 3;
    this.y = 0;
  }

  rotate() {
    // O piece doesn't rotate
    if (this.type === 'O') {
      return;
    }

    const n = this.shape.length;
    const rotated = Array(n).fill(0).map(() => Array(n).fill(0));
    
    // Rotate 90 degrees clockwise
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        rotated[j][n - 1 - i] = this.shape[i][j];
      }
    }
    
    this.shape = rotated;
  }

  moveLeft() {
    this.x--;
  }

  moveRight() {
    this.x++;
  }

  moveDown() {
    this.y++;
  }

  clone() {
    const cloned = new Tetromino(this.type);
    cloned.shape = JSON.parse(JSON.stringify(this.shape));
    cloned.x = this.x;
    cloned.y = this.y;
    return cloned;
  }
}
