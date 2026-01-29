# 🚀 Cool Blog v2.0 - 帶後端編輯器的個人部落格

一個功能完整的現代化個人部落格網站，包含動態後台編輯器和 REST API。

## ✨ 新功能 (v2.0)

### 後端系統

- ✅ **Express.js 後端服務器** - 完整的 REST API
- ✅ **JSON 資料存儲** - 簡化的資料持久化方案
- ✅ **CRUD 操作** - 完整的文章建立、讀取、更新、刪除功能
- ✅ **後台編輯器** - 直觀的網頁編輯介面

### 編輯器功能

- ✅ 新增/編輯/刪除文章
- ✅ 實時預覽
- ✅ HTML 編輯工具欄
- ✅ 標籤管理
- ✅ 分類、日期、閱讀時間設定
- ✅ 即時保存到伺服器

### 前端特性

- ✅ 從 API 動態載入文章
- ✅ 文章 Modal 顯示
- ✅ 完整的響應式設計
- ✅ 深色/淺色主題切換
- ✅ 平滑動畫與互動效果
- ✅ 文章導航（前/後篇）
- ✅ 分享功能

## 🚀 快速開始

### 必要條件

- Node.js 14+
- npm 或 yarn

### 安裝

```bash
# 進入專案目錄
cd cool_blog

# 安裝依賴
npm install
```

### 啟動服務

```bash
# 啟動後端服務器 (http://localhost:3001)
npm start
```

該命令將：

- 啟動 Express 伺服器
- 初始化資料庫（如果不存在）
- 載入 6 篇預設文章
- 啟動靜態檔案服務

### 訪問應用

- **前台網站**：http://localhost:3001 或 http://localhost:8000
- **後台編輯器**：http://localhost:3001/admin.html

## 📁 項目結構

```
cool_blog/
├── server.js           # Express 後端服務器
├── admin.html          # 後台編輯器頁面
├── index.html          # 前台網站首頁
├── package.json        # 依賴定義
├── data/
│   └── articles.json   # 文章資料存儲
├── css/
│   ├── styles.css      # 主樣式表
│   ├── responsive.css  # 響應式設計
│   └── themes.css      # 主題變數
├── js/
│   └── main.js         # 前端邏輯 + API 調用
└── images/             # 圖片資源
```

## 🔌 API 端點

### 獲取文章列表

```http
GET /api/articles
```

### 獲取單篇文章

```http
GET /api/articles/:id
```

### 建立新文章

```http
POST /api/articles
Content-Type: application/json

{
  "title": "文章標題",
  "excerpt": "文章摘要",
  "category": "技術",
  "date": "2026-01-30",
  "readTime": "8 分鐘",
  "tags": ["標籤1", "標籤2"],
  "content": "<h2>標題</h2><p>內容...</p>"
}
```

### 編輯文章

```http
PUT /api/articles/:id
Content-Type: application/json

{
  "title": "更新的標題",
  ...
}
```

### 刪除文章

```http
DELETE /api/articles/:id
```

## 🎨 編輯器功能演示

### 新增文章

1. 進入 http://localhost:3001/admin.html
2. 點擊「➕ 新增文章」按鈕
3. 填入文章資訊
4. 使用編輯工具欄格式化內容
5. 點擊「💾 保存」

### 編輯現有文章

1. 從左側列表選擇文章
2. 修改所需內容
3. 點擊「💾 保存」

### 刪除文章

1. 選擇要刪除的文章
2. 點擊「🗑️ 刪除」按鈕
3. 確認刪除

## 🛠️ 技術棧

### 後端

- **Express.js** 4.18+ - Node.js 網頁框架
- **CORS** - 跨域資源共享
- **Body-parser** - 請求體解析

### 前端

- **HTML5** - 語意化標記
- **CSS3** - 現代樣式
- **JavaScript ES6+** - 互動邏輯
- **Fetch API** - 非同步資料通訊

### 儲存

- **JSON 檔案** - 簡單的資料持久化
- **data/articles.json** - 文章資料庫

## 📊 預設文章

系統包含 6 篇預設文章：

1. 🎓 如何成為一名優秀的前端工程師
2. 🎨 CSS 進階技巧：Grid 與 Flexbox
3. 🚀 JavaScript ES2024 新特性
4. ⚛️ React Hooks 完全指南
5. ⚡ Web 性能優化最佳實踐
6. 🔒 前端安全性防禦指南

## ⚙️ 配置

### 修改 API 地址

在 `js/main.js` 修改：

```javascript
const API_URL = "http://localhost:3001/api";
```

### 修改伺服器埠口

在 `server.js` 修改：

```javascript
const PORT = 3001;
```

### 修改資料存儲位置

在 `server.js` 修改：

```javascript
const DATA_FILE = path.join(__dirname, "data", "articles.json");
```

## 🔒 安全注意事項

目前版本是開發環境。在生產環境部署時，建議：

- ✅ 新增身份驗證和授權
- ✅ 驗證和清理輸入
- ✅ 使用 HTTPS
- ✅ 實現速率限制
- ✅ 新增日誌和監控
- ✅ 遷移到實際資料庫（MongoDB、PostgreSQL）

## 📱 瀏覽器支援

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile Safari 14+

## 🚀 部署

### 部署到 Heroku

```bash
# 建立 Procfile
echo "web: node server.js" > Procfile

# 提交並部署
git push heroku main
```

### 部署到 Vercel

注意：Vercel 不支援長時間運行的伺服器。建議使用全棧支持的平台。

## 🐛 故障排除

### 無法連接 API

- 確保伺服器正在運行：`npm start`
- 檢查埠口是否被占用
- 檢查防火牆設定

### 文章無法保存

- 確保 `data/` 資料夾存在
- 檢查檔案系統權限
- 檢查瀏覽器控制台的錯誤

### 編輯器無法載入

- 清除瀏覽器快取
- 檢查 JavaScript 控制台的錯誤
- 確保伺服器返回正確的內容類型

## 📝 授權

MIT License - 自由使用和修改

## 👨‍💻 作者

Cool Blog v2.0 - Web Creator AI Agent

---

**開始寫作，分享你的想法！** ✍️
