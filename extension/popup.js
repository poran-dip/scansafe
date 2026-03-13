// popup.js

// ── DOM refs ────────────────────────────────────────────────────
const urlInput       = document.getElementById("url-input");
const checkBtn       = document.getElementById("check-btn");
const checkCurrentBtn= document.getElementById("check-current-btn");
const backBtn        = document.getElementById("back-btn");
const currentSitePill= document.getElementById("current-site-pill");
const loadingDomain  = document.getElementById("loading-domain");

const stateIdle    = document.getElementById("state-idle");
const stateLoading = document.getElementById("state-loading");
const stateResult  = document.getElementById("state-result");
const stateUnknown = document.getElementById("state-unknown");

// Result DOM
const ringProgress   = document.getElementById("ring-progress");
const scoreNumber    = document.getElementById("score-number");
const trustBadge     = document.getElementById("trust-badge");
const resultDomain   = document.getElementById("result-domain");
const resultCompany  = document.getElementById("result-company");
const resultCategory = document.getElementById("result-category");
const regList        = document.getElementById("reg-list");
const alertsWrap     = document.getElementById("alerts-wrap");
const alertList      = document.getElementById("alert-list");
const firWrap        = document.getElementById("fir-wrap");
const unknownDomain  = document.getElementById("unknown-domain");

// ── Helpers ─────────────────────────────────────────────────────

function showState(name) {
  [stateIdle, stateLoading, stateResult, stateUnknown].forEach(el => el.classList.add("hidden"));
  document.getElementById(`state-${name}`).classList.remove("hidden");
}

function setScore(score, level) {
  const circumference = 2 * Math.PI * 34; // r=34
  const offset = circumference - (score / 100) * circumference;
  ringProgress.style.strokeDashoffset = offset;
  ringProgress.className = `ring-fill ring-${level}`;
  scoreNumber.textContent = score;
  scoreNumber.className = `score-num score-${level}`;
}

function setTrustBadge(level) {
  const labels = { safe: "✓ Trusted", warning: "⚠ Caution", unsafe: "✕ Unsafe" };
  trustBadge.textContent = labels[level];
  trustBadge.className = `trust-badge ${level}`;
}

function buildRegItem(body, reg) {
  const ok = reg.registered;
  const el = document.createElement("div");
  el.className = `reg-item ${ok ? "ok" : "fail"}`;

  const iconSvg = ok
    ? `<svg class="reg-icon" width="14" height="14" viewBox="0 0 24 24" fill="none">
         <circle cx="12" cy="12" r="10" stroke="#10b981" stroke-width="2"/>
         <path d="M8 12l3 3 5-5" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
       </svg>`
    : `<svg class="reg-icon" width="14" height="14" viewBox="0 0 24 24" fill="none">
         <circle cx="12" cy="12" r="10" stroke="#ef4444" stroke-width="2"/>
         <path d="M15 9l-6 6M9 9l6 6" stroke="#ef4444" stroke-width="2" stroke-linecap="round"/>
       </svg>`;

  el.innerHTML = `
    ${iconSvg}
    <div style="min-width:0">
      <div style="display:flex;align-items:center;gap:6px">
        <span class="reg-body">${body}</span>
        <span class="reg-status">${ok ? "Registered" : "Not Registered"}</span>
      </div>
      ${reg.number ? `<div class="reg-number">${reg.number}</div>` : ""}
      ${reg.expires ? `<div class="reg-expires">Expires ${reg.expires}</div>` : ""}
    </div>`;
  return el;
}

function buildAlertItem(alert) {
  const icons = {
    info: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#60a5fa" stroke-width="2"/><path d="M12 16v-4M12 8h.01" stroke="#60a5fa" stroke-width="2" stroke-linecap="round"/></svg>`,
    warning: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/></svg>`,
    danger: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#f87171" stroke-width="2"/><path d="M15 9l-6 6M9 9l6 6" stroke="#f87171" stroke-width="2" stroke-linecap="round"/></svg>`,
  };
  const el = document.createElement("div");
  el.className = `alert-item ${alert.severity}`;
  el.innerHTML = `${icons[alert.severity]}<span>${alert.message}</span>`;
  return el;
}

// ── Core verify flow ─────────────────────────────────────────────

async function verify(rawInput) {
  const trimmed = rawInput.trim();
  if (!trimmed) return;

  const { hostname, data } = lookupDomain(trimmed);

  showState("loading");
  loadingDomain.textContent = hostname;

  // Fake latency so the spinner is visible
  await new Promise(r => setTimeout(r, 900 + Math.random() * 600));

  if (!data) {
    unknownDomain.textContent = hostname;
    showState("unknown");
    return;
  }

  // ── Populate result ──────────────────────────────────────────
  setScore(data.trustScore, data.trustLevel);
  setTrustBadge(data.trustLevel);
  resultDomain.textContent = hostname;
  resultCompany.textContent = data.companyName;
  resultCategory.textContent = data.category;

  // Registrations
  regList.innerHTML = "";
  regList.appendChild(buildRegItem("BIS",   { registered: data.bis.registered,   number: data.bis.number,   expires: data.bis.expires }));
  regList.appendChild(buildRegItem("FSSAI", { registered: data.fssai.registered, number: data.fssai.number, expires: data.fssai.expires }));
  regList.appendChild(buildRegItem("MCA",   { registered: data.mca.registered,   number: data.mca.number,   expires: null }));

  // Alerts
  alertList.innerHTML = "";
  if (data.alerts.length > 0) {
    data.alerts.forEach(a => alertList.appendChild(buildAlertItem(a)));
    alertsWrap.classList.remove("hidden");
  } else {
    alertsWrap.classList.add("hidden");
  }

  // FIR button
  const needsFir = data.trustLevel === "unsafe" || data.trustLevel === "warning";
  firWrap.classList.toggle("hidden", !needsFir);

  showState("result");
}

// ── Tab URL detection ────────────────────────────────────────────

async function getCurrentTabUrl() {
  return new Promise(resolve => {
    // Works in real extension; graceful fallback for local HTML preview
    if (typeof chrome !== "undefined" && chrome.runtime?.sendMessage) {
      chrome.runtime.sendMessage({ type: "GET_CURRENT_TAB_URL" }, response => {
        resolve(response?.url || "");
      });
    } else {
      resolve(window.location.href); // fallback for local testing
    }
  });
}

async function loadCurrentSite() {
  const url = await getCurrentTabUrl();
  if (!url || url.startsWith("chrome://") || url.startsWith("about:")) {
    currentSitePill.textContent = "browser page";
    return;
  }
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, "");
    currentSitePill.textContent = hostname;
    urlInput.value = hostname;
  } catch {
    currentSitePill.textContent = "—";
  }
}

// ── Event listeners ──────────────────────────────────────────────

checkBtn.addEventListener("click", () => verify(urlInput.value));
urlInput.addEventListener("keydown", e => { if (e.key === "Enter") verify(urlInput.value); });

checkCurrentBtn.addEventListener("click", async () => {
  const url = await getCurrentTabUrl();
  if (url) verify(url);
});

backBtn.addEventListener("click", () => {
  showState("idle");
  urlInput.value = "";
});

document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    const url = chip.dataset.url;
    urlInput.value = url;
    verify(url);
  });
});

// ── Init ─────────────────────────────────────────────────────────
loadCurrentSite();
showState("idle");
