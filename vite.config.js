// =====================================================================
// vite.config.js — Configuration de Vite
// ---------------------------------------------------------------------
// Vite est l'outil qui :
//   - lance un serveur de développement rapide (commande : npm run dev)
//   - prépare la version finale optimisée du site (commande : npm run build)
//     → les fichiers finaux sont placés dans le dossier "dist/",
//       c'est ce dossier que Vercel mettra en ligne.
// =====================================================================

// defineConfig sert simplement à avoir l'autocomplétion dans l'éditeur
import { defineConfig } from 'vite';

// Le plugin officiel de Tailwind CSS v4 pour Vite.
// Il lit nos fichiers (HTML et JS), repère les classes Tailwind utilisées
// (ex : "bg-indigo-600", "text-xl") et génère UNIQUEMENT le CSS nécessaire.
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // On active le plugin Tailwind
  plugins: [tailwindcss()],
});
