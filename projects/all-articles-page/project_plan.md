# 📋 Planning Agent - All Articles Page Feature

**Project**: cool-blog - All Articles Page  
**Agent**: Planning Agent  
**Timestamp**: 2026-01-30  
**Status**: 🟢 Complete

---

## 📊 Requirement Analysis

### 功能需求
1. **新增全文章頁面 (all-articles.html)**
   - 顯示所有文章（不分頁，或大量分頁）
   - 從導航欄"部落格"連結進入
   
2. **首頁最新文章區塊優化**
   - 只顯示最近 3-6 篇文章
   - 保留 modal 彈窗查看功能
   - 文章標題可點擊進入獨立文章頁面
   
3. **獨立文章頁面**
   - 每篇文章有專屬頁面 (article.html?id=xxx)
   - 完整顯示文章內容
   - 包含返回導航

---

## 🏗️ Technical Architecture

### 文件結構
```
cool-blog/
├── index.html              # 主頁（顯示最新3-6篇）
├── all-articles.html       # 全文章列表頁（新增）
├── article.html            # 單篇文章頁面（新增）
├── css/
│   └── styles.css          # 更新樣式
├── js/
│   ├── main.js             # 更新主頁邏輯
│   ├── all-articles.js     # 全文章頁面邏輯（新增）
│   └── article.js          # 單篇文章頁面邏輯（新增）
└── data/
    └── articles.json       # 文章數據
```

### 核心功能設計

#### 1. 導航欄修改
- 將 `<a href="#blog">` 改為 `<a href="all-articles.html">`
- 保持響應式設計

#### 2. 首頁文章展示
```javascript
// main.js 修改
const MAX_HOME_ARTICLES = 6; // 只顯示最新6篇

function loadArticles() {
  // 限制顯示數量
  const latestArticles = articles.slice(0, MAX_HOME_ARTICLES);
  // 渲染文章卡片
  // 每個標題增加點擊事件 → article.html?id=xxx
}
```

#### 3. 全文章頁面 (all-articles.html)
```javascript
// all-articles.js
function loadAllArticles() {
  // 載入所有文章
  // 支持篩選、排序
  // 每篇文章可點擊進入 article.html?id=xxx
}
```

#### 4. 單篇文章頁面 (article.html)
```javascript
// article.js
function loadArticle() {
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get('id');
  // 根據 ID 載入文章
  // 顯示完整內容
}
```

---

## 🎨 UI/UX 設計

### 首頁文章卡片
- 保留現有設計
- 標題增加懸停效果（提示可點擊）
- 同時支持：
  - 點擊卡片主體 → 開啟 modal
  - 點擊標題 → 進入文章頁面

### 全文章頁面
- 使用網格佈局（grid layout）
- 文章卡片風格一致
- 包含：
  - 文章封面圖
  - 標題
  - 摘要
  - 發布日期
  - 標籤

### 單篇文章頁面
- 簡潔的閱讀體驗
- 包含：
  - 文章標題
  - 作者與日期
  - 完整內容
  - 標籤
  - 返回按鈕（← 返回全文章列表）

---

## 🔧 Implementation Tasks

### Task 1: 創建全文章頁面
- [ ] 創建 `all-articles.html`
- [ ] 創建 `js/all-articles.js`
- [ ] 複用導航欄與頁尾

### Task 2: 創建單篇文章頁面
- [ ] 創建 `article.html`
- [ ] 創建 `js/article.js`
- [ ] URL 參數處理邏輯

### Task 3: 修改首頁
- [ ] 限制文章顯示數量（6篇）
- [ ] 文章標題增加點擊跳轉
- [ ] 保留 modal 功能

### Task 4: 修改導航欄
- [ ] 將"部落格"連結改為 `all-articles.html`
- [ ] 所有頁面統一更新

### Task 5: 樣式優化
- [ ] 文章標題懸停效果
- [ ] 全文章頁面樣式
- [ ] 單篇文章頁面樣式
- [ ] 響應式設計

### Task 6: 多語言支持
- [ ] 更新 I18N 翻譯
- [ ] 新增頁面的多語言文本

---

## 🧪 Testing Plan

### 功能測試
- [ ] 首頁只顯示6篇文章
- [ ] 點擊文章卡片開啟 modal
- [ ] 點擊文章標題跳轉文章頁面
- [ ] 導航欄"部落格"進入全文章頁面
- [ ] 全文章頁面顯示所有文章
- [ ] URL 參數正確傳遞
- [ ] 單篇文章頁面正確顯示

### 響應式測試
- [ ] 手機端正常顯示
- [ ] 平板端正常顯示
- [ ] 桌面端正常顯示

### 多語言測試
- [ ] 中文介面測試
- [ ] 英文介面測試
- [ ] 日文介面測試

---

## 📦 Dependencies

### 現有依賴
- 無需新增外部庫
- 使用現有的 CSS 與 JavaScript 架構

### 資源需求
- 文章數據：`data/articles.json`
- 圖片資源：文章封面圖

---

## 🚀 Deployment Considerations

### 性能優化
- 文章數據按需載入
- 圖片懶加載
- 緩存策略

### SEO 優化
- 單篇文章頁面添加 meta tags
- 結構化數據 (JSON-LD)

---

## 📝 Summary

### 新增文件
1. `all-articles.html` - 全文章列表頁
2. `article.html` - 單篇文章頁
3. `js/all-articles.js` - 全文章頁面邏輯
4. `js/article.js` - 單篇文章邏輯

### 修改文件
1. `index.html` - 導航欄連結、文章標題點擊
2. `js/main.js` - 限制文章顯示數量、增加標題點擊
3. `css/styles.css` - 新增樣式

### 預估工時
- Planning: ✅ Complete
- Implementation: 2-3 hours
- Testing: 1 hour
- Total: 3-4 hours

---

**Planning Agent Status**: 🟢 Complete  
**Next Step**: Implementation Phase
