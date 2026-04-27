(() => {
  const STORAGE_KEY = "announcement_last_shown_at";
  const INTERVAL_MS = 4 * 60 * 60 * 1000;
  const now = Date.now();
  const lastShown = Number(localStorage.getItem(STORAGE_KEY) || 0);

  if (now - lastShown < INTERVAL_MS) {
    return;
  }

  const style = document.createElement("style");
  style.textContent = `
    .announce-mask {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      padding: 20px;
    }
    .announce-modal {
      background: #fff;
      border-radius: 14px;
      max-width: 420px;
      width: 100%;
      box-shadow: 0 18px 40px rgba(15, 23, 42, 0.2);
      padding: 24px 24px 22px;
      color: #1f2937;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC",
        "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;
    }
    .announce-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 10px;
      text-align: center;
    }
    .announce-body {
      font-size: 14px;
      color: #4b5563;
      line-height: 1.6;
      margin-bottom: 18px;
      text-align: center;
    }
    .announce-body strong {
      display: inline-block;
      margin-top: 6px;
      font-size: 20px;
      color: #111827;
      letter-spacing: 0.4px;
    }
    .announce-alt {
      margin-top: 8px;
      font-size: 14px;
      color: #6b7280;
    }
    .announce-alt a {
      color: #2563eb;
      font-weight: 600;
      text-decoration: none;
    }
    .announce-app-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-top: 14px;
      padding: 10px 20px;
      font-size: 16px;
      font-weight: 600;
      color: #fff;
      background: linear-gradient(135deg, #f97316, #ef4444);
      border-radius: 999px;
      text-decoration: none;
      box-shadow: 0 6px 16px rgba(239, 68, 68, 0.3);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .announce-app-link:hover {
      transform: translateY(-1px);
      box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
    }
    .announce-app-domain {
      display: inline-block;
      margin-top: 8px;
      font-size: 20px;
      font-weight: 600;
      color: #111827;
      letter-spacing: 0.4px;
    }
    .announce-actions {
      display: flex;
      justify-content: center;
      gap: 10px;
    }
    .announce-btn {
      border: 1px solid #1f2937;
      background: #1f2937;
      color: #fff;
      border-radius: 8px;
      padding: 6px 14px;
      font-size: 13px;
      cursor: pointer;
    }
    .announce-btn.ghost {
      background: transparent;
      color: #1f2937;
    }
  `;

  const mask = document.createElement("div");
  mask.className = "announce-mask";
  mask.innerHTML = `
    <div class="announce-modal" role="dialog" aria-modal="true" aria-label="公告">
      <div class="announce-title">公告</div>
      <div class="announce-body">
        请牢记永久域名<br>
        <strong>91cggg.com</strong>
        <div class="announce-alt">
          备用域名
          <a href="https://91cg1.cyou" target="_blank" rel="noopener noreferrer">91cg1.cyou</a>
          <a href="https://91cg2.cyou" target="_blank" rel="noopener noreferrer">91cg2.cyou</a>
        </div>
        <div>
          <a
            class="announce-app-link"
            href="https://51yl.top/"
            target="_blank"
            rel="noopener noreferrer"
          >
            📱 精品资源 APP 下载
          </a>
          <span class="announce-app-domain">51yl.top</span>
        </div>
      </div>
      <div class="announce-actions">
        <button class="announce-btn" style='color: #fff;' data-action="ok">我知道了</button>
      </div>
    </div>
  `;

  const closeModal = () => {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    mask.remove();
    style.remove();
  };

  mask.addEventListener("click", (event) => {
    if (event.target === mask) {
      closeModal();
    }
  });

  mask.querySelectorAll("[data-action]").forEach((btn) => {
    btn.addEventListener("click", () => closeModal());
  });

  document.head.appendChild(style);
  document.body.appendChild(mask);
})();
