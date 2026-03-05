# 俄羅斯方塊遊戲 (Tetris Game)

一個使用 TDD (測試驅動開發) 方式開發的俄羅斯方塊遊戲，並使用 GitHub Actions 自動部署到 GitHub Pages。

![Build and Deploy](https://github.com/ch89648964/001/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)

## 特色功能

- 📦 經典俄羅斯方塊遊戲玩法
- 🧪 使用 Jest 進行單元測試 (TDD)
- 🎨 現代化 UI 設計
- 📱 響應式設計，支援各種裝置
- ⚡ 難度隨等級自動提升
- 🚀 自動化部署到 GitHub Pages

## 開發技術

- **語言**: JavaScript (ES6+)
- **建構工具**: Webpack 5
- **測試框架**: Jest
- **CI/CD**: GitHub Actions
- **部署平台**: GitHub Pages

## 操作說明

- ⬅️ **←** 左移
- ➡️ **→** 右移
- ⬇️ **↓** 快速下落
- ⬆️ **↑** 或 **空白鍵** 旋轉方塊
- **P** 暫停/繼續遊戲

## 本地開發

### 安裝依賴

```bash
npm install
```

### 運行測試

```bash
npm test
```

### 啟動開發伺服器

```bash
npm run dev
```

### 建構專案

```bash
npm run build
```

## 測試覆蓋率

專案使用 Jest 進行單元測試，目標覆蓋率：

- Statements: 80%+
- Branches: 70%+
- Functions: 80%+
- Lines: 80%+

## 部署

專案會在推送到 `main` 分支時自動觸發 GitHub Actions 工作流程：

1. 執行所有單元測試
2. 建構專案
3. 部署到 GitHub Pages

## 專案結構

```
001/
├── src/
│   ├── Tetromino.js    # 方塊類別
│   ├── Board.js        # 遊戲板類別
│   ├── Game.js         # 遊戲邏輯類別
│   ├── index.js        # 主程式入口
│   └── styles.css      # 樣式表
├── tests/
│   ├── Tetromino.test.js
│   ├── Board.test.js
│   └── Game.test.js
├── public/
│   └── index.html      # HTML 模板
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions 配置
├── package.json
├── webpack.config.js
├── jest.config.js
└── babel.config.js
```

## License

MIT