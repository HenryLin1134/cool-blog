# 🚀 快速開始指南 - 全文章頁面功能

## 📖 功能概覽

這次更新為 Cool Blog 新增了兩個重要頁面：

1. **全文章列表頁** (`all-articles.html`) - 瀏覽所有文章
2. **單篇文章頁** (`article.html`) - 閱讀單篇文章

---

## ✨ 主要特性

### 1️⃣ 全文章列表頁面
- 📚 顯示所有已發布的文章
- 🔍 按分類篩選（全部/技術/教學/生活）
- 🔄 智能排序（最新/最舊/標題）
- 🎯 響應式網格佈局

### 2️⃣ 單篇文章頁面
- 📖 完整文章內容展示
- 🔗 社交媒體分享功能
- ↩️ 快速返回導航
- 📱 優化的閱讀體驗

### 3️⃣ 首頁優化
- 🎯 只顯示最新 6 篇文章
- 🖱️ 雙重訪問模式（Modal + 頁面）
- ✨ 標題懸停動畫效果

---

## 🎯 如何使用

### 訪客視角

#### 方法 1：瀏覽所有文章
```
1. 打開網站首頁
2. 點擊導航欄的「部落格」
3. 進入全文章列表頁面
4. 使用篩選器和排序功能瀏覽
```

#### 方法 2：快速預覽文章（Modal）
```
1. 在首頁或全文章頁面
2. 點擊文章卡片的任意位置（標題除外）
3. 在彈出視窗中快速閱讀
4. 點擊「查看完整文章」進入詳情頁
```

#### 方法 3：深度閱讀文章
```
1. 在首頁或全文章頁面
2. 直接點擊文章標題
3. 進入專屬文章頁面
4. 享受完整閱讀體驗
```

#### 分享文章
```
1. 進入文章詳情頁面（article.html）
2. 滾動到頁面底部
3. 選擇分享平台：
   - 🐦 Twitter
   - 📘 Facebook
   - 💼 LinkedIn
   - 🔗 複製連結
```

---

## 🛠️ 開發者視角

### 文件結構
```
cool-blog/
├── all-articles.html       # 全文章列表頁
├── article.html            # 單篇文章頁
├── index.html              # 首頁（已更新）
├── css/
│   └── styles.css          # 樣式（已更新）
└── js/
    ├── all-articles.js     # 全文章頁面邏輯
    ├── article.js          # 單篇文章邏輯
    └── main.js             # 主邏輯（已更新）
```

### 關鍵配置

#### 首頁文章顯示數量
```javascript
// js/main.js
const MAX_HOME_ARTICLES = 6;  // 修改此值可調整首頁顯示的文章數
```

#### API 端點
```javascript
// js/all-articles.js 和 js/article.js
const API_URL = "http://localhost:3000/api";
```

#### 備用文章資料
如果 API 無法連接，系統會自動使用內建的備用資料：
```javascript
const fallbackArticles = [ /* 文章數據 */ ];
```

### 添加新文章

#### 方法 1：通過 API
```javascript
// 添加到 data/articles.json
{
  "id": 7,
  "title": "新文章標題",
  "excerpt": "文章摘要...",
  "category": "技術",
  "date": "2026-01-30",
  "readTime": "5 分鐘",
  "tags": ["標籤1", "標籤2"],
  "content": "<h2>標題</h2><p>內容...</p>"
}
```

#### 方法 2：更新備用資料
```javascript
// 在 js/all-articles.js 和 js/article.js 中
// 更新 fallbackArticles 陣列
```

---

## 🎨 自訂樣式

### 修改主題顏色
```css
/* css/styles.css */
:root {
  --primary-color: #6366f1;      /* 主要顏色 */
  --secondary-color: #ec4899;    /* 次要顏色 */
  --accent-color: #10b981;       /* 強調顏色 */
}
```

### 修改文章網格列數
```css
/* css/styles.css */
.articles-grid {
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  /* 修改 minmax 第一個值可調整最小卡片寬度 */
}
```

### 修改頁面頭部漸變
```css
/* css/styles.css */
.page-header {
  background: var(--gradient-primary);
  /* 或自訂漸變：linear-gradient(135deg, #667eea 0%, #764ba2 100%) */
}
```

---

## 🌐 多語言設置

### 添加新語言
```javascript
// js/main.js
const I18N = {
  "zh-TW": { /* 繁體中文 */ },
  "en": { /* English */ },
  "ja": { /* 日本語 */ },
  "新語言代碼": {
    allArticles: {
      pageTitle: "翻譯...",
      // 其他翻譯...
    }
  }
};
```

### 切換默認語言
```javascript
// js/all-articles.js 和 js/article.js
let currentLanguage = localStorage.getItem("language") || "zh-TW";
// 修改 "zh-TW" 為你想要的默認語言
```

---

## 📱 測試

### 本地測試
```bash
# 確保後端伺服器運行
npm start

# 在瀏覽器中打開
http://localhost:3000
```

### 測試清單
- [ ] 首頁只顯示 6 篇文章
- [ ] 點擊「部落格」進入全文章頁
- [ ] 分類篩選功能正常
- [ ] 排序功能正常
- [ ] 點擊卡片打開 Modal
- [ ] 點擊標題跳轉文章頁
- [ ] 文章頁面正確顯示
- [ ] 分享按鈕正常工作
- [ ] 響應式設計正常
- [ ] 多語言切換正常
- [ ] 深色模式正常

---

## 🐛 常見問題

### Q1: 文章沒有顯示？
**A:** 檢查：
1. 後端伺服器是否運行
2. API 端點是否正確
3. 備用資料是否正確載入

### Q2: 分類篩選不工作？
**A:** 確保文章的 `category` 欄位與篩選器選項一致。

### Q3: 文章頁面顯示「找不到文章」？
**A:** 檢查：
1. URL 參數是否正確 (`?id=數字`)
2. 文章 ID 是否存在
3. API 或備用資料中是否有該 ID

### Q4: 樣式錯亂？
**A:** 清除瀏覽器緩存，重新載入 CSS 文件。

### Q5: 多語言切換後內容沒變？
**A:** 目前多語言只支持界面文字，文章內容需要手動準備多語言版本。

---

## 🚀 性能優化建議

### 1. 圖片優化
```javascript
// 未來可添加實際圖片
// 建議使用 WebP 格式，添加 lazy loading
<img src="article.webp" loading="lazy" alt="...">
```

### 2. 代碼分割
```javascript
// 未來可考慮按需載入
// 首頁不載入 article.js
// 文章頁不載入 all-articles.js
```

### 3. 緩存策略
```javascript
// 可添加 Service Worker 進行離線緩存
// 緩存文章資料，減少 API 請求
```

---

## 📞 需要幫助？

### 文檔
- 📋 [項目規劃](project_plan.md)
- 💻 [實施總結](implementation_summary.md)
- 🧪 [測試報告](test_report.md)
- 🚀 [發布說明](release_notes.md)

### 聯繫方式
- 📧 Email: [your-email]
- 💻 GitHub: [repository]
- 🐦 Twitter: [handle]

---

## 🎉 開始使用

現在你已經了解了所有功能，馬上開始使用吧！

1. 打開 `index.html`
2. 點擊「部落格」進入全文章頁面
3. 開始探索和分享你的內容！

**祝你使用愉快！** 🚀✨
