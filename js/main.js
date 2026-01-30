/* ============================================
   Cool Blog - 主要 JavaScript
   處理所有互動與動態功能
   ============================================ */

// ============================================
// 全局變數
// ============================================
let currentTheme = localStorage.getItem("theme") || "light";
let typingIndex = 0;
let typingNames = [];
let currentNameIndex = 0;
let typingSession = 0;
let currentLanguage =
  localStorage.getItem("language") || getPreferredLanguage();
const SUPPORTED_LANGUAGES = ["zh-TW", "en", "ja"];
const MAX_HOME_ARTICLES = 6; // 首頁最多顯示6篇文章
const DATE_LOCALES = {
  "zh-TW": "zh-TW",
  en: "en-US",
  ja: "ja-JP",
};

const I18N = {
  "zh-TW": {
    meta: {
      title: "Cool Blog - 我的酷炫部落格",
      description: "一個很酷的個人部落格 - 分享技術、生活與創意",
    },
    nav: {
      home: "首頁",
      about: "關於我",
      blog: "部落格",
      projects: "作品集",
      contact: "聯絡",
      login: "登入",
      language: "語言",
      toggleMenu: "切換選單",
      toggleTheme: "切換主題",
    },
    hero: {
      greeting: "嗨！我是",
      subtitle: "全端開發者 | 設計愛好者 | 終身學習者",
      description:
        "專注於創造美觀、高效且用戶友好的網頁應用程式。 熱愛探索新技術，分享知識與經驗。",
      ctaPrimary: "探索文章",
      ctaSecondary: "聯絡我",
      scroll: "向下滾動",
      typingNames: ["開發者", "設計師", "創作者", "學習者"],
    },
    about: {
      title: "關於我",
      subtitle: "熱情 | 創新 | 追求卓越",
      cards: {
        mission: {
          title: "我的使命",
          body: "透過程式碼創造價值，用技術解決實際問題，讓世界變得更美好。",
        },
        vision: {
          title: "我的理念",
          body: "保持好奇心，永不停止學習。相信技術可以改變生活，設計能傳遞情感。",
        },
        goal: {
          title: "我的目標",
          body: "成為一名優秀的全端開發者，打造令人驚艷的產品，影響更多人。",
        },
      },
      skillsTitle: "技能專長",
      skills: {
        frontend: "前端開發",
        backend: "後端開發",
        design: "UI/UX 設計",
        cloud: "雲端服務",
      },
    },
    blog: {
      title: "最新文章",
      subtitle: "分享技術心得與生活感悟",
      loadMore: "載入更多文章",
    },
    allArticles: {
      meta: {
        title: "所有文章 - Cool Blog",
        description: "瀏覽所有文章 - Cool Blog",
      },
      pageTitle: "所有文章",
      pageSubtitle: "探索我的所有創作與分享",
      filterByCategory: "分類：",
      allCategories: "全部",
      category: {
        tech: "技術",
        tutorial: "教學",
        life: "生活",
      },
      sortBy: "排序：",
      sort: {
        newest: "最新",
        oldest: "最舊",
        title: "標題",
      },
      noArticles: "沒有找到符合條件的文章",
    },
    article: {
      backToList: "返回文章列表",
      loading: "載入中...",
      notFound: "找不到這篇文章",
      share: "分享這篇文章",
      copyLink: "複製連結",
    },
    modal: {
      close: "關閉",
      shareTitle: "分享這篇文章",
      shareTwitter: "分享到 Twitter",
      shareFacebook: "分享到 Facebook",
      shareLinkedIn: "分享到 LinkedIn",
      copyLink: "複製連結",
      copyLinkText: "複製連結",
      prev: "← 上一篇",
      next: "下一篇 →",
      twitter: "Twitter",
      facebook: "Facebook",
      linkedin: "LinkedIn",
    },
    projects: {
      title: "精選作品",
      subtitle: "用心打造的專案",
      viewDemo: "查看展示",
      viewCode: "查看程式碼",
      items: {
        commerce: {
          title: "電商平台",
          body: "功能完整的線上購物平台，包含商品管理、購物車、訂單系統等功能。",
        },
        taskApp: {
          title: "任務管理 App",
          body: "簡潔易用的任務管理應用，支援雲端同步與多人協作。",
        },
        designSystem: {
          title: "設計系統",
          body: "為企業打造的完整設計系統，包含組件庫、設計規範與文檔。",
        },
      },
    },
    contact: {
      title: "保持聯繫",
      subtitle: "很樂意與你交流",
      email: "Email",
      github: "GitHub",
      linkedin: "LinkedIn",
      linkedinName: "你的名字",
      twitter: "Twitter",
    },
    form: {
      name: "你的名字",
      email: "你的 Email",
      message: "想說的話...",
      submit: "發送訊息",
      sending: "正在發送訊息...",
      thanks: "感謝 {name} 的訊息！我會盡快回覆你的 Email ({email})。",
    },
    footer: {
      brand: "用心創造，用愛分享",
      quickLinks: "快速連結",
      social: "社群媒體",
      copyright: "© 2026 Cool Blog. 用 ❤️ 與 ☕ 打造",
      tech: "使用 HTML, CSS, JavaScript 構建",
      backToTop: "回到頂部",
    },
    alerts: {
      copyLinkSuccess: "連結已複製到剪貼簿！",
      shareDemo: "分享到 {platform} (功能示範)",
    },
  },
  en: {
    meta: {
      title: "Cool Blog - My Awesome Blog",
      description: "A cool personal blog sharing tech, life, and creativity",
    },
    nav: {
      home: "Home",
      about: "About",
      blog: "Blog",
      projects: "Projects",
      contact: "Contact",
      login: "Login",
      language: "Language",
      toggleMenu: "Toggle menu",
      toggleTheme: "Toggle theme",
    },
    hero: {
      greeting: "Hi! I'm",
      subtitle: "Full-stack Developer | Design Enthusiast | Lifelong Learner",
      description:
        "Focused on building beautiful, efficient, and user-friendly web experiences. I love exploring new tech and sharing what I learn.",
      ctaPrimary: "Explore Articles",
      ctaSecondary: "Contact Me",
      scroll: "Scroll Down",
      typingNames: ["Developer", "Designer", "Creator", "Learner"],
    },
    about: {
      title: "About Me",
      subtitle: "Passion | Innovation | Excellence",
      cards: {
        mission: {
          title: "My Mission",
          body: "Create value through code, solve real problems with technology, and make the world better.",
        },
        vision: {
          title: "My Philosophy",
          body: "Stay curious and never stop learning. Believe tech changes lives and design conveys emotion.",
        },
        goal: {
          title: "My Goal",
          body: "Become a great full-stack developer and build delightful products that impact more people.",
        },
      },
      skillsTitle: "Skills",
      skills: {
        frontend: "Frontend Development",
        backend: "Backend Development",
        design: "UI/UX Design",
        cloud: "Cloud Services",
      },
    },
    blog: {
      title: "Latest Articles",
      subtitle: "Sharing tech insights and life reflections",
      loadMore: "Load More",
    },
    allArticles: {
      meta: {
        title: "All Articles - Cool Blog",
        description: "Browse all articles - Cool Blog",
      },
      pageTitle: "All Articles",
      pageSubtitle: "Explore all my creations and insights",
      filterByCategory: "Category:",
      allCategories: "All",
      category: {
        tech: "Tech",
        tutorial: "Tutorial",
        life: "Life",
      },
      sortBy: "Sort by:",
      sort: {
        newest: "Newest",
        oldest: "Oldest",
        title: "Title",
      },
      noArticles: "No articles found matching the criteria",
    },
    article: {
      backToList: "Back to Articles",
      loading: "Loading...",
      notFound: "Article not found",
      share: "Share this article",
      copyLink: "Copy Link",
    },
    modal: {
      close: "Close",
      shareTitle: "Share this article",
      shareTwitter: "Share to Twitter",
      shareFacebook: "Share to Facebook",
      shareLinkedIn: "Share to LinkedIn",
      copyLink: "Copy link",
      copyLinkText: "Copy Link",
      prev: "← Previous",
      next: "Next →",
      twitter: "Twitter",
      facebook: "Facebook",
      linkedin: "LinkedIn",
    },
    projects: {
      title: "Featured Projects",
      subtitle: "Carefully crafted works",
      viewDemo: "View demo",
      viewCode: "View code",
      items: {
        commerce: {
          title: "E-commerce Platform",
          body: "A full-featured online store with product management, cart, and orders.",
        },
        taskApp: {
          title: "Task Manager App",
          body: "A clean task manager with cloud sync and team collaboration.",
        },
        designSystem: {
          title: "Design System",
          body: "A comprehensive design system with components, guidelines, and docs.",
        },
      },
    },
    contact: {
      title: "Get in Touch",
      subtitle: "Happy to connect with you",
      email: "Email",
      github: "GitHub",
      linkedin: "LinkedIn",
      linkedinName: "Your Name",
      twitter: "Twitter",
    },
    form: {
      name: "Your Name",
      email: "Your Email",
      message: "Your message...",
      submit: "Send Message",
      sending: "Sending message...",
      thanks: "Thanks {name}! I'll reply to your email soon ({email}).",
    },
    footer: {
      brand: "Crafted with care, shared with love",
      quickLinks: "Quick Links",
      social: "Social",
      copyright: "© 2026 Cool Blog. Built with ❤️ and ☕",
      tech: "Built with HTML, CSS, JavaScript",
      backToTop: "Back to top",
    },
    alerts: {
      copyLinkSuccess: "Link copied to clipboard!",
      shareDemo: "Share to {platform} (demo)",
    },
  },
  ja: {
    meta: {
      title: "Cool Blog - 私のクールなブログ",
      description: "技術・生活・創造性を共有するクールな個人ブログ",
    },
    nav: {
      home: "ホーム",
      about: "私について",
      blog: "ブログ",
      projects: "作品集",
      contact: "連絡先",
      login: "ログイン",
      language: "言語",
      toggleMenu: "メニューを切り替え",
      toggleTheme: "テーマを切り替え",
    },
    hero: {
      greeting: "こんにちは、私は",
      subtitle: "フルスタック開発者 | デザイン愛好家 | 生涯学習者",
      description:
        "美しく効率的で使いやすいWeb体験の創造に集中しています。新技術の探求と共有が大好きです。",
      ctaPrimary: "記事を見る",
      ctaSecondary: "連絡する",
      scroll: "下へスクロール",
      typingNames: ["開発者", "デザイナー", "クリエイター", "学習者"],
    },
    about: {
      title: "私について",
      subtitle: "情熱 | 革新 | 卓越",
      cards: {
        mission: {
          title: "私の使命",
          body: "コードで価値を生み、技術で課題を解決し、世界をより良くします。",
        },
        vision: {
          title: "私の信念",
          body: "好奇心を持ち続け、学びを止めない。技術は生活を変え、デザインは感情を伝えます。",
        },
        goal: {
          title: "私の目標",
          body: "優れたフルスタック開発者として、驚きのあるプロダクトを作り多くの人に影響を与えること。",
        },
      },
      skillsTitle: "スキル",
      skills: {
        frontend: "フロントエンド開発",
        backend: "バックエンド開発",
        design: "UI/UX デザイン",
        cloud: "クラウドサービス",
      },
    },
    blog: {
      title: "最新記事",
      subtitle: "技術の気づきと日常の記録",
      loadMore: "もっと読む",
    },
    allArticles: {
      meta: {
        title: "すべての記事 - Cool Blog",
        description: "すべての記事を閲覧 - Cool Blog",
      },
      pageTitle: "すべての記事",
      pageSubtitle: "私のすべての作品と洞察を探索",
      filterByCategory: "カテゴリ：",
      allCategories: "すべて",
      category: {
        tech: "技術",
        tutorial: "チュートリアル",
        life: "生活",
      },
      sortBy: "並び替え：",
      sort: {
        newest: "最新",
        oldest: "最古",
        title: "タイトル",
      },
      noArticles: "条件に一致する記事が見つかりません",
    },
    article: {
      backToList: "記事一覧に戻る",
      loading: "読み込み中...",
      notFound: "記事が見つかりません",
      share: "この記事を共有",
      copyLink: "リンクをコピー",
    },
    modal: {
      close: "閉じる",
      shareTitle: "この記事を共有",
      shareTwitter: "Twitterで共有",
      shareFacebook: "Facebookで共有",
      shareLinkedIn: "LinkedInで共有",
      copyLink: "リンクをコピー",
      copyLinkText: "リンクをコピー",
      prev: "← 前の記事",
      next: "次の記事 →",
      twitter: "Twitter",
      facebook: "Facebook",
      linkedin: "LinkedIn",
    },
    projects: {
      title: "注目プロジェクト",
      subtitle: "心を込めた制作物",
      viewDemo: "デモを見る",
      viewCode: "コードを見る",
      items: {
        commerce: {
          title: "ECプラットフォーム",
          body: "商品管理、カート、注文機能を備えたオンラインストア。",
        },
        taskApp: {
          title: "タスク管理アプリ",
          body: "シンプルなタスク管理。クラウド同期と共同作業に対応。",
        },
        designSystem: {
          title: "デザインシステム",
          body: "コンポーネントとガイドラインを備えた包括的なデザインシステム。",
        },
      },
    },
    contact: {
      title: "お問い合わせ",
      subtitle: "お気軽にご連絡ください",
      email: "メール",
      github: "GitHub",
      linkedin: "LinkedIn",
      linkedinName: "お名前",
      twitter: "Twitter",
    },
    form: {
      name: "お名前",
      email: "メールアドレス",
      message: "メッセージ...",
      submit: "送信する",
      sending: "送信中...",
      thanks: "{name} さん、ありがとうございます。後ほど {email} に返信します。",
    },
    footer: {
      brand: "心を込めて作り、愛を込めて共有",
      quickLinks: "クイックリンク",
      social: "ソーシャル",
      copyright: "© 2026 Cool Blog. ❤️ と ☕ で作成",
      tech: "HTML / CSS / JavaScript で構築",
      backToTop: "トップへ戻る",
    },
    alerts: {
      copyLinkSuccess: "リンクをコピーしました！",
      shareDemo: "{platform} に共有（デモ）",
    },
  },
};

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
  // 初始化語言
  initLanguage();

  // 初始化主題
  initTheme();

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
// 語言切換
// ============================================
function getPreferredLanguage() {
  const browserLang = (navigator.language || "").toLowerCase();
  if (browserLang.startsWith("zh")) return "zh-TW";
  if (browserLang.startsWith("ja")) return "ja";
  if (browserLang.startsWith("en")) return "en";
  return "zh-TW";
}

function initLanguage() {
  const langSelect = document.getElementById("langSelect");
  const initialLang = SUPPORTED_LANGUAGES.includes(currentLanguage)
    ? currentLanguage
    : "zh-TW";

  setLanguage(initialLang, false, false);

  if (langSelect) {
    langSelect.value = initialLang;
    langSelect.addEventListener("change", (event) => {
      setLanguage(event.target.value);
    });
  }
}

function setLanguage(lang, persist = true, restartTyping = true) {
  const normalizedLang = SUPPORTED_LANGUAGES.includes(lang) ? lang : "zh-TW";
  currentLanguage = normalizedLang;
  document.documentElement.lang = normalizedLang;

  if (persist) {
    localStorage.setItem("language", normalizedLang);
  }

  typingNames = getTypingNames();
  typingIndex = 0;
  currentNameIndex = 0;

  translatePage();
  if (restartTyping) {
    startTyping();
  }
}

function getTypingNames() {
  const names = I18N?.[currentLanguage]?.hero?.typingNames;
  return Array.isArray(names) && names.length > 0
    ? names
    : I18N["zh-TW"].hero.typingNames;
}

function translatePage() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.setAttribute("placeholder", t(el.dataset.i18nPlaceholder));
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
    el.setAttribute("aria-label", t(el.dataset.i18nAriaLabel));
  });

  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    el.textContent = t(el.dataset.i18nTitle);
  });

  document.querySelectorAll("[data-i18n-content]").forEach((el) => {
    el.setAttribute("content", t(el.dataset.i18nContent));
  });
}

function t(key, params = {}) {
  const path = key.split(".");
  let value = I18N?.[currentLanguage];
  for (const segment of path) {
    value = value?.[segment];
  }

  const fallbackValue = (() => {
    let fallback = I18N?.["zh-TW"];
    for (const segment of path) {
      fallback = fallback?.[segment];
    }
    return fallback;
  })();

  const text = typeof value === "string" ? value : fallbackValue || key;
  return text.replace(/\{(\w+)\}/g, (_, token) => params[token] ?? "");
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
      const targetId = link.getAttribute("href");
      
      // 只處理錨點連結（以 # 開頭），其他連結保持正常行為
      if (targetId && targetId.startsWith("#")) {
        e.preventDefault();
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
      } else {
        // 外部連結（如 login.html）自動關閉手機版選單
        navToggle?.classList.remove("active");
        navMenu?.classList.remove("active");
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
  startTyping();
}

function startTyping() {
  typingSession += 1;
  const typingElement = document.getElementById("typingText");
  if (typingElement) {
    typingElement.textContent = "";
  }
  typeText(typingSession);
}

function typeText(sessionId) {
  const typingElement = document.getElementById("typingText");
  if (!typingElement) return;
  if (sessionId !== typingSession) return;

  const currentName = typingNames[currentNameIndex];

  if (typingIndex < currentName.length) {
    typingElement.textContent = currentName.substring(0, typingIndex + 1);
    typingIndex++;
    setTimeout(() => typeText(sessionId), 150);
  } else {
    setTimeout(() => {
      eraseText(sessionId);
    }, 2000);
  }
}

function eraseText(sessionId) {
  const typingElement = document.getElementById("typingText");
  if (!typingElement) return;
  if (sessionId !== typingSession) return;

  const currentName = typingNames[currentNameIndex];

  if (typingIndex > 0) {
    typingElement.textContent = currentName.substring(0, typingIndex - 1);
    typingIndex--;
    setTimeout(() => eraseText(sessionId), 100);
  } else {
    currentNameIndex = (currentNameIndex + 1) % typingNames.length;
    setTimeout(() => typeText(sessionId), 500);
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

  // 首頁只顯示最新的 MAX_HOME_ARTICLES 篇文章
  const maxArticles = Math.min(MAX_HOME_ARTICLES, blogArticles.length);
  const articlesToShow = blogArticles.slice(0, Math.min(displayedArticles, maxArticles));

  articlesToShow.forEach((article) => {
    const articleCard = createBlogCard(article);
    blogGrid.appendChild(articleCard);
  });

  // 隱藏載入更多按鈕如果已顯示所有文章或達到最大顯示數
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  if (loadMoreBtn) {
    const maxArticles = Math.min(MAX_HOME_ARTICLES, blogArticles.length);
    if (displayedArticles >= maxArticles) {
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
            <h3 class="article-card-title" style="cursor: pointer;">${article.title}</h3>
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
      showArticleDetail(article.id);
    }
  });

  // 為標題添加額外的點擊事件處理
  const titleElement = card.querySelector(".article-card-title");
  if (titleElement) {
    titleElement.addEventListener("click", (e) => {
      e.stopPropagation();
      window.location.href = `article.html?id=${article.id}`;
    });
  }

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
        alert(t("alerts.copyLinkSuccess"));
      });
    });
  }

  // 分享按鈕
  const shareButtons = document.querySelectorAll(".share-btn");
  shareButtons.forEach((btn) => {
    if (btn.id === "copyLinkBtn") return; // 已處理

    btn.addEventListener("click", () => {
      const platformLabel =
        btn.querySelector("[data-i18n]")?.textContent?.trim() ||
        btn.textContent.trim();
      alert(t("alerts.shareDemo", { platform: platformLabel }));
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
  formMessage.textContent = t("form.sending");
  formMessage.className = "form-message";
  formMessage.style.display = "block";

  setTimeout(() => {
    formMessage.textContent = t("form.thanks", { name, email });
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
  const locale = DATE_LOCALES[currentLanguage] || "zh-TW";
  return new Date(dateString).toLocaleDateString(locale, options);
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
