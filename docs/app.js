const STORAGE_KEY = "pathmatch-live-state-v1";

const opportunities = [  {
    id: "backend-intern",
    title: "Backend Developer Intern",
    company: "NovaTech",
    location: "Istanbul, Remote",
    type: "Staj",
    department: "Yazılım",
    salary: "20.000 TL",
    match: 92,
    tags: ["Node.js", "API", "MongoDB"],
    description: "API geliştirme süreçlerine katılacak stajyer aranıyor.",
    requirements: ["Node.js temel", "Veritabanı mantığı", "Git"],
    steps: ["Başvuru", "Teknik Test", "Görüşme", "Teklif"]
  },
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
      name: "Sidal Polat",
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
      const next = { ...clone(initialState), ...stored };
      next.users = next.users.map((user) => (
        user.email === "demo@pathmatch.app" && user.name === "Inci Mercan"
          ? { ...user, name: "Sidal Polat" }
          : user
      ));
      return next;
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

function mobileNavItems(user) {
  if (user?.role === "company") return navItems(user);

  return [
    ["/dashboard", "dashboard", "Panel"],
    ["/matches", "travel_explore", "Eşleş"],
    ["/applications", "assignment", "Başvuru"],
    ["/roadmap", "route", "Yol"],
    ["/messages", "chat", "Mesaj"],
    ["/profile", "person", "Profil"]
  ];
}


  
  function appShell(content, options = {}) {
    const user = currentUser();
    
    if (!user) {
        return `
        <div class="bg-background text-on-background font-body-md antialiased min-h-screen flex flex-col overflow-x-hidden">
            <header class="sticky top-0 z-50 flex items-center justify-between px-lg py-md bg-surface-bright/80 backdrop-blur-md border-b border-outline-variant/30">
                <a href="#/" class="flex items-center gap-2">
                    <h1 class="font-h3 text-h3 text-primary tracking-tight">PathMatch</h1>
                </a>
                <nav class="hidden md:flex items-center gap-lg">
                    <a href="#/login" class="font-button text-button text-on-surface-variant hover:text-primary transition-colors">Giriş Yap</a>
                    <a href="#/register" class="py-sm px-lg bg-primary text-on-primary rounded-full font-button text-button hover:opacity-90 transition-opacity">Kayıt Ol</a>
                </nav>
            </header>
            <main class="flex-1">
                ${content}
            </main>
        </div>`;
    }
    
    return `
    <div class="bg-background text-on-background font-body-md antialiased min-h-screen flex overflow-hidden">
        ${sidebar(user)}
        <main class="flex-1 flex flex-col h-screen overflow-y-auto bg-surface relative">
             <header class="sticky top-0 z-30 flex justify-between items-center w-full px-lg py-sm bg-surface-bright/80 backdrop-blur-md border-b border-outline-variant/20">
                 <button class="md:hidden text-on-background p-2"><span class="material-symbols-outlined">menu</span></button>
                 <div class="flex items-center gap-4 ml-auto">
                     <div class="flex items-center gap-3 bg-surface-container-lowest py-1 px-3 rounded-full border border-outline-variant/30 cursor-pointer hover:bg-surface-container/50 transition-colors">
                         <div class="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-button text-sm">${initials(user.name)}</div>
                         <div class="hidden md:block text-left"><p class="font-label-bold text-label-bold text-on-surface leading-none">${user.name}</p></div>
                     </div>
                 </div>
             </header>
             <div class="p-lg md:p-xl space-y-xl max-w-[1400px] w-full mx-auto">
                ${content}
             </div>
        </main>
    </div>`;
  }

  
  function sidebar(user) {
    const active = route();
    const nav = navItems(user);
    const homePath = user.role === "company" ? "/company" : "/dashboard";
    
    return `
      <aside class="hidden md:flex flex-col h-screen w-64 border-r border-outline-variant/30 sticky top-0 bg-surface-bright/80 backdrop-blur-lg p-4 space-y-2 shrink-0 z-40">
          <div class="mb-8 px-2 pt-2">
              <a href="#${homePath}"><h1 class="font-h3 text-h3 text-primary tracking-tighter">PathMatch</h1></a>
              <p class="font-body-sm text-body-sm text-on-surface-variant">${roleLabel(user.role)} Çalışma Alanı</p>
          </div>
          <nav class="flex-1 space-y-1">
              ${nav.map(([path, ico, label]) => `
                  <a class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-transform duration-200 ${active.startsWith(path) ? 'bg-surface-container-lowest text-secondary shadow-sm border border-outline-variant/30' : 'text-on-surface-variant hover:bg-surface-container/50'}" href="#${path}">
                      <span class="material-symbols-outlined">${ico}</span>
                      <span class="font-button text-button">${label}</span>
                  </a>
              `).join('')}
          </nav>
          <div class="mt-auto space-y-1 pb-4 border-t border-outline-variant/30 pt-4">
              <button data-action="demo-reset" class="flex items-center w-full gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container/50 rounded-lg transition-transform duration-200">
                  <span class="material-symbols-outlined">restart_alt</span>
                  <span class="font-button text-button">Demo Sıfırla</span>
              </button>
              <button data-action="logout" class="flex items-center w-full gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container/50 rounded-lg transition-transform duration-200">
                  <span class="material-symbols-outlined">logout</span>
                  <span class="font-button text-button">Çıkış</span>
              </button>
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
        <div class="p-lg md:p-2xl max-w-[1400px] mx-auto">
            ${inner(user)}
        </div>
    `);
                  <div class="flex flex-col sm:flex-row items-center gap-4 pt-sm w-full sm:w-auto">
                      <a href="#/register" class="w-full sm:w-auto px-xl py-4 bg-primary text-on-primary rounded-full font-button text-button shadow-lg shadow-primary/20 hover:-translate-y-1 transition-transform duration-300">
                          Hemen Başla
                      </a>
                      <button data-action="demo-company" class="w-full sm:w-auto px-xl py-4 bg-surface-container-lowest text-on-surface border-2 border-outline-variant/30 rounded-full font-button text-button hover:bg-surface-container/50 transition-colors">
                          İşveren Görünümü
                      </button>
                  </div>
                  <div class="pt-xl flex gap-xl justify-center items-center opacity-70 flex-wrap">
                      <div class="flex flex-col">
                          <span class="font-h3 text-h3 text-primary">%94</span>
                          <span class="font-body-sm text-body-sm">Başarı Oranı</span>
                      </div>
                      <div class="w-px h-8 bg-outline-variant"></div>
                      <div class="flex flex-col">
                          <span class="font-h3 text-h3 text-primary">12.000+</span>
                          <span class="font-body-sm text-body-sm">Aktif Öğrenci</span>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    `, { hideTopbar: false });
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
          ${isRegister ? `<div class="field"><label>Ad Soyad veya Şirket</label><input name="name" required placeholder="Örn. Sidal Polat" /></div>` : ""}
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
        <div class="mb-lg">
          <h2 class="font-h2 text-h2 text-on-surface tracking-tight">Merhaba, ${user.name} 👋</h2>
          <p class="font-body-md text-body-md text-on-surface-variant mt-2">Bugünkü kariyer özetin ve sana özel fırsatlar.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-md mb-xl">
            <div class="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 hover:border-secondary-fixed/50 transition-colors">
                <div class="flex items-center gap-3 mb-2">
                    <div class="w-10 h-10 rounded-full bg-secondary-fixed/20 flex items-center justify-center text-on-secondary-container">
                        <span class="material-symbols-outlined">assignment</span>
                    </div>
                    <span class="font-label-bold text-on-surface-variant">Aktif Başvuru</span>
                </div>
                <div class="text-3xl font-h2 text-on-surface">${applications.length}</div>
            </div>
            <div class="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 hover:border-secondary-fixed/50 transition-colors">
                <div class="flex items-center gap-3 mb-2">
                    <div class="w-10 h-10 rounded-full bg-tertiary-fixed/20 flex items-center justify-center text-on-tertiary-container">
                        <span class="material-symbols-outlined">stars</span>
                    </div>
                    <span class="font-label-bold text-on-surface-variant">En Yüksek Eşleşme</span>
                </div>
                <div class="text-3xl font-h2 text-on-surface">${best.match}%</div>
            </div>
            <div class="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 hover:border-secondary-fixed/50 transition-colors">
                <div class="flex items-center gap-3 mb-2">
                    <div class="w-10 h-10 rounded-full bg-primary-fixed/20 flex items-center justify-center text-on-primary-fixed-variant">
                        <span class="material-symbols-outlined">trending_up</span>
                    </div>
                    <span class="font-label-bold text-on-surface-variant">Yol Haritası</span>
                </div>
                <div class="text-3xl font-h2 text-on-surface">${completed}/${roadmap.length}</div>
            </div>
        </div>
        
        <div class="flex justify-between items-end mb-md">
            <div>
                <h3 class="font-h3 text-xl text-on-surface">Senin için Eşleşen Fırsatlar</h3>
            </div>
            <a href="#/matches" class="text-secondary font-button text-sm hover:underline">Tümünü Gör</a>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md mb-xl">
            ${opportunities.slice(0, 3).map(item => opportunityCard(item)).join('')}
        </div>
      `;
    });
  }

  function opportunityCard(item, compact = false) {
  const applied = hasApplied(item.id);
  const saved = state.saved.includes(item.id);
  return `
      <article class="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 flex flex-col gap-4 hover:border-secondary-fixed/50 transition-colors">
        <div class="flex items-start gap-3">
          <div class="w-12 h-12 shrink-0 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface font-h3 text-xl tracking-tighter">
            ${item.company.slice(0, 2).toUpperCase()}
          </div>
          <div class="min-w-0 flex-1">
            <h3 class="font-button text-on-surface truncate">${item.title}</h3>
            <p class="font-body-sm text-on-surface-variant mb-2 truncate">${item.company} · ${item.location} · ${item.salary}</p>
            <div class="flex flex-wrap gap-2 mb-2">
              <span class="inline-flex items-center px-2 py-1 rounded-md text-[11px] font-label-bold bg-secondary-fixed/20 text-on-secondary-container">${item.match}% eşleşme</span>
              <span class="inline-flex items-center px-2 py-1 rounded-md text-[11px] font-label-bold bg-surface-container-high text-on-surface-variant">${item.type}</span>
              <span class="inline-flex items-center px-2 py-1 rounded-md text-[11px] font-label-bold bg-tertiary-fixed/20 text-on-tertiary-container">${item.department}</span>
            </div>
            ${compact ? "" : `<p class="font-body-sm text-on-surface-variant line-clamp-3 mb-3">${item.description}</p>`}
            <div class="flex flex-wrap gap-2">
              ${item.tags.map((tag) => `<span class="inline-flex items-center px-2 py-1 rounded-md text-[11px] font-label-bold bg-surface-container text-on-surface-variant">${tag}</span>`).join("")}
            </div>
          </div>
        </div>
        <div class="mt-auto pt-3 border-t border-outline-variant/30 grid grid-cols-3 gap-2">
          <a class="flex justify-center items-center gap-1 py-1.5 rounded-lg font-button text-xs text-on-surface hover:bg-surface-container-high transition-colors" href="#/opportunity/${item.id}">
            ${icon("open_in_new")} Detay
          </a>
          <button class="flex justify-center items-center gap-1 py-1.5 rounded-lg font-button text-xs ${applied ? "bg-secondary-fixed/20 text-secondary" : "bg-primary text-on-primary hover:bg-primary/90"} transition-colors" data-action="apply" data-id="${item.id}">
            ${icon(applied ? "check_circle" : "send")} ${applied ? "Uygulandı" : "Başvur"}
          </button>
          <button class="flex justify-center items-center gap-1 py-1.5 rounded-lg font-button text-xs text-on-surface hover:bg-surface-container-high transition-colors" data-action="save" data-id="${item.id}">
            ${icon(saved ? "bookmark_added" : "bookmark")} ${saved ? "Kayıtlı" : "Kaydet"}
          </button>

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
    return protectedLayout((user) => {
      const items = filteredOpportunities();
      return `
        <div class="mb-lg">
            <h2 class="font-h2 text-h2 text-on-surface tracking-tight">Cepte Fırsatlar</h2>
            <p class="font-body-md text-body-md text-on-surface-variant mt-2">Profili ve yeteneklerine en uygun kariyer eşleşmeleri.</p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-xl">
            <aside class="flex flex-col gap-md">
                <div class="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30">
                    <h3 class="font-h3 text-on-surface mb-sm">Filtreler</h3>
                    <form id="filters-form" data-form="filters" class="space-y-sm">
                        <div>
                            <label class="block font-label-bold text-on-surface-variant mb-1">Arama</label>
                            <input name="search" placeholder="Pozisyon, şirket veya kelime..." value="${state.filters.search}" class="w-full rounded-lg border-outline-variant/50 focus:border-secondary focus:ring-secondary/20 font-body-sm bg-surface-bright placeholder:text-on-surface-variant/50"/>
                        </div>
                        <div>
                            <label class="block font-label-bold text-on-surface-variant mb-1">Tür</label>
                            <select name="type" class="w-full rounded-lg border-outline-variant/50 focus:border-secondary focus:ring-secondary/20 font-body-sm bg-surface-bright">
                                ${selectOptions(["Hepsi", "Staj", "Trainee", "Yeni Mezun"], state.filters.type)}
                            </select>
                        </div>
                        <div>
                            <label class="block font-label-bold text-on-surface-variant mb-1">Departman</label>
                            <select name="department" class="w-full rounded-lg border-outline-variant/50 focus:border-secondary focus:ring-secondary/20 font-body-sm bg-surface-bright">
                                ${selectOptions(["Hepsi", "Yazılım", "Tasarım", "Veri", "Pazarlama"], state.filters.department)}
                            </select>
                        </div>
                    </form>
                </div>
            </aside>
            <div class="lg:col-span-3">
                <div class="flex justify-between items-center mb-md">
                    <span class="font-label-bold text-on-surface-variant">${items.length} Fırsat Bulundu</span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-md" id="matches-results">
                    ${items.map(i => opportunityCard(i)).join('')}
                </div>
            </div>
        </div>
      `;
    });
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
    const opp = opportunityById(app.opportunityId);
    const steps = opp.steps;
    const items = steps.map((step, idx) => {
        const isPast = idx <= app.step;
        const isCurrent = idx === app.step;
        return `
          <div class="flex flex-col items-center">
              <div class="w-6 h-6 rounded-full ${isCurrent ? 'bg-secondary text-on-secondary shadow-md ring-4 ring-secondary/20' : (isPast ? 'bg-secondary-fixed text-on-secondary-fixed' : 'bg-surface border-2 border-outline-variant/30')} flex items-center justify-center text-xs relative z-10">
                  ${isPast ? '<span class="material-symbols-outlined text-[14px]">check</span>' : idx + 1}
              </div>
              <span class="mt-2 font-label-bold text-xs ${isPast ? 'text-on-surface' : 'text-on-surface-variant'}">${step}</span>
          </div>
        `;
    }).join('');

    return `
      <div class="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 relative overflow-hidden group">
          <div class="absolute top-0 left-0 w-1 h-full bg-secondary-fixed"></div>
          <div class="flex justify-between items-start">
              <div>
                  <h3 class="font-h3 text-lg text-on-surface">${opp.title}</h3>
                  <p class="font-body-sm text-on-surface-variant flex items-center gap-1 mt-1">
                      <span class="material-symbols-outlined text-[16px]">business</span> ${opp.company}
                  </p>
              </div>
          </div>
          <div class="mt-xl relative">
              <div class="absolute left-0 top-3 w-full h-0.5 bg-outline-variant/30"></div>
              <div class="absolute left-0 top-3 h-0.5 bg-secondary w-1/2"></div>
              <div class="relative flex justify-between">
                  ${items}
              </div>
          </div>
      </div>
    `;
  }

  function renderApplications() {
    return protectedLayout((user) => {
      const apps = userApplications();
      return `
        <div class="mb-lg">
            <h2 class="font-h2 text-h2 text-on-surface tracking-tight">Başvurularım</h2>
            <p class="font-body-md text-on-surface-variant mt-2">Tüm süreçlerini ve değerlendirme aşamalarını buradan takip et.</p>
        </div>
        <div class="flex gap-2 mb-lg border-b border-outline-variant/30 overflow-x-auto no-scrollbar">
            <button class="px-md py-sm font-button text-button border-b-2 border-secondary text-secondary whitespace-nowrap">Aktif Süreçler</button>
            <button class="px-md py-sm font-button text-button border-b-2 border-transparent text-on-surface-variant hover:text-on-surface whitespace-nowrap">Bekleyenler</button>
            <button class="px-md py-sm font-button text-button border-b-2 border-transparent text-on-surface-variant hover:text-on-surface whitespace-nowrap">Tamamlananlar</button>
        </div>
        ${apps.length === 0 ? `
            <div class="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-xl flex flex-col items-center text-center">
              <span class="material-symbols-outlined text-4xl text-on-surface-variant/50 mb-3">inbox</span>
              <h3 class="font-h3 text-on-surface mb-2">Henüz Aktif Başvurunuz Yok</h3>
              <p class="font-body-sm text-on-surface-variant mb-md max-w-sm">Size en uygun pozisyonları bulup hemen sürece dahil olabilirsiniz.</p>
              <a href="#/matches" class="px-lg py-sm bg-primary text-on-primary rounded-lg font-button text-sm hover:opacity-90 transition-opacity">
                  Fırsatları Keşfet
              </a>
            </div>
        ` : `
            <div class="space-y-md">
                ${apps.map(applicationRow).join('')}
            </div>
        `}
      `;
    });
  }

  function renderProfile() {
    return protectedLayout((user) => {
      return `
        <div class="mb-lg">
            <h2 class="font-h2 text-h2 text-on-surface tracking-tight">Profil & Ayarlar</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-xl">
            <div class="lg:col-span-2 space-y-md">
                <div class="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-md flex items-center gap-xl relative overflow-hidden">
                    <div class="w-32 h-32 rounded-full overflow-hidden bg-primary-container text-on-primary border-4 border-surface shadow-sm shrink-0 flex items-center justify-center font-h1">
                        ${initials(user.name)}
                    </div>
                    <div class="flex-grow z-10">
                        <h2 class="font-h2 text-2xl text-on-surface tracking-tight">${user.name}</h2>
                        <p class="font-body-sm text-on-surface-variant mt-1 flex items-center gap-1">
                            <span class="material-symbols-outlined text-[16px]">school</span> ${user.institution || "Öğrenci"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
      `;
    });
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
      <div class="mb-lg flex justify-between items-end">
        <div>
          <h2 class="font-h2 text-h2 text-on-surface tracking-tight">İşveren paneli</h2>
          <p class="font-body-md text-body-md text-on-surface-variant mt-2">İlanlarını, aday sinyallerini ve görüşme akışını yönet.</p>
        </div>
        <a class="flex items-center gap-2 px-xl py-2 bg-secondary-fixed/20 text-secondary rounded-full font-button text-button hover:bg-secondary-fixed transition-colors" href="#/messages">${icon("chat")}Aday mesajları</a>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-md mb-xl">
        <div class="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30">
          <div class="flex items-center gap-3 mb-2"><div class="w-10 h-10 rounded-full bg-secondary-fixed/20 flex items-center justify-center text-secondary">${icon("campaign")}</div><span class="font-label-bold text-on-surface-variant">İlan</span></div>
          <strong class="text-3xl font-h2 text-on-surface">${state.companyJobs.length}</strong>
        </div>
        <div class="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30">
          <div class="flex items-center gap-3 mb-2"><div class="w-10 h-10 rounded-full bg-tertiary-fixed/20 flex items-center justify-center text-tertiary">${icon("groups")}</div><span class="font-label-bold text-on-surface-variant">Aday</span></div>
          <strong class="text-3xl font-h2 text-on-surface">${state.companyJobs.reduce((sum, job) => sum + Number(job.applicants || 0), 0)}</strong>
        </div>
        <div class="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30">
          <div class="flex items-center gap-3 mb-2"><div class="w-10 h-10 rounded-full bg-primary-fixed/20 flex items-center justify-center text-primary">${icon("assignment")}</div><span class="font-label-bold text-on-surface-variant">Platform başvurusu</span></div>
          <strong class="text-3xl font-h2 text-on-surface">${activeApplications}</strong>
        </div>
      </div>
      <section class="mb-xl">
        <div class="mb-md">
          <h2 class="font-h3 text-xl text-on-surface">İlan oluştur</h2>
          <p class="text-sm text-on-surface-variant">Yeni ilan local olarak listeye eklenir.</p>
        </div>
        <form class="grid grid-cols-1 md:grid-cols-2 gap-md bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/30" data-form="job">
          <div class="flex flex-col gap-2"><label class="font-label-bold text-on-surface-variant">Pozisyon</label><input class="px-3 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary/50 outline-none" name="title" required placeholder="Örn. UI Developer Intern" /></div>
          <div class="flex flex-col gap-2"><label class="font-label-bold text-on-surface-variant">Konum</label><input class="px-3 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary/50 outline-none" name="location" required placeholder="Istanbul, Hibrit" /></div>
          <div class="flex flex-col gap-2"><label class="font-label-bold text-on-surface-variant">Departman</label><select class="px-3 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary/50 outline-none" name="department">${selectOptions(["Yazılım", "Tasarım", "Veri", "Pazarlama"], "Yazılım")}</select></div>
          <div class="flex flex-col gap-2"><label class="font-label-bold text-on-surface-variant">Durum</label><select class="px-3 py-2 rounded-lg border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary/50 outline-none" name="status">${selectOptions(["Yayında", "Taslak"], "Yayında")}</select></div>
          <button class="md:col-span-2 mt-2 flex justify-center items-center gap-2 py-3 bg-primary text-on-primary rounded-lg font-button hover:bg-primary/90 transition-colors" type="submit">${icon("add")}İlanı ekle</button>
        </form>
      </section>
      <section>
        <div class="mb-md">
          <h2 class="font-h3 text-xl text-on-surface">İlanlar</h2>
          <p class="text-sm text-on-surface-variant">${user.institution || user.name} hesabındaki açık pozisyonlar.</p>
        </div>
        <div class="flex flex-col gap-md">
          ${state.companyJobs.map((job) => `
            <article class="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 flex items-center justify-between gap-4">
              <div class="flex items-start gap-3">
                <div class="w-12 h-12 shrink-0 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface">
                  ${icon("business_center")}
                </div>
                <div class="min-w-0">
                  <h3 class="font-button text-on-surface">${job.title}</h3>
                  <p class="font-body-sm text-on-surface-variant">${job.location} · ${job.department}</p>
                  <div class="flex gap-2 mt-1">
                    <span class="inline-flex items-center px-2 py-1 rounded-md text-[11px] font-label-bold bg-surface-container text-on-surface-variant">${job.status}</span>
                    <span class="inline-flex items-center px-2 py-1 rounded-md text-[11px] font-label-bold bg-surface-container-high text-on-surface-variant">${job.applicants} aday</span>
                  </div>
                </div>
              </div>
              <button class="flex items-center gap-1 px-3 py-2 rounded-lg font-button text-sm bg-error-container text-on-error-container hover:bg-error hover:text-on-error transition-colors" data-action="job-remove" data-id="${job.id}">
                ${icon("delete")} Kaldır
              </button>
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





