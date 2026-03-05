// Game.test.js - 測試遊戲邏輯
import { Game } from '../src/Game';

describe('Game', () => {
  let game;

  beforeEach(() => {
    game = new Game();
  });

  test('should initialize game with default values', () => {
    expect(game.score).toBe(0);
    expect(game.level).toBe(1);
    expect(game.lines).toBe(0);
    expect(game.isGameOver).toBe(false);
    expect(game.isPaused).toBe(false);
  });

  test('should have a current tetromino', () => {
    expect(game.currentTetromino).toBeDefined();
    expect(game.currentTetromino.type).toBeDefined();
  });

  test('should have a next tetromino', () => {
    expect(game.nextTetromino).toBeDefined();
    expect(game.nextTetromino.type).toBeDefined();
  });

  test('should move tetromino left', () => {
    const originalX = game.currentTetromino.x;
    game.moveLeft();
    expect(game.currentTetromino.x).toBe(originalX - 1);
  });

  test('should move tetromino right', () => {
    const originalX = game.currentTetromino.x;
    game.moveRight();
    expect(game.currentTetromino.x).toBe(originalX + 1);
  });

  test('should not move left if collision', () => {
    game.currentTetromino.x = 0;
    const originalX = game.currentTetromino.x;
    game.moveLeft();
    expect(game.currentTetromino.x).toBe(originalX);
  });

  test('should rotate tetromino', () => {
    const originalShape = JSON.parse(JSON.stringify(game.currentTetromino.shape));
    game.rotate();
    expect(game.currentTetromino.shape).not.toEqual(originalShape);
  });

  test('should update score when lines are cleared', () => {
    const originalScore = game.score;
    game.updateScore(1);
    expect(game.score).toBeGreaterThan(originalScore);
  });

  test('should increase level every 10 lines', () => {
    game.lines = 8;
    game.updateScore(1);
    expect(game.level).toBe(1);
    
    game.updateScore(1); // Now lines = 10
    expect(game.level).toBe(2);
  });

  test('should toggle pause', () => {
    expect(game.isPaused).toBe(false);
    game.togglePause();
    expect(game.isPaused).toBe(true);
    game.togglePause();
    expect(game.isPaused).toBe(false);
  });

  test('should reset game state', () => {
    game.score = 1000;
    game.level = 5;
    game.lines = 50;
    game.isGameOver = true;
    
    game.reset();
    
    expect(game.score).toBe(0);
    expect(game.level).toBe(1);
    expect(game.lines).toBe(0);
    expect(game.isGameOver).toBe(false);
  });
});
