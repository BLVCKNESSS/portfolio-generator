// =====================================================================
// templates/sombre.js — Modèle « Sombre »
// ---------------------------------------------------------------------
// Responsable : Membre 2
// Style : fond très foncé, texte clair, accents vert émeraude,
//         cartes légèrement plus claires que le fond.
// (Les règles communes à tous les modèles sont expliquées dans minimal.js)
// =====================================================================

import { echapper, initiales, lienSur } from '../utils.js';

export const sombre = {
  nom: 'Sombre',

  rendre(data) {
    // ---- Photo ronde avec un contour vert ----
    const photo = data.photo
      ? `<img src="${data.photo}" alt="Photo de ${echapper(data.nom)}"
              class="h-32 w-32 shrink-0 rounded-full object-cover ring-4 ring-emerald-500/40" />`
      : `<div class="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-zinc-800
                     text-4xl font-semibold text-emerald-400 ring-4 ring-emerald-500/40">${echapper(initiales(data.nom))}</div>`;

    // ---- Compétences sous forme de petites pastilles ----
    const competences = data.competences
      .map((c) => `<span class="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5
                                text-sm font-medium text-emerald-300">${echapper(c)}</span>`)
      .join('');

    // ---- Projets sous forme de cartes ----
    const projets = data.projets
      .map((p) => {
        const lien = lienSur(p.lien);
        return `
          <article class="no-break rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-emerald-500/60">
            <h3 class="text-lg font-semibold text-white">${echapper(p.titre)}</h3>
            <p class="mt-2 text-sm leading-relaxed text-zinc-400">${echapper(p.description)}</p>
            ${lien ? `<a href="${lien}" target="_blank" rel="noopener"
                         class="mt-4 inline-block text-sm font-medium text-emerald-400 hover:underline">Voir le projet →</a>` : ''}
          </article>`;
      })
      .join('');

    // ---- Contacts : une ligne par moyen de contact renseigné ----
    const contacts = [
      data.email && `<li><span class="text-zinc-500">Email</span><br /><a href="mailto:${echapper(data.email)}" class="text-emerald-400 hover:underline">${echapper(data.email)}</a></li>`,
      data.telephone && `<li><span class="text-zinc-500">Téléphone</span><br /><span class="text-zinc-200">${echapper(data.telephone)}</span></li>`,
      lienSur(data.github) && `<li><span class="text-zinc-500">GitHub</span><br /><a href="${lienSur(data.github)}" target="_blank" rel="noopener" class="text-emerald-400 hover:underline">${lienSur(data.github)}</a></li>`,
      lienSur(data.linkedin) && `<li><span class="text-zinc-500">LinkedIn</span><br /><a href="${lienSur(data.linkedin)}" target="_blank" rel="noopener" class="text-emerald-400 hover:underline">${lienSur(data.linkedin)}</a></li>`,
    ]
      .filter(Boolean)
      .join('');

    // print:min-h-screen : dans le PDF, le fond noir remplit toute la page
    // (sinon le bas de la page resterait clair sous le portfolio).
    return `
      <div class="bg-zinc-950 px-6 py-14 text-zinc-300 sm:px-12 print:min-h-screen">
        <div class="mx-auto max-w-3xl space-y-14">

          <!-- En-tête : photo + nom + métier -->
          <header class="flex flex-col items-center gap-8 text-center sm:flex-row sm:text-left">
            ${photo}
            <div>
              <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl">${echapper(data.nom)}</h1>
              <p class="mt-2 text-lg font-medium text-emerald-400">${echapper(data.titre)}</p>
            </div>
          </header>

          <!-- À propos -->
          <section>
            <h2 class="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">À propos</h2>
            <p class="text-lg leading-relaxed">${echapper(data.bio)}</p>
          </section>

          <!-- Compétences -->
          <section>
            <h2 class="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">Compétences</h2>
            <div class="flex flex-wrap gap-2">${competences}</div>
          </section>

          <!-- Projets -->
          <section>
            <h2 class="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">Projets</h2>
            <div class="grid gap-4 sm:grid-cols-2">${projets}</div>
          </section>

          <!-- Contact -->
          ${contacts ? `
          <section class="border-t border-zinc-800 pt-10">
            <h2 class="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">Contact</h2>
            <ul class="grid gap-4 break-all text-sm sm:grid-cols-2">${contacts}</ul>
          </section>` : ''}
        </div>
      </div>`;
  },
};
