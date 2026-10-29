// =====================================================================
// templates/moderne.js — Modèle « Moderne »
// ---------------------------------------------------------------------
// Responsable : Membre 2
// Style : bandeau en dégradé violet/bleu, cartes avec ombres, grille de projets.
// (Les règles communes à tous les modèles sont expliquées dans minimal.js)
// =====================================================================

import { echapper, initiales, lienSur } from '../utils.js';

export const moderne = {
  nom: 'Moderne',

  rendre(data) {
    // ---- Photo ou initiales, avec une bordure blanche sur le dégradé ----
    const photo = data.photo
      ? `<img src="${data.photo}" alt="Photo de ${echapper(data.nom)}"
              class="h-36 w-36 rounded-2xl border-4 border-white object-cover shadow-xl" />`
      : `<div class="flex h-36 w-36 items-center justify-center rounded-2xl border-4 border-white
                     bg-indigo-100 text-5xl font-bold text-indigo-600 shadow-xl">${echapper(initiales(data.nom))}</div>`;

    // ---- Compétences en "pastilles" colorées ----
    const competences = data.competences
      .map((c) => `<span class="rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700">${echapper(c)}</span>`)
      .join('');

    // ---- Projets en cartes (grille de 2 colonnes sur écran moyen) ----
    const projets = data.projets
      .map((p) => {
        const lien = lienSur(p.lien);
        return `
          <article class="no-break rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-100">
            <!-- Petite barre colorée décorative -->
            <div class="mb-4 h-1.5 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-sky-400"></div>
            <h3 class="text-lg font-bold text-slate-900">${echapper(p.titre)}</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-600">${echapper(p.description)}</p>
            ${lien ? `<a href="${lien}" target="_blank" rel="noopener"
                         class="mt-4 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-800">Découvrir →</a>` : ''}
          </article>`;
      })
      .join('');

    // ---- Contacts sous forme de boutons ----
    const contacts = [
      data.email && `<a href="mailto:${echapper(data.email)}" class="rounded-lg bg-white/15 px-4 py-2 hover:bg-white/25">✉️ ${echapper(data.email)}</a>`,
      data.telephone && `<span class="rounded-lg bg-white/15 px-4 py-2">📞 ${echapper(data.telephone)}</span>`,
      lienSur(data.github) && `<a href="${lienSur(data.github)}" target="_blank" rel="noopener" class="rounded-lg bg-white/15 px-4 py-2 hover:bg-white/25">💻 GitHub</a>`,
      lienSur(data.linkedin) && `<a href="${lienSur(data.linkedin)}" target="_blank" rel="noopener" class="rounded-lg bg-white/15 px-4 py-2 hover:bg-white/25">🔗 LinkedIn</a>`,
    ]
      .filter(Boolean)
      .join('');

    return `
      <div class="bg-slate-50 text-slate-800">

        <!-- Bandeau d'en-tête en dégradé (bg-gradient-to-br = du haut-gauche vers le bas-droite) -->
        <header class="bg-gradient-to-br from-indigo-600 via-violet-600 to-sky-500 px-6 pb-20 pt-14 text-white sm:px-12">
          <div class="mx-auto flex max-w-4xl flex-col items-center gap-8 sm:flex-row">
            ${photo}
            <div class="text-center sm:text-left">
              <p class="text-sm font-medium uppercase tracking-widest text-indigo-100">Bonjour, je suis</p>
              <h1 class="mt-1 text-4xl font-extrabold sm:text-5xl">${echapper(data.nom)}</h1>
              <p class="mt-2 text-xl text-indigo-100">${echapper(data.titre)}</p>
            </div>
          </div>
        </header>

        <!-- Carte "À propos" qui chevauche le bandeau (-mt-12 = marge négative) -->
        <div class="mx-auto -mt-12 max-w-4xl px-6 sm:px-12">
          <section class="no-break rounded-2xl bg-white p-8 shadow-lg">
            <h2 class="text-2xl font-bold text-slate-900">À propos</h2>
            <p class="mt-3 leading-relaxed text-slate-600">${echapper(data.bio)}</p>
            <div class="mt-6 flex flex-wrap gap-2">${competences}</div>
          </section>
        </div>

        <!-- Projets -->
        <section class="mx-auto max-w-4xl px-6 py-14 sm:px-12">
          <h2 class="mb-6 text-2xl font-bold text-slate-900">Mes projets</h2>
          <div class="grid gap-6 md:grid-cols-2">${projets}</div>
        </section>

        <!-- Contact -->
        ${contacts ? `
        <footer class="bg-slate-900 px-6 py-12 text-center text-white sm:px-12">
          <h2 class="text-2xl font-bold">Travaillons ensemble</h2>
          <div class="mt-6 flex flex-wrap justify-center gap-3 text-sm">${contacts}</div>
        </footer>` : ''}
      </div>`;
  },
};
