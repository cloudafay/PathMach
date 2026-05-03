(function () {
  const STORAGE_KEY = "pathmatch-stitch-live-v1";

  const pages = {
    landing: "01-landing-page.html",
    register: "02-register.html",
    dashboard: "03-student-dashboard.html",
    matches: "04-smart-matches.html",
    detail: "05-internship-detail.html",
    profile: "06-profile.html",
    roadmap: "07-career-roadmap.html",
    applications: "08-applications-tracking.html",
    messages: "09-messaging.html",
    company: "10-company-dashboard.html"
  };

  const defaultState = {
    currentUserEmail: "demo@pathmatch.app",
    users: [
      {
        email: "demo@pathmatch.app",
        password: "demo123",
        name: "Sidal Polat",
        role: "student",
        institution: "Boğaziçi Üniversitesi",
        title: "Bilgisayar Mühendisliği Öğrencisi",
        location: "İstanbul, Türkiye",
        skills: ["React", "TypeScript", "Figma", "Node.js"]
      },
      {
        email: "company@pathmatch.app",
        password: "demo123",
        name: "NovaTech",
        role: "company",
        institution: "NovaTech",
        title: "İşe Alım Ekibi",
        location: "İstanbul"
      }
    ],
    saved: [],
    jobs: [],
    invites: [],
    attachments: [],
    applications: [
      {
        id: "seed-veri-bilimci",
        title: "Veri Bilimci (Staj)",
        company: "FinTech Global",
        location: "Ankara",
        match: 92,
        status: "Başvuruldu",
        date: "2026-05-03"
      }
    ],
    messages: [
      {
        text: "Harika haber, teşekkür ederim Cemil Bey! Portfolyomu hemen iletiyorum.",
        date: "10:45"
      }
    ],
    roadmapStarted: false
  };

  let state = loadState();

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function loadState() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (stored && Array.isArray(stored.users)) {
        return normalizeState({
          ...clone(defaultState),
          ...stored,
          users: stored.users || clone(defaultState.users),
          saved: stored.saved || [],
          jobs: stored.jobs || [],
          invites: stored.invites || [],
          attachments: stored.attachments || [],
          applications: stored.applications || clone(defaultState.applications),
          messages: stored.messages || clone(defaultState.messages)
        });
      }
    } catch (error) {
      console.warn("PathMatch localStorage okunamadı", error);
    }
    return normalizeState(clone(defaultState));
  }

  function normalizeState(nextState) {
    nextState.users = (nextState.users || []).map((user) => {
      if (user.email === "demo@pathmatch.app" || user.name === "Ayşe Yılmaz") {
        return { ...user, name: "Sidal Polat" };
      }
      return user;
    });
    return nextState;
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function currentUser() {
    return state.users.find((user) => user.email === state.currentUserEmail) || state.users[0];
  }

  function currentFile() {
    const path = window.location.pathname.replace(/\\/g, "/");
    const filename = path.split("/").pop() || "index.html";
    if (filename === "" || filename === "docs") return "index.html";
    return filename;
  }

  function isDocsRoot() {
    const path = window.location.pathname.replace(/\\/g, "/");
    return path.endsWith("/docs/") || path.endsWith("/docs/index.html") || path.endsWith("/docs");
  }

  function isDocsScreen() {
    return window.location.pathname.replace(/\\/g, "/").includes("/docs/screens/");
  }

  function pageUrl(page) {
    if (page === "landing") {
      if (isDocsScreen()) return "../index.html";
      return "index.html";
    }

    const file = pages[page] || pages.dashboard;
    if (isDocsRoot()) return `screens/${file}`;
    if (isDocsScreen()) return file;
    if (window.location.pathname.replace(/\\/g, "/").includes("/stitch-pathmatch/live/")) return `../screens/${file}`;
    if (window.location.pathname.replace(/\\/g, "/").includes("/stitch-pathmatch/screens/")) return file;
    return `screens/${file}`;
  }

  function navigate(page) {
    window.location.href = pageUrl(page);
  }

  function textOf(element) {
    return (element.textContent || "").replace(/\s+/g, " ").trim();
  }

  function lowerText(element) {
    return textOf(element).toLocaleLowerCase("tr-TR");
  }

  function hasIcon(element, iconName) {
    return Array.from(element.querySelectorAll(".material-symbols-outlined")).some((icon) => textOf(icon) === iconName);
  }

  function slug(value) {
    return String(value || "")
      .toLocaleLowerCase("tr-TR")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ı/g, "i")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function today() {
    return new Date().toISOString().slice(0, 10);
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[character]);
  }

  function toast(message) {
    let node = document.querySelector(".pm-toast");
    if (!node) {
      node = document.createElement("div");
      node.className = "pm-toast";
      document.body.appendChild(node);
    }

    node.textContent = message;
    node.classList.add("is-visible");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => node.classList.remove("is-visible"), 2600);
  }

  function injectStyles() {
    if (document.querySelector("#pm-live-styles")) return;

    const style = document.createElement("style");
    style.id = "pm-live-styles";
    style.textContent = `
      .pm-toast {
        position: fixed;
        right: 18px;
        bottom: 18px;
        z-index: 9999;
        max-width: min(380px, calc(100vw - 36px));
        padding: 12px 14px;
        border-radius: 12px;
        background: #111827;
        color: #fff;
        font: 700 14px/1.35 Inter, system-ui, sans-serif;
        box-shadow: 0 18px 42px rgba(15, 23, 42, 0.22);
        opacity: 0;
        transform: translateY(12px);
        pointer-events: none;
        transition: opacity .18s ease, transform .18s ease;
      }
      .pm-toast.is-visible {
        opacity: 1;
        transform: translateY(0);
      }
      .pm-drawer-backdrop {
        position: fixed;
        inset: 0;
        z-index: 9997;
        background: rgba(15, 23, 42, .42);
        opacity: 0;
        pointer-events: none;
        transition: opacity .18s ease;
      }
      .pm-drawer {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 9998;
        width: min(300px, calc(100vw - 48px));
        padding: 18px;
        background: rgba(252, 248, 250, .98);
        border-right: 1px solid #c6c6cd;
        box-shadow: 24px 0 60px rgba(15, 23, 42, .18);
        transform: translateX(-104%);
        transition: transform .2s ease;
      }
      .pm-drawer.is-open {
        transform: translateX(0);
      }
      .pm-drawer-backdrop.is-open {
        opacity: 1;
        pointer-events: auto;
      }
      .pm-drawer h2 {
        margin: 0 0 14px;
        font: 800 22px/1.1 "Plus Jakarta Sans", Inter, sans-serif;
      }
      .pm-drawer a,
      .pm-drawer button {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        min-height: 42px;
        padding: 0 10px;
        border: 0;
        border-radius: 8px;
        background: transparent;
        color: #45464d;
        cursor: pointer;
        font: 800 14px/1 Inter, system-ui, sans-serif;
        text-decoration: none;
      }
      .pm-drawer a:hover,
      .pm-drawer button:hover {
        background: #f0edef;
        color: #000;
      }
      body.pm-theme-normalized {
        background: #fcf8fa !important;
        color: #1b1b1d !important;
        color-scheme: light;
      }
      body.pm-theme-normalized [data-pm-shell="sidebar"] {
        background: rgba(252, 248, 250, .82) !important;
        border-color: rgba(198, 198, 205, .62) !important;
        color: #45464d !important;
      }
      body.pm-theme-normalized [data-pm-shell="sidebar"] h1,
      body.pm-theme-normalized [data-pm-shell="sidebar"] .text-xl,
      body.pm-theme-normalized [data-pm-header="top"] [class*="text-2xl"] {
        color: #000 !important;
      }
      body.pm-theme-normalized [data-pm-shell="sidebar"] p {
        color: #5f6067 !important;
      }
      body.pm-theme-normalized [data-pm-shell="sidebar"] a,
      body.pm-theme-normalized [data-pm-shell="sidebar"] button {
        border-color: transparent !important;
        color: #45464d !important;
      }
      body.pm-theme-normalized [data-pm-shell="sidebar"] a:hover,
      body.pm-theme-normalized [data-pm-shell="sidebar"] button:hover {
        background: rgba(240, 237, 239, .72) !important;
        color: #000 !important;
      }
      body.pm-theme-normalized [data-pm-shell="sidebar"] a[data-pm-active="true"] {
        background: #fff !important;
        border-color: rgba(198, 198, 205, .45) !important;
        color: #00687a !important;
        box-shadow: 0 8px 28px rgba(15, 23, 42, .07) !important;
      }
      body.pm-theme-normalized [data-pm-shell="sidebar"] a[data-pm-active="true"] .material-symbols-outlined {
        color: #00687a !important;
      }
      body.pm-theme-normalized [data-pm-header="top"] {
        background: rgba(255, 251, 255, .86) !important;
        border-color: rgba(198, 198, 205, .62) !important;
        color: #1b1b1d !important;
      }
      body.pm-theme-normalized [data-pm-header="top"] a,
      body.pm-theme-normalized [data-pm-header="top"] button {
        color: #45464d !important;
      }
      body.pm-theme-normalized [data-pm-header="top"] a[data-pm-active="true"] {
        color: #00687a !important;
        border-color: #00687a !important;
      }
      body.pm-theme-normalized [data-pm-header="top"] button.bg-primary,
      body.pm-theme-normalized [data-pm-header="top"] button[class*="bg-primary"] {
        background: #000 !important;
        color: #fff !important;
      }
      .pm-panel-backdrop {
        position: fixed;
        inset: 0;
        z-index: 10000;
        display: flex;
        justify-content: flex-end;
        background: rgba(15, 23, 42, .34);
        opacity: 0;
        pointer-events: none;
        transition: opacity .2s ease;
        backdrop-filter: blur(4px);
      }
      .pm-panel-backdrop.is-open {
        opacity: 1;
        pointer-events: auto;
      }
      .pm-panel {
        width: min(480px, calc(100vw - 32px));
        height: calc(100vh - 32px);
        margin: 16px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border: 1px solid rgba(198, 198, 205, .9);
        border-radius: 22px;
        background: rgba(255, 251, 255, .98);
        box-shadow: 0 28px 80px rgba(15, 23, 42, .24);
        transform: translateX(28px) scale(.98);
        transition: transform .22s ease;
      }
      .pm-panel-backdrop.is-open .pm-panel {
        transform: translateX(0) scale(1);
      }
      .pm-panel-header,
      .pm-panel-footer {
        flex-shrink: 0;
        padding: 18px 20px;
        border-color: rgba(198, 198, 205, .55);
      }
      .pm-panel-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        border-bottom: 1px solid rgba(198, 198, 205, .55);
      }
      .pm-panel-eyebrow {
        margin: 0 0 6px;
        color: #00687a;
        font: 800 12px/1 Inter, system-ui, sans-serif;
        letter-spacing: .02em;
        text-transform: uppercase;
      }
      .pm-panel-title {
        margin: 0;
        color: #1d1b20;
        font: 800 24px/1.14 "Plus Jakarta Sans", Inter, sans-serif;
      }
      .pm-panel-subtitle {
        margin: 8px 0 0;
        color: #5f6067;
        font: 500 14px/1.45 Inter, system-ui, sans-serif;
      }
      .pm-panel-close,
      .pm-icon-button {
        width: 38px;
        height: 38px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        border: 1px solid rgba(198, 198, 205, .7);
        border-radius: 12px;
        background: #f7f3f7;
        color: #45464d;
        cursor: pointer;
      }
      .pm-panel-close:hover,
      .pm-icon-button:hover {
        background: #ece7ec;
        color: #111827;
      }
      .pm-panel-body {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
      }
      .pm-panel-footer {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        border-top: 1px solid rgba(198, 198, 205, .55);
        background: rgba(255, 251, 255, .86);
      }
      .pm-panel-button {
        min-height: 42px;
        padding: 0 16px;
        border: 1px solid rgba(198, 198, 205, .8);
        border-radius: 12px;
        background: #fff;
        color: #1d1b20;
        cursor: pointer;
        font: 800 14px/1 Inter, system-ui, sans-serif;
      }
      .pm-panel-button:hover {
        background: #f3eff3;
      }
      .pm-panel-button.is-primary {
        border-color: #00687a;
        background: #00687a;
        color: #fff;
      }
      .pm-panel-form,
      .pm-panel-stack {
        display: grid;
        gap: 14px;
      }
      .pm-panel-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
      }
      .pm-field {
        display: grid;
        gap: 7px;
      }
      .pm-field label {
        color: #5f6067;
        font: 800 12px/1 Inter, system-ui, sans-serif;
        text-transform: uppercase;
      }
      .pm-field input,
      .pm-field textarea,
      .pm-field select {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid rgba(198, 198, 205, .9);
        border-radius: 12px;
        background: #fff;
        color: #1d1b20;
        font: 600 14px/1.4 Inter, system-ui, sans-serif;
        outline: none;
        padding: 12px;
        transition: border-color .16s ease, box-shadow .16s ease;
      }
      .pm-field textarea {
        min-height: 96px;
        resize: vertical;
      }
      .pm-field input:focus,
      .pm-field textarea:focus,
      .pm-field select:focus {
        border-color: #00687a;
        box-shadow: 0 0 0 3px rgba(0, 104, 122, .14);
      }
      .pm-panel-note {
        padding: 14px;
        border: 1px solid rgba(198, 198, 205, .65);
        border-radius: 16px;
        background: #f8f4f8;
        color: #45464d;
        font: 600 14px/1.5 Inter, system-ui, sans-serif;
      }
      .pm-panel-list {
        display: grid;
        gap: 10px;
        margin: 0;
        padding: 0;
        list-style: none;
      }
      .pm-panel-option {
        width: 100%;
        min-height: 48px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 12px 14px;
        border: 1px solid rgba(198, 198, 205, .7);
        border-radius: 14px;
        background: #fff;
        color: #1d1b20;
        cursor: pointer;
        text-align: left;
        font: 800 14px/1.3 Inter, system-ui, sans-serif;
      }
      .pm-panel-option span:first-child {
        display: inline-flex;
        align-items: center;
        gap: 10px;
      }
      .pm-panel-option:hover {
        border-color: rgba(0, 104, 122, .45);
        background: #f2fbfd;
      }
      .pm-panel-pill-row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .pm-panel-pill {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 8px 10px;
        border: 1px solid rgba(198, 198, 205, .7);
        border-radius: 999px;
        background: #fff;
        color: #45464d;
        cursor: pointer;
        font: 800 12px/1 Inter, system-ui, sans-serif;
      }
      .pm-panel-pill input {
        accent-color: #00687a;
      }
      .pm-panel-avatar {
        width: 58px;
        height: 58px;
        display: grid;
        place-items: center;
        border-radius: 18px;
        background: #c7ebf2;
        color: #00363f;
        font: 900 20px/1 "Plus Jakarta Sans", Inter, sans-serif;
      }
      .pm-message-filter-active {
        background: #c7ebf2 !important;
        color: #00363f !important;
        border-color: transparent !important;
      }
      .pm-live-card {
        animation: pmFade .2s ease;
      }
      @keyframes pmFade {
        from { opacity: 0; transform: translateY(4px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @media (max-width: 760px) {
        html,
        body {
          max-width: 100%;
          overflow-x: hidden !important;
        }
        main,
        section,
        header,
        aside,
        nav,
        .flex-1,
        .flex,
        .w-full,
        .max-w-7xl,
        .max-w-\\[1200px\\],
        .max-w-\\[1440px\\] {
          min-width: 0 !important;
          max-width: 100% !important;
        }
        body > main,
        body > div,
        main,
        main > div,
        .flex-1.flex-col,
        .flex-1.flex {
          width: 100vw !important;
          max-width: 100vw !important;
          overflow-x: hidden !important;
        }
        main > div,
        .p-lg,
        .p-xl,
        .p-2xl,
        .p-3xl {
          box-sizing: border-box !important;
        }
        .glass-panel,
        article,
        [class*="rounded-xl"],
        [class*="rounded-lg"] {
          max-width: 100% !important;
        }
        .glass-panel {
          overflow: hidden;
        }
        .whitespace-nowrap {
          white-space: normal !important;
        }
        .font-h1.text-h1,
        .text-h1 {
          font-size: 34px !important;
          line-height: 1.12 !important;
        }
        .font-h2.text-h2,
        .text-h2 {
          font-size: 28px !important;
          line-height: 1.16 !important;
        }
        .font-h3.text-h3,
        .text-h3 {
          font-size: 20px !important;
          line-height: 1.25 !important;
        }
        .font-body-lg.text-body-lg,
        .text-body-lg {
          font-size: 15px !important;
          line-height: 1.45 !important;
        }
        h1,
        h2,
        h3,
        p,
        a,
        button {
          max-width: calc(100vw - 48px);
          overflow-wrap: anywhere;
        }
        p.font-body-lg,
        .font-body-lg.text-body-lg,
        .font-body-md.text-body-md {
          display: block;
          max-width: calc(100vw - 48px) !important;
          white-space: normal !important;
        }
        .justify-between {
          gap: 12px;
        }
        .glass-panel .justify-between {
          flex-wrap: wrap;
        }
        .px-3xl,
        .px-xl {
          padding-left: 24px !important;
          padding-right: 24px !important;
        }
        .p-xl,
        .p-2xl,
        .p-3xl {
          padding: 24px !important;
        }
        .pm-toast {
          right: 12px;
          bottom: 12px;
          max-width: calc(100vw - 24px);
        }
        .pm-panel-backdrop {
          align-items: flex-end;
          justify-content: center;
        }
        .pm-panel {
          width: calc(100vw - 20px);
          height: min(86vh, 720px);
          margin: 10px;
          border-radius: 20px;
          transform: translateY(24px) scale(.98);
        }
        .pm-panel-backdrop.is-open .pm-panel {
          transform: translateY(0) scale(1);
        }
        .pm-panel-grid {
          grid-template-columns: 1fr;
        }
        .pm-panel-footer {
          flex-direction: column-reverse;
        }
        .pm-panel-button {
          width: 100%;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function pageFromText(element) {
    const value = lowerText(element);

    if (value.includes("pathmatch")) return "landing";
    if (value.includes("ana sayfa")) return "dashboard";
    if (value.includes("genel bakış")) return currentFile() === pages.company ? "company" : "dashboard";
    if (value.includes("panel")) return "dashboard";
    if (value.includes("eşleşmeler") || value.includes("iş ilanları") || value.includes("ilanlar") || value.includes("stajlar") || value.includes("fırsatlar")) return "matches";
    if (value.includes("başvurular") || value.includes("başvuru")) return "applications";
    if (value.includes("yol haritası") || value.includes("kariyer yolu")) return "roadmap";
    if (value.includes("mesajlar")) return "messages";
    if (value.includes("ağım") || value.includes("profil") || value.includes("ayarlar") || value.includes("adaylar")) return "profile";
    if (value.includes("analitik")) return currentFile() === pages.company ? "company" : "dashboard";
    if (value.includes("kayıt") || value.includes("hemen başla")) return "register";
    return null;
  }

  function currentPageKey() {
    const file = currentFile();
    if (file === "index.html") return "landing";
    const match = Object.entries(pages).find(([, filename]) => filename === file);
    return match ? match[0] : "landing";
  }

  function normalizeTheme() {
    document.body.classList.add("pm-theme-normalized");
    const activePage = currentPageKey();

    const sidebarSelectors = [
      "body > aside",
      "body > nav",
      "body > .flex.h-screen.w-full > nav",
      "body > div.flex.h-screen.w-full > nav"
    ];
    const sidebars = new Set(sidebarSelectors.flatMap((selector) => Array.from(document.querySelectorAll(selector))));

    sidebars.forEach((sidebar) => {
      sidebar.setAttribute("data-pm-shell", "sidebar");
      sidebar.querySelectorAll("a").forEach((anchor) => {
        const label = lowerText(anchor);
        const page = pageFromText(anchor);
        anchor.removeAttribute("data-pm-active");
        if (page === activePage && !label.includes("ayarlar") && !label.includes("yardım") && !label.includes("çıkış")) {
          anchor.setAttribute("data-pm-active", "true");
        }
      });
    });

    document.querySelectorAll("body > header").forEach((header) => {
      header.setAttribute("data-pm-header", "top");
      header.querySelectorAll("a").forEach((anchor) => {
        const page = pageFromText(anchor);
        anchor.removeAttribute("data-pm-active");
        if (page === activePage) anchor.setAttribute("data-pm-active", "true");
      });
    });
  }

  function wireStaticLinks() {
    document.querySelectorAll('a[href="#"]').forEach((anchor) => {
      const page = pageFromText(anchor);
      if (page) anchor.setAttribute("href", pageUrl(page));
    });
  }

  function hydrateUserCopy() {
    const user = currentUser();
    if (!user) return;

    const replacements = [
      ["Sidal Polat", user.name],
      ["Hoş geldin, Sidal", `Hoş geldin, ${user.name.split(" ")[0] || user.name}`],
      ["Ayşe Yılmaz", user.name],
      ["Hoş geldin, Ayşe", `Hoş geldin, ${user.name.split(" ")[0] || user.name}`],
      ["Boğaziçi Üniversitesi", user.institution || "PathMatch"],
      ["İstanbul, Türkiye", user.location || "Türkiye"]
    ];

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
      let value = node.nodeValue;
      replacements.forEach(([from, to]) => {
        value = value.replaceAll(from, to || from);
      });
      node.nodeValue = value;
    });
  }

  function closestUsefulCard(element) {
    let node = element;
    while (node && node !== document.body) {
      if (node !== element && node.querySelector && node.querySelector("h2,h3,h4")) return node;
      node = node.parentElement;
    }
    return element.closest("article") || element.parentElement || document.body;
  }

  function jobFromElement(element) {
    const card = closestUsefulCard(element);
    const heading = card.querySelector("h3,h4,h2");
    const title = textOf(heading) || "UX/UI Tasarım Stajyeri";
    const paragraph = Array.from(card.querySelectorAll("p")).map(textOf).find(Boolean) || "";
    const match = (textOf(card).match(/% ?(\d+)|(\d+) ?%/) || [])[1] || (textOf(card).match(/% ?(\d+)|(\d+) ?%/) || [])[2] || "87";

    let company = "PathMatch";
    let location = "Türkiye";
    if (paragraph.includes("•")) {
      const parts = paragraph.split("•").map((part) => part.trim()).filter(Boolean);
      company = parts[0] || company;
      location = parts[1] || location;
    } else if (paragraph) {
      company = paragraph.split(",")[0].trim() || company;
    }

    return {
      id: slug(`${title}-${company}`),
      title,
      company,
      location,
      match: Number(match) || 87,
      status: "Başvuruldu",
      date: today()
    };
  }

  function ensureStudentSession() {
    if (!state.currentUserEmail) {
      state.currentUserEmail = "demo@pathmatch.app";
      saveState();
    }
  }

  function loginDemo() {
    state.currentUserEmail = "demo@pathmatch.app";
    saveState();
    toast("Demo öğrenci oturumu açıldı.");
    navigate("dashboard");
  }

  function loginCompany() {
    state.currentUserEmail = "company@pathmatch.app";
    saveState();
    toast("İşveren demosu açıldı.");
    navigate("company");
  }

  function logout() {
    state.currentUserEmail = null;
    saveState();
    toast("Çıkış yapıldı.");
    navigate("landing");
  }

  function applyToJob(element) {
    ensureStudentSession();
    const job = jobFromElement(element);
    if (!state.applications.some((item) => item.id === job.id)) {
      state.applications.unshift(job);
      saveState();
      toast(`${job.title} başvurusu kaydedildi.`);
    } else {
      toast("Bu fırsata daha önce başvurdun.");
    }

    if (currentFile() !== pages.applications) navigate("applications");
  }

  function saveJob(element) {
    ensureStudentSession();
    const job = jobFromElement(element);
    if (!state.saved.some((item) => item.id === job.id)) {
      state.saved.unshift({ ...job, status: "Kaydedildi" });
      saveState();
      element.textContent = "Kaydedildi";
      toast(`${job.title} kaydedildi.`);
    } else {
      toast("Bu fırsat zaten kaydedilmiş.");
    }
  }

  function registerUser(form) {
    const name = form.querySelector("#fullName")?.value.trim() || "PathMatch Üyesi";
    const email = form.querySelector("#email")?.value.trim() || `${slug(name)}@pathmatch.local`;
    const password = form.querySelector("#password")?.value || "demo123";
    const institution = form.querySelector("#institution")?.value.trim() || "";
    const role = form.querySelector('input[name="role"]:checked')?.value || "student";

    const existing = state.users.find((user) => user.email === email);
    const user = {
      email,
      password,
      name,
      role,
      institution,
      title: role === "company" ? "İşe Alım Ekibi" : "Kariyer Adayı",
      location: "Türkiye",
      skills: ["React", "Figma"]
    };

    if (existing) Object.assign(existing, user);
    else state.users.push(user);

    state.currentUserEmail = email;
    saveState();
    toast("Hesap oluşturuldu.");
    navigate(role === "company" ? "company" : "dashboard");
  }

  function renderStoredApplications() {
    if (currentFile() !== pages.applications) return;

    const appliedColumn = findKanbanColumn("Başvuruldu");
    const savedColumn = findKanbanColumn("Kaydedilenler");

    state.applications.forEach((job) => {
      if (appliedColumn && !document.querySelector(`[data-pm-id="${job.id}"]`)) {
        appliedColumn.insertAdjacentHTML("afterbegin", applicationCard(job, "İletildi"));
      }
    });

    state.saved.forEach((job) => {
      if (savedColumn && !document.querySelector(`[data-pm-id="${job.id}"]`)) {
        savedColumn.insertAdjacentHTML("afterbegin", applicationCard(job, "Kaydedildi"));
      }
    });

    updateKanbanCounts();
  }

  function findKanbanColumn(title) {
    const heading = Array.from(document.querySelectorAll("h3")).find((node) => textOf(node).includes(title));
    if (!heading) return null;
    const column = heading.closest(".w-80");
    return column?.querySelector(".space-y-md") || null;
  }

  function applicationCard(job, status) {
    return `
      <div class="pm-live-card glass-panel rounded-lg p-lg soft-shadow cursor-pointer hover:border-secondary transition-colors group" data-pm-id="${escapeHtml(job.id)}">
        <div class="flex justify-between items-start mb-sm">
          <div class="w-10 h-10 rounded-md bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-lg">${escapeHtml(job.company.slice(0, 1).toUpperCase())}</div>
          <div class="flex items-center space-x-1 bg-surface-container-low px-2 py-1 rounded-full">
            <span class="text-[10px] font-semibold text-secondary">${escapeHtml(job.match)}%</span>
          </div>
        </div>
        <h4 class="font-body-lg text-body-lg font-semibold text-on-surface mb-1 group-hover:text-secondary transition-colors">${escapeHtml(job.title)}</h4>
        <p class="font-body-sm text-body-sm text-on-surface-variant mb-4">${escapeHtml(job.company)} • ${escapeHtml(job.location)}</p>
        <div class="flex items-center justify-between border-t border-surface-variant/50 pt-3">
          <span class="font-label-bold text-[10px] text-on-surface-variant">${escapeHtml(job.date)}</span>
          <div class="px-2 py-1 rounded text-[10px] font-semibold bg-secondary-fixed/30 text-on-secondary-fixed-variant">${escapeHtml(status)}</div>
        </div>
      </div>
    `;
  }

  function updateKanbanCounts() {
    document.querySelectorAll(".w-80").forEach((column) => {
      const count = column.querySelector("h3 span");
      const cards = column.querySelectorAll(".glass-panel.rounded-lg").length;
      if (count) count.textContent = String(cards);
    });
  }

  function renderStoredMessages() {
    if (currentFile() !== pages.messages) return;

    const thread = document.querySelector("section .flex-1.overflow-y-auto.p-xl");
    if (!thread) return;

    state.messages.slice(1).forEach((message, index) => {
      if (document.querySelector(`[data-pm-message="${index}"]`)) return;
      thread.insertAdjacentHTML("beforeend", messageBubble(message.text, index));
    });
    thread.scrollTop = thread.scrollHeight;
  }

  function messageBubble(message, index) {
    return `
      <div class="flex gap-md max-w-[80%] self-end flex-row-reverse pm-live-card" data-pm-message="${index}">
        <div class="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center mt-1 border border-outline-variant font-bold">S</div>
        <div class="flex flex-col gap-1 items-end">
          <div class="flex items-baseline gap-2 flex-row-reverse">
            <span class="font-button text-button text-primary text-sm">Sen</span>
            <span class="font-label-bold text-label-bold text-outline">Şimdi</span>
          </div>
          <div class="bg-secondary text-on-secondary p-4 rounded-2xl rounded-tr-sm shadow-[0_4px_12px_-4px_rgba(0,104,122,0.3)]">
            <p class="font-body-md text-body-md">${escapeHtml(message)}</p>
          </div>
        </div>
      </div>
    `;
  }

  function sendMessage(text) {
    const message = String(text || "").trim();
    if (!message) return;

    state.messages.push({ text: message, date: "Şimdi" });
    saveState();

    const thread = document.querySelector("section .flex-1.overflow-y-auto.p-xl");
    if (thread) {
      thread.insertAdjacentHTML("beforeend", messageBubble(message, state.messages.length - 2));
      thread.scrollTop = thread.scrollHeight;
    }

    const textarea = document.querySelector("textarea");
    if (textarea) textarea.value = "";
    toast("Mesaj gönderildi.");
  }

  function filterCards(input) {
    const query = input.value.trim().toLocaleLowerCase("tr-TR");
    const page = currentFile();
    let cards = [];

    if (page === pages.matches) cards = Array.from(document.querySelectorAll("article"));
    else if (page === pages.messages) cards = Array.from(document.querySelectorAll("aside .cursor-pointer"));
    else if (page === pages.dashboard) cards = Array.from(document.querySelectorAll(".glass-panel, article"));

    cards.forEach((card) => {
      const visible = !query || textOf(card).toLocaleLowerCase("tr-TR").includes(query);
      card.style.display = visible ? "" : "none";
    });
  }

  function clearFilters() {
    document.querySelectorAll("input[type='text'], input[type='search']").forEach((input) => {
      input.value = "";
      filterCards(input);
    });
    document.querySelectorAll("input[type='checkbox']").forEach((input) => {
      input.checked = true;
    });
    toast("Filtreler temizlendi.");
  }

  function initials(name) {
    return String(name || "PM")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.slice(0, 1).toLocaleUpperCase("tr-TR"))
      .join("") || "PM";
  }

  function splitList(value) {
    return String(value || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  function panelField({ label, name, value = "", placeholder = "", type = "text", textarea = false, options = null }) {
    if (options) {
      const optionHtml = options.map((option) => {
        const selected = option.value === value ? " selected" : "";
        return `<option value="${escapeHtml(option.value)}"${selected}>${escapeHtml(option.label)}</option>`;
      }).join("");
      return `
        <div class="pm-field">
          <label for="pm-${escapeHtml(name)}">${escapeHtml(label)}</label>
          <select id="pm-${escapeHtml(name)}" name="${escapeHtml(name)}">${optionHtml}</select>
        </div>
      `;
    }

    const tag = textarea ? "textarea" : "input";
    const attrs = textarea
      ? `id="pm-${escapeHtml(name)}" name="${escapeHtml(name)}" placeholder="${escapeHtml(placeholder)}"`
      : `id="pm-${escapeHtml(name)}" name="${escapeHtml(name)}" type="${escapeHtml(type)}" value="${escapeHtml(value)}" placeholder="${escapeHtml(placeholder)}"`;
    const content = textarea ? escapeHtml(value) : "";

    return `
      <div class="pm-field">
        <label for="pm-${escapeHtml(name)}">${escapeHtml(label)}</label>
        <${tag} ${attrs}>${content}</${tag}>
      </div>
    `;
  }

  function closePanel() {
    const existing = document.querySelector(".pm-panel-backdrop");
    if (!existing) return;
    existing.classList.remove("is-open");
    window.setTimeout(() => existing.remove(), 180);
  }

  function openPanel({ title, eyebrow = "PathMatch", subtitle = "", body = "", primaryText = null, secondaryText = "Kapat", onPrimary = null }) {
    closePanel();

    const backdrop = document.createElement("div");
    backdrop.className = "pm-panel-backdrop";
    backdrop.innerHTML = `
      <aside class="pm-panel" role="dialog" aria-modal="true" aria-label="${escapeHtml(title)}">
        <div class="pm-panel-header">
          <div>
            <p class="pm-panel-eyebrow">${escapeHtml(eyebrow)}</p>
            <h2 class="pm-panel-title">${escapeHtml(title)}</h2>
            ${subtitle ? `<p class="pm-panel-subtitle">${escapeHtml(subtitle)}</p>` : ""}
          </div>
          <button class="pm-panel-close" type="button" aria-label="Paneli kapat" data-pm-panel-close>
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div class="pm-panel-body">${body}</div>
        <div class="pm-panel-footer">
          <button class="pm-panel-button" type="button" data-pm-panel-close>${escapeHtml(secondaryText)}</button>
          ${primaryText ? `<button class="pm-panel-button is-primary" type="button" data-pm-panel-primary>${escapeHtml(primaryText)}</button>` : ""}
        </div>
      </aside>
    `;

    backdrop.addEventListener("click", (event) => {
      if (event.target === backdrop || event.target.closest("[data-pm-panel-close]")) {
        event.preventDefault();
        event.stopPropagation();
        closePanel();
      }
    });

    const panel = backdrop.querySelector(".pm-panel");
    panel.addEventListener("click", handlePanelUtilityClick);

    const primary = panel.querySelector("[data-pm-panel-primary]");
    if (primary && onPrimary) {
      primary.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        const result = onPrimary(panel);
        if (result !== false) closePanel();
      });
    }

    const form = panel.querySelector("form");
    if (form && primary) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        event.stopPropagation();
        primary.click();
      });
    }

    document.body.appendChild(backdrop);
    requestAnimationFrame(() => backdrop.classList.add("is-open"));

    const firstInput = panel.querySelector(".pm-panel-body input, .pm-panel-body textarea, .pm-panel-body select, .pm-panel-body button") || panel.querySelector("button");
    if (firstInput) window.setTimeout(() => firstInput.focus({ preventScroll: true }), 80);
    return panel;
  }

  function panelValue(panel, name) {
    return panel.querySelector(`[name="${name}"]`)?.value.trim() || "";
  }

  function handlePanelUtilityClick(event) {
    const route = event.target.closest("[data-pm-route]");
    if (route) {
      event.preventDefault();
      event.stopPropagation();
      closePanel();
      navigate(route.dataset.pmRoute);
      return;
    }

    const action = event.target.closest("[data-pm-panel-action]");
    if (!action) return;

    event.preventDefault();
    event.stopPropagation();

    const actionName = action.dataset.pmPanelAction;
    if (actionName === "copy-url") {
      copyText(window.location.href);
      return;
    }
    if (actionName === "download-cv") {
      downloadProfileSummary();
      return;
    }
    if (actionName === "preview-profile") {
      openProfilePreview();
      return;
    }
    if (actionName === "mark-read") {
      toast("Sohbet okundu olarak işaretlendi.");
      closePanel();
      return;
    }
    if (actionName === "open-detail") {
      closePanel();
      navigate("detail");
      return;
    }
    if (actionName === "move-next") {
      toast("Başvuru bir sonraki aşamaya taşındı.");
      closePanel();
      return;
    }
    if (actionName === "withdraw") {
      toast("Başvuru geri çekildi olarak işaretlendi.");
      closePanel();
      return;
    }
    if (actionName === "message") {
      closePanel();
      navigate("messages");
      return;
    }
    if (actionName === "add-calendar") {
      closePanel();
      openInvitePanel();
    }
  }

  function copyText(value) {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(value).then(() => toast("Link kopyalandı."), () => toast("Link seçime hazırlandı."));
      return;
    }

    const input = document.createElement("textarea");
    input.value = value;
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    input.remove();
    toast("Link kopyalandı.");
  }

  function hydrateProfileSkills() {
    if (currentFile() !== pages.profile) return;
    const user = currentUser();
    const heading = Array.from(document.querySelectorAll("h3")).find((node) => textOf(node).includes("Yetenekler"));
    const panel = heading?.closest(".glass-panel");
    const list = panel?.querySelector(".flex.flex-wrap");
    if (!list) return;

    list.innerHTML = (user.skills || []).map((skill, index) => {
      const tone = index < 2 ? "bg-secondary-fixed/20 text-secondary border-secondary-fixed/50" : "bg-surface-container-highest text-on-surface border-outline-variant/30";
      return `<span class="px-3 py-1.5 ${tone} border rounded-lg font-body-sm text-body-sm">${escapeHtml(skill)}</span>`;
    }).join("");
  }

  function editProfile() {
    const user = currentUser();
    const body = `
      <form class="pm-panel-form">
        <div class="pm-panel-note" style="display:flex;align-items:center;gap:14px;">
          <div class="pm-panel-avatar">${escapeHtml(initials(user.name))}</div>
          <div>
            <strong>${escapeHtml(user.name)}</strong>
            <div>${escapeHtml(user.title || "PathMatch kullanıcısı")}</div>
          </div>
        </div>
        ${panelField({ label: "Ad Soyad", name: "name", value: user.name })}
        ${panelField({ label: "Unvan", name: "title", value: user.title || "", placeholder: "Örn. Junior Frontend Geliştirici" })}
        ${panelField({ label: "Okul / Şirket", name: "institution", value: user.institution || "", placeholder: "Kurum adı" })}
        ${panelField({ label: "Konum", name: "location", value: user.location || "", placeholder: "Şehir, Ülke" })}
        ${panelField({ label: "Yetenekler", name: "skills", value: (user.skills || []).join(", "), textarea: true, placeholder: "React, TypeScript, Figma" })}
      </form>
    `;

    openPanel({
      title: "Profili Düzenle",
      subtitle: "Bilgilerin localStorage içinde saklanır ve tüm sayfalara yansır.",
      body,
      primaryText: "Değişiklikleri Kaydet",
      onPrimary(panel) {
        Object.assign(user, {
          name: panelValue(panel, "name") || user.name,
          title: panelValue(panel, "title") || user.title,
          institution: panelValue(panel, "institution") || user.institution,
          location: panelValue(panel, "location") || user.location,
          skills: splitList(panelValue(panel, "skills"))
        });
        saveState();
        hydrateUserCopy();
        hydrateProfileSkills();
        toast("Profil güncellendi.");
        if (currentFile() === pages.profile) window.setTimeout(() => window.location.reload(), 350);
      }
    });
  }

  function addSkill() {
    const user = currentUser();
    const body = `
      <form class="pm-panel-form">
        ${panelField({ label: "Yeni Yetenek", name: "skill", placeholder: "Örn. Next.js" })}
        <div class="pm-panel-note">Eklediğin yetenek profilinde ve yerel demo verilerinde saklanır.</div>
      </form>
    `;

    openPanel({
      title: "Yetenek Ekle",
      subtitle: "Profilini daha güçlü hale getirecek yeni bir beceri ekle.",
      body,
      primaryText: "Ekle",
      onPrimary(panel) {
        const skill = panelValue(panel, "skill");
        if (!skill) {
          toast("Yetenek adı boş olamaz.");
          return false;
        }
        user.skills = Array.from(new Set([...(user.skills || []), skill].filter(Boolean)));
        saveState();
        hydrateProfileSkills();
        toast(`${skill} profile eklendi.`);
      }
    });
  }

  function openInfoPanel(topic) {
    const title = textOf(topic) || String(topic || "Bilgi");
    const lower = title.toLocaleLowerCase("tr-TR");
    const copy = {
      about: "PathMatch, öğrenciler ve şirketler için eşleşme, başvuru takibi, mesajlaşma ve kariyer yol haritası deneyimini tek yerde gösteren statik demo arayüzüdür.",
      privacy: "Bu demo backend kullanmaz. Kayıt, profil ve başvuru verileri yalnızca tarayıcındaki localStorage alanında tutulur.",
      terms: "Demo kullanım koşulları basittir: veriler yereldir, gerçek başvuru gönderimi yapılmaz ve tüm aksiyonlar prototip deneyimi olarak çalışır.",
      contact: "İletişim akışı bu statik demoda mesajlaşma ekranına yönlendirilir. Geri bildirim için mesaj panelini kullanabilirsin."
    };
    let bodyText = copy.about;
    if (lower.includes("gizlilik")) bodyText = copy.privacy;
    else if (lower.includes("kullanım")) bodyText = copy.terms;
    else if (lower.includes("iletişim")) bodyText = copy.contact;

    openPanel({
      title,
      subtitle: "Stitch tasarımını bozmadan çalışan demo bilgisi.",
      body: `
        <div class="pm-panel-stack">
          <div class="pm-panel-note">${escapeHtml(bodyText)}</div>
          <button class="pm-panel-option" type="button" data-pm-route="messages"><span><span class="material-symbols-outlined">chat</span>Mesajlara Git</span><span class="material-symbols-outlined">arrow_forward</span></button>
        </div>
      `
    });
  }

  function openHelpPanel() {
    openPanel({
      title: "Yardım Merkezi",
      subtitle: "Bu statik demoda ana akışlara hızlıca ulaşabilirsin.",
      body: `
        <div class="pm-panel-stack">
          <button class="pm-panel-option" type="button" data-pm-route="matches"><span><span class="material-symbols-outlined">auto_awesome</span>Akıllı eşleşmeleri aç</span><span class="material-symbols-outlined">arrow_forward</span></button>
          <button class="pm-panel-option" type="button" data-pm-route="applications"><span><span class="material-symbols-outlined">assignment</span>Başvuru takibini aç</span><span class="material-symbols-outlined">arrow_forward</span></button>
          <button class="pm-panel-option" type="button" data-pm-route="roadmap"><span><span class="material-symbols-outlined">map</span>Kariyer yol haritasını aç</span><span class="material-symbols-outlined">arrow_forward</span></button>
          <button class="pm-panel-option" type="button" data-pm-route="messages"><span><span class="material-symbols-outlined">chat</span>Mesajlara git</span><span class="material-symbols-outlined">arrow_forward</span></button>
        </div>
      `
    });
  }

  function openNotificationsPanel() {
    const latestApplication = state.applications[0] || defaultState.applications[0];
    const items = [
      `${latestApplication.company} başvurun ${latestApplication.status.toLocaleLowerCase("tr-TR")} aşamasında.`,
      `${state.saved.length || 2} fırsat kaydedilenlerde bekliyor.`,
      state.roadmapStarted ? "Yol haritası görevin aktif." : "Yol haritasındaki ilk görevi başlatabilirsin."
    ];

    openPanel({
      title: "Bildirimler",
      subtitle: "Demo verilerinden oluşturulan canlı bildirimler.",
      body: `
        <ul class="pm-panel-list">
          ${items.map((item) => `<li class="pm-panel-note">${escapeHtml(item)}</li>`).join("")}
        </ul>
      `,
      primaryText: "Başvurulara Git",
      onPrimary() {
        navigate("applications");
      }
    });
  }

  function openSharePanel() {
    openPanel({
      title: "Paylaş",
      subtitle: "Bu sayfanın yerel bağlantısını kopyala.",
      body: `
        <div class="pm-panel-stack">
          ${panelField({ label: "Sayfa Bağlantısı", name: "shareUrl", value: window.location.href })}
          <button class="pm-panel-option" type="button" data-pm-panel-action="copy-url"><span><span class="material-symbols-outlined">content_copy</span>Linki Kopyala</span><span class="material-symbols-outlined">check</span></button>
        </div>
      `
    });
  }

  function openFilterPanel() {
    const statusOptions = [
      { value: "all", label: "Tüm durumlar" },
      { value: "kayded", label: "Kaydedilenler" },
      { value: "başvur", label: "Başvurulanlar" },
      { value: "mülakat", label: "Mülakat" },
      { value: "teklif", label: "Teklif" }
    ];

    openPanel({
      title: "Filtrele",
      subtitle: "Kartları bu ekrandan hızlıca daralt.",
      body: `
        <form class="pm-panel-form">
          ${panelField({ label: "Arama", name: "query", placeholder: "Rol, şirket veya şehir" })}
          ${panelField({ label: "Durum", name: "status", value: "all", options: statusOptions })}
        </form>
      `,
      primaryText: "Filtreyi Uygula",
      onPrimary(panel) {
        applyPanelFilter(panel);
      }
    });
  }

  function filterableCards() {
    const page = currentFile();
    if (page === pages.matches) return Array.from(document.querySelectorAll("article"));
    if (page === pages.applications) return Array.from(document.querySelectorAll(".glass-panel.rounded-lg"));
    if (page === pages.messages) return Array.from(document.querySelectorAll("aside .cursor-pointer"));
    if (page === pages.company) return Array.from(document.querySelectorAll(".glass-panel"));
    return Array.from(document.querySelectorAll(".glass-panel, article"));
  }

  function applyPanelFilter(panel) {
    const query = panelValue(panel, "query").toLocaleLowerCase("tr-TR");
    const status = panelValue(panel, "status");

    filterableCards().forEach((card) => {
      const text = textOf(card).toLocaleLowerCase("tr-TR");
      const matchesQuery = !query || text.includes(query);
      const matchesStatus = !status || status === "all" || text.includes(status);
      card.style.display = matchesQuery && matchesStatus ? "" : "none";
    });

    toast("Filtre uygulandı.");
  }

  function openSkillFilterPanel() {
    const skills = ["React", "TypeScript", "Node.js", "Figma", "Python", "SQL"];
    openPanel({
      title: "Yetenek Filtreleri",
      subtitle: "Seçtiğin yeteneklere göre fırsat kartları süzülür.",
      body: `
        <form class="pm-panel-form">
          <div class="pm-panel-pill-row">
            ${skills.map((skill) => `<label class="pm-panel-pill"><input type="checkbox" name="skills" value="${escapeHtml(skill)}"> ${escapeHtml(skill)}</label>`).join("")}
          </div>
        </form>
      `,
      primaryText: "Uygula",
      onPrimary(panel) {
        const selected = Array.from(panel.querySelectorAll('input[name="skills"]:checked')).map((input) => input.value.toLocaleLowerCase("tr-TR"));
        const cards = filterableCards();
        cards.forEach((card) => {
          const text = textOf(card).toLocaleLowerCase("tr-TR");
          card.style.display = !selected.length || selected.some((skill) => text.includes(skill)) ? "" : "none";
        });
        toast("Yetenek filtresi uygulandı.");
      }
    });
  }

  function openApplicationPanel() {
    openPanel({
      title: "Başvuru Ekle",
      subtitle: "Yeni başvuruyu localStorage içine kaydet.",
      body: `
        <form class="pm-panel-form">
          ${panelField({ label: "Pozisyon", name: "title", placeholder: "Frontend Geliştirici" })}
          ${panelField({ label: "Şirket", name: "company", placeholder: "TechFlow A.Ş." })}
          ${panelField({ label: "Konum", name: "location", placeholder: "İstanbul / Uzaktan" })}
          <div class="pm-panel-grid">
            ${panelField({ label: "Eşleşme", name: "match", type: "number", value: "85" })}
            ${panelField({ label: "Durum", name: "status", value: "Başvuruldu", options: [
              { value: "Kaydedildi", label: "Kaydedildi" },
              { value: "Başvuruldu", label: "Başvuruldu" },
              { value: "Mülakat", label: "Mülakat" },
              { value: "Teklif", label: "Teklif" }
            ] })}
          </div>
        </form>
      `,
      primaryText: "Kaydet",
      onPrimary(panel) {
        const job = {
          id: slug(`${panelValue(panel, "title")}-${panelValue(panel, "company")}-${Date.now()}`),
          title: panelValue(panel, "title") || "Yeni Başvuru",
          company: panelValue(panel, "company") || "PathMatch",
          location: panelValue(panel, "location") || "Türkiye",
          match: Number(panelValue(panel, "match")) || 85,
          status: panelValue(panel, "status") || "Başvuruldu",
          date: today()
        };

        if (job.status === "Kaydedildi") state.saved.unshift(job);
        else state.applications.unshift(job);
        saveState();
        renderStoredApplications();
        toast("Başvuru kaydedildi.");
        if (currentFile() !== pages.applications) navigate("applications");
      }
    });
  }

  function openCompanyJobPanel() {
    openPanel({
      title: "İlan Oluştur",
      subtitle: "İlan bilgisi bu statik demoda yerel olarak saklanır.",
      body: `
        <form class="pm-panel-form">
          ${panelField({ label: "Pozisyon", name: "title", placeholder: "Frontend Developer Intern" })}
          ${panelField({ label: "Lokasyon", name: "location", placeholder: "İstanbul / Hibrit" })}
          ${panelField({ label: "Kriterler", name: "skills", value: "React, TypeScript, Figma", textarea: true })}
        </form>
      `,
      primaryText: "İlanı Kaydet",
      onPrimary(panel) {
        state.jobs.unshift({
          id: slug(`${panelValue(panel, "title")}-${Date.now()}`),
          title: panelValue(panel, "title") || "Yeni İlan",
          location: panelValue(panel, "location") || "Türkiye",
          skills: splitList(panelValue(panel, "skills")),
          date: today()
        });
        saveState();
        toast("İlan taslak olarak kaydedildi.");
      }
    });
  }

  function openInvitePanel(element = null) {
    const candidateNode = element ? closestUsefulCard(element).querySelector("h3,h4") : null;
    const candidate = textOf(candidateNode) || "Sidal Polat";
    openPanel({
      title: "Mülakat Planla",
      subtitle: "Mülakat daveti yerel demo verisine eklenir.",
      body: `
        <form class="pm-panel-form">
          ${panelField({ label: "Aday", name: "candidate", value: candidate })}
          <div class="pm-panel-grid">
            ${panelField({ label: "Tarih", name: "date", type: "date", value: today() })}
            ${panelField({ label: "Saat", name: "time", type: "time", value: "14:00" })}
          </div>
          ${panelField({ label: "Not", name: "note", textarea: true, placeholder: "Kısa davet notu" })}
        </form>
      `,
      primaryText: "Daveti Kaydet",
      onPrimary(panel) {
        state.invites.unshift({
          candidate: panelValue(panel, "candidate") || candidate,
          date: panelValue(panel, "date") || today(),
          time: panelValue(panel, "time") || "14:00",
          note: panelValue(panel, "note")
        });
        saveState();
        toast("Mülakat daveti kaydedildi.");
      }
    });
  }

  function openCalendarPanel() {
    const invites = state.invites.length ? state.invites : [
      { candidate: "Zeynep Kaya", date: today(), time: "14:00", note: "Frontend Dev Görüşmesi" },
      { candidate: "Ahmet Yılmaz", date: today(), time: "10:30", note: "Ürün Yöneticisi 2. Tur" }
    ];

    openPanel({
      title: "Takvim",
      subtitle: "Planlanan mülakatların yerel görünümü.",
      body: `
        <div class="pm-panel-stack">
          ${invites.map((invite) => `
            <div class="pm-panel-note">
              <strong>${escapeHtml(invite.date)} ${escapeHtml(invite.time)}</strong><br>
              ${escapeHtml(invite.candidate)}${invite.note ? ` - ${escapeHtml(invite.note)}` : ""}
            </div>
          `).join("")}
          <button class="pm-panel-option" type="button" data-pm-panel-action="add-calendar"><span><span class="material-symbols-outlined">add</span>Yeni mülakat ekle</span><span class="material-symbols-outlined">arrow_forward</span></button>
        </div>
      `
    });
  }

  function openActionsPanel(element) {
    const page = currentFile();
    const card = closestUsefulCard(element);
    const title = textOf(card.querySelector("h2,h3,h4")) || "Aksiyonlar";
    const isMessage = page === pages.messages || hasIcon(element, "more_vert");

    openPanel({
      title: isMessage ? "Sohbet Aksiyonları" : "Kart Aksiyonları",
      subtitle: title,
      body: `
        <div class="pm-panel-stack">
          <button class="pm-panel-option" type="button" data-pm-panel-action="open-detail"><span><span class="material-symbols-outlined">open_in_new</span>Detayları Gör</span><span class="material-symbols-outlined">arrow_forward</span></button>
          <button class="pm-panel-option" type="button" data-pm-panel-action="message"><span><span class="material-symbols-outlined">chat</span>Mesaj Gönder</span><span class="material-symbols-outlined">arrow_forward</span></button>
          <button class="pm-panel-option" type="button" data-pm-panel-action="${isMessage ? "mark-read" : "move-next"}"><span><span class="material-symbols-outlined">done_all</span>${isMessage ? "Okundu İşaretle" : "Sonraki Aşamaya Taşı"}</span><span class="material-symbols-outlined">check</span></button>
          ${page === pages.applications ? `<button class="pm-panel-option" type="button" data-pm-panel-action="withdraw"><span><span class="material-symbols-outlined">undo</span>Başvuruyu Geri Çek</span><span class="material-symbols-outlined">check</span></button>` : ""}
        </div>
      `
    });
  }

  function openAttachmentPanel() {
    openPanel({
      title: "Dosya Ekle",
      subtitle: "Seçilen dosya adı yerel demoya kaydedilir.",
      body: `
        <form class="pm-panel-form">
          ${panelField({ label: "Dosya", name: "attachment", type: "file" })}
          <div class="pm-panel-note">Gerçek yükleme yapılmaz; backend olmadığı için dosya adı localStorage içinde tutulur.</div>
        </form>
      `,
      primaryText: "Dosyayı Ekle",
      onPrimary(panel) {
        const file = panel.querySelector('input[type="file"]')?.files?.[0];
        state.attachments.unshift({ name: file?.name || "PathMatch-CV.pdf", date: today() });
        saveState();
        toast(`${file?.name || "Örnek dosya"} eklendi.`);
      }
    });
  }

  function openProfilePreview() {
    const user = currentUser();
    openPanel({
      title: "Profil Önizleme",
      subtitle: "Şirketlerin göreceği kısa profil görünümü.",
      body: `
        <div class="pm-panel-stack">
          <div class="pm-panel-note" style="display:flex;align-items:center;gap:14px;">
            <div class="pm-panel-avatar">${escapeHtml(initials(user.name))}</div>
            <div>
              <strong>${escapeHtml(user.name)}</strong>
              <div>${escapeHtml(user.title || "")}</div>
              <div>${escapeHtml(user.institution || "")} • ${escapeHtml(user.location || "")}</div>
            </div>
          </div>
          <div class="pm-panel-pill-row">
            ${(user.skills || []).map((skill) => `<span class="pm-panel-pill">${escapeHtml(skill)}</span>`).join("")}
          </div>
        </div>
      `,
      primaryText: "Profili Paylaş",
      onPrimary() {
        copyText(window.location.href);
      }
    });
  }

  function downloadProfileSummary() {
    const user = currentUser();
    const content = [
      user.name,
      user.title || "",
      user.institution || "",
      user.location || "",
      "",
      `Yetenekler: ${(user.skills || []).join(", ")}`
    ].join("\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${slug(user.name)}-cv.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    toast("CV dosyası hazırlandı.");
  }

  function filterMessages(kind, element) {
    const normalized = kind.toLocaleLowerCase("tr-TR");
    const buttons = element.parentElement?.querySelectorAll("button") || [];
    buttons.forEach((button) => button.classList.remove("pm-message-filter-active"));
    element.classList.add("pm-message-filter-active");

    const cards = Array.from(document.querySelectorAll("aside .cursor-pointer"));
    cards.forEach((card, index) => {
      const visible = normalized.includes("tümü") || normalized.includes("şirket") || (normalized.includes("okunmamış") && index < 2);
      card.style.display = visible ? "" : "none";
    });
    toast(`${textOf(element)} filtresi uygulandı.`);
  }

  function scrollRecommendations(direction) {
    const container = Array.from(document.querySelectorAll(".overflow-x-auto, .grid, .flex")).find((node) => textOf(node).includes("Yazılım Stajyeri") || textOf(node).includes("Önerilen"));
    if (container?.scrollBy) container.scrollBy({ left: direction * 280, behavior: "smooth" });
    toast(direction > 0 ? "Sonraki öneriler gösteriliyor." : "Önceki öneriler gösteriliyor.");
  }


  function startRoadmapTask(element) {
    state.roadmapStarted = true;
    saveState();
    element.textContent = "Görev Başladı";
    toast("Yol haritası görevi başlatıldı.");
  }

  function hydrateRoadmap() {
    if (currentFile() !== pages.roadmap || !state.roadmapStarted) return;
    Array.from(document.querySelectorAll("button")).forEach((button) => {
      if (lowerText(button).includes("görevi başlat")) button.textContent = "Görev Başladı";
    });
  }

  function hydrateSavedButtons() {
    document.querySelectorAll("button").forEach((button) => {
      if (!lowerText(button).includes("kaydet")) return;
      const job = jobFromElement(button);
      if (state.saved.some((item) => item.id === job.id)) button.textContent = "Kaydedildi";
    });
  }

  function openMobileDrawer() {
    let backdrop = document.querySelector(".pm-drawer-backdrop");
    let drawer = document.querySelector(".pm-drawer");

    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.className = "pm-drawer-backdrop";
      backdrop.addEventListener("click", closeMobileDrawer);
      document.body.appendChild(backdrop);
    }

    if (!drawer) {
      drawer = document.createElement("nav");
      drawer.className = "pm-drawer";
      drawer.innerHTML = `
        <h2>PathMatch</h2>
        <a href="${pageUrl("dashboard")}"><span class="material-symbols-outlined">dashboard</span>Panel</a>
        <a href="${pageUrl("matches")}"><span class="material-symbols-outlined">auto_awesome</span>Eşleşmeler</a>
        <a href="${pageUrl("applications")}"><span class="material-symbols-outlined">assignment</span>Başvurular</a>
        <a href="${pageUrl("roadmap")}"><span class="material-symbols-outlined">map</span>Yol Haritası</a>
        <a href="${pageUrl("messages")}"><span class="material-symbols-outlined">chat</span>Mesajlar</a>
        <a href="${pageUrl("profile")}"><span class="material-symbols-outlined">person</span>Profil</a>
        <button type="button" data-pm-logout><span class="material-symbols-outlined">logout</span>Çıkış</button>
      `;
      drawer.querySelector("[data-pm-logout]").addEventListener("click", logout);
      document.body.appendChild(drawer);
    }

    requestAnimationFrame(() => {
      backdrop.classList.add("is-open");
      drawer.classList.add("is-open");
    });
  }

  function closeMobileDrawer() {
    document.querySelector(".pm-drawer-backdrop")?.classList.remove("is-open");
    document.querySelector(".pm-drawer")?.classList.remove("is-open");
  }

  function handleClick(event) {
    const element = event.target.closest("button,a");
    if (!element) return;

    const value = lowerText(element);

    if (hasIcon(element, "menu")) {
      event.preventDefault();
      openMobileDrawer();
      return;
    }

    if (element.tagName === "A" && element.getAttribute("href") && element.getAttribute("href") !== "#") {
      return;
    }

    if (value.includes("giriş yap")) {
      event.preventDefault();
      loginDemo();
      return;
    }

    if (value.includes("ilan yayınla")) {
      event.preventDefault();
      loginCompany();
      return;
    }

    if (value.includes("çıkış")) {
      event.preventDefault();
      logout();
      return;
    }

    if (value.includes("hemen başla") || value.includes("kayıt ol")) {
      if (element.closest("form")) return;
      event.preventDefault();
      navigate("register");
      return;
    }

    if (value.includes("nasıl çalışır")) {
      event.preventDefault();
      document.querySelector("section:nth-of-type(2)")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (value.includes("başvur")) {
      event.preventDefault();
      applyToJob(element);
      return;
    }

    if (value.includes("kaydet")) {
      event.preventDefault();
      saveJob(element);
      return;
    }

    if (["tümü", "okunmamış", "şirketler"].includes(value)) {
      event.preventDefault();
      filterMessages(value, element);
      return;
    }

    if (value.includes("temizle")) {
      event.preventDefault();
      clearFilters();
      return;
    }

    if (value.includes("filtrele")) {
      event.preventDefault();
      openFilterPanel();
      return;
    }

    if (value.includes("yeni ekle")) {
      event.preventDefault();
      if (currentFile() === pages.applications) openApplicationPanel();
      else openCompanyJobPanel();
      return;
    }

    if (hasIcon(element, "add")) {
      event.preventDefault();
      if (currentFile() === pages.company) openInvitePanel(element);
      else openApplicationPanel();
      return;
    }

    if (value.includes("yetenek ekle")) {
      event.preventDefault();
      addSkill();
      return;
    }

    if (value.includes("profili düzenle")) {
      event.preventDefault();
      editProfile();
      return;
    }

    if (value.includes("görevi başlat")) {
      event.preventDefault();
      startRoadmapTask(element);
      return;
    }

    if (value.includes("portfolyo gönder")) {
      event.preventDefault();
      sendMessage("Portfolyo linkimi paylaşıyorum: https://portfolio.example.com");
      return;
    }

    if (value.includes("mülakat planla")) {
      event.preventDefault();
      openInvitePanel(element);
      return;
    }

    if (value.includes("geri bildirim iste")) {
      event.preventDefault();
      sendMessage("Başvurumla ilgili kısa geri bildirim paylaşabilir misiniz?");
      return;
    }

    if (hasIcon(element, "send")) {
      event.preventDefault();
      sendMessage(document.querySelector("textarea")?.value);
      return;
    }

    if (hasIcon(element, "attach_file")) {
      event.preventDefault();
      openAttachmentPanel();
      return;
    }

    if (value.includes("mülakata davet et")) {
      event.preventDefault();
      openInvitePanel(element);
      return;
    }

    if (value.includes("profile git")) {
      event.preventDefault();
      navigate("profile");
      return;
    }

    if (value.includes("cv olarak indir")) {
      event.preventDefault();
      downloadProfileSummary();
      return;
    }

    if (value.includes("önizleme")) {
      event.preventDefault();
      openProfilePreview();
      return;
    }

    if (value.includes("tüm takvimi gör")) {
      event.preventDefault();
      openCalendarPanel();
      return;
    }

    if (value.includes("tümünü gör")) {
      event.preventDefault();
      navigate(currentFile() === pages.company ? "profile" : "matches");
      return;
    }

    if (hasIcon(element, "chevron_left")) {
      event.preventDefault();
      scrollRecommendations(-1);
      return;
    }

    if (hasIcon(element, "chevron_right")) {
      event.preventDefault();
      scrollRecommendations(1);
      return;
    }

    if (hasIcon(element, "notifications")) {
      event.preventDefault();
      openNotificationsPanel();
      return;
    }

    if (hasIcon(element, "share")) {
      event.preventDefault();
      openSharePanel();
      return;
    }

    if (hasIcon(element, "more_horiz") || hasIcon(element, "more_vert")) {
      event.preventDefault();
      openActionsPanel(element);
      return;
    }

    if (value.includes("yardım")) {
      event.preventDefault();
      openHelpPanel();
      return;
    }

    if (value.includes("daha fazla")) {
      event.preventDefault();
      openSkillFilterPanel();
      return;
    }

    if (value.includes("hakkımızda") || value.includes("gizlilik") || value.includes("kullanım koşulları") || value.includes("iletişim")) {
      event.preventDefault();
      openInfoPanel(element);
      return;
    }

    const page = pageFromText(element);
    if (page) {
      event.preventDefault();
      navigate(page);
    }
  }

  function handleSubmit(event) {
    const form = event.target.closest("form");
    if (!form) return;
    if (form.classList.contains("pm-panel-form")) return;
    event.preventDefault();
    registerUser(form);
  }

  function bindInputs() {
    document.querySelectorAll("input").forEach((input) => {
      const type = input.getAttribute("type") || "text";
      if (type === "text" || type === "search") {
        input.addEventListener("input", () => filterCards(input));
      }
    });

    document.querySelectorAll("textarea").forEach((textarea) => {
      textarea.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          sendMessage(textarea.value);
        }
      });
    });
  }

  function init() {
    injectStyles();
    wireStaticLinks();
    normalizeTheme();
    hydrateUserCopy();
    hydrateProfileSkills();
    hydrateSavedButtons();
    hydrateRoadmap();
    renderStoredApplications();
    renderStoredMessages();
    bindInputs();
    document.addEventListener("click", handleClick);
    document.addEventListener("submit", handleSubmit);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closePanel();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
