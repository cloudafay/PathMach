const fs = require('fs');
let code = fs.readFileSync('docs/app.js', 'utf-8');

const newLanding = `
  function renderLanding() {
    return appShell(\`
      <section class="relative pt-3xl pb-xl md:pt-120px md:pb-3xl overflow-hidden min-h-[80vh] flex flex-col justify-center items-center">
          <div class="px-lg md:px-2xl max-w-[1400px] w-full mx-auto relative z-10">
              <div class="flex flex-col items-center text-center max-w-3xl mx-auto space-y-lg md:space-y-xl">
                  <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-fixed-dim/20 text-on-secondary-fixed-variant border border-secondary-fixed-dim/30">
                      <span class="material-symbols-outlined text-sm">auto_awesome</span>
                      <span class="font-label-bold text-label-bold uppercase tracking-wider text-xs">YENİ NESİL KARİYER PLATFORMU</span>
                  </div>
                  <h1 class="font-h1 text-h1 text-on-surface tracking-tighter leading-tight">
                      Geleceğini şansa değil,<br/>
                      <span class="text-tertiary-container">Akıllı eşleşmeye</span> bırak.
                  </h1>
                  <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                      Öğrenciler ve yeni mezunlar için kişiselleştirilmiş staj ve iş fırsatları. Kurumlar için doğru yeteneğe ulaşmanın en hızlı ve veri odaklı yolu.
                  </p>
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
                          <span class="font-h3 text-h3 text-primary">%\${state.stats.successRate}</span>
                          <span class="font-body-sm text-body-sm">Başarı Oranı</span>
                      </div>
                      <div class="w-px h-8 bg-outline-variant"></div>
                      <div class="flex flex-col">
                          <span class="font-h3 text-h3 text-primary">\${state.stats.activeStudents}+</span>
                          <span class="font-body-sm text-body-sm">Aktif Öğrenci</span>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    \`, { hideTopbar: false });
  }
`;

code = code.replace(/function renderLanding\(\) \{[\s\S]*?function matchStrip\(item\) \{/, newLanding + '\n  function matchStrip(item) {');

fs.writeFileSync('docs/app.js', code);
fs.writeFileSync('stitch-pathmatch/live/app.js', code);
console.log('Landing updated!');
