// =====================================================================
// main.js — Point d'entrée de l'application (le "chef d'orchestre")
// ---------------------------------------------------------------------
// Ce fichier relie toutes les pièces entre elles :
//   - le formulaire (form.js)
//   - le générateur de modèles aléatoires (generator.js)
//   - les boutons « Changer de modèle » et « Exporter en PDF »
//
// Il ne contient presque pas de logique lui-même : il écoute les
// événements (frappes, clics) et appelle les bonnes fonctions.
// =====================================================================

// On importe le CSS : Vite l'injectera automatiquement dans la page
import './style.css';

// Fonctions du formulaire
import {
  lireDonnees,
  ajouterProjet,
  gererPhoto,
  reinitialiser,
  verifierChampsObligatoires,
} from './form.js';

// Fonctions du générateur
import { rendre, changerModele, nomModeleActuel } from './generator.js';

// Petite fonction pour limiter le nombre de mises à jour (voir utils.js)
import { debounce } from './utils.js';

// ---------------------------------------------------------------------
// 1. RÉCUPÉRATION DES ÉLÉMENTS HTML
// ---------------------------------------------------------------------
const formulaire = document.getElementById('formulaire');
const apercu = document.getElementById('apercu');
const badgeModele = document.getElementById('nom-modele');
const messageErreur = document.getElementById('message-erreur');
const btnChanger = document.getElementById('btn-changer');
const btnPdf = document.getElementById('btn-pdf');
const btnAjouterProjet = document.getElementById('btn-ajouter-projet');
const btnReinitialiser = document.getElementById('btn-reinitialiser');

// ---------------------------------------------------------------------
// 2. FONCTION DE MISE À JOUR DE L'APERÇU
// ---------------------------------------------------------------------
/**
 * mettreAJour() — Relit le formulaire et redessine le portfolio.
 * C'est LA fonction centrale : tout changement finit par l'appeler.
 */
function mettreAJour() {
  const data = lireDonnees();             // 1) on lit les infos saisies
  apercu.innerHTML = rendre(data);        // 2) on génère le HTML avec le modèle actuel
  badgeModele.textContent = `Modèle : ${nomModeleActuel()}`; // 3) on met à jour le badge
}

// Version "anti-rebond" : utilisée pendant la frappe au clavier,
// pour ne pas tout redessiner à chaque lettre (attend 150 ms de pause).
const mettreAJourEnDouceur = debounce(mettreAJour, 150);

// ---------------------------------------------------------------------
// 3. APERÇU EN DIRECT
// ---------------------------------------------------------------------
// L'événement "input" se déclenche à chaque modification d'un champ
// du formulaire (frappe, collage, effacement…).
// Grâce à la "délégation d'événements", un seul écouteur sur le <form>
// suffit, même pour les champs de projets ajoutés plus tard.
formulaire.addEventListener('input', (evenement) => {
  // Le champ photo est géré à part (voir gererPhoto dans form.js)
  if (evenement.target.name === 'photo') return;
  mettreAJourEnDouceur();
});

// On empêche le formulaire de recharger la page si on appuie sur "Entrée"
formulaire.addEventListener('submit', (evenement) => evenement.preventDefault());

// ---------------------------------------------------------------------
// 4. BOUTON « CHANGER DE MODÈLE »
// ---------------------------------------------------------------------
// On garde exactement les MÊMES données, on change seulement le modèle.
btnChanger.addEventListener('click', () => {
  changerModele(); // choisit un autre modèle au hasard
  mettreAJour();   // redessine immédiatement (sans attendre)

  // Petite animation : l'aperçu apparaît en fondu.
  // animate() est une fonction native du navigateur (Web Animations API).
  apercu.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300 });
});

// ---------------------------------------------------------------------
// 5. BOUTON « EXPORTER EN PDF »
// ---------------------------------------------------------------------
// On utilise la fonction d'impression du navigateur : l'utilisateur choisit
// « Enregistrer au format PDF » comme imprimante.
// Grâce aux classes "print:hidden" (dans index.html), seul le portfolio
// apparaît dans le PDF : le formulaire et les boutons sont masqués.
btnPdf.addEventListener('click', () => {
  // On vérifie d'abord que les champs importants sont remplis
  const erreur = verifierChampsObligatoires();
  if (erreur) {
    messageErreur.textContent = erreur;
    messageErreur.classList.remove('hidden'); // on affiche le message
    return; // on arrête là, pas d'export
  }
  messageErreur.classList.add('hidden'); // on cache le message s'il était visible

  // On s'assure que l'aperçu est bien à jour avant d'imprimer
  mettreAJour();

  // Le titre de la page devient le nom du fichier PDF proposé
  const ancienTitre = document.title;
  document.title = `Portfolio - ${formulaire.nom.value.trim()}`;

  window.print(); // ouvre la fenêtre d'impression

  // Une fois la fenêtre fermée, on remet le titre d'origine
  document.title = ancienTitre;
});

// ---------------------------------------------------------------------
// 6. AUTRES BOUTONS DU FORMULAIRE
// ---------------------------------------------------------------------
// Ajouter un projet : on passe mettreAJour pour rafraîchir l'aperçu ensuite
btnAjouterProjet.addEventListener('click', () => ajouterProjet(mettreAJour));

// Réinitialiser : on demande confirmation avant de tout effacer
btnReinitialiser.addEventListener('click', () => {
  if (confirm('Voulez-vous vraiment effacer toutes vos informations ?')) {
    reinitialiser(mettreAJour);
  }
});

// Lecture de la photo de profil
gererPhoto(mettreAJour);

// ---------------------------------------------------------------------
// 7. DÉMARRAGE
// ---------------------------------------------------------------------
// Premier affichage : le portfolio d'exemple apparaît tout de suite
// avec un modèle choisi au hasard (voir generator.js).
mettreAJour();
