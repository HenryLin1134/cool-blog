const assert = require("assert");
const http = require("http");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const puppeteer = require("puppeteer");
const { PuppeteerScreenRecorder } = require("puppeteer-screen-recorder");

const BASE_URL = "http://localhost:3001";
const SERVER_TIMEOUT_MS = 15000;
const RESULTS_DIR = path.resolve(__dirname, "../test-results/puppeteer");
const VIDEO_DIR = path.resolve(RESULTS_DIR, "videos");
const RECORDINGS_ENABLED = process.env.PUPPETEER_RECORDINGS !== "0";

const ensureResultsDir = () => {
  fs.mkdirSync(RESULTS_DIR, { recursive: true });
  fs.mkdirSync(VIDEO_DIR, { recursive: true });
};

const toSafeName = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const saveScreenshot = async (page, testName, suffix) => {
  const fileName = `${toSafeName(testName)}-${suffix}.png`;
  const filePath = path.join(RESULTS_DIR, fileName);
  await page.screenshot({ path: filePath, fullPage: true });
};

const createRecorder = (page) =>
  new PuppeteerScreenRecorder(page, {
    followNewTab: true,
    fps: 15,
    videoFrame: {
      width: 1280,
      height: 720,
    },
    videoQuality: 75,
    aspectRatio: "16:9",
  });

const getVideoPath = (testName, suffix) =>
  path.join(VIDEO_DIR, `${toSafeName(testName)}-${suffix}.mp4`);

const waitForServer = (url, timeoutMs) =>
  new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      const req = http.get(url, (res) => {
        res.resume();
        if (res.statusCode && res.statusCode >= 200) {
          resolve();
        } else {
          retry();
        }
      });
      req.on("error", retry);

      function retry() {
        if (Date.now() - start > timeoutMs) {
          reject(new Error("Server did not start in time"));
          return;
        }
        setTimeout(check, 500);
      }
    };

    check();
  });

const isServerRunning = (url) =>
  new Promise((resolve) => {
    const req = http.get(url, (res) => {
      res.resume();
      resolve(res.statusCode && res.statusCode >= 200);
    });
    req.on("error", () => resolve(false));
  });

const startServer = async () => {
  if (await isServerRunning(BASE_URL)) {
    return null;
  }

  const command = process.platform === "win32" ? "node" : "node";
  const child = spawn(command, ["server.js"], {
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  return child;
};

const stopServer = (child) => {
  if (!child || child.killed) return;
  child.kill("SIGTERM");
};

const tests = [
  {
    name: "login page - valid submit",
    run: async (page) => {
      await page.goto(`${BASE_URL}/login.html`, { waitUntil: "networkidle0" });

      await page.type("#email", "tester@example.com");
      await page.type("#password", "demo-password");
      await page.click("#loginSubmit");

      await page.waitForFunction(() => {
        const status = document.querySelector("#loginStatus");
        return status && status.textContent.includes("登入成功");
      });

      const statusText = await page.$eval(
        "#loginStatus",
        (el) => el.textContent.trim(),
      );
      assert.strictEqual(statusText, "登入成功（示範）。");
    },
  },
  {
    name: "login page - empty validation",
    run: async (page) => {
      await page.goto(`${BASE_URL}/login.html`, { waitUntil: "networkidle0" });
      await page.click("#loginSubmit");

      const statusText = await page.$eval(
        "#loginStatus",
        (el) => el.textContent.trim(),
      );
      assert.strictEqual(statusText, "請完整填寫 Email 與密碼。");
    },
  },
  {
    name: "login page - toggle password",
    run: async (page) => {
      await page.goto(`${BASE_URL}/login.html`, { waitUntil: "networkidle0" });

      const getType = () =>
        page.$eval("#password", (el) => el.getAttribute("type"));

      assert.strictEqual(await getType(), "password");
      await page.click("#passwordToggle");
      assert.strictEqual(await getType(), "text");
      await page.click("#passwordToggle");
      assert.strictEqual(await getType(), "password");
    },
  },
  {
    name: "i18n - switch language",
    run: async (page) => {
      await page.evaluateOnNewDocument(() => {
        localStorage.setItem("language", "zh-TW");
      });

      await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });

      const getNavHomeText = () =>
        page.$eval("#navMenu [data-i18n='nav.home']", (el) =>
          el.textContent.trim(),
        );

      assert.strictEqual(await getNavHomeText(), "首頁");

      await page.select("#langSelect", "en");
      await page.waitForFunction(
        () =>
          document.querySelector("#navMenu [data-i18n='nav.home']")
            ?.textContent === "Home",
      );
      assert.strictEqual(await getNavHomeText(), "Home");

      await page.select("#langSelect", "ja");
      await page.waitForFunction(
        () =>
          document.querySelector("#navMenu [data-i18n='nav.home']")
            ?.textContent === "ホーム",
      );
      assert.strictEqual(await getNavHomeText(), "ホーム");
    },
  },
  {
    name: "forgot-password page - valid email submit",
    run: async (page) => {
      await page.goto(`${BASE_URL}/forgot-password.html`, { waitUntil: "networkidle0" });

      await page.type("#email", "user@example.com");
      await page.click("#resetSubmit");

      await page.waitForFunction(() => {
        const status = document.querySelector("#resetStatus");
        return status && status.textContent.includes("重設連結已寄送");
      });

      const statusText = await page.$eval(
        "#resetStatus",
        (el) => el.textContent.trim(),
      );
      assert(statusText.includes("重設連結已寄送至"));
    },
  },
  {
    name: "forgot-password page - empty validation",
    run: async (page) => {
      await page.goto(`${BASE_URL}/forgot-password.html`, { waitUntil: "networkidle0" });
      await page.click("#resetSubmit");

      const statusText = await page.$eval(
        "#resetStatus",
        (el) => el.textContent.trim(),
      );
      assert.strictEqual(statusText, "請輸入 Email。");
    },
  },
];

const run = async () => {
  let serverProcess;
  let browser;

  try {
    serverProcess = await startServer();
    await waitForServer(BASE_URL, SERVER_TIMEOUT_MS);

    browser = await puppeteer.launch({ headless: true });
    ensureResultsDir();

    let passed = 0;
    let failed = 0;

    for (const test of tests) {
      const page = await browser.newPage();
      const recorder = createRecorder(page);
      let recordingActive = false;
      try {
        if (RECORDINGS_ENABLED) {
          try {
            await recorder.start(getVideoPath(test.name, "run"));
            recordingActive = true;
          } catch (recordError) {
            console.warn("Recording disabled:", recordError.message);
          }
        }
        await test.run(page);
        await saveScreenshot(page, test.name, "success");
        if (recordingActive) {
          await recorder.stop();
          fs.renameSync(
            getVideoPath(test.name, "run"),
            getVideoPath(test.name, "success"),
          );
        }
        passed += 1;
        console.log(`✓ ${test.name}`);
      } catch (error) {
        try {
          await saveScreenshot(page, test.name, "failure");
          if (recordingActive) {
            await recorder.stop();
            fs.renameSync(
              getVideoPath(test.name, "run"),
              getVideoPath(test.name, "failure"),
            );
          }
        } catch (screenshotError) {
          console.error("Screenshot failed:", screenshotError);
        }
        failed += 1;
        console.error(`✗ ${test.name}`);
        console.error(error);
      } finally {
        await page.close();
      }
    }

    console.log(`\nSummary: ${passed} passed, ${failed} failed`);
    if (failed > 0) {
      process.exitCode = 1;
    }
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    if (browser) {
      await browser.close();
    }
    stopServer(serverProcess);
  }
};

run();
