# 🎨 Portfolio Generator

Générateur de portfolio automatique : l'utilisateur remplit un formulaire et son portfolio est généré instantanément avec un **modèle choisi au hasard**.

Projet réalisé en groupe de 3 avec **HTML**, **JavaScript** et **Tailwind CSS v4** (via **Vite**).

## ✨ Fonctionnalités

- 📝 Formulaire complet : identité, photo, compétences, projets (ajout dynamique), contacts
- 👀 **Aperçu en direct** pendant la saisie
- 🎲 **4 modèles aléatoires** : Minimal, Moderne, Sombre, Créatif
- 🔄 Bouton **« Changer de modèle »** qui garde les mêmes données
- 📄 **Export en PDF** (via la fenêtre d'impression du navigateur)
- 📱 Interface responsive (ordinateur, tablette, téléphone)
- 🔒 Textes sécurisés contre les injections de code (XSS)

## 🚀 Lancer le projet en local

Prérequis : [Node.js](https://nodejs.org) version 20 ou plus.

```bash
npm install      # installe Vite et Tailwind (une seule fois)
npm run dev      # lance le site sur http://localhost:5173
npm run build    # crée la version finale dans le dossier dist/
```

## 📂 Structure

```
portfolio-generator/
├── index.html              → page : formulaire + aperçu + boutons
├── src/
│   ├── main.js             → relie tout (événements, boutons)
│   ├── form.js             → lecture du formulaire, projets, photo
│   ├── generator.js        → choix aléatoire du modèle
│   ├── utils.js            → fonctions utiles (sécurité, initiales…)
│   ├── style.css           → import de Tailwind + règles d'impression
│   └── templates/
│       ├── minimal.js      → modèle de base (à copier pour en créer un)
│       ├── moderne.js
│       ├── sombre.js
│       └── creatif.js
├── vite.config.js
└── package.json
```

## ➕ Ajouter un nouveau modèle

1. Copier `src/templates/minimal.js` → `src/templates/mon-modele.js`
2. Renommer l'objet exporté et changer `nom` et le HTML
3. Dans `src/generator.js` : l'importer et l'ajouter au tableau `MODELES`

⚠️ Toujours écrire les classes Tailwind en entier (`bg-red-500`, jamais `"bg-" + couleur`).

## 👥 Répartition des tâches

| Membre | Rôle |
|---|---|
| Membre 1 | Formulaire, projets dynamiques, photo, aperçu en direct (`form.js`, `index.html`) |
| Membre 2 | Modèles de portfolio (`src/templates/`) |
| Membre 3 | Générateur, boutons, export PDF, Git, déploiement Vercel (`generator.js`, `main.js`) |

## 🌿 Versionning (Git)

### Branches
- `main` → version stable, déployée automatiquement sur Vercel
- `develop` → intégration du travail de l'équipe
- `feature/nom-de-la-fonctionnalite` → une branche par tâche

### Mise en place (une seule fois, par le Membre 3)

```bash
git init
git add .
git commit -m "chore: initialisation du projet"
git branch -M main
git remote add origin https://github.com/VOTRE-GROUPE/portfolio-generator.git
git push -u origin main
git checkout -b develop
git push -u origin develop
```

Puis sur GitHub : **Settings → Collaborators** → ajouter les 2 autres membres.

### Les autres membres récupèrent le projet

```bash
git clone https://github.com/VOTRE-GROUPE/portfolio-generator.git
cd portfolio-generator
npm install
git checkout develop
```

### Travailler sur une fonctionnalité

```bash
git checkout develop
git pull                                  # récupérer le travail des autres
git checkout -b feature/template-nature   # créer sa branche
# ... coder ...
git add .
git commit -m "feat: ajout du modèle nature"
git push -u origin feature/template-nature
```

Ensuite sur GitHub : ouvrir une **Pull Request** vers `develop`. Un autre membre la relit puis la fusionne.

### Convention des messages de commit

| Préfixe | Utilisation |
|---|---|
| `feat:` | nouvelle fonctionnalité |
| `fix:` | correction de bug |
| `style:` | changement visuel |
| `docs:` | documentation |
| `refactor:` | réorganisation du code sans changer le comportement |
| `chore:` | configuration, dépendances |

### Publier une version (tag)

```bash
git checkout main
git pull
git merge develop
git tag -a v1.0.0 -m "Version 1.0.0 : formulaire, 4 modèles, aperçu, PDF"
git push origin main --tags
```

Numérotation `MAJEUR.MINEUR.CORRECTIF` :
- `v1.0.1` → petite correction
- `v1.1.0` → nouvelle fonctionnalité (ex : nouveau modèle)
- `v2.0.0` → gros changement

## ☁️ Déploiement sur Vercel (gratuit)

1. Aller sur [vercel.com](https://vercel.com) et se connecter avec GitHub
2. **Add New → Project** → importer `portfolio-generator`
3. Vercel détecte Vite automatiquement :
   - Build Command : `npm run build`
   - Output Directory : `dist`
4. Cliquer sur **Deploy**

Chaque `push` sur `main` met le site à jour automatiquement, et chaque Pull Request reçoit un lien de prévisualisation pour tester avant de fusionner.

🔗 Site en ligne : _ajouter le lien Vercel ici_

## 📄 Comment exporter en PDF

Cliquer sur **📄 Exporter en PDF**, puis dans la fenêtre d'impression :
- Destination : **Enregistrer au format PDF**
- Dans « Plus de paramètres », cocher **Graphiques d'arrière-plan** si les couleurs n'apparaissent pas
