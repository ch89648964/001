// index.js - 主程式入口
import './styles.css';
import { Game } from './Game';
import { ScoreBoard } from './ScoreBoard';

class TetrisGame {
  constructor() {
    this.game = new Game();
    this.scoreBoard = new ScoreBoard();
    this.canvas = document.getElementById('tetris');
    this.nextCanvas = document.getElementById('next-piece');
    this.ctx = this.canvas.getContext('2d');
    this.nextCtx = this.nextCanvas.getContext('2d');
    
    this.blockSize = 24;
    this.animationId = null;
    this.lastTime = 0;
    
    this.initControls();
    this.initKeyboard();
    this.renderLeaderBoard();
  }

  initControls() {
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const restartBtn = document.getElementById('restart-btn');

    startBtn.addEventListener('click', () => this.start());
    pauseBtn.addEventListener('click', () => this.togglePause());
    restartBtn.addEventListener('click', () => this.restart());
  }

  initKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (this.game.isGameOver || this.game.isPaused) {
        if (e.key === 'p' || e.key === 'P') {
          this.togglePause();
        }
        return;
      }

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          this.game.moveLeft();
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.game.moveRight();
          break;
        case 'ArrowDown':
          e.preventDefault();
          this.game.moveDown();
          break;
        case 'ArrowUp':
        case ' ':
          e.preventDefault();
          this.game.rotate();
          break;
        case 'p':
        case 'P':
          this.togglePause();
          break;
      }
      
      this.draw();
    });
  }

  start() {
    if (this.animationId) return;
    
    document.getElementById('start-btn').disabled = true;
    document.getElementById('pause-btn').disabled = false;
    
    this.lastTime = performance.now();
    this.gameLoop(this.lastTime);
  }

  togglePause() {
    this.game.togglePause();
    
    if (this.game.isPaused) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
      document.getElementById('pause-btn').textContent = '繼續';
    } else {
      this.lastTime = performance.now();
      this.gameLoop(this.lastTime);
      document.getElementById('pause-btn').textContent = '暫停';
    }
  }

  restart() {
    this.game.reset();
    
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    
    document.getElementById('start-btn').disabled = false;
    document.getElementById('pause-btn').disabled = true;
    document.getElementById('pause-btn').textContent = '暫停';
    
    this.draw();
    this.updateUI();
  }

  gameLoop(currentTime) {
    if (this.game.isGameOver) {
      this.handleGameOver();
      return;
    }

    const deltaTime = currentTime - this.lastTime;
    
    if (deltaTime >= this.game.getSpeed()) {
      this.game.moveDown();
      this.lastTime = currentTime;
    }

    this.draw();
    this.updateUI();
    
    this.animationId = requestAnimationFrame((time) => this.gameLoop(time));
  }

  draw() {
    this.drawBoard();
    this.drawCurrentTetromino();
    this.drawNextTetromino();
  }

  drawBoard() {
    // Clear canvas
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw grid
    this.ctx.strokeStyle = '#333';
    this.ctx.lineWidth = 0.5;
    
    for (let row = 0; row < this.game.board.rows; row++) {
      for (let col = 0; col < this.game.board.cols; col++) {
        this.ctx.strokeRect(
          col * this.blockSize,
          row * this.blockSize,
          this.blockSize,
          this.blockSize
        );
        
        if (this.game.board.grid[row][col]) {
          this.ctx.fillStyle = '#888';
          this.ctx.fillRect(
            col * this.blockSize + 1,
            row * this.blockSize + 1,
            this.blockSize - 2,
            this.blockSize - 2
          );
        }
      }
    }
  }

  drawCurrentTetromino() {
    const tetromino = this.game.currentTetromino;
    this.ctx.fillStyle = tetromino.color;
    
    for (let row = 0; row < tetromino.shape.length; row++) {
      for (let col = 0; col < tetromino.shape[row].length; col++) {
        if (tetromino.shape[row][col]) {
          this.ctx.fillRect(
            (tetromino.x + col) * this.blockSize + 1,
            (tetromino.y + row) * this.blockSize + 1,
            this.blockSize - 2,
            this.blockSize - 2
          );
        }
      }
    }
  }

  drawNextTetromino() {
    // Clear canvas
    this.nextCtx.fillStyle = '#000';
    this.nextCtx.fillRect(0, 0, this.nextCanvas.width, this.nextCanvas.height);

    const tetromino = this.game.nextTetromino;
    this.nextCtx.fillStyle = tetromino.color;
    
    const offsetX = (this.nextCanvas.width - tetromino.shape[0].length * this.blockSize) / 2;
    const offsetY = (this.nextCanvas.height - tetromino.shape.length * this.blockSize) / 2;
    
    for (let row = 0; row < tetromino.shape.length; row++) {
      for (let col = 0; col < tetromino.shape[row].length; col++) {
        if (tetromino.shape[row][col]) {
          this.nextCtx.fillRect(
            offsetX + col * this.blockSize + 1,
            offsetY + row * this.blockSize + 1,
            this.blockSize - 2,
            this.blockSize - 2
          );
        }
      }
    }
  }

  updateUI() {
    document.getElementById('score').textContent = this.game.score;
    document.getElementById('level').textContent = this.game.level;
    document.getElementById('lines').textContent = this.game.lines;
  }

  renderLeaderBoard() {
    const listEl = document.getElementById('leaderboard');
    const scores = this.scoreBoard.getScores();

    if (scores.length === 0) {
      listEl.innerHTML = '<li>尚無紀錄</li>';
      return;
    }

    listEl.innerHTML = scores
      .map((item) => {
        const date = new Date(item.date).toLocaleDateString('zh-TW');
        return `<li>${item.score} 分 - ${date}</li>`;
      })
      .join('');
  }

  handleGameOver() {
    this.scoreBoard.saveScore(this.game.score);
    this.renderLeaderBoard();

    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.fillStyle = '#fff';
    this.ctx.font = 'bold 30px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('遊戲結束', this.canvas.width / 2, this.canvas.height / 2);
    
    this.ctx.font = '20px Arial';
    this.ctx.fillText(
      `最終分數: ${this.game.score}`,
      this.canvas.width / 2,
      this.canvas.height / 2 + 40
    );

    document.getElementById('start-btn').disabled = false;
    document.getElementById('pause-btn').disabled = true;
    
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new TetrisGame();
});
