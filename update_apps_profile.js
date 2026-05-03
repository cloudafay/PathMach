const fs = require('fs');
let code = fs.readFileSync('docs/app.js', 'utf-8');

const updatedApplicationsAndProfile = `
  function applicationRow(app) {
    const opp = opportunityById(app.opportunityId);
    const steps = opp.steps;
    return \`
      <div class="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 relative overflow-hidden group">
          <div class="absolute top-0 left-0 w-1 h-full bg-secondary-fixed"></div>
          <div class="flex justify-between items-start">
              <div>
                  <h3 class="font-h3 text-lg text-on-surface">\$_{opp.title}</h3>
                  <p class="font-body-sm text-on-surface-variant flex items-center gap-1 mt-1">
                      <span class="material-symbols-outlined text-[16px]">business</span> \${opp.company}
                  </p>
              </div>
              <div class="text-right">
                  <span class="inline-block px-2 py-1 bg-surface-container text-on-surface-variant rounded text-xs font-label-bold mb-1">
                      Güncelleme: Bugün
                  </span>
              </div>
          </div>
          <div class="mt-xl relative">
              <div class="absolute left-0 top-3 w-full h-0.5 bg-outline-variant/30"></div>
              <div class="absolute left-0 top-3 h-0.5 bg-secondary w-1/2"></div>
              <div class="relative flex justify-between">
                  \${steps.map((step, idx) => {
                      const isPast = idx <= app.step;
                      const isCurrent = idx === app.step;
                      return \`
                        <div class="flex flex-col items-center">
                            <div class="w-6 h-6 rounded-full \${isCurrent ? 'bg-secondary text-on-secondary shadow-md ring-4 ring-secondary/20' : (isPast ? 'bg-secondary-fixed text-on-secondary-fixed' : 'bg-surface border-2 border-outline-variant/30')} flex items-center justify-center text-xs relative z-10">
                                \${isPast ? '<span class="material-symbols-outlined text-[14px]">check</span>' : idx + 1}
                            </div>
                            <span class="mt-2 font-label-bold text-xs \${isPast ? 'text-on-surface' : 'text-on-surface-variant'}">\${step}</span>
                        </div>
                      \`;
                  }).join('')}
              </div>
          </div>
      </div>
    \`.replace(/\\$_\\{/g, '${');
  }

  function renderApplications() {
    return protectedLayout((user) => {
      const apps = userApplications();
      return \`
        <div class="mb-lg">
            <h2 class="font-h2 text-h2 text-on-surface tracking-tight">Başvurularım</h2>
            <p class="font-body-md text-on-surface-variant mt-2">Tüm süreçlerini ve değerlendirme aşamalarını buradan takip et.</p>
        </div>
        <div class="flex gap-2 mb-lg border-b border-outline-variant/30 overflow-x-auto no-scrollbar">
            <button class="px-md py-sm font-button text-button border-b-2 border-secondary text-secondary whitespace-nowrap">Aktif Süreçler</button>
            <button class="px-md py-sm font-button text-button border-b-2 border-transparent text-on-surface-variant hover:text-on-surface whitespace-nowrap">Bekleyenler</button>
            <button class="px-md py-sm font-button text-button border-b-2 border-transparent text-on-surface-variant hover:text-on-surface whitespace-nowrap">Tamamlananlar</button>
        </div>
        \${apps.length === 0 ? \`
            <div class="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-xl flex flex-col items-center text-center">
              <span class="material-symbols-outlined text-4xl text-on-surface-variant/50 mb-3">inbox</span>
              <h3 class="font-h3 text-on-surface mb-2">Henüz Aktif Başvurunuz Yok</h3>
              <p class="font-body-sm text-on-surface-variant mb-md max-w-sm">Size en uygun pozisyonları bulup hemen sürece dahil olabilirsiniz.</p>
              <a href="#/matches" class="px-lg py-sm bg-primary text-on-primary rounded-lg font-button text-sm hover:opacity-90 transition-opacity">
                  Fırsatları Keşfet
              </a>
            </div>
        \` : \`
            <div class="space-y-md">
                \${apps.map(applicationRow).join('')}
            </div>
        \`}
      \`;
    });
  }

  function renderProfile() {
    return protectedLayout((user) => {
      return \`
        <div class="mb-lg">
            <h2 class="font-h2 text-h2 text-on-surface tracking-tight">Profil & Ayarlar</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-xl">
            <div class="lg:col-span-2 space-y-md">
                <div class="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-md flex items-center gap-xl relative overflow-hidden">
                    <div class="w-32 h-32 rounded-full overflow-hidden bg-primary-container text-on-primary border-4 border-surface shadow-sm shrink-0 flex items-center justify-center font-h1">
                        \${initials(user.name)}
                    </div>
                    <div class="flex-grow z-10">
                        <h2 class="font-h2 text-2xl text-on-surface tracking-tight">\${user.name}</h2>
                        <p class="font-body-sm text-on-surface-variant mt-1 flex items-center gap-1">
                            <span class="material-symbols-outlined text-[16px]">school</span> \${user.institution || "Öğrenci"}
                        </p>
                        <div class="mt-md flex flex-wrap gap-2">
                            <span class="px-2 py-1 bg-secondary-fixed/20 text-on-secondary-container rounded font-label-bold text-xs">Yazılım Frontend</span>
                            <span class="px-2 py-1 bg-secondary-fixed/20 text-on-secondary-container rounded font-label-bold text-xs">Tasarım Tasarım Systemleri</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="space-y-md">
                <div class="bg-surface-container-lowest rounded-xl border border-outline-variant/30 overflow-hidden text-center p-md">
                   <h3 class="font-h3 text-lg mb-2">Genel İstatistikler</h3>
                   <div class="flex flex-col gap-2 font-body-sm text-on-surface-variant">
                      <div>Aktif Başvuru: <strong>\${userApplications().length}</strong></div>
                      <div>Kaydedilen İlan: <strong>\${state.saved.length}</strong></div>
                   </div>
                </div>
            </div>
        </div>
      \`;
    });
  }
`;

code = code.replace(/function applicationRow\(app\) \{[\s\S]*?function renderOpportunityDetail\(id\) \{/, updatedApplicationsAndProfile + '\n\n  function renderOpportunityDetail(id) {');

const finalProfileReg = /function renderProfile\(\) \{[\s\S]*?function renderCompany\(\) \{/;
if(finalProfileReg.test(code)){
   // we inserted above, let's remove the redundant renderProfile from the bottom if it double exists.
}

fs.writeFileSync('docs/app.js', code);
fs.writeFileSync('stitch-pathmatch/live/app.js', code);
console.log('updated applications and profile');