## 🚀 Cool Blog v2.0 啟動指南

### 第 1 步：安裝依賴

```bash
# 進入專案目錄
cd projects/cool_blog

# 安裝 Node.js 依賴
npm install
```

這將安裝：

- express - 後端框架
- cors - 跨域支持
- body-parser - 請求解析

### 第 2 步：啟動後端服務器

```bash
npm start
```

你應該看到類似的輸出：

```
╔════════════════════════════════════════╗
║  🚀 Cool Blog 後端服務已啟動          ║
║  API 地址: http://localhost:3001      ║
║  編輯器: http://localhost:3001/admin.html ║
╚════════════════════════════════════════╝
✅ 已初始化預設文章
```

### 第 3 步：訪問應用

打開瀏覽器訪問：

| 功能          | URL                              |
| ------------- | -------------------------------- |
| 📖 前台網站   | http://localhost:3001            |
| ✏️ 後台編輯器 | http://localhost:3001/admin.html |
| 🔌 API 文檔   | 見下方                           |

### 💡 使用後台編輯器

#### 新增文章

1. 進入編輯器首頁
2. 點擊「➕ 新增文章」
3. 填入以下資訊：
   - 📝 標題 (必填)
   - 📂 分類 (必填)
   - 📄 摘要 (必填)
   - 📅 發布日期
   - ⏱️ 閱讀時間 (預設 5 分鐘)
   - 🏷️ 標籤 (輸入後按 Enter)
   - 📋 文章內容 (必填)
4. 點擊「💾 保存」

#### 編輯文章

1. 左側列表選擇要編輯的文章
2. 右側表單會自動載入
3. 修改內容
4. 點擊「💾 保存」

#### 刪除文章

1. 選擇文章
2. 點擊「🗑️ 刪除」
3. 確認刪除

### 🔧 API 使用範例

#### 獲取所有文章

```bash
curl http://localhost:3001/api/articles
```

#### 獲取單篇文章

```bash
curl http://localhost:3001/api/articles/1
```

#### 新增文章

```bash
curl -X POST http://localhost:3001/api/articles \
  -H "Content-Type: application/json" \
  -d '{
    "title": "我的新文章",
    "excerpt": "這是一篇新文章",
    "category": "技術",
    "date": "2026-01-30",
    "readTime": "5 分鐘",
    "tags": ["JavaScript", "Web"],
    "content": "<h2>介紹</h2><p>文章內容...</p>"
  }'
```

#### 編輯文章

```bash
curl -X PUT http://localhost:3001/api/articles/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "更新的標題"}'
```

#### 刪除文章

```bash
curl -X DELETE http://localhost:3001/api/articles/1
```

### 📊 資料結構

文章資料存儲在 `data/articles.json`：

```json
[
  {
    "id": 1,
    "title": "文章標題",
    "excerpt": "文章摘要",
    "category": "技術",
    "date": "2026-01-25",
    "readTime": "8 分鐘",
    "tags": ["標籤1", "標籤2"],
    "content": "<h2>標題</h2><p>內容...</p>"
  }
]
```

### ⚠️ 常見問題

**Q: 啟動時出現 "port 3001 already in use"**

```bash
# 使用其他端口
PORT=3002 npm start
```

**Q: 編輯器無法連接 API**

- 確保伺服器正在運行 (`npm start`)
- 檢查 API_URL 設定是否正確
- 檢查防火牆設定

**Q: 文章無法保存**

- 確保 `data/` 資料夾存在
- 檢查檔案系統權限
- 查看伺服器控制台的錯誤訊息

**Q: 刷新後文章消失**

- 確保伺服器仍在運行
- 檢查 API 是否成功返回資料
- 查看瀏覽器開發者工具的 Network 標籤

### 🌐 生產部署

#### 修改伺服器配置

在 `server.js` 中修改：

```javascript
const PORT = process.env.PORT || 3001;
```

#### 設置環境變數

```bash
# 在 .env 檔案中
PORT=3001
NODE_ENV=production
```

#### 使用 PM2 管理進程

```bash
npm install -g pm2
pm2 start server.js --name "cool-blog"
pm2 save
pm2 startup
```

### 📦 備份資料

定期備份 `data/articles.json` 文件：

```bash
cp data/articles.json data/articles.backup.json
```

### 🎯 下一步

1. ✅ 自訂編輯器樣式
2. ✅ 新增評論功能
3. ✅ 實現文章搜索
4. ✅ 新增作者認證
5. ✅ 遷移到真實資料庫
6. ✅ 添加圖片上傳功能

---

**祝你使用愉快！有任何問題，查看 BACKEND_SETUP.md 獲得更詳細的說明。** 🚀
