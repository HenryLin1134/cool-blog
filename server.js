/* ============================================
   Cool Blog 後端服務器
   提供 API 來管理文章資料
   ============================================ */

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, "data", "articles.json");

// 中間件
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("."));

// ============================================
// 工具函數
// ============================================

// 確保 data 資料夾存在
function ensureDataDir() {
  const dataDir = path.join(__dirname, "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// 讀取文章資料
function readArticles() {
  try {
    ensureDataDir();
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, "utf8");
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error("讀取文章失敗:", error);
    return [];
  }
}

// 寫入文章資料
function writeArticles(articles) {
  try {
    ensureDataDir();
    fs.writeFileSync(DATA_FILE, JSON.stringify(articles, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("寫入文章失敗:", error);
    return false;
  }
}

// 初始化預設文章
function initializeDefaultArticles() {
  const defaultArticles = [
    {
      id: 1,
      title: "如何成為一名優秀的前端工程師",
      excerpt:
        "分享我在前端開發路上的經驗與心得，從基礎到進階的完整學習路徑...",
      category: "技術",
      date: "2026-01-25",
      readTime: "8 分鐘",
      tags: ["前端", "JavaScript", "React"],
      content:
        "<h2>前言</h2><p>前端開發是一個充滿挑戰但又極具成就感的領域...</p>",
    },
    {
      id: 2,
      title: "CSS 進階技巧：Grid 與 Flexbox",
      excerpt: "深入探討現代 CSS 佈局技術，掌握 Grid 和 Flexbox 的核心概念...",
      category: "教學",
      date: "2026-01-22",
      readTime: "10 分鐘",
      tags: ["CSS", "Grid", "Flexbox"],
      content:
        "<h2>CSS 佈局演進</h2><p>CSS 佈局技術經歷了多個階段的發展...</p>",
    },
    {
      id: 3,
      title: "JavaScript ES2024 新特性",
      excerpt: "探索 JavaScript 最新版本的強大新功能，提升你的程式碼品質...",
      category: "技術",
      date: "2026-01-20",
      readTime: "12 分鐘",
      tags: ["JavaScript", "ES2024"],
      content:
        "<h2>ES2024 概述</h2><p>JavaScript 每年都帶來新的特性和改進...</p>",
    },
    {
      id: 4,
      title: "React Hooks 完全指南",
      excerpt: "深入了解 React Hooks，掌握函數式組件的精髓...",
      category: "技術",
      date: "2026-01-18",
      readTime: "15 分鐘",
      tags: ["React", "Hooks", "JavaScript"],
      content:
        "<h2>認識 Hooks</h2><p>React Hooks 讓你在函數組件中使用 state...</p>",
    },
    {
      id: 5,
      title: "Web 性能優化最佳實踐",
      excerpt: "學習如何優化網站性能，提升用戶體驗...",
      category: "教學",
      date: "2026-01-15",
      readTime: "11 分鐘",
      tags: ["性能", "優化", "Web"],
      content: "<h2>性能指標</h2><p>網站性能對用戶體驗至關重要...</p>",
    },
    {
      id: 6,
      title: "前端安全性防禦指南",
      excerpt: "了解常見的安全風險，學習如何保護你的應用...",
      category: "技術",
      date: "2026-01-12",
      readTime: "9 分鐘",
      tags: ["安全", "前端", "防禦"],
      content: "<h2>XSS 攻擊</h2><p>跨站腳本(XSS)是最常見的安全威脅...</p>",
    },
  ];

  const articles = readArticles();
  if (articles.length === 0) {
    writeArticles(defaultArticles);
    console.log("✅ 已初始化預設文章");
  }
}

// ============================================
// API 路由
// ============================================

// 獲取所有文章
app.get("/api/articles", (req, res) => {
  const articles = readArticles();
  res.json({
    success: true,
    data: articles,
  });
});

// 獲取單篇文章
app.get("/api/articles/:id", (req, res) => {
  const articles = readArticles();
  const article = articles.find((a) => a.id === parseInt(req.params.id));

  if (!article) {
    return res.status(404).json({
      success: false,
      message: "文章不存在",
    });
  }

  res.json({
    success: true,
    data: article,
  });
});

// 新增文章
app.post("/api/articles", (req, res) => {
  const { title, excerpt, category, date, readTime, tags, content } = req.body;

  if (!title || !excerpt || !category || !content) {
    return res.status(400).json({
      success: false,
      message: "缺少必填欄位",
    });
  }

  const articles = readArticles();
  const newArticle = {
    id: Math.max(...articles.map((a) => a.id), 0) + 1,
    title,
    excerpt,
    category,
    date: date || new Date().toISOString().split("T")[0],
    readTime: readTime || "5 分鐘",
    tags: tags || [],
    content,
  };

  articles.push(newArticle);

  if (writeArticles(articles)) {
    res.json({
      success: true,
      message: "文章已新增",
      data: newArticle,
    });
  } else {
    res.status(500).json({
      success: false,
      message: "無法保存文章",
    });
  }
});

// 編輯文章
app.put("/api/articles/:id", (req, res) => {
  const { title, excerpt, category, date, readTime, tags, content } = req.body;
  const articles = readArticles();
  const index = articles.findIndex((a) => a.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "文章不存在",
    });
  }

  articles[index] = {
    ...articles[index],
    title: title || articles[index].title,
    excerpt: excerpt || articles[index].excerpt,
    category: category || articles[index].category,
    date: date || articles[index].date,
    readTime: readTime || articles[index].readTime,
    tags: tags !== undefined ? tags : articles[index].tags,
    content: content || articles[index].content,
  };

  if (writeArticles(articles)) {
    res.json({
      success: true,
      message: "文章已更新",
      data: articles[index],
    });
  } else {
    res.status(500).json({
      success: false,
      message: "無法保存文章",
    });
  }
});

// 刪除文章
app.delete("/api/articles/:id", (req, res) => {
  const articles = readArticles();
  const index = articles.findIndex((a) => a.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "文章不存在",
    });
  }

  const deleted = articles.splice(index, 1);

  if (writeArticles(articles)) {
    res.json({
      success: true,
      message: "文章已刪除",
      data: deleted[0],
    });
  } else {
    res.status(500).json({
      success: false,
      message: "無法刪除文章",
    });
  }
});

// ============================================
// 啟動服務器
// ============================================

app.listen(PORT, () => {
  initializeDefaultArticles();
  console.log(`
╔════════════════════════════════════════╗
║  🚀 Cool Blog 後端服務已啟動          ║
║  API 地址: http://localhost:${PORT}   ║
║  編輯器: http://localhost:${PORT}/admin.html ║
╚════════════════════════════════════════╝
  `);
});
