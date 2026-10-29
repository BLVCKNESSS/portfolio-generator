// =====================================================================
// generator.js — Le CŒUR du projet : choix aléatoire du modèle
// ---------------------------------------------------------------------
// Responsable : Membre 3
//
// Principe :
//   - On a une LISTE de modèles (templates).
//   - Au démarrage, on en choisit un AU HASARD.
//   - changerModele() en choisit un autre au hasard (jamais le même deux fois de suite).
//   - rendre(data) produit le HTML du portfolio avec le modèle actuel.
//
// Pourquoi séparer "choisir" et "rendre" ?
//   L'aperçu en direct appelle rendre() à chaque frappe au clavier.
//   Si on choisissait un modèle au hasard à chaque fois, le design
//   changerait à chaque lettre tapée ! Le modèle ne change donc QUE
//   quand l'utilisateur clique sur « Changer de modèle ».
// =====================================================================

// On importe chaque modèle. Chacun est un objet { nom, rendre }.
import { minimal } from './templates/minimal.js';
import { moderne } from './templates/moderne.js';
import { sombre } from './templates/sombre.js';
import { creatif } from './templates/creatif.js';

// ---------------------------------------------------------------------
// LISTE DES MODÈLES DISPONIBLES
// Pour ajouter un nouveau modèle :
//   1. Créez un fichier dans src/templates/ (copiez minimal.js comme base)
//   2. Importez-le en haut de ce fichier
//   3. Ajoutez-le dans ce tableau. C'est tout !
// ---------------------------------------------------------------------
const MODELES = [minimal, moderne, sombre, creatif];

// Position (index) du modèle actuellement utilisé dans le tableau MODELES.
// Math.random() donne un nombre entre 0 et 0.999…
// × MODELES.length (ici 4) → entre 0 et 3.999…
// Math.floor() arrondit vers le bas → 0, 1, 2 ou 3
let indexActuel = Math.floor(Math.random() * MODELES.length);

/**
 * changerModele() — Choisit un NOUVEAU modèle au hasard.
 * La boucle "do…while" recommence tant que le hasard retombe
 * sur le modèle actuel, pour que le changement soit toujours visible.
 */
export function changerModele() {
  // S'il n'y a qu'un seul modèle, impossible d'en changer
  if (MODELES.length < 2) return;

  let nouvelIndex;
  do {
    nouvelIndex = Math.floor(Math.random() * MODELES.length);
  } while (nouvelIndex === indexActuel); // on recommence si c'est le même

  indexActuel = nouvelIndex;
}

/**
 * rendre() — Génère le HTML du portfolio avec le modèle actuel.
 *
 * @param {object} data - Les informations de l'utilisateur (voir form.js)
 * @returns {string} Le code HTML du portfolio
 */
export function rendre(data) {
  return MODELES[indexActuel].rendre(data);
}

/**
 * nomModeleActuel() — Renvoie le nom lisible du modèle (ex : "Sombre").
 * Utilisé pour l'afficher dans le badge en haut de la page.
 *
 * @returns {string}
 */
export function nomModeleActuel() {
  return MODELES[indexActuel].nom;
}
