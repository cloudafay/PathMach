const fs = require('fs');

let code = fs.readFileSync('docs/app.js', 'utf-8');

const newTailwindShell = `
  function appShell(content, options = {}) {
    const user = currentUser();
    
    if (!user) {
        return \`
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
                \${content}
            </main>
        </div>\`;
    }
    
    return \`
    <div class="bg-background text-on-background font-body-md antialiased min-h-screen flex overflow-hidden">
        \${sidebar(user)}
        <main class="flex-1 flex flex-col h-screen overflow-y-auto bg-surface relative">
             <header class="sticky top-0 z-30 flex justify-between items-center w-full px-lg py-sm bg-surface-bright/80 backdrop-blur-md border-b border-outline-variant/20">
                 <button class="md:hidden text-on-background p-2"><span class="material-symbols-outlined">menu</span></button>
                 <div class="flex items-center gap-4 ml-auto">
                     <div class="flex items-center gap-3 bg-surface-container-lowest py-1 px-3 rounded-full border border-outline-variant/30 cursor-pointer hover:bg-surface-container/50 transition-colors">
                         <div class="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-button text-sm">\${initials(user.name)}</div>
                         <div class="hidden md:block text-left"><p class="font-label-bold text-label-bold text-on-surface leading-none">\${user.name}</p></div>
                     </div>
                 </div>
             </header>
             <div class="p-lg md:p-xl space-y-xl max-w-[1400px] w-full mx-auto">
                \${content}
             </div>
        </main>
    </div>\`;
  }
`;

code = code.replace(/function appShell\(content, options = \{\}\) \{[\s\S]*?function sidebar\(user\) \{/, newTailwindShell + '\n  function sidebar(user) {');

const newSidebar = `
  function sidebar(user) {
    const active = route();
    const nav = navItems(user);
    const homePath = user.role === "company" ? "/company" : "/dashboard";
    
    return \`
      <aside class="hidden md:flex flex-col h-screen w-64 border-r border-outline-variant/30 sticky top-0 bg-surface-bright/80 backdrop-blur-lg p-4 space-y-2 shrink-0 z-40">
          <div class="mb-8 px-2 pt-2">
              <a href="#\${homePath}"><h1 class="font-h3 text-h3 text-primary tracking-tighter">PathMatch</h1></a>
              <p class="font-body-sm text-body-sm text-on-surface-variant">\${roleLabel(user.role)} Çalışma Alanı</p>
          </div>
          <nav class="flex-1 space-y-1">
              \${nav.map(([path, ico, label]) => \`
                  <a class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-transform duration-200 \${active.startsWith(path) ? 'bg-surface-container-lowest text-secondary shadow-sm border border-outline-variant/30' : 'text-on-surface-variant hover:bg-surface-container/50'}" href="#\${path}">
                      <span class="material-symbols-outlined">\${ico}</span>
                      <span class="font-button text-button">\${label}</span>
                  </a>
              \`).join('')}
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
    \`;
  }
`;

code = code.replace(/function sidebar\(user\) \{[\s\S]*?function protectedLayout\(inner\) \{/, newSidebar + '\n  function protectedLayout(inner) {');

fs.writeFileSync('docs/app.js', code);
fs.writeFileSync('stitch-pathmatch/live/app.js', code);
console.log('AppShell updated!');
