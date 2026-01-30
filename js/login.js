const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-icon");
const htmlElement = document.documentElement;
const prefersDarkScheme = window.matchMedia
  ? window.matchMedia("(prefers-color-scheme: dark)").matches
  : false;

let currentTheme =
  localStorage.getItem("theme") || (prefersDarkScheme ? "dark" : "light");

const applyTheme = (theme) => {
  htmlElement.setAttribute("data-theme", theme);
  if (themeIcon) {
    themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
  }
};

applyTheme(currentTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", currentTheme);
    applyTheme(currentTheme);
  });
}

const loginForm = document.getElementById("loginForm");
const loginStatus = document.getElementById("loginStatus");
const loginSubmit = document.getElementById("loginSubmit");
const passwordInput = document.getElementById("password");
const passwordToggle = document.getElementById("passwordToggle");

const setStatus = (message, variant) => {
  if (!loginStatus) return;
  loginStatus.textContent = message;
  loginStatus.classList.remove("success", "error");
  if (variant) {
    loginStatus.classList.add(variant);
  }
};

const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

if (passwordToggle && passwordInput) {
  passwordToggle.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    passwordToggle.textContent = isHidden ? "隱藏" : "顯示";
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailValue = loginForm.email?.value.trim();
    const passwordValue = loginForm.password?.value.trim();

    if (!emailValue || !passwordValue) {
      setStatus("請完整填寫 Email 與密碼。", "error");
      return;
    }

    if (!isValidEmail(emailValue)) {
      setStatus("請輸入有效的 Email 格式。", "error");
      return;
    }

    if (loginSubmit) {
      loginSubmit.disabled = true;
      loginSubmit.textContent = "登入中...";
    }

    setStatus("登入成功（示範）。", "success");

    window.setTimeout(() => {
      if (loginSubmit) {
        loginSubmit.disabled = false;
        loginSubmit.textContent = "登入";
      }
    }, 1200);
  });
}
