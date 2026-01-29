/* ============================================
   Cool Blog - 主要 JavaScript
   處理所有互動與動態功能
   ============================================ */

// ============================================
// 全局變數
// ============================================
let currentTheme = localStorage.getItem("theme") || "light";
let typingIndex = 0;
let typingNames = ["開發者", "設計師", "創作者", "學習者"]; // 將被 i18n 更新
let currentNameIndex = 0;

// API 配置
const API_URL = "http://localhost:3001/api";
let blogArticles = [];

// ============================================
// 文章資料 (從 API 載入)
// ============================================
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
      <p>前端開發是一個充滿挑戰但又極具成就感的領域。在這篇文章中，我將分享我在前端開發路上的經驗、心得，以及如何從一個初學者成長為一名優秀的前端工程師。</p>
      
      <h2>基礎階段：打好根基</h2>
      <p>學習前端開發的第一步，就是掌握三大核心技術：</p>
      <ul>
        <li><strong>HTML</strong>：結構化網頁內容的基礎</li>
        <li><strong>CSS</strong>：美化網頁外觀的關鍵</li>
        <li><strong>JavaScript</strong>：實現互動功能的核心</li>
      </ul>
      
      <h3>HTML 學習要點</h3>
      <p>學習 HTML 時，要特別注意：</p>
      <ul>
        <li>語意化標籤的使用</li>
        <li>表單與輸入元素</li>
        <li>無障礙設計 (Accessibility)</li>
        <li>SEO 優化原則</li>
      </ul>
      
      <h3>CSS 掌握技巧</h3>
      <p>CSS 是前端開發中非常重要的一環，需要學習：</p>
      <ul>
        <li>Flexbox 與 Grid 布局</li>
        <li>響應式設計 (RWD)</li>
        <li>CSS 動畫與轉場</li>
        <li>預處理器 (Sass, Less)</li>
      </ul>
      
      <h2>JavaScript 進階學習</h2>
      <p>JavaScript 是前端開發的靈魂，需要深入學習：</p>
      
      <h3>核心概念</h3>
      <ul>
        <li>原型鏈與繼承</li>
        <li>閉包與作用域</li>
        <li>非同步編程 (Promise, async/await)</li>
        <li>ES6+ 新特性</li>
      </ul>
      
      <blockquote>
        「學習編程沒有捷徑，只有不斷地練習與實踐，才能真正掌握這些技能。」
      </blockquote>
      
      <h2>框架與工具</h2>
      <p>掌握基礎後，需要學習現代前端框架：</p>
      <ul>
        <li><strong>React</strong>：用於構建用戶界面</li>
        <li><strong>Vue</strong>：漸進式框架，易於上手</li>
        <li><strong>Angular</strong>：完整的前端解決方案</li>
      </ul>
      
      <h3>開發工具</h3>
      <pre><code>// 使用 npm 安裝套件
npm install react react-dom

// 使用 Webpack 打包
npm run build</code></pre>
      
      <h2>持續學習與成長</h2>
      <p>前端技術更新迅速，保持學習非常重要：</p>
      <ul>
        <li>閱讀技術部落格與文檔</li>
        <li>參與開源專案</li>
        <li>學習最佳實踐</li>
        <li>不斷練習與實踐</li>
      </ul>
      
      <h2>結論</h2>
      <p>成為一名優秀的前端工程師需要時間與努力，但只要保持熱情與好奇心，不斷學習與實踐，你一定能夠達成目標！</p>
    `,
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
      <h2>CSS 佈局的演進</h2>
      <p>在現代網頁開發中，CSS Grid 與 Flexbox 是兩個非常強大的佈局工具。它們讓我們能夠更輕鬆地創建響應式和靈活的網頁布局。</p>
      
      <h2>Flexbox 基礎</h2>
      <p>Flexbox 是一維的佈局系統，非常適合用於元素在單一方向上的排列。</p>
      
      <h3>基本用法</h3>
      <pre><code>.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}</code></pre>
      
      <h3>主要屬性</h3>
      <ul>
        <li><code>flex-direction</code>：主軸方向</li>
        <li><code>justify-content</code>：主軸對齊</li>
        <li><code>align-items</code>：交叉軸對齊</li>
        <li><code>gap</code>：間距</li>
      </ul>
      
      <h2>CSS Grid 進階</h2>
      <p>Grid 是二維的佈局系統，適合複雜的網頁布局。</p>
      
      <h3>Grid 示例</h3>
      <pre><code>.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
}</code></pre>
      
      <h2>實際應用</h2>
      <p>在實際專案中，我們常常結合使用這兩個工具來創建完美的布局。</p>
      
      <blockquote>
        「Grid 與 Flexbox 不是競爭關係，而是互補的工具。」
      </blockquote>
      
      <h2>響應式設計</h2>
      <p>結合媒體查詢，可以創建完美的響應式布局：</p>
      <pre><code>@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}</code></pre>
    `,
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
      <h2>ES2024 新特性總覽</h2>
      <p>JavaScript 持續演進，ES2024 帶來了許多令人興奮的新功能。</p>
      
      <h2>新的陣列方法</h2>
      <p>更方便的陣列操作方法，讓程式碼更簡潔。</p>
      
      <h3>示例程式碼</h3>
      <pre><code>const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]</code></pre>
      
      <h2>效能改進</h2>
      <p>ES2024 在效能方面也有顯著提升，特別是在處理大量數據時。</p>
      
      <h2>更好的錯誤處理</h2>
      <p>新的錯誤處理機制讓程式碼更健壯：</p>
      <pre><code>try {
  await fetchData();
} catch (error) {
  console.error('發生錯誤:', error);
}</code></pre>
      
      <h2>結論</h2>
      <p>ES2024 的新特性讓 JavaScript 開發變得更加便利和強大。</p>
    `,
  },
  {
    id: 4,
    title: "打造高效能的 React 應用",
    excerpt: "React 性能優化的最佳實踐，讓你的應用運行更流暢...",
    category: "效能",
    date: "2026-01-18",
    readTime: "15 分鐘",
    tags: ["React", "效能", "優化"],
    content: `
      <h2>React 效能優化指南</h2>
      <p>在開發 React 應用時，效能優化是非常重要的一環。</p>
      
      <h2>使用 useMemo 與 useCallback</h2>
      <p>這兩個 Hook 可以幫助我們避免不必要的重新渲染。</p>
      
      <h3>示例</h3>
      <pre><code>const memoizedValue = useMemo(() => {
  return expensiveCalculation(a, b);
}, [a, b]);</code></pre>
      
      <h2>虛擬化長列表</h2>
      <p>當處理大量數據時，虛擬化可以顯著提升效能。</p>
      
      <h2>Code Splitting</h2>
      <p>將應用分割成小塊，按需載入：</p>
      <pre><code>const Component = lazy(() => import('./Component'));</code></pre>
    `,
  },
  {
    id: 5,
    title: "設計系統的建立與維護",
    excerpt: "從零開始建立企業級設計系統的完整指南...",
    category: "設計",
    date: "2026-01-15",
    readTime: "20 分鐘",
    tags: ["設計系統", "UI/UX"],
    content: `
      <h2>什麼是設計系統？</h2>
      <p>設計系統是一套完整的視覺語言與組件庫，用於保持產品的一致性。</p>
      
      <h2>建立步驟</h2>
      <ol>
        <li>定義設計原則</li>
        <li>建立色彩系統</li>
        <li>創建組件庫</li>
        <li>編寫文檔</li>
      </ol>
      
      <h2>最佳實踐</h2>
      <p>保持設計系統的簡單與一致性非常重要。</p>
      
      <h2>工具推薦</h2>
      <ul>
        <li>Figma - 設計工具</li>
        <li>Storybook - 組件展示</li>
        <li>Style Dictionary - 設計令牌管理</li>
      </ul>
    `,
  },
  {
    id: 6,
    title: "TypeScript 實戰技巧",
    excerpt: "TypeScript 開發中的常見問題與解決方案...",
    category: "技術",
    date: "2026-01-12",
    readTime: "10 分鐘",
    tags: ["TypeScript", "最佳實踐"],
    content: `
      <h2>TypeScript 的優勢</h2>
      <p>TypeScript 為 JavaScript 添加了型別系統，能夠在開發階段發現許多錯誤。</p>
      
      <h2>常用型別</h2>
      <pre><code>interface User {
  id: number;
  name: string;
  email: string;
}</code></pre>
      
      <h2>進階特性</h2>
      <p>泛用型別、條件型別等進階功能可以讓你的程式碼更加健壯。</p>
      
      <h2>與 React 整合</h2>
      <pre><code>interface Props {
  title: string;
  count: number;
}

const Component: React.FC<Props> = ({ title, count }) => {
  return <div>{title}: {count}</div>;
};</code></pre>
    `,
  },
];

let displayedArticles = 3;
let currentArticleId = null;

// ============================================
// DOM 載入完成後執行
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

// ============================================
// 初始化應用
// ============================================
async function initializeApp() {
  // 初始化主題
  initTheme();

  // 初始化多語系
  if (typeof initLanguageSelector === 'function') {
    initLanguageSelector();
    updatePageLanguage();
    // 更新打字動畫文字為當前語言
    typingNames = t('hero.typingText');
  }

  // 初始化導航
  initNavigation();

  // 初始化 Hero 區塊
  initHero();

  // 從 API 載入文章
  await loadArticlesFromAPI();

  // 初始化部落格
  initBlog();

  // 初始化表單
  initContactForm();

  // 初始化回到頂部按鈕
  initBackToTop();

  // 初始化粒子效果
  initParticles();

  // 初始化滾動動畫
  initScrollAnimations();

  // 隱藏預載入畫面
  setTimeout(() => {
    document.getElementById("preloader").classList.add("hidden");
  }, 1000);
}

// ============================================
// 主題切換
// ============================================
function initTheme() {
  // 設定初始主題
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon();

  // 主題切換按鈕
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
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
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  // 滾動時改變導航欄樣式
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // 手機版選單切換
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // 平滑滾動與選單高亮
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // 關閉手機版選單
        navToggle?.classList.remove("active");
        navMenu?.classList.remove("active");

        // 滾動到目標區塊
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });

        // 更新活動連結
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  });

  // 滾動時更新活動連結
  window.addEventListener("scroll", () => {
    let current = "";
    const sections = document.querySelectorAll("section[id]");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

// ============================================
// API 相關函數
// ============================================
async function loadArticlesFromAPI() {
  try {
    const response = await fetch(`${API_URL}/articles`);
    const result = await response.json();

    if (result.success && result.data.length > 0) {
      blogArticles = result.data;
      console.log("✅ 從 API 成功載入文章");
    } else {
      // 如果 API 失敗，使用備用資料
      console.warn("⚠️ 無法從 API 載入文章，使用備用資料");
      blogArticles = fallbackArticles;
    }
  } catch (error) {
    console.warn("⚠️ API 連接失敗，使用備用資料:", error);
    blogArticles = fallbackArticles;
  }
}

// ============================================
// 平滑滾動與選單高亮
// ============================================
function initHero() {
  // 打字效果
  typeText();
}

function typeText() {
  const typingElement = document.getElementById("typingText");
  if (!typingElement) return;

  const currentName = typingNames[currentNameIndex];

  if (typingIndex < currentName.length) {
    typingElement.textContent = currentName.substring(0, typingIndex + 1);
    typingIndex++;
    setTimeout(typeText, 150);
  } else {
    setTimeout(() => {
      eraseText();
    }, 2000);
  }
}

function eraseText() {
  const typingElement = document.getElementById("typingText");
  if (!typingElement) return;

  const currentName = typingNames[currentNameIndex];

  if (typingIndex > 0) {
    typingElement.textContent = currentName.substring(0, typingIndex - 1);
    typingIndex--;
    setTimeout(eraseText, 100);
  } else {
    currentNameIndex = (currentNameIndex + 1) % typingNames.length;
    setTimeout(typeText, 500);
  }
}

// ============================================
// 粒子效果
// ============================================
function initParticles() {
  const particlesContainer = document.getElementById("particles");
  if (!particlesContainer) return;

  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // 隨機位置
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;

    // 隨機動畫延遲
    particle.style.animationDelay = `${Math.random() * 20}s`;

    particlesContainer.appendChild(particle);
  }
}

// ============================================
// 部落格功能
// ============================================
function initBlog() {
  renderBlogArticles();

  const loadMoreBtn = document.getElementById("loadMoreBtn");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", loadMoreArticles);
  }

  // 初始化文章詳細頁面控制
  initArticleDetailControls();
}

function renderBlogArticles() {
  const blogGrid = document.getElementById("blogGrid");
  if (!blogGrid) return;

  blogGrid.innerHTML = "";

  const articlesToShow = blogArticles.slice(0, displayedArticles);

  articlesToShow.forEach((article) => {
    const articleCard = createBlogCard(article);
    blogGrid.appendChild(articleCard);
  });

  // 隱藏載入更多按鈕如果已顯示所有文章
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  if (loadMoreBtn) {
    if (displayedArticles >= blogArticles.length) {
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "inline-flex";
    }
  }
}

function createBlogCard(article) {
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
            <h3>${article.title}</h3>
            <p class="blog-excerpt">${article.excerpt}</p>
            <div class="blog-tags">
                ${article.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
            </div>
        </div>
    `;

  card.addEventListener("click", () => {
    showArticleDetail(article.id);
  });

  return card;
}

function loadMoreArticles() {
  displayedArticles += 3;
  renderBlogArticles();
}

// ============================================
// 文章詳細頁面功能
// ============================================
function showArticleDetail(articleId) {
  const article = blogArticles.find((a) => a.id === articleId);
  if (!article) return;

  currentArticleId = articleId;

  // 更新文章內容
  document.getElementById("articleCategory").textContent = article.category;
  document.getElementById("articleDate").textContent = `📅 ${article.date}`;
  document.getElementById("articleReadtime").textContent =
    `⏱️ ${article.readTime}`;
  document.getElementById("articleTitle").textContent = article.title;
  document.getElementById("articleBody").innerHTML = article.content;

  // 更新標籤
  const tagsContainer = document.getElementById("articleTags");
  tagsContainer.innerHTML = article.tags
    .map((tag) => `<span class="tag">${tag}</span>`)
    .join("");

  // 更新上一篇/下一篇
  updateArticleNavigation(articleId);

  // 顯示 Modal
  const modal = document.getElementById("articleModal");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function updateArticleNavigation(currentId) {
  const currentIndex = blogArticles.findIndex((a) => a.id === currentId);
  const prevArticle = blogArticles[currentIndex - 1];
  const nextArticle = blogArticles[currentIndex + 1];

  const prevBtn = document.getElementById("prevArticle");
  const nextBtn = document.getElementById("nextArticle");

  if (prevArticle) {
    prevBtn.style.display = "block";
    prevBtn.querySelector(".nav-title").textContent = prevArticle.title;
    prevBtn.onclick = () => showArticleDetail(prevArticle.id);
  } else {
    prevBtn.style.display = "none";
  }

  if (nextArticle) {
    nextBtn.style.display = "block";
    nextBtn.querySelector(".nav-title").textContent = nextArticle.title;
    nextBtn.onclick = () => showArticleDetail(nextArticle.id);
  } else {
    nextBtn.style.display = "none";
  }
}

function hideArticleDetail() {
  const modal = document.getElementById("articleModal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// 初始化文章 Modal 控制
function initArticleDetailControls() {
  const closeBtn = document.getElementById("closeModal");
  const backdrop = document.getElementById("modalBackdrop");

  if (closeBtn) {
    closeBtn.addEventListener("click", hideArticleDetail);
  }

  if (backdrop) {
    backdrop.addEventListener("click", hideArticleDetail);
  }

  // ESC 鍵關閉 Modal
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      document.getElementById("articleModal").classList.contains("active")
    ) {
      hideArticleDetail();
    }
  });

  // 複製連結按鈕
  const copyLinkBtn = document.getElementById("copyLinkBtn");
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener("click", () => {
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(() => {
        alert("連結已複製到剪貼簿！");
      });
    });
  }

  // 分享按鈕
  const shareButtons = document.querySelectorAll(".share-btn");
  shareButtons.forEach((btn) => {
    if (btn.id === "copyLinkBtn") return; // 已處理

    btn.addEventListener("click", () => {
      const platform = btn.textContent.trim();
      alert(`分享到 ${platform} (功能示範)`);
    });
  });
}
function initContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit);
  }
}

function handleFormSubmit(e) {
  e.preventDefault();

  const formMessage = document.getElementById("formMessage");
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // 模擬表單提交
  formMessage.textContent = "正在發送訊息...";
  formMessage.className = "form-message";
  formMessage.style.display = "block";

  setTimeout(() => {
    formMessage.textContent = `感謝 ${name} 的訊息！我會盡快回覆你的 Email (${email})。`;
    formMessage.className = "form-message success";

    // 清空表單
    e.target.reset();

    // 3秒後隱藏訊息
    setTimeout(() => {
      formMessage.style.display = "none";
    }, 5000);
  }, 1500);
}

// ============================================
// 回到頂部按鈕
// ============================================
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTop");

  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ============================================
// 滾動動畫
// ============================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
      }
    });
  }, observerOptions);

  // 觀察所有需要動畫的元素
  const animateElements = document.querySelectorAll(
    ".about-card, .skill-item, .project-card",
  );
  animateElements.forEach((el) => observer.observe(el));
}

// ============================================
// 工具函數
// ============================================

// 格式化日期
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("zh-TW", options);
}

// 平滑滾動到元素
function scrollToElement(element, offset = 80) {
  const elementPosition = element.offsetTop - offset;
  window.scrollTo({
    top: elementPosition,
    behavior: "smooth",
  });
}

// 節流函數
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ============================================
// 效能優化
// ============================================

// 使用節流優化滾動事件
window.addEventListener(
  "scroll",
  throttle(() => {
    // 滾動相關的處理已在各自的函數中實現
  }, 100),
);

// 圖片懶載入 (如果有使用真實圖片)
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          imageObserver.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// ============================================
// 控制台歡迎訊息
// ============================================
console.log(
  "%c🚀 Cool Blog",
  "font-size: 24px; font-weight: bold; color: #6366f1;",
);
console.log("%c歡迎來到我的部落格！", "font-size: 14px; color: #6b7280;");
console.log(
  "%c如果你對網站有任何建議，歡迎聯絡我！",
  "font-size: 12px; color: #9ca3af;",
);
