/* ============================================
   Article Page - JavaScript
   處理單篇文章頁面的功能
   ============================================ */

// ============================================
// 全局變數
// ============================================
let currentArticle = null;
let currentLanguage = localStorage.getItem("language") || "zh-TW";
let currentTheme = localStorage.getItem("theme") || "light";

const API_URL = "http://localhost:3000/api";

// 備用文章資料
const fallbackArticles = [
  {
    id: 1,
    title: "如何成為一名優秀的前端工程師",
    excerpt: "分享我在前端開發路上的經驗與心得，從基礎到進階的完整學習路徑...",
    category: "技術",
    date: "2026-01-25",
    readTime: "8 分鐘",
    tags: ["前端", "JavaScript", "React"],
    content: `
      <h2>前言</h2>
      <p>前端開發是一個充滿挑戰但又極具成就感的領域。在這篇文章中，我想分享我在前端開發路上的經驗與心得。</p>
      
      <h2>學習路徑</h2>
      <p>成為一名優秀的前端工程師需要循序漸進地學習：</p>
      <ol>
        <li><strong>HTML/CSS 基礎</strong> - 掌握網頁的基本結構和樣式</li>
        <li><strong>JavaScript 核心</strong> - 理解語言的核心概念</li>
        <li><strong>現代框架</strong> - 學習 React、Vue 或 Angular</li>
        <li><strong>工具鏈</strong> - 熟悉 Webpack、Vite 等建置工具</li>
        <li><strong>版本控制</strong> - 精通 Git 的使用</li>
      </ol>
      
      <h2>實踐經驗</h2>
      <p>理論固然重要，但實踐更是關鍵。建議多做專案，從小型專案開始，逐步挑戰更複雜的應用。</p>
      
      <h2>持續學習</h2>
      <p>前端技術日新月異，保持學習熱情和好奇心是成為優秀工程師的關鍵。</p>
    `
  },
  {
    id: 2,
    title: "CSS 進階技巧：Grid 與 Flexbox",
    excerpt: "深入探討現代 CSS 佈局技術，掌握 Grid 和 Flexbox 的核心概念...",
    category: "教學",
    date: "2026-01-22",
    readTime: "10 分鐘",
    tags: ["CSS", "Grid", "Flexbox"],
    content: `
      <h2>CSS 佈局演進</h2>
      <p>CSS 佈局技術經歷了多個階段的發展，從最初的 table 佈局到 float，再到現在的 Flexbox 和 Grid。</p>
      
      <h2>Flexbox 基礎</h2>
      <p>Flexbox 是一維佈局系統，非常適合處理行或列的佈局：</p>
      <ul>
        <li>主軸和交叉軸的概念</li>
        <li>justify-content 和 align-items</li>
        <li>flex-grow、flex-shrink 和 flex-basis</li>
      </ul>
      
      <h2>Grid 進階</h2>
      <p>CSS Grid 是二維佈局系統，可以同時處理行和列：</p>
      <ul>
        <li>網格容器和網格項目</li>
        <li>grid-template-columns 和 grid-template-rows</li>
        <li>grid-gap 和 grid-area</li>
      </ul>
      
      <h2>實用案例</h2>
      <p>在實際專案中，Flexbox 和 Grid 常常配合使用，發揮各自的優勢。</p>
    `
  },
  {
    id: 3,
    title: "JavaScript ES2024 新特性",
    excerpt: "探索 JavaScript 最新版本的強大新功能，提升你的程式碼品質...",
    category: "技術",
    date: "2026-01-20",
    readTime: "12 分鐘",
    tags: ["JavaScript", "ES2024"],
    content: `
      <h2>ES2024 概述</h2>
      <p>JavaScript 每年都帶來新的特性和改進，ES2024 也不例外。讓我們一起探索這些新功能。</p>
      
      <h2>新增功能</h2>
      <ul>
        <li><strong>管道運算符</strong> - 使函數組合更加優雅</li>
        <li><strong>記錄和元組</strong> - 不可變的資料結構</li>
        <li><strong>裝飾器</strong> - 更簡潔的元程式設計</li>
      </ul>
      
      <h2>改進的功能</h2>
      <p>除了新功能，ES2024 還改進了許多現有特性，使 JavaScript 更加強大和易用。</p>
    `
  },
  {
    id: 4,
    title: "React Hooks 完全指南",
    excerpt: "深入了解 React Hooks，掌握函數式組件的精髓...",
    category: "技術",
    date: "2026-01-18",
    readTime: "15 分鐘",
    tags: ["React", "Hooks", "JavaScript"],
    content: `
      <h2>認識 Hooks</h2>
      <p>React Hooks 讓你在函數組件中使用 state 和其他 React 特性。</p>
      
      <h2>常用 Hooks</h2>
      <ul>
        <li><strong>useState</strong> - 管理組件狀態</li>
        <li><strong>useEffect</strong> - 處理副作用</li>
        <li><strong>useContext</strong> - 使用 Context</li>
        <li><strong>useReducer</strong> - 複雜狀態管理</li>
      </ul>
      
      <h2>自訂 Hooks</h2>
      <p>你可以創建自己的 Hooks 來重用狀態邏輯。</p>
    `
  },
  {
    id: 5,
    title: "Web 性能優化最佳實踐",
    excerpt: "學習如何優化網站性能，提升用戶體驗...",
    category: "教學",
    date: "2026-01-15",
    readTime: "11 分鐘",
    tags: ["性能", "優化", "Web"],
    content: `
      <h2>性能指標</h2>
      <p>網站性能對用戶體驗至關重要。了解關鍵性能指標是優化的第一步。</p>
      
      <h2>優化策略</h2>
      <ul>
        <li>資源壓縮和最小化</li>
        <li>圖片優化和懶加載</li>
        <li>使用 CDN</li>
        <li>瀏覽器緩存</li>
      </ul>
    `
  },
  {
    id: 6,
    title: "前端安全性防禦指南",
    excerpt: "了解常見的安全風險，學習如何保護你的應用...",
    category: "技術",
    date: "2026-01-12",
    readTime: "9 分鐘",
    tags: ["安全", "前端", "防禦"],
    content: `
      <h2>XSS 攻擊</h2>
      <p>跨站腳本(XSS)是最常見的安全威脅之一。了解如何防禦至關重要。</p>
      
      <h2>CSRF 防禦</h2>
      <p>跨站請求偽造(CSRF)攻擊也需要特別注意。</p>
      
      <h2>最佳實踐</h2>
      <ul>
        <li>輸入驗證和輸出編碼</li>
        <li>使用 HTTPS</li>
        <li>實施內容安全政策(CSP)</li>
      </ul>
    `
  }
];

// ============================================
// 初始化
// ============================================
document.addEventListener("DOMContentLoaded", async () => {
  initTheme();
  initNavigation();
  await loadArticle();
  initLanguage();
  hidePreloader();
});

// ============================================
// 主題管理
// ============================================
function initTheme() {
  document.documentElement.setAttribute("data-theme", currentTheme);
  
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    updateThemeIcon();
    themeToggle.addEventListener("click", toggleTheme);
  }
}

function toggleTheme() {
  currentTheme = currentTheme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  localStorage.setItem("theme", currentTheme);
  updateThemeIcon();
}

function updateThemeIcon() {
  const themeIcon = document.querySelector(".theme-icon");
  if (themeIcon) {
    themeIcon.textContent = currentTheme === "light" ? "🌙" : "☀️";
  }
}

// ============================================
// 導航功能
// ============================================
function initNavigation() {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const backToTop = document.getElementById("backToTop");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
    });
  }

  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 滾動時導航欄樣式
  window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    if (navbar) {
      if (window.pageYOffset > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
  });
}

// ============================================
// 載入文章
// ============================================
async function loadArticle() {
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = parseInt(urlParams.get("id"));

  if (!articleId) {
    showArticleNotFound();
    return;
  }

  try {
    const response = await fetch(`${API_URL}/articles/${articleId}`);
    const result = await response.json();

    if (result.success && result.data) {
      currentArticle = result.data;
    } else {
      // 使用備用資料
      currentArticle = fallbackArticles.find((a) => a.id === articleId);
    }
  } catch (error) {
    console.warn("⚠️ API 連接失敗，使用備用資料:", error);
    currentArticle = fallbackArticles.find((a) => a.id === articleId);
  }

  if (currentArticle) {
    renderArticle();
    initShareButtons();
  } else {
    showArticleNotFound();
  }
}

// ============================================
// 渲染文章
// ============================================
function renderArticle() {
  const articleLoading = document.getElementById("articleLoading");
  const articleBody = document.getElementById("articleBody");
  const articleTitle = document.getElementById("articleTitle");
  const articleCategory = document.getElementById("articleCategory");
  const articleDateText = document.getElementById("articleDateText");
  const articleReadTimeText = document.getElementById("articleReadTimeText");
  const articleTags = document.getElementById("articleTags");
  const articleMainContent = document.getElementById("articleMainContent");

  // 隱藏載入動畫
  if (articleLoading) articleLoading.style.display = "none";
  if (articleBody) articleBody.style.display = "block";

  // 設置文章內容
  if (articleTitle) articleTitle.textContent = currentArticle.title;
  if (articleCategory) articleCategory.textContent = currentArticle.category;
  if (articleDateText) articleDateText.textContent = currentArticle.date;
  if (articleReadTimeText) articleReadTimeText.textContent = currentArticle.readTime;
  
  if (articleTags) {
    articleTags.innerHTML = currentArticle.tags
      .map((tag) => `<span class="tag">${tag}</span>`)
      .join("");
  }

  if (articleMainContent) {
    articleMainContent.innerHTML = currentArticle.content;
  }

  // 更新頁面標題和 meta
  document.title = `${currentArticle.title} - Cool Blog`;
  
  const metaDesc = document.getElementById("articleMetaDescription");
  if (metaDesc) {
    metaDesc.setAttribute("content", currentArticle.excerpt);
  }
}

// ============================================
// 顯示文章未找到
// ============================================
function showArticleNotFound() {
  const articleLoading = document.getElementById("articleLoading");
  const articleNotFound = document.getElementById("articleNotFound");

  if (articleLoading) articleLoading.style.display = "none";
  if (articleNotFound) articleNotFound.style.display = "block";
}

// ============================================
// 分享功能
// ============================================
function initShareButtons() {
  const shareTwitter = document.getElementById("shareTwitter");
  const shareFacebook = document.getElementById("shareFacebook");
  const shareLinkedIn = document.getElementById("shareLinkedIn");
  const copyLink = document.getElementById("copyLink");

  const articleUrl = window.location.href;
  const articleTitle = currentArticle.title;

  if (shareTwitter) {
    shareTwitter.addEventListener("click", () => {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(articleTitle)}&url=${encodeURIComponent(articleUrl)}`;
      window.open(twitterUrl, "_blank");
    });
  }

  if (shareFacebook) {
    shareFacebook.addEventListener("click", () => {
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`;
      window.open(facebookUrl, "_blank");
    });
  }

  if (shareLinkedIn) {
    shareLinkedIn.addEventListener("click", () => {
      const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;
      window.open(linkedInUrl, "_blank");
    });
  }

  if (copyLink) {
    copyLink.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(articleUrl);
        showCopySuccess();
      } catch (error) {
        console.error("複製失敗:", error);
      }
    });
  }
}

function showCopySuccess() {
  const copyLink = document.getElementById("copyLink");
  if (copyLink) {
    const originalText = copyLink.innerHTML;
    copyLink.innerHTML = "✓ 已複製";
    copyLink.style.backgroundColor = "#10b981";
    
    setTimeout(() => {
      copyLink.innerHTML = originalText;
      copyLink.style.backgroundColor = "";
    }, 2000);
  }
}

// ============================================
// 語言切換
// ============================================
function initLanguage() {
  const langSelect = document.getElementById("langSelect");
  
  if (langSelect) {
    langSelect.value = currentLanguage;
    langSelect.addEventListener("change", (e) => {
      currentLanguage = e.target.value;
      localStorage.setItem("language", currentLanguage);
      window.location.reload();
    });
  }
}

// ============================================
// 隱藏預載動畫
// ============================================
function hidePreloader() {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 300);
    }, 500);
  }
}
