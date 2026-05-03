const STORAGE_KEY = "pathmatch-live-state-v1";

const opportunities = [
  {
    id: "frontend-intern",
    title: "Frontend Developer Stajyeri",
    company: "NovaTech",
    location: "Istanbul, Hibrit",
    type: "Staj",
    department: "Yazılım",
    salary: "18.000 TL",
    match: 96,
    tags: ["React", "UI", "TypeScript"],
    description: "Design system odaklı ürün ekranları geliştiren ekibe katıl, gerçek kullanıcı akışlarında sorumluluk al.",
    requirements: ["React bileşen mantığı", "CSS layout bilgisi", "Git ile çalışma"],
    steps: ["Başvuru", "Portfolyo İnceleme", "Teknik Görüşme", "Teklif"]
  },
  {
    id: "product-design",
    title: "Product Design Intern",
    company: "BrightHR",
    location: "Ankara, Uzaktan",
    type: "Staj",
    department: "Tasarım",
    salary: "16.500 TL",
    match: 91,
    tags: ["Figma", "Research", "Prototype"],
    description: "İK ürünleri için araştırma, prototip ve kullanılabilirlik testleri yürüten tasarım ekibinde yer al.",
    requirements: ["Figma hakimiyeti", "Temel UX araştırma bilgisi", "Sunum becerisi"],
    steps: ["Başvuru", "Mini Case", "Ekip Görüşmesi", "Teklif"]
  },
  {
    id: "data-analyst",
    title: "Data Analyst Trainee",
    company: "FinCore",
    location: "Izmir, Ofis",
    type: "Trainee",
    department: "Veri",
    salary: "22.000 TL",
    match: 84,
    tags: ["SQL", "Python", "Dashboard"],
    description: "Finans operasyon verilerini analiz edip karar ekipleri için canlı dashboardlar hazırla.",
    requirements: ["SQL sorguları", "Python veri analizi", "Analitik düşünme"],
    steps: ["Başvuru", "Veri Case", "Final Görüşme", "Teklif"]
  },
  {
    id: "growth-marketing",
    title: "Growth Marketing Assistant",
    company: "SkillBridge",
    location: "Istanbul, Uzaktan",
    type: "Part-time",
    department: "Pazarlama",
    salary: "14.000 TL",
    match: 78,
    tags: ["SEO", "Analytics", "Content"],
    description: "Kariyer teknolojileri alanında kampanya, içerik ve performans analizlerini uçtan uca takip et.",
    requirements: ["Google Analytics", "İçerik planlama", "Deney yapma kültürü"],
    steps: ["Başvuru", "Telefon Görüşmesi", "Case", "Teklif"]
  },
  {
    id: "backend-trainee",
    title: "Backend Trainee",
    company: "Cloudpeak",
    location: "Bursa, Hibrit",
    type: "Trainee",
    department: "Yazılım",
    salary: "20.000 TL",
    match: 82,
    tags: ["Node.js", "API", "PostgreSQL"],
    description: "API tasarımı, veritabanı modelleme ve servis gözlemlenebilirliği konularında deneyim kazan.",
    requirements: ["JavaScript temeli", "REST API bilgisi", "Veritabanı merakı"],
    steps: ["Başvuru", "Teknik Test", "Görüşme", "Teklif"]
  }
];

const roadmap = [
  { id: "profile", title: "Profilini güçlendir", note: "Yetenek, hedef ve kurum bilgilerini tamamla.", area: "Profil" },
  { id: "portfolio", title: "Portfolyo linkini ekle", note: "GitHub, Behance veya kişisel site bağlantısı ekle.", area: "Kanıt" },
  { id: "apply", title: "3 yüksek eşleşmeli ilana başvur", note: "Eşleşme oranı yüzde 85 üzerindeki fırsatları önceliklendir.", area: "Başvuru" },
  { id: "message", title: "Bir mentor görüşmesi başlat", note: "Kariyer hedefin için kısa bir tanışma mesajı gönder.", area: "Ağ" },
  { id: "interview", title: "Teknik görüşme provası yap", note: "Örnek soruları cevaplayıp notlarını güncelle.", area: "Hazırlık" }
];

const defaultMessages = {
  "mentor-aylin": {
    title: "Aylin Kaya",
    subtitle: "Frontend Mentor",
    messages: [
      { from: "them", text: "Profilindeki React ve UI odakları iyi görünüyor. Portfolyo linkini ekleyince eşleşme skorun artar." },
      { from: "me", text: "Bugün ekleyeceğim, ardından başvuru yapacağım." }
    ]
  },
  novatech: {
    title: "NovaTech İK",
    subtitle: "Frontend Developer Stajyeri",
    messages: [
      { from: "them", text: "Başvurunu aldık. Portfolyonu inceleyip sana dönüş yapacağız." }
    ]
  },
  "career-team": {
    title: "PathMatch Kariyer Ekibi",
    subtitle: "Yol haritası",
    messages: [
      { from: "them", text: "Bu hafta hedefin 2 başvuru ve 1 mentor mesajı. Hazır olduğunda buradan ilerleyebiliriz." }
    ]
  }
};

const initialState = {
  currentUserEmail: null,
  users: [
    {
      email: "demo@pathmatch.app",
      password: "demo123",
      name: "Inci Mercan",
      role: "student",
      institution: "Istanbul Teknik Üniversitesi",
      title: "Frontend Developer adayı",
      location: "Istanbul",
      skills: ["React", "UI", "TypeScript", "Figma"],
      portfolio: "https://portfolio.example.com",
      goal: "Ürün ekiplerinde frontend ve arayüz geliştirme deneyimi kazanmak."
    },
    {
      email: "company@pathmatch.app",
      password: "demo123",
      name: "NovaTech",
      role: "company",
      institution: "NovaTech",
      title: "Teknoloji şirketi",
      location: "Istanbul",
      skills: ["React", "Node.js", "Product"],
      portfolio: "https://novatech.example.com",
      goal: "Genç yetenekleri güçlü ürün ekipleriyle buluşturmak."
    }
  ],
  saved: ["frontend-intern", "product-design"],
  applications: [
    { id: "app-1", opportunityId: "frontend-intern", userEmail: "demo@pathmatch.app", status: "Görüşme", date: "2026-05-03" },
    { id: "app-2", opportunityId: "product-design", userEmail: "demo@pathmatch.app", status: "İncelemede", date: "2026-05-02" }
  ],
  completedRoadmap: ["profile", "apply"],
  messages: defaultMessages,
  companyJobs: [
    { id: "job-1", title: "Frontend Developer Stajyeri", location: "Istanbul, Hibrit", department: "Yazılım", applicants: 42, status: "Yayında" },
    { id: "job-2", title: "Product Analyst Intern", location: "Uzaktan", department: "Ürün", applicants: 18, status: "Taslak" }
  ],
  selectedConversation: "mentor-aylin"
};

let state = loadState();
let ui = {
  query: "",
  type: "all",
  department: "all",
  selectedConversation: state.selectedConversation || "mentor-aylin"
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored && Array.isArray(stored.users)) {
      return { ...clone(initialState), ...stored };
    }
  } catch (error) {
    console.warn("State could not be loaded", error);
  }
  return clone(initialState);
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function currentUser() {
  return state.users.find((user) => user.email === state.currentUserEmail) || null;
}

function initials(name) {
  return (name || "PM")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function route() {
  const hash = window.location.hash || "#/";
  return hash.replace(/^#/, "") || "/";
}

function go(path) {
  window.location.hash = path;
}

function icon(name) {
  return `<span class="material-symbols-outlined" aria-hidden="true">${name}</span>`;
}

function toast(message) {
  const node = document.querySelector("#toast");
  node.textContent = message;
  node.classList.add("show");
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => node.classList.remove("show"), 2600);
}

function statusClass(status) {
  if (["Kabul", "Teklif", "Yayında"].includes(status)) return "tag-green";
  if (["Görüşme", "İncelemede"].includes(status)) return "tag-cyan";
  if (["Taslak", "Beklemede"].includes(status)) return "tag-orange";
  return "tag-purple";
}

function opportunityById(id) {
  return opportunities.find((item) => item.id === id);
}

function userApplications() {
  const user = currentUser();
  if (!user) return [];
  return state.applications.filter((item) => item.userEmail === user.email);
}

function hasApplied(id) {
  return userApplications().some((item) => item.opportunityId === id);
}

function roleLabel(role) {
  return { student: "Öğrenci", company: "İşveren", mentor: "Mentor" }[role] || "Üye";
}

function navItems(user) {
  if (user?.role === "company") {
    return [
      ["/company", "business_center", "İşveren"],
      ["/matches", "travel_explore", "Aday Havuzu"],
      ["/messages", "chat", "Mesajlar"],
      ["/profile", "person", "Profil"]
    ];
  }

  return [
    ["/dashboard", "dashboard", "Panel"],
    ["/matches", "travel_explore", "Eşleşmeler"],
    ["/applications", "assignment", "Başvurular"],
    ["/roadmap", "route", "Yol Haritası"],
    ["/messages", "chat", "Mesajlar"],
    ["/profile", "person", "Profil"]
  ];
}

function appShell(content, options = {}) {
  const { hideTopbar = false } = options;
  const user = currentUser();
  const active = route();
  const nav = navItems(user);
  const desktopNav = user
    ? nav.map(([path, ico, label]) => `<a class="nav-link ${active.startsWith(path) ? "active" : ""}" href="#${path}">${icon(ico)}${label}</a>`).join("")
    : `<a class="nav-link ${active === "/" ? "active" : ""}" href="#/">${icon("home")}Ana Sayfa</a>
       <a class="nav-link ${active === "/matches" ? "active" : ""}" href="#/matches">${icon("travel_explore")}Fırsatlar</a>`;

  const mobileNav = user
    ? `<nav class="mobile-tabs">${nav.slice(0, 5).map(([path, ico, label]) => `<a class="${active.startsWith(path) ? "active" : ""}" href="#${path}">${icon(ico)}<span>${label}</span></a>`).join("")}</nav>`
    : "";

  return `
    <div class="app-shell${hideTopbar ? " app-shell--sidebar" : ""}">
      ${hideTopbar ? "" : `
      <header class="topbar">
        <div class="topbar-inner">
          <a class="brand" href="#/">
            <span class="brand-mark">PM</span>
            <span class="brand-text"><strong>PathMatch</strong><span>Smart Career Platform</span></span>
          </a>
          <nav class="main-nav" aria-label="Ana menü">${desktopNav}</nav>
          <div class="top-actions">
            ${user ? `
              <button class="btn btn-ghost btn-small hide-sm" data-action="demo-reset">${icon("restart_alt")}Demo sıfırla</button>
              <button class="btn btn-primary btn-small" data-action="logout">${icon("logout")}Çıkış</button>
            ` : `
              <a class="btn btn-ghost btn-small hide-sm" href="#/login">${icon("login")}Giriş</a>
              <a class="btn btn-primary btn-small" href="#/register">${icon("person_add")}Kayıt</a>
            `}
          </div>
        </div>
      </header>`}
      ${content}
      ${mobileNav}
    </div>
  `;
}

function sidebar(user) {
  const active = route();
  const nav = navItems(user);
  const homePath = user.role === "company" ? "/company" : "/dashboard";
  return `
    <aside class="sidebar">
      <div class="sidebar-brand">
        <a class="brand brand-sidebar" href="#${homePath}">
          <span class="brand-mark">PM</span>
          <span class="brand-text"><strong>PathMatch</strong><span>Çalışma alanı</span></span>
        </a>
      </div>
      <div class="profile-mini">
        <span class="avatar">${initials(user.name)}</span>
        <div>
          <strong>${user.name}</strong>
          <span>${roleLabel(user.role)} · ${user.location || "Türkiye"}</span>
        </div>
      </div>
      <nav class="side-nav" aria-label="Panel menüsü">
        ${nav.map(([path, ico, label]) => `<a class="${active.startsWith(path) ? "active" : ""}" href="#${path}">${icon(ico)}<span>${label}</span></a>`).join("")}
      </nav>
      <div class="sidebar-actions">
        <button class="btn btn-ghost btn-small btn-full" data-action="demo-reset">${icon("restart_alt")}Demo sıfırla</button>
        <button class="btn btn-primary btn-small btn-full" data-action="logout">${icon("logout")}Çıkış</button>
      </div>
    </aside>
  `;
}

function protectedLayout(inner) {
  const user = currentUser();
  if (!user) {
    return appShell(`
      <main class="page">
        <div class="empty-state">
          ${icon("lock")}
          <h2>Devam etmek için giriş yap</h2>
          <p class="muted">Hesap açtığında başvuru, mesaj ve profil akışların bu tarayıcıda saklanır.</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="#/login">${icon("login")}Giriş Yap</a>
            <a class="btn btn-secondary" href="#/register">${icon("person_add")}Kayıt Ol</a>
          </div>
        </div>
      </main>
    `);
  }

  return appShell(`
    <main class="page layout">
      ${sidebar(user)}
      <section class="content">${inner(user)}</section>
    </main>
  `, { hideTopbar: true });
}

function renderLanding() {
  const user = currentUser();
  const content = `
    <main class="page">
      <section class="hero">
        <div class="hero-copy">
          <span class="eyebrow">${icon("auto_awesome")}Akıllı eşleşme aktif</span>
          <h1>Kariyerine en uygun staj ve iş fırsatlarını keşfet</h1>
          <p class="lead">PathMatch, profilindeki yetenekleri gerçek ilanlarla eşleştirir, başvuru sürecini takip eder ve yol haritanı tek yerde düzenler.</p>
          <div class="hero-actions">
            ${user ? `<a class="btn btn-primary" href="#/dashboard">${icon("dashboard")}Panele geç</a>` : `<button class="btn btn-primary" data-action="login-demo">${icon("bolt")}Demo ile başla</button>`}
            <a class="btn btn-secondary" href="#/matches">${icon("travel_explore")}Fırsatları gör</a>
            <a class="btn btn-ghost" href="#/register">${icon("person_add")}Hesap oluştur</a>
          </div>
          <div class="hero-metrics">
            <div class="metric"><strong>96%</strong><span>En yüksek eşleşme skoru</span></div>
            <div class="metric"><strong>5</strong><span>Aktif fırsat ve program</span></div>
            <div class="metric"><strong>2</strong><span>Takip edilen başvuru</span></div>
          </div>
        </div>
        <div class="hero-panel">
          <div class="panel-visual">
            <div class="floating-score"><strong>96%</strong><span>Eşleşme oranı</span></div>
          </div>
          <div class="panel-body">
            ${opportunities.slice(0, 3).map(matchStrip).join("")}
          </div>
        </div>
      </section>
      <section class="section">
        <div class="section-head">
          <div>
            <h2>Öne çıkan fırsatlar</h2>
            <p>Başvuru butonları, kayıt/giriş sonrası sürece bağlanır.</p>
          </div>
          <a class="btn btn-ghost btn-small" href="#/matches">${icon("arrow_forward")}Tümünü gör</a>
        </div>
        <div class="grid grid-3">
          ${opportunities.slice(0, 3).map((item) => opportunityCard(item, true)).join("")}
        </div>
      </section>
    </main>
  `;
  return appShell(content);
}

function matchStrip(item) {
  return `
    <div class="match-strip">
      <span class="logo-tile">${item.company.slice(0, 2).toUpperCase()}</span>
      <span><strong>${item.title}</strong><span>${item.company} · ${item.location}</span></span>
      <span class="score-pill">${item.match}%</span>
    </div>
  `;
}

function renderAuth(mode) {
  const isRegister = mode === "register";
  const content = `
    <main class="page auth-wrap">
      <section class="auth-copy">
        <span class="eyebrow">${icon(isRegister ? "person_add" : "login")}${isRegister ? "Yeni hesap" : "Tekrar hoş geldin"}</span>
        <h1>${isRegister ? "Profilini oluştur, akışların hemen çalışsın" : "Başvurularına ve eşleşmelerine dön"}</h1>
        <p class="lead">Canlıya alınabilecek bu sürümde hesap, başvuru ve mesaj verileri tarayıcı içinde korunur.</p>
        <div class="hero-metrics">
          <div class="metric"><strong>Demo</strong><span>demo@pathmatch.app / demo123</span></div>
          <div class="metric"><strong>İK</strong><span>company@pathmatch.app / demo123</span></div>
          <div class="metric"><strong>Local</strong><span>Veriler cihazda kalır</span></div>
        </div>
      </section>
      <section class="auth-card">
        <div>
          <h2>${isRegister ? "Kayıt ol" : "Giriş yap"}</h2>
          <p class="muted">${isRegister ? "Rolünü seç ve hesabını oluştur." : "Demo hesabı veya kendi hesabınla devam et."}</p>
        </div>
        <form data-form="${isRegister ? "register" : "login"}" class="grid">
          ${isRegister ? `<div class="field"><label>Ad Soyad veya Şirket</label><input name="name" required placeholder="Örn. Inci Mercan" /></div>` : ""}
          <div class="field"><label>E-posta</label><input name="email" type="email" required value="${isRegister ? "" : "demo@pathmatch.app"}" /></div>
          <div class="field"><label>Şifre</label><input name="password" type="password" required value="${isRegister ? "" : "demo123"}" /></div>
          ${isRegister ? `
            <div class="role-grid">
              <label class="role-option"><input type="radio" name="role" value="student" checked /><strong>Öğrenci</strong><span>Başvuru ve yol haritası</span></label>
              <label class="role-option"><input type="radio" name="role" value="company" /><strong>İşveren</strong><span>İlan ve aday takibi</span></label>
              <label class="role-option"><input type="radio" name="role" value="mentor" /><strong>Mentor</strong><span>Mesaj ve profil akışı</span></label>
            </div>
            <div class="field"><label>Kurum</label><input name="institution" placeholder="Üniversite veya şirket" /></div>
          ` : ""}
          <button class="btn btn-primary btn-full" type="submit">${icon(isRegister ? "person_add" : "login")}${isRegister ? "Hesabı oluştur" : "Giriş yap"}</button>
        </form>
        <button class="btn btn-secondary btn-full" data-action="login-demo">${icon("bolt")}Öğrenci demosu ile başla</button>
        <button class="btn btn-ghost btn-full" data-action="login-company">${icon("business_center")}İşveren demosu ile başla</button>
        <p class="muted">${isRegister ? `Hesabın varsa <a href="#/login">giriş yap</a>.` : `Hesabın yoksa <a href="#/register">kayıt ol</a>.`}</p>
      </section>
    </main>
  `;
  return appShell(content);
}

function renderDashboard() {
  return protectedLayout((user) => {
    if (user.role === "company") return renderCompanyInner(user);
    const applications = userApplications();
    const completed = state.completedRoadmap.length;
    const best = opportunities[0];
    return `
      <div class="page-head">
        <div>
          <h2>Merhaba, ${user.name}</h2>
          <p>Bugünkü önerilerin ve aktif başvuruların hazır.</p>
        </div>
        <a class="btn btn-primary" href="#/matches">${icon("travel_explore")}Yeni eşleşme bul</a>
      </div>
      <div class="grid grid-3">
        <div class="card stat-card">${icon("monitoring")}<strong>${applications.length}</strong><span>Aktif başvuru</span></div>
        <div class="card stat-card">${icon("verified")}<strong>${best.match}%</strong><span>En yüksek eşleşme</span></div>
        <div class="card stat-card">${icon("route")}<strong>${completed}/${roadmap.length}</strong><span>Yol haritası ilerlemesi</span></div>
      </div>
      <section class="section">
        <div class="section-head">
          <div><h2>Önerilen fırsatlar</h2><p>Profilindeki yeteneklere göre sıralandı.</p></div>
          <a class="btn btn-ghost btn-small" href="#/matches">${icon("arrow_forward")}Tüm eşleşmeler</a>
        </div>
        <div class="grid">
          ${opportunities.slice(0, 3).map(opportunityCard).join("")}
        </div>
      </section>
      <section class="section">
        <div class="section-head">
          <div><h2>Sıradaki adımlar</h2><p>Bu hafta tamamlanması önerilen görevler.</p></div>
          <a class="btn btn-secondary btn-small" href="#/roadmap">${icon("route")}Yol haritası</a>
        </div>
        <div class="grid">
          ${roadmap.slice(0, 3).map(roadmapRow).join("")}
        </div>
      </section>
    `;
  });
}

function opportunityCard(item, compact = false) {
  const applied = hasApplied(item.id);
  const saved = state.saved.includes(item.id);
  return `
    <article class="card opportunity">
      <div class="opportunity-top">
        <span class="logo-tile">${item.company.slice(0, 2).toUpperCase()}</span>
        <div class="opportunity-title">
          <h3>${item.title}</h3>
          <p>${item.company} · ${item.location} · ${item.salary}</p>
          <div class="tags">
            <span class="tag tag-cyan">${item.match}% eşleşme</span>
            <span class="tag">${item.type}</span>
            <span class="tag tag-purple">${item.department}</span>
          </div>
          ${compact ? "" : `<p class="muted">${item.description}</p>`}
          <div class="tags">${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
        </div>
      </div>
      <div class="grid">
        <a class="btn btn-ghost btn-small" href="#/opportunity/${item.id}">${icon("open_in_new")}Detay</a>
        <button class="btn ${applied ? "btn-secondary" : "btn-primary"} btn-small" data-action="apply" data-id="${item.id}">${icon(applied ? "check_circle" : "send")}${applied ? "Başvuruldu" : "Başvur"}</button>
        <button class="btn btn-ghost btn-small" data-action="save" data-id="${item.id}">${icon(saved ? "bookmark_added" : "bookmark")}${saved ? "Kaydedildi" : "Kaydet"}</button>
      </div>
    </article>
  `;
}

function filteredOpportunities() {
  return opportunities.filter((item) => {
    const hay = `${item.title} ${item.company} ${item.location} ${item.tags.join(" ")}`.toLowerCase();
    const queryMatch = hay.includes(ui.query.toLowerCase());
    const typeMatch = ui.type === "all" || item.type === ui.type;
    const departmentMatch = ui.department === "all" || item.department === ui.department;
    return queryMatch && typeMatch && departmentMatch;
  });
}

function renderMatches() {
  const user = currentUser();
  const filtered = filteredOpportunities();

  const content = `
    <div class="page-head">
      <div>
        <h2>${user?.role === "company" ? "Aday havuzu" : "Akıllı eşleşmeler"}</h2>
        <p>${user?.role === "company" ? "İlan tiplerine göre aday sinyallerini takip et." : "Filtreleri değiştir, fırsatları kaydet veya başvur."}</p>
      </div>
      ${user ? `<a class="btn btn-primary" href="#/${user.role === "company" ? "company" : "applications"}">${icon("assignment")}Takip ekranı</a>` : `<a class="btn btn-primary" href="#/register">${icon("person_add")}Başlamak için kayıt ol</a>`}
    </div>
    <section class="section">
      <div class="filters">
        <div class="field"><label>Arama</label><input data-input="query" value="${escapeAttr(ui.query)}" placeholder="Pozisyon, şirket veya yetenek" /></div>
        <div class="field"><label>Tip</label><select data-input="type">${selectOptions(["all", "Staj", "Trainee", "Part-time"], ui.type, ["Tümü", "Staj", "Trainee", "Part-time"])}</select></div>
        <div class="field"><label>Departman</label><select data-input="department">${selectOptions(["all", "Yazılım", "Tasarım", "Veri", "Pazarlama"], ui.department, ["Tümü", "Yazılım", "Tasarım", "Veri", "Pazarlama"])}</select></div>
      </div>
    </section>
    <div class="grid" id="matches-results">
      ${filtered.length ? filtered.map(opportunityCard).join("") : empty("search_off", "Sonuç bulunamadı", "Filtreleri değiştirip tekrar dene.")}
    </div>
  `;

  return user ? protectedLayout(() => content) : appShell(`<main class="page content">${content}</main>`);
}

function selectOptions(values, selected, labels = values) {
  return values.map((value, index) => `<option value="${value}" ${value === selected ? "selected" : ""}>${labels[index]}</option>`).join("");
}

function escapeAttr(value) {
  return String(value || "").replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function updateMatchesResults() {
  const node = document.querySelector("#matches-results");
  if (!node) return;
  const filtered = filteredOpportunities();
  node.innerHTML = filtered.length
    ? filtered.map(opportunityCard).join("")
    : empty("search_off", "Sonuç bulunamadı", "Filtreleri değiştirip tekrar dene.");
}

function renderApplications() {
  return protectedLayout(() => {
    const rows = userApplications();
    return `
      <div class="page-head">
        <div><h2>Başvurularım</h2><p>Başvuru durumlarını takip et, gerekirse başvurunu geri çek.</p></div>
        <a class="btn btn-primary" href="#/matches">${icon("add")}Yeni başvuru</a>
      </div>
      <section class="section">
        <div class="application-timeline">
          ${rows.length ? rows.map(applicationRow).join("") : empty("assignment", "Henüz başvuru yok", "Eşleşmelerden bir fırsata başvurarak akışı başlat.")}
        </div>
      </section>
    `;
  });
}

function applicationRow(app) {
  const item = opportunityById(app.opportunityId);
  if (!item) return "";
  const doneSteps = app.status === "Görüşme" ? 2 : app.status === "Kabul" ? 4 : 1;
  return `
    <article class="card">
      <div class="section-head">
        <div>
          <h3>${item.title}</h3>
          <p>${item.company} · ${app.date}</p>
        </div>
        <span class="tag ${statusClass(app.status)}">${app.status}</span>
      </div>
      <div class="application-timeline">
        ${item.steps.map((step, index) => `
          <div class="timeline-row">
            <span class="timeline-dot ${index < doneSteps ? "done" : ""}"></span>
            <span>${step}</span>
            <span class="muted">${index < doneSteps ? "Tamamlandı" : "Bekliyor"}</span>
          </div>
        `).join("")}
      </div>
      <div class="hero-actions">
        <a class="btn btn-ghost btn-small" href="#/opportunity/${item.id}">${icon("open_in_new")}Detay</a>
        <button class="btn btn-danger btn-small" data-action="withdraw" data-id="${app.id}">${icon("close")}Geri çek</button>
      </div>
    </article>
  `;
}

function renderOpportunityDetail(id) {
  const item = opportunityById(id);
  if (!item) return appShell(`<main class="page">${empty("error", "Fırsat bulunamadı", "Listeye dönüp başka bir fırsat seç.")}</main>`);

  const applied = hasApplied(item.id);
  const content = `
    <div class="detail-hero">
      <div class="grid">
        <a class="btn btn-ghost btn-small" href="#/matches" style="width: fit-content;">${icon("arrow_back")}Eşleşmelere dön</a>
        <div>
          <h2>${item.title}</h2>
          <p class="muted">${item.company} · ${item.location} · ${item.salary}</p>
        </div>
        <div class="tags">
          <span class="tag tag-cyan">${item.match}% eşleşme</span>
          <span class="tag tag-purple">${item.department}</span>
          <span class="tag tag-green">${item.type}</span>
        </div>
        <p class="muted">${item.description}</p>
      </div>
      <div class="card">
        <strong>Başvuru uyumu</strong>
        <div class="progress-track"><div class="progress-fill" style="width:${item.match}%"></div></div>
        <button class="btn ${applied ? "btn-secondary" : "btn-primary"}" data-action="apply" data-id="${item.id}">${icon(applied ? "check_circle" : "send")}${applied ? "Başvuruldu" : "Hemen başvur"}</button>
        <button class="btn btn-ghost" data-action="save" data-id="${item.id}">${icon(state.saved.includes(item.id) ? "bookmark_added" : "bookmark")}Kaydet</button>
      </div>
    </div>
    <section class="section">
      <h2>Gereksinimler</h2>
      <div class="grid grid-3">
        ${item.requirements.map((req) => `<div class="card">${icon("task_alt")}<strong>${req}</strong><p class="muted">Profilinle karşılaştırılarak eşleşme skoruna yansır.</p></div>`).join("")}
      </div>
    </section>
    <section class="section">
      <h2>Süreç</h2>
      <div class="application-timeline">
        ${item.steps.map((step, index) => `<div class="timeline-row"><span class="timeline-dot ${index === 0 ? "done" : ""}"></span><span>${step}</span><span class="muted">${index === 0 ? "Hazır" : "Sırada"}</span></div>`).join("")}
      </div>
    </section>
  `;

  return currentUser() ? protectedLayout(() => content) : appShell(`<main class="page content">${content}</main>`);
}

function renderRoadmap() {
  return protectedLayout(() => {
    const percent = Math.round((state.completedRoadmap.length / roadmap.length) * 100);
    return `
      <div class="page-head">
        <div><h2>Kariyer yol haritası</h2><p>Görevleri tamamladıkça panelindeki ilerleme güncellenir.</p></div>
        <span class="score-pill">${percent}%</span>
      </div>
      <section class="section">
        <div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div>
        <div class="grid">
          ${roadmap.map(roadmapRow).join("")}
        </div>
      </section>
    `;
  });
}

function roadmapRow(item) {
  const done = state.completedRoadmap.includes(item.id);
  return `
    <article class="card roadmap-item">
      <button class="check ${done ? "done" : ""}" data-action="roadmap-toggle" data-id="${item.id}" aria-label="${item.title}">${icon("check")}</button>
      <span><strong>${item.title}</strong><p class="muted">${item.note}</p></span>
      <span class="tag ${done ? "tag-green" : "tag-orange"}">${done ? "Tamam" : item.area}</span>
    </article>
  `;
}

function renderMessages() {
  return protectedLayout(() => {
    const keys = Object.keys(state.messages);
    if (!keys.includes(ui.selectedConversation)) ui.selectedConversation = keys[0];
    const selected = state.messages[ui.selectedConversation];
    return `
      <div class="page-head">
        <div><h2>Mesajlar</h2><p>Mentor, şirket ve kariyer ekibi görüşmeleri.</p></div>
      </div>
      <div class="messages-layout">
        <aside class="conversation-list">
          ${keys.map((key) => `
            <button class="conversation-button ${key === ui.selectedConversation ? "active" : ""}" data-action="conversation" data-id="${key}">
              <strong>${state.messages[key].title}</strong>
              <span>${state.messages[key].messages.at(-1)?.text || state.messages[key].subtitle}</span>
            </button>
          `).join("")}
        </aside>
        <section class="chat">
          <div class="chat-head"><h3>${selected.title}</h3><p class="muted">${selected.subtitle}</p></div>
          <div class="chat-thread">
            ${selected.messages.map((message) => `<div class="bubble ${message.from === "me" ? "me" : ""}">${escapeHtml(message.text)}</div>`).join("")}
          </div>
          <form class="chat-form" data-form="message">
            <input name="message" placeholder="Mesaj yaz" required />
            <button class="btn btn-primary" type="submit">${icon("send")}Gönder</button>
          </form>
        </section>
      </div>
    `;
  });
}

function renderProfile() {
  return protectedLayout((user) => `
    <div class="page-head">
      <div><h2>Profilim</h2><p>Eşleşme motorunda kullanılan bilgileri düzenle.</p></div>
      <button class="btn btn-ghost" data-action="demo-reset">${icon("restart_alt")}Demo sıfırla</button>
    </div>
    <section class="section">
      <form class="grid grid-2" data-form="profile">
        <div class="field"><label>Ad Soyad / Şirket</label><input name="name" required value="${escapeAttr(user.name)}" /></div>
        <div class="field"><label>Unvan</label><input name="title" value="${escapeAttr(user.title)}" /></div>
        <div class="field"><label>Kurum</label><input name="institution" value="${escapeAttr(user.institution)}" /></div>
        <div class="field"><label>Konum</label><input name="location" value="${escapeAttr(user.location)}" /></div>
        <div class="field"><label>Portfolyo</label><input name="portfolio" value="${escapeAttr(user.portfolio)}" /></div>
        <div class="field"><label>Yeni yetenek</label><input name="skill" placeholder="Örn. Next.js" /></div>
        <div class="field" style="grid-column:1/-1;"><label>Hedef</label><textarea name="goal">${escapeHtml(user.goal || "")}</textarea></div>
        <div class="hero-actions" style="grid-column:1/-1;">
          <button class="btn btn-primary" type="submit">${icon("save")}Kaydet</button>
          <span class="tags">${user.skills.map((skill) => `<span class="tag">${skill}</span>`).join("")}</span>
        </div>
      </form>
    </section>
  `);
}

function renderCompany() {
  return protectedLayout(renderCompanyInner);
}

function renderCompanyInner(user) {
  const activeApplications = state.applications.length;
  return `
    <div class="page-head">
      <div><h2>İşveren paneli</h2><p>İlanlarını, aday sinyallerini ve görüşme akışını yönet.</p></div>
      <a class="btn btn-secondary" href="#/messages">${icon("chat")}Aday mesajları</a>
    </div>
    <div class="grid grid-3">
      <div class="card stat-card">${icon("campaign")}<strong>${state.companyJobs.length}</strong><span>İlan</span></div>
      <div class="card stat-card">${icon("groups")}<strong>${state.companyJobs.reduce((sum, job) => sum + Number(job.applicants || 0), 0)}</strong><span>Aday</span></div>
      <div class="card stat-card">${icon("assignment")}<strong>${activeApplications}</strong><span>Platform başvurusu</span></div>
    </div>
    <section class="section">
      <div class="section-head"><div><h2>İlan oluştur</h2><p>Yeni ilan local olarak listeye eklenir.</p></div></div>
      <form class="company-form" data-form="job">
        <div class="field"><label>Pozisyon</label><input name="title" required placeholder="Örn. UI Developer Intern" /></div>
        <div class="field"><label>Konum</label><input name="location" required placeholder="Istanbul, Hibrit" /></div>
        <div class="field"><label>Departman</label><select name="department">${selectOptions(["Yazılım", "Tasarım", "Veri", "Pazarlama"], "Yazılım")}</select></div>
        <div class="field"><label>Durum</label><select name="status">${selectOptions(["Yayında", "Taslak"], "Yayında")}</select></div>
        <button class="btn btn-primary span-2" type="submit">${icon("add")}İlanı ekle</button>
      </form>
    </section>
    <section class="section">
      <div class="section-head"><div><h2>İlanlar</h2><p>${user.institution || user.name} hesabındaki açık pozisyonlar.</p></div></div>
      <div class="grid">
        ${state.companyJobs.map((job) => `
          <article class="card opportunity">
            <div class="opportunity-top">
              <span class="icon-tile">${icon("business_center")}</span>
              <span class="opportunity-title">
                <h3>${job.title}</h3>
                <p>${job.location} · ${job.department}</p>
                <span class="tags"><span class="tag ${statusClass(job.status)}">${job.status}</span><span class="tag">${job.applicants} aday</span></span>
              </span>
            </div>
            <button class="btn btn-danger btn-small" data-action="job-remove" data-id="${job.id}">${icon("delete")}Kaldır</button>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function empty(ico, title, note) {
  return `<div class="empty-state">${icon(ico)}<h2>${title}</h2><p class="muted">${note}</p></div>`;
}

function render() {
  const path = route();
  let html;

  if (path === "/" || path === "") html = renderLanding();
  else if (path === "/login") html = renderAuth("login");
  else if (path === "/register") html = renderAuth("register");
  else if (path === "/dashboard") html = renderDashboard();
  else if (path === "/matches") html = renderMatches();
  else if (path === "/applications") html = renderApplications();
  else if (path === "/roadmap") html = renderRoadmap();
  else if (path === "/messages") html = renderMessages();
  else if (path === "/profile") html = renderProfile();
  else if (path === "/company") html = renderCompany();
  else if (path.startsWith("/opportunity/")) html = renderOpportunityDetail(path.split("/").at(-1));
  else html = appShell(`<main class="page">${empty("explore_off", "Sayfa bulunamadı", "Ana sayfaya dönüp tekrar dene.")}</main>`);

  document.querySelector("#app").innerHTML = html;
  window.scrollTo(0, 0);
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;
  const id = target.dataset.id;

  if (action === "login-demo") {
    state.currentUserEmail = "demo@pathmatch.app";
    saveState();
    toast("Öğrenci demo hesabı açıldı.");
    go("/dashboard");
  }

  if (action === "login-company") {
    state.currentUserEmail = "company@pathmatch.app";
    saveState();
    toast("İşveren demo hesabı açıldı.");
    go("/company");
  }

  if (action === "logout") {
    state.currentUserEmail = null;
    saveState();
    toast("Çıkış yapıldı.");
    go("/");
  }

  if (action === "demo-reset") {
    state = clone(initialState);
    ui = { query: "", type: "all", department: "all", selectedConversation: "mentor-aylin" };
    saveState();
    toast("Demo verileri sıfırlandı.");
    render();
  }

  if (action === "apply") {
    const user = currentUser();
    if (!user) {
      toast("Başvuru için önce giriş yap.");
      go("/login");
      return;
    }
    if (!hasApplied(id)) {
      state.applications.unshift({
        id: `app-${Date.now()}`,
        opportunityId: id,
        userEmail: user.email,
        status: "İncelemede",
        date: new Date().toISOString().slice(0, 10)
      });
      if (!state.completedRoadmap.includes("apply")) state.completedRoadmap.push("apply");
      saveState();
      toast("Başvuru kaydedildi.");
    } else {
      toast("Bu ilana zaten başvurdun.");
    }
    render();
  }

  if (action === "save") {
    const user = currentUser();
    if (!user) {
      toast("Kaydetmek için önce giriş yap.");
      go("/login");
      return;
    }
    state.saved = state.saved.includes(id) ? state.saved.filter((item) => item !== id) : [...state.saved, id];
    saveState();
    toast(state.saved.includes(id) ? "Fırsat kaydedildi." : "Fırsat kayıttan çıkarıldı.");
    render();
  }

  if (action === "withdraw") {
    state.applications = state.applications.filter((item) => item.id !== id);
    saveState();
    toast("Başvuru geri çekildi.");
    render();
  }

  if (action === "roadmap-toggle") {
    state.completedRoadmap = state.completedRoadmap.includes(id)
      ? state.completedRoadmap.filter((item) => item !== id)
      : [...state.completedRoadmap, id];
    saveState();
    render();
  }

  if (action === "conversation") {
    ui.selectedConversation = id;
    state.selectedConversation = id;
    saveState();
    render();
  }

  if (action === "job-remove") {
    state.companyJobs = state.companyJobs.filter((job) => job.id !== id);
    saveState();
    toast("İlan kaldırıldı.");
    render();
  }
});

document.addEventListener("input", (event) => {
  const input = event.target.closest("[data-input]");
  if (!input) return;
  ui[input.dataset.input] = input.value;
  updateMatchesResults();
});

document.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-form]");
  if (!form) return;
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  const formType = form.dataset.form;

  if (formType === "login") {
    const user = state.users.find((item) => item.email === data.email && item.password === data.password);
    if (!user) {
      toast("E-posta veya şifre hatalı.");
      return;
    }
    state.currentUserEmail = user.email;
    saveState();
    toast("Giriş başarılı.");
    go(user.role === "company" ? "/company" : "/dashboard");
  }

  if (formType === "register") {
    if (state.users.some((item) => item.email === data.email)) {
      toast("Bu e-posta zaten kayıtlı.");
      return;
    }
    const user = {
      email: data.email,
      password: data.password,
      name: data.name,
      role: data.role,
      institution: data.institution || "",
      title: data.role === "company" ? "İşveren hesabı" : "Kariyer adayı",
      location: "Türkiye",
      skills: data.role === "company" ? ["İlan", "Aday", "Görüşme"] : ["React", "Figma"],
      portfolio: "",
      goal: ""
    };
    state.users.push(user);
    state.currentUserEmail = user.email;
    saveState();
    toast("Hesap oluşturuldu.");
    go(user.role === "company" ? "/company" : "/dashboard");
  }

  if (formType === "profile") {
    const user = currentUser();
    if (!user) return;
    user.name = data.name;
    user.title = data.title;
    user.institution = data.institution;
    user.location = data.location;
    user.portfolio = data.portfolio;
    user.goal = data.goal;
    if (data.skill && !user.skills.includes(data.skill)) user.skills.push(data.skill);
    if (!state.completedRoadmap.includes("profile")) state.completedRoadmap.push("profile");
    saveState();
    toast("Profil güncellendi.");
    render();
  }

  if (formType === "message") {
    const text = data.message.trim();
    if (!text) return;
    state.messages[ui.selectedConversation].messages.push({ from: "me", text });
    if (!state.completedRoadmap.includes("message")) state.completedRoadmap.push("message");
    saveState();
    form.reset();
    render();
    toast("Mesaj gönderildi.");
  }

  if (formType === "job") {
    state.companyJobs.unshift({
      id: `job-${Date.now()}`,
      title: data.title,
      location: data.location,
      department: data.department,
      status: data.status,
      applicants: 0
    });
    saveState();
    toast("İlan eklendi.");
    render();
  }
});

window.addEventListener("hashchange", render);
render();




