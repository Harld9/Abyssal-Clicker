# 🐟 Abyssal Clicker

Un jeu de type clicker sur le thème des profondeurs marines. Affrontez des poissons de plus en plus redoutables, améliorez votre équipement et plongez toujours plus loin dans les abysses.

---

## 🎮 Gameplay

- **Cliquez** sur le poisson pour lui infliger des dégâts
- **Tuez** des poissons pour gagner de l'argent et faire progresser votre score
- **Achetez** des améliorations de clic pour augmenter vos dégâts par clic
- **Achetez** des améliorations passives pour infliger des dégâts automatiquement
- **Débloquez** les 13 paliers de profondeur en atteignant les seuils de score
- **Collectionnez** les 74 succès

---

## 🌊 Les 13 paliers

| Palier | Nom | Seuil de score |
|--------|-----|---------------|
| 1 | Les portes de la mer s'ouvre | 0 |
| 2 | Les pieds dans l'eau | 10 |
| 3 | Baptême marin | 25 |
| 4 | L'horizon s'efface | 45 |
| 5 | Le soleil pâlit | 70 |
| 6 | La lumière hésite | 100 |
| 7 | Le silence commence | 140 |
| 8 | Les ombres parlent | 190 |
| 9 | Quelque chose remonte | 250 |
| 10 | Ne regarde pas en bas | 320 |
| 11 | Il n'y a plus de surface | 400 |
| 12 | Tu n'aurais pas dû descendre | 500 |
| 13 | Les abysses t'ont choisi | 650 |

---

## 🗂️ Structure du projet

```
projet/
├── index.html
├── static/
│   ├── css/
│   │   ├── main.css
│   │   └── index.css
│   ├── background/
│   ├── images/
│   │   ├── poissons/
│   │   ├── items/
│   │   └── ui/
│   └── js/
│       └── jeu.js
├── modele/
│   └── jeu.js
├── vue/
│   └── jeu.js
└── controller/
    └── jeu.js
```

---

## ⚙️ Architecture

Le projet suit une architecture **MVC** (Modèle - Vue - Contrôleur) :

| Fichier | Rôle |
|---------|------|
| `modele/jeu.js` | État du jeu, logique métier, calculs |
| `vue/jeu.js` | Mise à jour du DOM, affichage |
| `controller/jeu.js` | Événements, coordination modèle ↔ vue |
| `static/js/jeu.js` | Autosauvegarde, modale options |

---

## 💾 Sauvegarde

La progression est sauvegardée automatiquement toutes les **5 secondes** dans le `localStorage` sous forme encodée en base64.

Il est possible d'**exporter** et d'**importer** manuellement une sauvegarde via le menu options (⚙️) :
- **Récupérer ma sauvegarde** — copie le code dans le presse-papier
- **Utiliser ma sauvegarde** — colle un code pour restaurer une progression

---

## 🚀 Lancer le projet

Aucune dépendance, aucun build requis. Ouvre simplement `index.html` dans un navigateur.

Pour éviter les restrictions de sécurité sur les fichiers locaux, utilise un serveur local :

```bash
# avec Node.js
npx serve .

# avec Python
python -m http.server 8080
```

Ou avec l'extension **Live Server** sur VS Code.

---

## 👥 Équipe

Projet réalisé dans le cadre d'un cours à **Ynov Campus**.