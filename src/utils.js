// =====================================================================
// utils.js — Petites fonctions utilitaires partagées par tous les fichiers
// =====================================================================

/**
 * echapper() — Sécurise un texte avant de l'insérer dans du HTML.
 * ---------------------------------------------------------------------
 * POURQUOI ? Les modèles construisent le portfolio avec du HTML (innerHTML).
 * Si l'utilisateur tape par exemple "<script>alert('pirate')</script>"
 * dans son nom, ce code pourrait s'exécuter : c'est une faille appelée XSS.
 *
 * Cette fonction remplace les caractères spéciaux par leur version "sûre" :
 *   <  devient  &lt;
 *   >  devient  &gt;
 *   &  devient  &amp;
 *   "  devient  &quot;
 *   '  devient  &#39;
 * Le texte s'affiche normalement, mais n'est plus interprété comme du code.
 *
 * RÈGLE : dans les modèles, TOUJOURS passer les données de l'utilisateur
 * dans echapper() avant de les afficher.
 *
 * @param {string} texte - Le texte saisi par l'utilisateur
 * @returns {string} Le texte sécurisé
 */
export function echapper(texte = '') {
  return String(texte)
    .replaceAll('&', '&amp;') // le & en premier, sinon on abîmerait les autres remplacements
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

/**
 * initiales() — Renvoie les initiales d'un nom (ex : "Marie Ngono" → "MN").
 * Utilisé par les modèles quand l'utilisateur n'a pas mis de photo :
 * on affiche alors un cercle avec ses initiales à la place.
 *
 * @param {string} nom
 * @returns {string} 1 ou 2 lettres en majuscules
 */
export function initiales(nom = '') {
  return nom
    .trim()
    .split(/\s+/)          // on coupe le nom à chaque espace
    .filter(Boolean)       // on enlève les morceaux vides
    .slice(0, 2)           // on garde les 2 premiers mots maximum
    .map((mot) => mot[0])  // on prend la première lettre de chaque mot
    .join('')
    .toUpperCase();
}

/**
 * lienSur() — Vérifie qu'un lien commence bien par http:// ou https://.
 * Cela empêche d'insérer des liens dangereux comme "javascript:...".
 *
 * Beaucoup d'utilisateurs tapent "github.com/pseudo" sans le "https://" :
 * dans ce cas, on l'ajoute automatiquement au lieu de faire disparaître le lien.
 * Si le lien n'est pas valide, on renvoie une chaîne vide (= pas de lien).
 *
 * @param {string} url
 * @returns {string} Le lien sécurisé, ou '' s'il est invalide
 */
export function lienSur(url = '') {
  let propre = url.trim();

  // Pas de protocole du tout (ex : "github.com/pseudo") → on ajoute "https://"
  // On exige un point dans le nom de domaine et aucun espace.
  if (!/^[a-z][a-z0-9+.-]*:/i.test(propre) && /^[^\s/]+\.[^\s]+$/.test(propre)) {
    propre = `https://${propre.replace(/^\/+/, '')}`;
  }

  return /^https?:\/\//i.test(propre) ? echapper(propre) : '';
}

/**
 * anti-rebond (debounce) — Retarde l'exécution d'une fonction.
 * ---------------------------------------------------------------------
 * Quand l'utilisateur tape vite, l'événement "input" se déclenche à CHAQUE
 * lettre. Redessiner tout le portfolio 10 fois par seconde est inutile.
 * Avec debounce, la fonction ne s'exécute que lorsque l'utilisateur
 * fait une petite pause (ici 150 millisecondes par défaut).
 *
 * @param {Function} fonction - La fonction à retarder
 * @param {number} delai - Le temps d'attente en millisecondes
 * @returns {Function} Une nouvelle version "retardée" de la fonction
 */
export function debounce(fonction, delai = 150) {
  let minuteur; // garde en mémoire le minuteur en cours
  return (...args) => {
    clearTimeout(minuteur); // si on retape avant la fin du délai, on annule le précédent
    minuteur = setTimeout(() => fonction(...args), delai); // et on relance le compte à rebours
  };
}
