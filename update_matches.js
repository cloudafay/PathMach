const fs = require('fs');
let code = fs.readFileSync('docs/app.js', 'utf-8');

const newMatches = `
  function renderMatches() {
    return protectedLayout((user) => {
      const items = filteredOpportunities();
      return \`
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
                            <input name="search" placeholder="Pozisyon, şirket veya kelime..." value="\${state.filters.search}" class="w-full rounded-lg border-outline-variant/50 focus:border-secondary focus:ring-secondary/20 font-body-sm bg-surface-bright placeholder:text-on-surface-variant/50"/>
                        </div>
                        <div>
                            <label class="block font-label-bold text-on-surface-variant mb-1">Tür</label>
                            <select name="type" class="w-full rounded-lg border-outline-variant/50 focus:border-secondary focus:ring-secondary/20 font-body-sm bg-surface-bright">
                                \${selectOptions(["Hepsi", "Staj", "Trainee", "Yeni Mezun"], state.filters.type)}
                            </select>
                        </div>
                        <div>
                            <label class="block font-label-bold text-on-surface-variant mb-1">Departman</label>
                            <select name="department" class="w-full rounded-lg border-outline-variant/50 focus:border-secondary focus:ring-secondary/20 font-body-sm bg-surface-bright">
                                \${selectOptions(["Hepsi", "Yazılım", "Tasarım", "Veri", "Pazarlama"], state.filters.department)}
                            </select>
                        </div>
                    </form>
                </div>
            </aside>
            <div class="lg:col-span-3">
                <div class="flex justify-between items-center mb-md">
                    <span class="font-label-bold text-on-surface-variant">\${items.length} Fırsat Bulundu</span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-md" id="matches-results">
                    \${items.map(i => opportunityCard(i)).join('')}
                </div>
            </div>
        </div>
      \`;
    });
  }
`;

code = code.replace(/function renderMatches\(\) \{[\s\S]*?function selectOptions/, newMatches + '\n  function selectOptions');

fs.writeFileSync('docs/app.js', code);
fs.writeFileSync('stitch-pathmatch/live/app.js', code);
console.log('updated matches');