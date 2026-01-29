# 🚀 GitHub 部署指南

## 步驟 1: GitHub CLI 認證

由於 GitHub CLI 需要重新認證，請執行：

```bash
gh auth login -h github.com
```

按照提示選擇：

1. **What account do you want to log into?** → GitHub.com
2. **What is your preferred protocol?** → HTTPS
3. **Authenticate Git with GitHub credentials?** → Yes
4. **How would you like to authenticate?** → Login with a web browser

然後複製 one-time code 並在瀏覽器中完成認證。

---

## 步驟 2: 創建 GitHub Repository

### 選項 A: 使用 GitHub CLI（推薦）

認證完成後，執行：

```bash
gh repo create cool-blog --public --source=. --remote=origin \
  --description="🤖 AI-Generated Experimental Blog - Testing GitHub Copilot Custom Agents & Multi-Agent AI Orchestration" \
  --push
```

### 選項 B: 手動在 GitHub 網站創建

1. 前往 https://github.com/new
2. Repository name: `cool-blog`
3. Description: `🤖 AI-Generated Experimental Blog - Testing GitHub Copilot Custom Agents & Multi-Agent AI Orchestration`
4. 選擇 **Public**
5. **不要** 初始化 README, .gitignore 或 license（我們已經有了）
6. 點擊 **Create repository**

然後執行：

```bash
git remote add origin https://github.com/YOUR_USERNAME/cool-blog.git
git branch -M main
git push -u origin main
```

---

## 步驟 3: 設置 GitHub Pages

### 方法 A: 使用 GitHub CLI

```bash
gh repo edit --enable-pages --pages-branch main --pages-path /
```

### 方法 B: 在 GitHub 網站設置

1. 前往你的 repository
2. 點擊 **Settings**
3. 左側選單點擊 **Pages**
4. Source 選擇 **Deploy from a branch**
5. Branch 選擇 **main** 和 **/ (root)**
6. 點擊 **Save**

等待 1-2 分鐘，你的網站將在 `https://YOUR_USERNAME.github.io/cool-blog/` 上線！

---

## 步驟 4: 更新 README 中的 URL

在 GitHub Pages 部署完成後，更新 README.md 中的 URL：

找到這一行：

```markdown
[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://YOUR_USERNAME.github.io/cool-blog)
```

替換 `YOUR_USERNAME` 為你的 GitHub 用戶名。

然後提交更新：

```bash
git add README.md
git commit -m "docs: Update live demo URL"
git push
```

---

## 步驟 5: 驗證部署

### 檢查前端部署

訪問: `https://YOUR_USERNAME.github.io/cool-blog/`

應該看到完整的 Cool Blog 網站。

### 注意事項

⚠️ **GitHub Pages 限制**：

- GitHub Pages 只能託管靜態文件（HTML, CSS, JS）
- **後端 API 無法在 GitHub Pages 運行**
- 後台編輯器需要部署到支持 Node.js 的平台

### 完整功能部署

要使用完整功能（包括後端），需要部署到：

#### 選項 1: Render.com（推薦，免費）

```bash
# 1. 前往 https://render.com
# 2. New → Web Service
# 3. 連接 GitHub repository
# 4. 設置：
#    - Name: cool-blog
#    - Environment: Node
#    - Build Command: npm install
#    - Start Command: npm start
# 5. 點擊 Create Web Service
```

#### 選項 2: Railway.app（免費）

```bash
# 1. 前往 https://railway.app
# 2. New Project → Deploy from GitHub repo
# 3. 選擇 cool-blog repository
# 4. Railway 會自動檢測並部署
```

#### 選項 3: Vercel（需要額外配置）

```bash
npm install -g vercel
vercel
# 按照提示完成部署
```

---

## 當前狀態

✅ Git repository 已初始化  
✅ 所有文件已提交  
✅ README 已更新為 AI 實驗專案說明  
✅ LICENSE 已添加  
⏳ 等待 GitHub 認證完成  
⏳ 等待推送到 GitHub  
⏳ 等待 GitHub Pages 設置

---

## 下一步

1. **立即執行**: `gh auth login -h github.com`
2. **完成認證後**: 重新執行上面的 `gh repo create` 命令
3. **設置 Pages**: 使用上述任一方法
4. **更新 README**: 替換 YOUR_USERNAME
5. **分享你的專案**! 🎉

---

## 需要幫助？

- GitHub CLI 文檔: https://cli.github.com/manual/
- GitHub Pages 文檔: https://docs.github.com/en/pages
- Render 部署指南: https://render.com/docs

---

**準備好了嗎？開始執行 `gh auth login` 吧！** 🚀
