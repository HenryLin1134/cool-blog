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

const forgotPasswordForm = document.getElementById("forgotPasswordForm");
const resetStatus = document.getElementById("resetStatus");
const resetSubmit = document.getElementById("resetSubmit");

const setStatus = (message, variant) => {
  if (!resetStatus) return;
  resetStatus.textContent = message;
  resetStatus.classList.remove("success", "error");
  if (variant) {
    resetStatus.classList.add(variant);
  }
};

const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

if (forgotPasswordForm) {
  forgotPasswordForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailValue = forgotPasswordForm.email?.value.trim();

    if (!emailValue) {
      setStatus("請輸入 Email。", "error");
      return;
    }

    if (!isValidEmail(emailValue)) {
      setStatus("請輸入有效的 Email 格式。", "error");
      return;
    }

    if (resetSubmit) {
      resetSubmit.disabled = true;
      resetSubmit.textContent = "寄送中...";
    }

    setStatus("重設連結已寄送至 " + emailValue + "（示範）。", "success");

    window.setTimeout(() => {
      if (resetSubmit) {
        resetSubmit.disabled = false;
        resetSubmit.textContent = "寄送重設連結";
      }
    }, 1200);
  });
}
