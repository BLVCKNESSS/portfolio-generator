// =====================================================================
// templates/creatif.js — Modèle « Créatif »
// ---------------------------------------------------------------------
// Responsable : Membre 2
// Style : couleurs chaudes (orange/rose), mise en page en 2 colonnes avec
//         une barre latérale, typographie en grand, formes arrondies.
// (Les règles communes à tous les modèles sont expliquées dans minimal.js)
// =====================================================================

import { echapper, initiales, lienSur } from '../utils.js';

// Couleurs de fond qui alternent pour les cartes de projets.
// On les écrit EN ENTIER pour que Tailwind les détecte (voir règle n°3).
const COULEURS_CARTES = ['bg-orange-100', 'bg-rose-100', 'bg-amber-100', 'bg-pink-100'];

export const creatif = {
  nom: 'Créatif',

  rendre(data) {
    // ---- Photo ronde légèrement inclinée (rotate-3) ----
    const photo = data.photo
      ? `<img src="${data.photo}" alt="Photo de ${echapper(data.nom)}"
              class="h-40 w-40 rotate-3 rounded-[2rem] object-cover shadow-lg" />`
      : `<div class="flex h-40 w-40 rotate-3 items-center justify-center rounded-[2rem]
                     bg-white text-5xl font-black text-rose-500 shadow-lg">${echapper(initiales(data.nom))}</div>`;

    // ---- Compétences en liste verticale avec une puce ----
    const competences = data.competences
      .map((c) => `<li class="flex items-center gap-2"><span class="h-2 w-2 rounded-full bg-white"></span>${echapper(c)}</li>`)
      .join('');

    // ---- Projets : chaque carte prend une couleur différente ----
    // L'opérateur % (modulo) donne le reste de la division :
    // 0%4=0, 1%4=1, … 4%4=0 → les couleurs recommencent au début.
    const projets = data.projets
      .map((p, i) => {
        const lien = lienSur(p.lien);
        const couleur = COULEURS_CARTES[i % COULEURS_CARTES.length];
        return `
          <article class="no-break rounded-3xl ${couleur} p-6">
            <h3 class="text-xl font-black text-slate-900">${echapper(p.titre)}</h3>
            <p class="mt-2 text-slate-700">${echapper(p.description)}</p>
            ${lien ? `<a href="${lien}" target="_blank" rel="noopener"
                         class="mt-4 inline-block rounded-full bg-slate-900 px-4 py-1.5 text-sm font-semibold text-white hover:bg-slate-700">Voir ↗</a>` : ''}
          </article>`;
      })
      .join('');

    // ---- Contacts dans la barre latérale ----
    const contacts = [
      data.email && `<a href="mailto:${echapper(data.email)}" class="block break-all hover:underline">${echapper(data.email)}</a>`,
      data.telephone && `<span class="block">${echapper(data.telephone)}</span>`,
      lienSur(data.github) && `<a href="${lienSur(data.github)}" target="_blank" rel="noopener" class="block hover:underline">GitHub ↗</a>`,
      lienSur(data.linkedin) && `<a href="${lienSur(data.linkedin)}" target="_blank" rel="noopener" class="block hover:underline">LinkedIn ↗</a>`,
    ]
      .filter(Boolean)
      .join('');

    // md:grid-cols-[280px_1fr] → sur écran moyen : barre latérale de 280px + contenu
    return `
      <div class="grid bg-white text-slate-800 md:grid-cols-[280px_1fr]">

        <!-- ===== Barre latérale colorée ===== -->
        <aside class="space-y-8 bg-gradient-to-b from-orange-400 to-rose-500 p-8 text-white">
          <div class="flex justify-center md:justify-start">${photo}</div>

          <div>
            <h2 class="mb-3 text-xs font-bold uppercase tracking-widest text-white/80">Compétences</h2>
            <ul class="space-y-1.5 font-medium">${competences}</ul>
          </div>

          ${contacts ? `
          <div>
            <h2 class="mb-3 text-xs font-bold uppercase tracking-widest text-white/80">Contact</h2>
            <div class="space-y-1.5 text-sm">${contacts}</div>
          </div>` : ''}
        </aside>

        <!-- ===== Contenu principal ===== -->
        <div class="space-y-10 p-8 sm:p-12">
          <header>
            <p class="text-lg font-semibold text-rose-500">${echapper(data.titre)}</p>
            <!-- leading-none = lignes serrées pour un gros titre percutant -->
            <h1 class="mt-2 text-5xl font-black leading-none text-slate-900 sm:text-6xl">${echapper(data.nom)}</h1>
          </header>

          <section>
            <p class="text-lg leading-relaxed text-slate-600">${echapper(data.bio)}</p>
          </section>

          <section>
            <h2 class="mb-5 text-3xl font-black text-slate-900">Projets<span class="text-rose-500">.</span></h2>
            <div class="grid gap-5 lg:grid-cols-2">${projets}</div>
          </section>
        </div>
      </div>`;
  },
};
