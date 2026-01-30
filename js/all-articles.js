/* ============================================
   All Articles Page - JavaScript
   處理全文章頁面的功能
   ============================================ */

// ============================================
// 全局變數
// ============================================
let allArticles = [];
let filteredArticles = [];
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
    content: "<h2>前言</h2><p>前端開發是一個充滿挑戰但又極具成就感的領域...</p>"
  },
  {
    id: 2,
    title: "CSS 進階技巧：Grid 與 Flexbox",
    excerpt: "深入探討現代 CSS 佈局技術，掌握 Grid 和 Flexbox 的核心概念...",
    category: "教學",
    date: "2026-01-22",
    readTime: "10 分鐘",
    tags: ["CSS", "Grid", "Flexbox"],
    content: "<h2>CSS 佈局演進</h2><p>CSS 佈局技術經歷了多個階段的發展...</p>"
  },
  {
    id: 3,
    title: "JavaScript ES2024 新特性",
    excerpt: "探索 JavaScript 最新版本的強大新功能，提升你的程式碼品質...",
    category: "技術",
    date: "2026-01-20",
    readTime: "12 分鐘",
    tags: ["JavaScript", "ES2024"],
    content: "<h2>ES2024 概述</h2><p>JavaScript 每年都帶來新的特性和改進...</p>"
  },
  {
    id: 4,
    title: "React Hooks 完全指南",
    excerpt: "深入了解 React Hooks，掌握函數式組件的精髓...",
    category: "技術",
    date: "2026-01-18",
    readTime: "15 分鐘",
    tags: ["React", "Hooks", "JavaScript"],
    content: "<h2>認識 Hooks</h2><p>React Hooks 讓你在函數組件中使用 state...</p>"
  },
  {
    id: 5,
    title: "Web 性能優化最佳實踐",
    excerpt: "學習如何優化網站性能，提升用戶體驗...",
    category: "教學",
    date: "2026-01-15",
    readTime: "11 分鐘",
    tags: ["性能", "優化", "Web"],
    content: "<h2>性能指標</h2><p>網站性能對用戶體驗至關重要...</p>"
  },
  {
    id: 6,
    title: "前端安全性防禦指南",
    excerpt: "了解常見的安全風險，學習如何保護你的應用...",
    category: "技術",
    date: "2026-01-12",
    readTime: "9 分鐘",
    tags: ["安全", "前端", "防禦"],
    content: "<h2>XSS 攻擊</h2><p>跨站腳本(XSS)是最常見的安全威脅...</p>"
  }
];

// ============================================
// 初始化
// ============================================
document.addEventListener("DOMContentLoaded", async () => {
  initTheme();
  initNavigation();
  await loadArticles();
  renderArticles();
  initFilters();
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
async function loadArticles() {
  try {
    const response = await fetch(`${API_URL}/articles`);
    const result = await response.json();

    if (result.success && result.data.length > 0) {
      allArticles = result.data;
      console.log("✅ 從 API 成功載入文章");
    } else {
      allArticles = fallbackArticles;
      console.warn("⚠️ 使用備用文章資料");
    }
  } catch (error) {
    console.warn("⚠️ API 連接失敗，使用備用資料:", error);
    allArticles = fallbackArticles;
  }

  filteredArticles = [...allArticles];
}

// ============================================
// 渲染文章
// ============================================
function renderArticles() {
  const articlesGrid = document.getElementById("articlesGrid");
  const noArticles = document.getElementById("noArticles");

  if (!articlesGrid) return;

  articlesGrid.innerHTML = "";

  if (filteredArticles.length === 0) {
    if (noArticles) noArticles.style.display = "block";
    return;
  }

  if (noArticles) noArticles.style.display = "none";

  filteredArticles.forEach((article) => {
    const articleCard = createArticleCard(article);
    articlesGrid.appendChild(articleCard);
  });
}

function createArticleCard(article) {
  const card = document.createElement("div");
  card.classList.add("blog-card", "fade-in-up");

  card.innerHTML = `
    <div class="blog-image">
      <div class="blog-placeholder">
        <span class="blog-placeholder-icon">📝</span>
      </div>
      <span class="blog-category">${article.category}</span>
    </div>
    <div class="blog-content">
      <div class="blog-meta">
        <span class="blog-date">
          <span>📅</span>
          ${article.date}
        </span>
        <span class="blog-readtime">
          <span>⏱️</span>
          ${article.readTime}
        </span>
      </div>
      <h3 class="article-card-title">${article.title}</h3>
      <p class="blog-excerpt">${article.excerpt}</p>
      <div class="blog-tags">
        ${article.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </div>
    </div>
  `;

  // 點擊卡片主體打開 modal
  card.addEventListener("click", (e) => {
    // 如果點擊的是標題，則跳轉到文章頁面
    if (e.target.classList.contains("article-card-title")) {
      window.location.href = `article.html?id=${article.id}`;
    } else {
      showArticleModal(article);
    }
  });

  // 為標題添加特殊樣式和點擊事件
  const titleElement = card.querySelector(".article-card-title");
  if (titleElement) {
    titleElement.style.cursor = "pointer";
    titleElement.addEventListener("click", (e) => {
      e.stopPropagation();
      window.location.href = `article.html?id=${article.id}`;
    });
  }

  return card;
}

// ============================================
// Modal 功能
// ============================================
function showArticleModal(article) {
  const modal = document.getElementById("articleModal");
  const modalBody = document.getElementById("modalBody");

  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div class="modal-header">
      <span class="modal-category">${article.category}</span>
      <h2>${article.title}</h2>
      <div class="modal-meta">
        <span>📅 ${article.date}</span>
        <span>⏱️ ${article.readTime}</span>
      </div>
      <div class="modal-tags">
        ${article.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </div>
    </div>
    <div class="modal-content-body">
      ${article.content}
    </div>
    <div class="modal-footer">
      <a href="article.html?id=${article.id}" class="btn btn-primary">
        查看完整文章 →
      </a>
    </div>
  `;

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";

  // 關閉 modal
  const modalClose = document.getElementById("modalClose");
  if (modalClose) {
    modalClose.onclick = closeArticleModal;
  }

  modal.onclick = (e) => {
    if (e.target === modal) {
      closeArticleModal();
    }
  };
}

function closeArticleModal() {
  const modal = document.getElementById("articleModal");
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }
}

// ESC 鍵關閉 modal
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeArticleModal();
  }
});

// ============================================
// 篩選與排序
// ============================================
function initFilters() {
  const categoryFilter = document.getElementById("categoryFilter");
  const sortSelect = document.getElementById("sortSelect");

  if (categoryFilter) {
    categoryFilter.addEventListener("change", applyFilters);
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", applyFilters);
  }
}

function applyFilters() {
  const categoryFilter = document.getElementById("categoryFilter");
  const sortSelect = document.getElementById("sortSelect");

  let filtered = [...allArticles];

  // 分類篩選
  if (categoryFilter && categoryFilter.value !== "all") {
    filtered = filtered.filter(
      (article) => article.category === categoryFilter.value
    );
  }

  // 排序
  if (sortSelect) {
    const sortValue = sortSelect.value;
    
    if (sortValue === "newest") {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortValue === "oldest") {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortValue === "title") {
      filtered.sort((a, b) => a.title.localeCompare(b.title, currentLanguage));
    }
  }

  filteredArticles = filtered;
  renderArticles();
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
      // 在實際應用中，這裡會更新所有翻譯
      // 目前先重新載入頁面
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
