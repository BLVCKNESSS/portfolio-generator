// =====================================================================
// form.js — Tout ce qui concerne le FORMULAIRE
// ---------------------------------------------------------------------
// Responsable : Membre 1
//
// Ce fichier s'occupe de :
//   1. Lire les valeurs saisies et les transformer en un objet "data"
//   2. Ajouter / supprimer des projets dynamiquement
//   3. Lire la photo choisie et la convertir en image affichable
//   4. Vérifier que les champs obligatoires sont remplis
//
// L'objet "data" renvoyé a TOUJOURS la même forme. Les modèles (templates)
// s'appuient dessus, donc si vous ajoutez un champ, pensez à le documenter ici :
//
//   {
//     nom:         "Marie Ngono",
//     titre:       "Développeuse web",
//     bio:         "Passionnée par…",
//     photo:       "data:image/png;base64,…"  (ou "" s'il n'y en a pas)
//     competences: ["HTML", "CSS", "JavaScript"],
//     projets:     [{ titre: "…", description: "…", lien: "https://…" }],
//     email, telephone, github, linkedin : chaînes de caractères
//   }
// =====================================================================

// On récupère une seule fois les éléments HTML dont on a besoin
const formulaire = document.getElementById('formulaire');
const listeProjets = document.getElementById('liste-projets');

// La photo est stockée ici après lecture (format "data URL" : l'image
// est transformée en un long texte que le navigateur sait afficher).
let photoData = '';

// ---------------------------------------------------------------------
// Valeurs d'exemple : affichées dans l'aperçu tant que le champ est vide.
// Ainsi, l'utilisateur voit tout de suite à quoi ressemble le modèle.
// ---------------------------------------------------------------------
const EXEMPLE = {
  nom: 'Votre Nom',
  titre: 'Votre métier',
  bio: 'Présentez-vous en quelques phrases : votre parcours, ce qui vous passionne et ce que vous recherchez.',
  competences: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS'],
  projets: [
    {
      titre: 'Exemple de projet',
      description: 'Décrivez ici un projet dont vous êtes fier(e) et ce que vous y avez appris.',
      lien: '',
    },
  ],
};

/**
 * lireDonnees() — Lit tout le formulaire et renvoie l'objet "data".
 * Appelée à chaque modification pour mettre à jour l'aperçu en direct.
 *
 * @returns {object} Les informations de l'utilisateur
 */
export function lireDonnees() {
  // FormData lit automatiquement tous les champs qui ont un attribut "name"
  const f = new FormData(formulaire);

  // Petite fonction pour lire un champ texte en enlevant les espaces inutiles
  const lire = (nom) => (f.get(nom) || '').toString().trim();

  // Les compétences sont tapées sous forme "HTML, CSS, JS" :
  // on coupe à chaque virgule, on nettoie et on retire les cases vides.
  const competences = lire('competences')
    .split(',')
    .map((c) => c.trim())
    .filter(Boolean);

  // On parcourt chaque bloc de projet ajouté dynamiquement
  const projets = [...listeProjets.querySelectorAll('[data-projet]')]
    .map((bloc) => ({
      titre: bloc.querySelector('[data-champ="titre"]').value.trim(),
      description: bloc.querySelector('[data-champ="description"]').value.trim(),
      lien: bloc.querySelector('[data-champ="lien"]').value.trim(),
    }))
    // On ignore les projets complètement vides
    .filter((p) => p.titre || p.description);

  // On construit l'objet final. L'opérateur "||" signifie :
  // "si la valeur est vide, utilise la valeur d'exemple à la place".
  return {
    nom: lire('nom') || EXEMPLE.nom,
    titre: lire('titre') || EXEMPLE.titre,
    bio: lire('bio') || EXEMPLE.bio,
    photo: photoData,
    competences: competences.length ? competences : EXEMPLE.competences,
    projets: projets.length ? projets : EXEMPLE.projets,
    email: lire('email'),
    telephone: lire('telephone'),
    github: lire('github'),
    linkedin: lire('linkedin'),
  };
}

/**
 * verifierChampsObligatoires() — Vérifie le nom et le titre avant l'export PDF.
 * (Pour l'aperçu, on accepte les champs vides grâce aux valeurs d'exemple.)
 *
 * @returns {string} Un message d'erreur, ou '' si tout est correct
 */
export function verifierChampsObligatoires() {
  const nom = formulaire.nom.value.trim();
  const titre = formulaire.titre.value.trim();
  if (!nom || !titre) {
    return 'Veuillez remplir au moins votre nom et votre titre avant d’exporter.';
  }
  return '';
}

/**
 * ajouterProjet() — Ajoute un nouveau bloc "projet" dans le formulaire.
 * Chaque bloc contient : un titre, une description, un lien et un bouton "Supprimer".
 *
 * @param {Function} surChangement - Fonction à appeler après l'ajout/suppression
 *                                   (pour mettre l'aperçu à jour)
 */
export function ajouterProjet(surChangement) {
  // On crée un <div> qui contiendra les champs du projet
  const bloc = document.createElement('div');

  // L'attribut "data-projet" permet de retrouver facilement tous les blocs
  // dans lireDonnees() (avec querySelectorAll('[data-projet]')).
  bloc.setAttribute('data-projet', '');
  bloc.className = 'relative space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-3';

  // Contenu HTML du bloc. Les attributs "data-champ" servent à identifier chaque champ.
  // Remarque : ces champs n'ont PAS d'attribut "name", on les lit à la main.
  bloc.innerHTML = `
    <input data-champ="titre" type="text" placeholder="Nom du projet"
           class="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm
                  focus:outline-none focus:ring-2 focus:ring-indigo-500" />
    <textarea data-champ="description" rows="2" placeholder="Courte description"
              class="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
    <input data-champ="lien" type="url" placeholder="Lien (optionnel) : https://…"
           class="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm
                  focus:outline-none focus:ring-2 focus:ring-indigo-500" />
    <button type="button" data-supprimer
            class="text-xs text-red-600 hover:underline">Supprimer ce projet</button>
  `;

  // Quand on clique sur "Supprimer", on retire le bloc puis on met l'aperçu à jour
  bloc.querySelector('[data-supprimer]').addEventListener('click', () => {
    bloc.remove();
    surChangement();
  });

  // On ajoute le bloc dans la liste et on place le curseur dans le 1er champ
  listeProjets.appendChild(bloc);
  bloc.querySelector('[data-champ="titre"]').focus();
  surChangement();
}

/**
 * gererPhoto() — Lit l'image choisie par l'utilisateur.
 * ---------------------------------------------------------------------
 * FileReader lit le fichier et le transforme en "data URL" (texte).
 * Avantage : l'image est intégrée directement dans la page, pas besoin
 * de serveur pour l'enregistrer. Elle apparaîtra aussi dans le PDF.
 *
 * @param {Function} surChangement - Fonction à appeler quand l'image est prête
 */
export function gererPhoto(surChangement) {
  formulaire.photo.addEventListener('change', (evenement) => {
    const fichier = evenement.target.files[0]; // le fichier choisi

    // Si l'utilisateur annule, on enlève la photo
    if (!fichier) {
      photoData = '';
      surChangement();
      return;
    }

    // Sécurité : on vérifie que c'est bien une image
    if (!fichier.type.startsWith('image/')) return;

    const lecteur = new FileReader();
    // "onload" est appelé quand la lecture est terminée (c'est asynchrone)
    lecteur.onload = () => {
      photoData = lecteur.result;
      surChangement();
    };
    lecteur.readAsDataURL(fichier); // on lance la lecture
  });
}

/**
 * reinitialiser() — Vide tout le formulaire (champs, projets et photo).
 *
 * @param {Function} surChangement - Fonction à appeler après l'effacement
 */
export function reinitialiser(surChangement) {
  formulaire.reset();          // vide les champs classiques
  listeProjets.innerHTML = ''; // supprime tous les blocs de projets
  photoData = '';              // oublie la photo
  surChangement();
}
