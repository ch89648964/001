// Game.js - 遊戲邏輯類別
import { Board } from './Board';
import { Tetromino } from './Tetromino';

export class Game {
  constructor() {
    this.board = new Board();
    this.score = 0;
    this.level = 1;
    this.lines = 0;
    this.isGameOver = false;
    this.isPaused = false;
    
    this.currentTetromino = new Tetromino();
    this.nextTetromino = new Tetromino();
  }

  moveLeft() {
    const clone = this.currentTetromino.clone();
    clone.moveLeft();
    
    if (this.board.canPlace(clone)) {
      this.currentTetromino.moveLeft();
    }
  }

  moveRight() {
    const clone = this.currentTetromino.clone();
    clone.moveRight();
    
    if (this.board.canPlace(clone)) {
      this.currentTetromino.moveRight();
    }
  }

  moveDown() {
    const clone = this.currentTetromino.clone();
    clone.moveDown();
    
    if (this.board.canPlace(clone)) {
      this.currentTetromino.moveDown();
      return true;
    } else {
      this.lockTetromino();
      return false;
    }
  }

  rotate() {
    const clone = this.currentTetromino.clone();
    clone.rotate();
    
    if (this.board.canPlace(clone)) {
      this.currentTetromino.rotate();
    }
  }

  hardDrop() {
    while (this.moveDown()) {
      // Keep moving down until it can't
    }
  }

  lockTetromino() {
    this.board.place(this.currentTetromino);
    
    const linesCleared = this.board.clearLines();
    if (linesCleared > 0) {
      this.updateScore(linesCleared);
    }
    
    this.spawnNewTetromino();
  }

  spawnNewTetromino() {
    this.currentTetromino = this.nextTetromino;
    this.nextTetromino = new Tetromino();
    
    if (!this.board.canPlace(this.currentTetromino)) {
      this.isGameOver = true;
    }
  }

  updateScore(linesCleared) {
    const points = [0, 100, 300, 500, 800];
    this.score += points[linesCleared] * this.level;
    this.lines += linesCleared;
    
    // Increase level every 10 lines
    this.level = Math.floor(this.lines / 10) + 1;
  }

  togglePause() {
    if (!this.isGameOver) {
      this.isPaused = !this.isPaused;
    }
  }

  reset() {
    this.board.reset();
    this.score = 0;
    this.level = 1;
    this.lines = 0;
    this.isGameOver = false;
    this.isPaused = false;
    this.currentTetromino = new Tetromino();
    this.nextTetromino = new Tetromino();
  }

  getSpeed() {
    // Speed increases with level (milliseconds)
    return Math.max(100, 1000 - (this.level - 1) * 100);
  }
}
