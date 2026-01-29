# 🤖 Cool Blog - AI 生成實驗性專案

[English](README.md) | 繁體中文

> ⚠️ **這是一個 AI 生成的實驗性專案**
>
> 本專案完全由 AI 代理創建，用於測試和展示以下功能：
>
> - GitHub Copilot 自訂代理（Web Creator 模式）
> - 多代理 AI 編排
> - 自動化全端開發工作流程

[![線上展示](https://img.shields.io/badge/demo-live-success)](https://henrylin1134.github.io/cool-blog)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black)](https://github.com/HenryLin1134/cool-blog)
[![AI 生成](https://img.shields.io/badge/AI-Generated-blue)](https://github.com/features/copilot)
[![授權](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## 🎯 專案概述

**Cool Blog** 是一個現代化的全端個人部落格平台，內建管理編輯器，展示 AI 在自動化 Web 開發中的能力。

### ✨ 功能特色

#### 前端

- 🎨 現代化響應式設計，支援深色/淺色主題
- 💫 流暢的動畫和粒子效果
- 📱 移動優先的響應式佈局
- 🖼️ 文章模態展示系統
- 🔄 動態主題切換器
- 🚀 優化的效能表現

#### 後端

- 🔌 使用 Express.js 構建的 RESTful API
- 📝 完整的文章 CRUD 操作
- 💾 基於 JSON 的資料持久化
- 🌐 支援 CORS 跨域請求
- 📊 預載 6 篇範例文章

#### 管理編輯器

- ✏️ 建立、編輯、刪除文章
- 🏷️ 標籤管理系統
- 📂 分類組織
- 🛠️ HTML 編輯工具列
- 💾 即時儲存到伺服器
- 📋 文章列表檢視

---

## 🤖 AI 生成細節

### 使用的代理系統

- **主要代理**：Web Creator（GitHub Copilot 自訂代理）
- **模式**：多代理編排
- **涉及的代理**：
  - 🧠 大腦編排器 - 工作流程協調
  - 📋 規劃代理 - 架構設計
  - 💻 實作代理 - 程式碼生成
  - 🧪 測試代理 - 品質保證
  - ✨ 增強代理 - 功能優化

### AI 創建的內容

- ✅ 完整的 HTML 結構（480 行）
- ✅ 完整的 CSS 樣式（1,591 行）
- ✅ JavaScript 功能（877 行）
- ✅ Express.js 後端伺服器
- ✅ 管理編輯器介面
- ✅ REST API 端點
- ✅ 文件（3 份詳細指南）
- ✅ 套件配置
- ✅ Git repository 設定

### 生成的程式碼總量

- **程式碼行數**：約 3,000+ 行
- **建立的檔案**：15+ 個
- **文件**：5 份完整指南
- **所需時間**：約 40 分鐘（自動化）

---

## 🚀 快速開始

### 前置需求

- Node.js 14+
- npm 或 yarn

### 安裝步驟

```bash
# 克隆 repository
git clone https://github.com/HenryLin1134/cool-blog.git
cd cool-blog

# 安裝相依套件
npm install

# 啟動伺服器
npm start
```

### 存取應用程式

| 應用程式 | 網址                             | 說明           |
| -------- | -------------------------------- | -------------- |
| 🌐 前端  | http://localhost:3001            | 公開部落格網站 |
| ✏️ 管理  | http://localhost:3001/admin.html | 文章管理       |

---

## 📁 專案結構

```
cool_blog/
├── server.js              # Express 後端伺服器
├── admin.html             # 管理編輯器介面
├── index.html             # 前端網站
├── package.json           # 相依套件
│
├── data/
│   └── articles.json      # 文章資料庫
│
├── css/
│   ├── styles.css         # 主要樣式
│   ├── responsive.css     # 響應式設計
│   └── themes.css         # 主題變數
│
├── js/
│   └── main.js            # 前端邏輯 + API 呼叫
│
└── docs/
    ├── BACKEND_SETUP.md
    ├── QUICK_START_BACKEND.md
    └── SETUP_COMPLETE.md
```

---

## 🔌 API 文件

### API 端點

```http
GET    /api/articles       # 取得所有文章
GET    /api/articles/:id   # 取得單一文章
POST   /api/articles       # 建立新文章
PUT    /api/articles/:id   # 更新文章
DELETE /api/articles/:id   # 刪除文章
```

### 範例請求

#### 取得所有文章

```javascript
fetch("http://localhost:3001/api/articles")
  .then((response) => response.json())
  .then((data) => console.log(data));
```

#### 建立新文章

```javascript
fetch("http://localhost:3001/api/articles", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "我的新文章",
    category: "技術",
    excerpt: "這是一篇關於...",
    content: "<p>文章內容...</p>",
    tags: ["JavaScript", "Node.js"],
  }),
});
```

---

## 🛠️ 技術棧

### 前端

- **HTML5** - 語意化標記
- **CSS3** - 現代樣式與動畫
- **Vanilla JavaScript** - 無框架，純 JS
- **Particles.js** - 背景粒子效果
- **Fetch API** - HTTP 請求

### 後端

- **Node.js** - JavaScript 執行環境
- **Express.js** - Web 框架
- **CORS** - 跨域資源共享
- **Body Parser** - JSON 解析
- **File System** - JSON 檔案持久化

### 開發工具

- **npm** - 套件管理
- **nodemon** - 開發時自動重啟

---

## 📚 文件

### 快速指南

- [後端設定指南](BACKEND_SETUP.md) - 完整的伺服器設定
- [快速開始指南](QUICK_START_BACKEND.md) - 快速啟動步驟
- [設定完成指南](SETUP_COMPLETE.md) - 驗證安裝

### 部署指南

- [部署指南](DEPLOY_GUIDE.md) - 部署到生產環境的步驟

---

## 🎨 使用者介面預覽

### 主頁

- 響應式網格佈局
- 動態載入文章卡片
- 即時主題切換
- 粒子背景效果
- 流暢的滾動動畫

### 文章檢視

- 模態視窗顯示
- 完整的文章內容
- 類別和標籤顯示
- 發布日期資訊
- 關閉和導覽控制

### 管理介面

- 簡潔的儀表板
- 文章列表管理
- 完整的編輯器工具列
- 表單驗證
- 即時預覽

---

## ⚙️ 配置

### 伺服器配置

在 `server.js` 中修改：

```javascript
const PORT = process.env.PORT || 3001;
const DATA_FILE = "./data/articles.json";
```

### CORS 設定

```javascript
app.use(
  cors({
    origin: "*", // 生產環境中應限制來源
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
```

---

## 🧪 測試

### 手動測試

1. **前端測試**
   - 開啟 `http://localhost:3001`
   - 測試主題切換
   - 點擊文章檢視
   - 驗證響應式佈局

2. **API 測試**
   - 使用 Postman 或 curl
   - 測試所有 CRUD 操作
   - 驗證錯誤處理

3. **管理介面測試**
   - 開啟 `http://localhost:3001/admin.html`
   - 建立新文章
   - 編輯現有文章
   - 刪除文章

---

## 📈 專案統計

| 指標            | 數值   |
| --------------- | ------ |
| 總程式碼行數    | 3,000+ |
| HTML 行數       | 480    |
| CSS 行數        | 1,591  |
| JavaScript 行數 | 877    |
| 建立的檔案      | 15+    |
| API 端點        | 5      |
| 預載文章        | 6      |

---

## 🔧 開發

### 運行開發伺服器

```bash
npm run dev
```

### 運行生產伺服器

```bash
npm start
```

### 資料夾結構說明

- `server.js` - 主要的後端伺服器
- `data/` - JSON 資料儲存
- `css/` - 所有樣式檔案
- `js/` - 前端 JavaScript
- `docs/` - 專案文件

---

## 🌐 部署

### GitHub Pages（前端）

1. 推送到 GitHub
2. 啟用 GitHub Pages
3. 設定從 `main` 分支部署

### Heroku（全端）

```bash
# 安裝 Heroku CLI
heroku login
heroku create cool-blog-app
git push heroku main
```

### Vercel（前端）

```bash
# 安裝 Vercel CLI
npm i -g vercel
vercel
```

---

## 🤝 貢獻

雖然這是一個 AI 生成的實驗性專案，但仍歡迎貢獻！

1. Fork 專案
2. 建立功能分支（`git checkout -b feature/AmazingFeature`）
3. 提交變更（`git commit -m 'Add some AmazingFeature'`）
4. 推送到分支（`git push origin feature/AmazingFeature`）
5. 開啟 Pull Request

---

## 📝 授權

本專案採用 MIT 授權 - 詳見 [LICENSE](LICENSE) 文件

---

## 🙏 致謝

- **GitHub Copilot** - AI 程式碼生成
- **Particles.js** - 背景效果
- **Express.js** - 後端框架
- **Node.js** - 執行環境

---

## 📞 聯絡方式

- GitHub: [@HenryLin1134](https://github.com/HenryLin1134)
- 專案連結: [https://github.com/HenryLin1134/cool-blog](https://github.com/HenryLin1134/cool-blog)
- 線上展示: [https://henrylin1134.github.io/cool-blog](https://henrylin1134.github.io/cool-blog)

---

## ⚠️ 免責聲明

這是一個完全由 AI 生成的實驗性專案，用於展示目的。程式碼按「現況」提供，不提供任何明示或暗示的保證。在生產環境中使用前，請進行徹底測試。

---

**由 AI 生成並以 ❤️ 部署**

**版本**: 1.0.0  
**狀態**: 🧪 實驗性質  
**最後更新**: 2026-01-30
