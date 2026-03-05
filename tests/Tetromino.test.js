// Tetromino.test.js - 測試方塊類別
import { Tetromino, TETROMINO_TYPES } from '../src/Tetromino';

describe('Tetromino', () => {
  describe('creation', () => {
    test('should create a tetromino with default type', () => {
      const tetromino = new Tetromino();
      expect(tetromino.type).toBeDefined();
      expect(TETROMINO_TYPES[tetromino.type]).toBeDefined();
    });

    test('should create a tetromino with specified type', () => {
      const tetromino = new Tetromino('I');
      expect(tetromino.type).toBe('I');
    });

    test('should have correct shape for I type', () => {
      const tetromino = new Tetromino('I');
      expect(tetromino.shape).toEqual([
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]);
    });

    test('should have correct shape for O type', () => {
      const tetromino = new Tetromino('O');
      expect(tetromino.shape).toEqual([
        [1, 1],
        [1, 1]
      ]);
    });

    test('should have correct shape for T type', () => {
      const tetromino = new Tetromino('T');
      expect(tetromino.shape).toEqual([
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
      ]);
    });

    test('should have correct color for each type', () => {
      const types = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
      types.forEach(type => {
        const tetromino = new Tetromino(type);
        expect(tetromino.color).toBeDefined();
        expect(typeof tetromino.color).toBe('string');
      });
    });

    test('should start at initial position', () => {
      const tetromino = new Tetromino('I');
      expect(tetromino.x).toBe(3);
      expect(tetromino.y).toBe(0);
    });
  });

  describe('rotation', () => {
    test('should rotate I piece clockwise', () => {
      const tetromino = new Tetromino('I');
      const originalShape = tetromino.shape;
      tetromino.rotate();
      
      expect(tetromino.shape).not.toEqual(originalShape);
      expect(tetromino.shape).toEqual([
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0]
      ]);
    });

    test('should rotate T piece clockwise', () => {
      const tetromino = new Tetromino('T');
      tetromino.rotate();
      
      expect(tetromino.shape).toEqual([
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0]
      ]);
    });

    test('should not change O piece when rotating', () => {
      const tetromino = new Tetromino('O');
      const originalShape = tetromino.shape;
      tetromino.rotate();
      
      expect(tetromino.shape).toEqual(originalShape);
    });

    test('should return to original shape after 4 rotations', () => {
      const tetromino = new Tetromino('T');
      const originalShape = JSON.parse(JSON.stringify(tetromino.shape));
      
      tetromino.rotate();
      tetromino.rotate();
      tetromino.rotate();
      tetromino.rotate();
      
      expect(tetromino.shape).toEqual(originalShape);
    });
  });

  describe('movement', () => {
    test('should move left', () => {
      const tetromino = new Tetromino('I');
      const originalX = tetromino.x;
      tetromino.moveLeft();
      
      expect(tetromino.x).toBe(originalX - 1);
    });

    test('should move right', () => {
      const tetromino = new Tetromino('I');
      const originalX = tetromino.x;
      tetromino.moveRight();
      
      expect(tetromino.x).toBe(originalX + 1);
    });

    test('should move down', () => {
      const tetromino = new Tetromino('I');
      const originalY = tetromino.y;
      tetromino.moveDown();
      
      expect(tetromino.y).toBe(originalY + 1);
    });
  });

  describe('clone', () => {
    test('should create a deep copy of tetromino', () => {
      const original = new Tetromino('T');
      const clone = original.clone();
      
      expect(clone.type).toBe(original.type);
      expect(clone.x).toBe(original.x);
      expect(clone.y).toBe(original.y);
      expect(clone.shape).toEqual(original.shape);
      expect(clone).not.toBe(original);
    });

    test('should not affect original when clone is modified', () => {
      const original = new Tetromino('T');
      const clone = original.clone();
      
      clone.moveRight();
      expect(clone.x).not.toBe(original.x);
    });
  });
});
