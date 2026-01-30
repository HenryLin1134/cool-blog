# 技術規格

## UI/UX
- 單頁登入卡片式版型，置中顯示
- 風格沿用現有變數（`--primary-color` 等）
- 支援深色模式（`[data-theme="dark"]`）

## 前端互動
- `login.js`：
  - 讀取與寫入 `localStorage.theme`
  - 切換 `data-theme` 屬性
  - 表單送出時做基本驗證（空值、Email 格式）
  - 顯示/隱藏密碼

## 可近性
- 使用 `aria-live` 提示訊息
- 表單欄位加入 `autocomplete`

## 相依
- 不新增外部套件
