const fs = require('fs');
let code = fs.readFileSync('docs/app.js', 'utf-8');

const newOpportunityCard = `
  function opportunityCard(item, compact = false) {
    const applied = hasApplied(item.id);
    const saved = state.saved.includes(item.id);
    return \`
      <div class="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
          <div class="flex justify-between items-start mb-md">
              <div class="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center font-h3 text-h3 text-primary uppercase">
                  \${item.company.slice(0, 2)}
              </div>
              <div class="flex gap-2">
                  <span class="px-2 py-1 bg-surface-green text-success rounded text-xs font-label-bold">\${item.match}% Eşleşme</span>
                  <button class="text-on-surface-variant hover:text-danger transition-colors">
                      <span class="material-symbols-outlined">\${saved ? 'bookmark' : 'bookmark_border'}</span>
                  </button>
              </div>
          </div>
          <h3 class="font-h3 text-lg text-on-surface mb-1 group-hover:text-primary transition-colors">\${item.title}</h3>
          <p class="font-body-sm text-body-sm text-on-surface-variant mb-md flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px]">business</span> \${item.company}
              <span class="opacity-50 mx-1">•</span>
              <span class="material-symbols-outlined text-[16px]">location_on</span> \${item.location}
          </p>
          <div class="flex flex-wrap gap-2 mb-lg">
              \${item.tags.slice(0,3).map(tag => \`<span class="px-2 py-1 bg-surface-container-low text-on-surface-variant rounded-md text-xs font-medium">\${tag}</span>\`).join('')}
          </div>
          <div class="mt-auto pt-md border-t border-outline-variant/30 flex justify-between items-center">
              <span class="font-label-bold text-primary">\${item.salary}</span>
              <a href="#/opportunity/\${item.id}" class="px-4 py-2 \${applied ? 'bg-surface-container text-on-surface-variant' : 'bg-primary-container text-on-primary'} rounded-lg font-button text-sm hover:opacity-90 transition-opacity">
                  \${applied ? 'Başvuruldu' : 'İncele'}
              </a>
          </div>
      </div>
    \`;
  }
`;

code = code.replace(/function opportunityCard\(item, compact = false\) \{[\s\S]*?\n  function filteredOpportunities\(\) \{/, newOpportunityCard + '\n  function filteredOpportunities() {');

const newDashboard = `
  function renderDashboard() {
    return protectedLayout((user) => {
      if (user.role === "company") return renderCompanyInner(user);
      const applications = userApplications();
      const completed = state.completedRoadmap.length;
      const best = opportunities[0];
      return \`
        <div class="mb-lg">
          <h2 class="font-h2 text-h2 text-on-surface tracking-tight">Merhaba, \${user.name} 👋</h2>
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
                <div class="text-3xl font-h2 text-on-surface">\${applications.length}</div>
            </div>
            <div class="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 hover:border-secondary-fixed/50 transition-colors">
                <div class="flex items-center gap-3 mb-2">
                    <div class="w-10 h-10 rounded-full bg-tertiary-fixed/20 flex items-center justify-center text-on-tertiary-container">
                        <span class="material-symbols-outlined">stars</span>
                    </div>
                    <span class="font-label-bold text-on-surface-variant">En Yüksek Eşleşme</span>
                </div>
                <div class="text-3xl font-h2 text-on-surface">\${best.match}%</div>
            </div>
            <div class="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 hover:border-secondary-fixed/50 transition-colors">
                <div class="flex items-center gap-3 mb-2">
                    <div class="w-10 h-10 rounded-full bg-primary-fixed/20 flex items-center justify-center text-on-primary-fixed-variant">
                        <span class="material-symbols-outlined">trending_up</span>
                    </div>
                    <span class="font-label-bold text-on-surface-variant">Yol Haritası</span>
                </div>
                <div class="text-3xl font-h2 text-on-surface">\${completed}/\${roadmap.length}</div>
            </div>
        </div>
        
        <div class="flex justify-between items-end mb-md">
            <div>
                <h3 class="font-h3 text-xl text-on-surface">Senin için Eşleşen Fırsatlar</h3>
            </div>
            <a href="#/matches" class="text-secondary font-button text-sm hover:underline">Tümünü Gör</a>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md mb-xl">
            \${opportunities.slice(0, 3).map(item => opportunityCard(item)).join('')}
        </div>
      \`;
    });
  }
`;

code = code.replace(/function renderDashboard\(\) \{[\s\S]*?function opportunityCard/, newDashboard + '\n  function opportunityCard');

fs.writeFileSync('docs/app.js', code);
fs.writeFileSync('stitch-pathmatch/live/app.js', code);
console.log('updated dashboard');