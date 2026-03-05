const STORAGE_KEY = 'tetris-high-scores';

export class ScoreBoard {
  constructor(storage = globalThis.localStorage, key = STORAGE_KEY, limit = 5) {
    this.storage = storage;
    this.key = key;
    this.limit = limit;
  }

  getScores() {
    try {
      const raw = this.storage.getItem(this.key);
      if (!raw) {
        return [];
      }

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed
        .filter((item) => Number.isFinite(item.score) && typeof item.date === 'string')
        .sort((a, b) => b.score - a.score)
        .slice(0, this.limit);
    } catch {
      return [];
    }
  }

  saveScore(score) {
    if (!Number.isFinite(score) || score < 0) {
      return this.getScores();
    }

    const nextScores = [...this.getScores(), {
      score,
      date: new Date().toISOString()
    }]
      .sort((a, b) => b.score - a.score)
      .slice(0, this.limit);

    this.storage.setItem(this.key, JSON.stringify(nextScores));
    return nextScores;
  }
}

export { STORAGE_KEY };
