// =====================================================================
// templates/minimal.js — Modèle « Minimal »
// ---------------------------------------------------------------------
// Responsable : Membre 2
// Style : sobre, fond blanc, beaucoup d'espace, texte centré.
//
// ⚠️ RÈGLES À RESPECTER POUR TOUS LES MODÈLES ⚠️
//   1. Un modèle est un objet avec :
//        - nom    : le nom affiché dans le badge (ex : "Minimal")
//        - rendre : une fonction qui reçoit "data" et renvoie du HTML (texte)
//   2. TOUJOURS passer les textes de l'utilisateur dans echapper()
//      et les liens dans lienSur() (sécurité, voir utils.js).
//   3. Écrire les classes Tailwind EN ENTIER, jamais morceau par morceau.
//        ✅ "bg-indigo-600"
//        ❌ "bg-" + couleur + "-600"   → Tailwind ne la détectera pas !
//      (Tailwind lit nos fichiers comme du texte pour trouver les classes.)
//   4. Ajouter la classe "no-break" sur les cartes pour qu'elles ne soient
//      pas coupées entre deux pages dans le PDF.
//
// Ce fichier sert de MODÈLE DE BASE : copiez-le pour en créer un nouveau.
// =====================================================================

import { echapper, initiales, lienSur } from '../utils.js';

export const minimal = {
  nom: 'Minimal',

  /**
   * @param {object} data - Les informations de l'utilisateur (voir form.js)
   * @returns {string} Le HTML du portfolio
   */
  rendre(data) {
    // ---- Photo : l'image si elle existe, sinon un cercle avec les initiales ----
    // L'opérateur ternaire (condition ? siVrai : siFaux) choisit entre les deux.
    const photo = data.photo
      ? `<img src="${data.photo}" alt="Photo de ${echapper(data.nom)}"
              class="mx-auto h-32 w-32 rounded-full object-cover ring-4 ring-slate-100" />`
      : `<div class="mx-auto flex h-32 w-32 items-center justify-center rounded-full
                     bg-slate-900 text-4xl font-light text-white">${echapper(initiales(data.nom))}</div>`;

    // ---- Compétences : on transforme chaque mot en une petite étiquette ----
    // .map() crée un morceau de HTML par compétence, .join('') les colle ensemble.
    const competences = data.competences
      .map((c) => `<li class="border border-slate-300 px-4 py-1 text-sm">${echapper(c)}</li>`)
      .join('');

    // ---- Projets : une ligne par projet ----
    const projets = data.projets
      .map((p) => {
        const lien = lienSur(p.lien);
        return `
          <article class="no-break border-b border-slate-200 py-6 last:border-0">
            <h3 class="text-lg font-semibold">${echapper(p.titre)}</h3>
            <p class="mt-1 text-slate-600">${echapper(p.description)}</p>
            ${lien ? `<a href="${lien}" target="_blank" rel="noopener"
                         class="mt-2 inline-block text-sm underline underline-offset-4">Voir le projet →</a>` : ''}
          </article>`;
      })
      .join('');

    // ---- Contacts : on n'affiche que ceux qui sont remplis ----
    const contacts = [
      data.email && `<a href="mailto:${echapper(data.email)}" class="hover:underline">${echapper(data.email)}</a>`,
      data.telephone && `<span>${echapper(data.telephone)}</span>`,
      lienSur(data.github) && `<a href="${lienSur(data.github)}" target="_blank" rel="noopener" class="hover:underline">GitHub</a>`,
      lienSur(data.linkedin) && `<a href="${lienSur(data.linkedin)}" target="_blank" rel="noopener" class="hover:underline">LinkedIn</a>`,
    ]
      .filter(Boolean) // retire les contacts vides (false ou '')
      .join('<span class="text-slate-300">•</span>');

    // ---- Assemblage final de la page ----
    return `
      <div class="bg-white px-6 py-16 text-slate-800 sm:px-12">
        <div class="mx-auto max-w-2xl">

          <!-- En-tête : photo, nom, titre -->
          <header class="text-center">
            ${photo}
            <h1 class="mt-6 text-4xl font-light tracking-tight">${echapper(data.nom)}</h1>
            <p class="mt-2 text-sm uppercase tracking-[0.3em] text-slate-500">${echapper(data.titre)}</p>
          </header>

          <!-- À propos -->
          <section class="mt-12 text-center">
            <p class="leading-relaxed text-slate-600">${echapper(data.bio)}</p>
          </section>

          <!-- Compétences -->
          <section class="mt-12">
            <h2 class="mb-4 text-center text-xs uppercase tracking-[0.3em] text-slate-400">Compétences</h2>
            <ul class="flex flex-wrap justify-center gap-2">${competences}</ul>
          </section>

          <!-- Projets -->
          <section class="mt-12">
            <h2 class="mb-2 text-center text-xs uppercase tracking-[0.3em] text-slate-400">Projets</h2>
            ${projets}
          </section>

          <!-- Contact (affiché seulement s'il y a au moins un contact) -->
          ${contacts ? `
          <footer class="mt-12 border-t border-slate-200 pt-8">
            <div class="flex flex-wrap justify-center gap-3 text-sm text-slate-600">${contacts}</div>
          </footer>` : ''}
        </div>
      </div>`;
  },
};
