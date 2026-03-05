// Board.test.js - 測試遊戲板
import { Board } from '../src/Board';
import { Tetromino } from '../src/Tetromino';

describe('Board', () => {
  let board;

  beforeEach(() => {
    board = new Board();
  });

  test('should create a board with correct dimensions', () => {
    expect(board.rows).toBe(20);
    expect(board.cols).toBe(10);
    expect(board.grid.length).toBe(20);
    expect(board.grid[0].length).toBe(10);
  });

  test('should initialize with empty grid', () => {
    board.grid.forEach(row => {
      row.forEach(cell => {
        expect(cell).toBe(0);
      });
    });
  });

  test('should check if tetromino can be placed', () => {
    const tetromino = new Tetromino('I');
    expect(board.canPlace(tetromino)).toBe(true);
  });

  test('should detect collision with bottom', () => {
    const tetromino = new Tetromino('I');
    tetromino.y = 19;
    expect(board.canPlace(tetromino)).toBe(false);
  });

  test('should detect collision with left wall', () => {
    const tetromino = new Tetromino('I');
    tetromino.x = -1;
    expect(board.canPlace(tetromino)).toBe(false);
  });

  test('should detect collision with right wall', () => {
    const tetromino = new Tetromino('I');
    tetromino.x = 10;
    expect(board.canPlace(tetromino)).toBe(false);
  });

  test('should place tetromino on board', () => {
    const tetromino = new Tetromino('O');
    tetromino.x = 4;
    tetromino.y = 0;
    board.place(tetromino);
    
    expect(board.grid[0][4]).toBe(1);
    expect(board.grid[0][5]).toBe(1);
  });

  test('should clear completed lines', () => {
    // Fill a complete line
    for (let col = 0; col < 10; col++) {
      board.grid[19][col] = 1;
    }
    
    const linesCleared = board.clearLines();
    expect(linesCleared).toBe(1);
    
    // Check if line is cleared
    board.grid[19].forEach(cell => {
      expect(cell).toBe(0);
    });
  });

  test('should clear multiple lines', () => {
    // Fill two complete lines
    for (let col = 0; col < 10; col++) {
      board.grid[18][col] = 1;
      board.grid[19][col] = 1;
    }
    
    const linesCleared = board.clearLines();
    expect(linesCleared).toBe(2);
  });

  test('should reset board', () => {
    board.grid[0][0] = 1;
    board.reset();
    
    board.grid.forEach(row => {
      row.forEach(cell => {
        expect(cell).toBe(0);
      });
    });
  });
});
