# Puppeteer 測試遷移規劃

## 目標
- 以 Puppeteer 取代 Playwright 測試
- 保留既有測試情境（i18n 切換、登入流程）
- 測試指令維持 `npm test`

## 範圍
- 移除 Playwright 測試與設定
- 新增 Puppeteer 測試與簡易測試執行器
- 更新 README 與 CHANGELOG

## 成功標準
- `npm test` 可啟動伺服器並完成測試
- 測試結果通過並有摘要輸出
