import { ScoreBoard } from '../src/ScoreBoard';

describe('ScoreBoard', () => {
  let fakeStorage;
  let scoreBoard;

  beforeEach(() => {
    const data = {};
    fakeStorage = {
      getItem: jest.fn((key) => (key in data ? data[key] : null)),
      setItem: jest.fn((key, value) => {
        data[key] = value;
      })
    };

    scoreBoard = new ScoreBoard(fakeStorage, 'test-scores', 5);
  });

  test('should return empty array when storage is empty', () => {
    expect(scoreBoard.getScores()).toEqual([]);
  });

  test('should save and return scores sorted descending', () => {
    scoreBoard.saveScore(300);
    scoreBoard.saveScore(1000);
    scoreBoard.saveScore(500);

    const scores = scoreBoard.getScores();
    expect(scores.map((item) => item.score)).toEqual([1000, 500, 300]);
  });

  test('should keep only top 5 scores', () => {
    [100, 200, 300, 400, 500, 600, 700].forEach((score) => scoreBoard.saveScore(score));

    const scores = scoreBoard.getScores();
    expect(scores).toHaveLength(5);
    expect(scores.map((item) => item.score)).toEqual([700, 600, 500, 400, 300]);
  });

  test('should ignore invalid scores', () => {
    scoreBoard.saveScore(-10);
    scoreBoard.saveScore(Number.NaN);

    expect(scoreBoard.getScores()).toEqual([]);
  });

  test('should return empty array for invalid JSON payload', () => {
    fakeStorage.getItem.mockReturnValueOnce('not-json');
    expect(scoreBoard.getScores()).toEqual([]);
  });
});
