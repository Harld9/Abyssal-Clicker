# 🐟 Abyssal Clicker

Un jeu de type clicker sur le thème des profondeurs marines. Affrontez des poissons de plus en plus redoutables, améliorez votre équipement et plongez toujours plus loin dans les abysses.

🎮 **Jouer en ligne** : [https://harld9.github.io/Abyssal-Clicker/](https://harld9.github.io/Abyssal-Clicker/)

---

## 🎮 Gameplay

- **Cliquez** sur le poisson pour lui infliger des dégâts
- **Tuez** des poissons pour gagner de l'argent et faire progresser votre score
- **Achetez** des améliorations de clic pour augmenter vos dégâts par clic
- **Achetez** des améliorations passives pour infliger des dégâts automatiquement
- **Débloquez** les 13 paliers de profondeur en atteignant les seuils de score
- **Collectionnez** les 72 succès

---

## ✨ Fonctionnalités

### Interface progressive
L'interface se révèle au fur et à mesure de la progression du joueur :
- Démarrage : seul le poisson et le bouton options sont visibles
- Succès 5 (palier 1) débloqué → la grille des succès apparaît
- Succès 3 (15 argents) débloqué → les améliorations de clic apparaissent
- Succès 4 (25 argents) débloqué → les améliorations passives apparaissent
- Succès 6 (palier 2) débloqué → la barre de navigation des paliers apparaît

### Système d'achat par quantité
Trois boutons permettent d'acheter des améliorations en **x1**, **x10** ou **x100** d'un coup, avec calcul du prix total cumulé.

### Animations
- Animation de clic avec flash rouge sur le poisson
- Animation des dégâts passifs avec quatre demi-cercles aux coins
- Glissement des sections depuis la droite lors de leur apparition
- Popups de succès style Steam qui glissent depuis le bas

### Système de raretés
Chaque poisson a une chance d'apparaître en version spéciale :
- **Normal** : 85% — argent x1
- **Golden** : 10% — argent x10
- **Shiny** : 5% — argent x20

---

## 🌊 Les 13 paliers

| Palier | Nom | Seuil de score |
|--------|-----|---------------|
| 1 | Les portes de la mer s'ouvre | 0 |
| 2 | Les pieds dans l'eau | 25 |
| 3 | Baptême marin | 125 |
| 4 | L'horizon s'efface | 275 |
| 5 | Le soleil pâlit | 515 |
| 6 | La lumière hésite | 865 |
| 7 | Le silence commence | 1345 |
| 8 | Les ombres parlent | 1975 |
| 9 | Quelque chose remonte | 2775 |
| 10 | Ne regarde pas en bas | 3855 |
| 11 | Il n'y a plus de surface | 5255 |
| 12 | Tu n'aurais pas dû descendre | 7125 |
| 13 | Les abysses t'ont choisi | 9525 |

---

## 🏆 Les 72 succès

Les succès sont organisés en plusieurs catégories avec un système de **révélation progressive** — seuls les succès atteignables sont affichés, les autres restent cachés jusqu'à ce qu'ils deviennent accessibles.

| Catégorie | Numéros | Description |
|-----------|---------|-------------|
| Généraux | 1 à 4 | Premier poisson, premier argent, déblocage des améliorations |
| Paliers | 5 à 17 | Un succès par palier de profondeur (1 à 13) |
| Achat clic 1× | 18 à 29 | Premier achat de chaque amélioration de clic |
| Achat clic 100× | 30 à 41 | Posséder 100 exemplaires de chaque amélioration de clic |
| Achat passif 1× | 42 à 53 | Premier achat de chaque amélioration passive |
| Achat passif 100× | 54 à 65 | Posséder 100 exemplaires de chaque amélioration passive |
| Collection | 66 à 71 | Avoir acheté toutes les améliorations (1× ou 100×, clic et/ou passif) |
| Final | 72 | Obtenir tous les autres succès |

Chaque déblocage de succès déclenche un toast notification avec l'emoji, le nom et l'objectif.

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
| `modele/jeu.js` | État du jeu, logique métier, calculs, vérification des succès |
| `vue/jeu.js` | Mise à jour du DOM, génération des items et succès, animations |
| `controller/jeu.js` | Événements, coordination modèle ↔ vue, chargement de la sauvegarde |
| `static/js/jeu.js` | Autosauvegarde, modale options |

---

## 💾 Sauvegarde

La progression est sauvegardée automatiquement toutes les **5 secondes** dans le `localStorage` sous forme encodée en base64 (avec `encodeURIComponent` pour supporter les emojis).

Il est possible d'**exporter** et d'**importer** manuellement une sauvegarde via le menu options (⚙️) :
- **Récupérer ma sauvegarde** — copie le code dans le presse-papier
- **Utiliser ma sauvegarde** — colle un code pour restaurer une progression

---

## 🚀 Lancer le projet

Le jeu est jouable directement en ligne via **GitHub Pages** : [https://harld9.github.io/Abyssal-Clicker/](https://harld9.github.io/Abyssal-Clicker/)

Pour le lancer localement, aucune dépendance ni build n'est requis. Ouvre simplement `index.html` dans un navigateur.

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

- **Florian AZRIA** — Logique du jeu et système de progression
- **Harold FRANCOIS** — Gestion de la sauvegarde et création des assets
- **Emrick RIVET** — Front-end HTML/CSS et conception de l'interface