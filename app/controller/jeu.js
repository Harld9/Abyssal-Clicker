// ============================================================
// controller/jeu.js
// Couche CONTRÔLEUR du pattern MVC.
// Coordonne le modèle et la vue, gère tous les événements utilisateur.
// ============================================================

const controller = {

    /**
     * Initialise le jeu :
     * - prépare le modèle (premier poisson, etc.)
     * - génère les éléments dans la vue (items, succès, paliers)
     * - branche tous les écouteurs d'événements (clics sur poisson, paliers, achats, etc.)
     */
    initialiser() {
        // 1️⃣ Initialisation côté modèle (création du premier poisson)
        modele.initialiserNouvellePartie();

        // 2️⃣ Génération des éléments visuels initiaux
        vue.creerItems("clic", modele.joueur.inventaireObjetClic);
        vue.creerItems("passif", modele.joueur.inventaireObjetPassif);
        // this fait référence à l'objet controller lui-même
        this.brancherItems(); // attache les listeners de clic sur les items créés
        vue.genererSucces(modele.joueur.succes)
        vue.updateAffichageInterface(modele.joueur.succes); // cache/montre les sections
        vue.updateAmeliorations(modele.joueur.argent);

        // ============================================================
        // ÉCOUTEUR 1 : Clic sur l'image du poisson
        // ============================================================
        const bouton = document.getElementById("imgPoisson");

        // addEventListener("click", callback) → exécute la fonction à chaque clic
        bouton.addEventListener("click", function () {
            // On frappe le poisson avec les dégâts actuels du joueur
            modele.frapperPoisson(modele.joueur.dommagesActuels, true, true);
            vue.damageFish(); // animation de dégât

            // On rafraîchit toutes les valeurs affichées
            vue.updateScore(modele.obtenirScore());
            vue.updateClic(modele.obtenirNbClics());
            vue.updateArgent(modele.joueur.argent);
            vue.updateFish(modele.obtenirFish());
            vue.updateAmeliorations(modele.joueur.argent);

            // Mise à jour des boutons paliers (si on a débloqué un nouveau palier)
            vue.updateBoutonsPaliers(
                modele.joueur.palierActuelAffiche,
                modele.joueur.palier
            );
        });

        // ============================================================
        // ÉCOUTEUR 2 : Clic sur les 13 boutons de paliers
        // ============================================================
        for (let i = 1; i <= 13; i++) {
            const boutonPalier = document.getElementById("palier-" + i);

            boutonPalier.addEventListener("click", function () {
                // i est "capturé" par la closure → chaque listener garde sa propre valeur de i
                modele.changerPalier(i);

                vue.updateFish(modele.obtenirFish()); // affiche le nouveau poisson
                vue.updateFondPalier(modele.joueur.palierActuelAffiche); // change le fond
                vue.updateBoutonsPaliers(
                    modele.joueur.palierActuelAffiche,
                    modele.joueur.palier
                );
            });
        }

        // ============================================================
        // ÉCOUTEUR 3 : Clic sur les boutons de quantité x1 / x10 / x100
        // ============================================================
        // querySelectorAll sélectionne TOUS les boutons avec la classe .btn-quantite
        const boutonsQuantite = document.querySelectorAll(".btn-quantite");

        boutonsQuantite.forEach(function (bouton) {
            bouton.addEventListener("click", function () {
                // dataset.quantite récupère l'attribut data-quantite du HTML
                // Number() convertit la chaîne en nombre
                const quantite = Number(bouton.dataset.quantite);

                // closest() remonte dans les parents jusqu'à trouver un élément qui correspond au sélecteur
                // Ici on cherche le conteneur parent (#a-clic ou #a-passif)
                const zone = bouton.closest("#a-clic, #a-passif");

                // On stocke la quantité dans le modèle selon la zone
                if (zone.id === "a-clic") {
                    modele.joueur.quantiteAchatClic = quantite;
                }

                if (zone.id === "a-passif") {
                    modele.joueur.quantiteAchatPassif = quantite;
                }

                // Mise à jour visuelle : surbrillance du bouton actif
                vue.updateBoutonsQuantite(zone, bouton);

                // On regénère les items pour mettre à jour les prix cumulés (x10, x100)
                vue.creerItems("clic", modele.joueur.inventaireObjetClic);
                vue.creerItems("passif", modele.joueur.inventaireObjetPassif);
                controller.brancherItems(); // rebrancher car les éléments ont été recréés
                vue.updateAmeliorations(modele.joueur.argent);
            });
        });

        // ============================================================
        // ÉCOUTEUR 4 : Bouton "Récupérer ma sauvegarde" (export)
        // ============================================================
        let exportSauvegarde = document.getElementById("recup-sauvegarde");

        exportSauvegarde.addEventListener("click", function () {
            console.log("Sauvegarde Exportée");

            // Le modèle retourne l'état encodé en base64
            let sauvegardePartieEncode = modele.exporterDonneesSauvegarde();

            // Affichage dans la modale
            vue.updateCodeSauvegarde(sauvegardePartieEncode);
            // navigator.clipboard.writeText copie automatiquement dans le presse-papier
            navigator.clipboard.writeText(sauvegardePartieEncode);
        });

        // ============================================================
        // ÉCOUTEUR 5 : Bouton "Utiliser ma sauvegarde" (import)
        // ============================================================
        let importSauvegarde = document.getElementById("ajout-sauvegarde");
        let inputSauvegarde = document.getElementById("input-sauvegarde");

        importSauvegarde.addEventListener("click", function () {
            console.log("Sauvegarde Importée");

            // Décodage en cascade :
            // 1. atob() décode du base64 vers une chaîne
            // 2. decodeURIComponent() décode les caractères spéciaux (emojis, accents)
            // 3. JSON.parse() convertit la chaîne JSON en objet JS
            const donneesImportees = JSON.parse(decodeURIComponent(atob(inputSauvegarde.value)));

            // Application dans le modèle
            modele.importerDonneesSauvegarde(donneesImportees);

            // Rafraîchissement complet de toute la vue
            vue.updateArgent(modele.joueur.argent);
            vue.updateClic(modele.joueur.nbClics);
            vue.updateScore(modele.joueur.score);
            vue.updateFish(modele.obtenirFish());

            vue.creerItems("clic", modele.joueur.inventaireObjetClic);
            vue.creerItems("passif", modele.joueur.inventaireObjetPassif);
            controller.brancherItems();

            // Régénération des succès + affichage progressif + paliers + fond
            vue.genererSucces(modele.joueur.succes);
            vue.updateAffichageInterface(modele.joueur.succes);
            vue.updateBoutonsPaliers(modele.joueur.palierActuelAffiche, modele.joueur.palier);
            vue.updateFondPalier(modele.joueur.palierActuelAffiche);

            vue.updateAmeliorations(modele.joueur.argent);
            vue.updateDegatsClick(modele.joueur.dommagesActuels);
            vue.updateDegatsPassif(modele.joueur.inventaireObjetPassif);
        });
    },

    /**
     * Branche les listeners de clic sur tous les items d'amélioration
     * Appelée à chaque fois qu'on regénère les items (achat, changement de quantité, etc.)
     *
     * Pourquoi rebrancher à chaque fois ? Parce que vue.creerItems() recrée les éléments HTML
     * et les anciens listeners sont perdus avec les anciens éléments
     */
    brancherItems() {
        for (let i = 1; i <= 12; i++) {
            // ----- AMÉLIORATIONS DE CLIC -----
            const blocClic = document.getElementById("a-clic-" + i);

            // L'item n'existe peut-être pas (item pas encore débloqué)
            if (blocClic) {
                blocClic.addEventListener("click", function () {
                    // Achat de l'item dans le modèle
                    modele.ajout_item_Clic("amelioration_" + i);

                    // Régénération de la vue (le prix a changé, peut-être un nouvel item débloqué)
                    vue.creerItems("clic", modele.joueur.inventaireObjetClic);
                    vue.creerItems("passif", modele.joueur.inventaireObjetPassif);

                    // Rebrancher les listeners sur les nouveaux items
                    controller.brancherItems();

                    // Mise à jour des affichages
                    vue.updateArgent(modele.joueur.argent);
                    vue.updateAmeliorations(modele.joueur.argent);
                    vue.updateDegatsClick(modele.joueur.dommagesActuels);
                });
            }

            // ----- AMÉLIORATIONS PASSIVES -----
            const blocPassif = document.getElementById("a-passif-" + i);

            if (blocPassif) {
                blocPassif.addEventListener("click", function () {
                    modele.ajout_item_Passif("amelioration_" + i);

                    vue.creerItems("clic", modele.joueur.inventaireObjetClic);
                    vue.creerItems("passif", modele.joueur.inventaireObjetPassif);

                    controller.brancherItems();

                    vue.updateArgent(modele.joueur.argent);
                    vue.updateAmeliorations(modele.joueur.argent);
                    vue.updateDegatsPassif(modele.joueur.inventaireObjetPassif);
                });
            }
        }
    },

    /**
     * Charge la sauvegarde du localStorage si elle existe
     * Appelée au démarrage du jeu, AVANT initialiser()
     */
    chargerPartie() {
        // Si pas de sauvegarde, on quitte la fonction (return sans valeur)
        if (localStorage.getItem("maSauvegarde") === null) return;

        // Récupération + décodage (3 étapes : base64 → URI → JSON)
        const donnees = JSON.parse(decodeURIComponent(atob(localStorage.getItem("maSauvegarde"))));

        console.log("Données de la fonction charger partie : " + donnees);

        // Import dans le modèle
        modele.importerDonneesSauvegarde(donnees);

        // ----- Rafraîchissement complet de la vue -----
        vue.updateScore(modele.obtenirScore());
        vue.updateFish(modele.obtenirFish());
        vue.updateClic(modele.obtenirNbClics());
        vue.updateArgent(modele.joueur.argent);

        vue.creerItems("clic", modele.joueur.inventaireObjetClic);
        vue.creerItems("passif", modele.joueur.inventaireObjetPassif);

        vue.genererSucces(modele.joueur.succes)
        vue.updateAffichageInterface(modele.joueur.succes);

        vue.updateAmeliorations(modele.joueur.argent);

        vue.updateBoutonsPaliers(
            modele.joueur.palierActuelAffiche,
            modele.joueur.palier
        );

        vue.updateDegatsClick(modele.joueur.dommagesActuels);
        vue.updateDegatsPassif(modele.joueur.inventaireObjetPassif);
        vue.updateFondPalier(modele.joueur.palierActuelAffiche);
    },

    /**
     * Sauvegarde l'état actuel du jeu dans le localStorage
     * Encodage en cascade pour gérer les emojis et caractères spéciaux :
     * JSON.stringify → encodeURIComponent → btoa (base64)
     */
    sauvegarderPartie() {
        // Encodage en 3 étapes :
        // 1. JSON.stringify() convertit l'objet en chaîne JSON
        // 2. encodeURIComponent() encode les caractères spéciaux (emojis, accents)
        // 3. btoa() encode en base64 (chaîne lisible / copiable)
        const encode = btoa(encodeURIComponent(JSON.stringify(modele.obtenirEtatPartie())));

        // localStorage.setItem stocke la donnée de façon persistante dans le navigateur
        localStorage.setItem("maSauvegarde", encode);
    },

    /**
     * Lance la boucle de dégâts passifs (timer qui tourne en continu)
     * Toutes les 50ms, si le joueur a des bonus passifs, on frappe le poisson
     */
    degat_passif() {
        // setInterval(fonction, ms) exécute la fonction à intervalle régulier (en boucle)
        // Différent de setTimeout qui ne l'exécute qu'une fois
        setInterval(function () {
            // Si le joueur a des dégâts passifs débloqués
            if (modele.joueur.passifBonusDPS > 0) {
                // Animation des demi-cercles aux coins (pas l'animation de clic)
                vue.damageFishPassif();

                // On applique les dégâts SANS incrémenter le compteur de clics (false)
                modele.frapperPoisson(modele.joueur.passifBonusDPS, false);

                // Rafraîchissement de tous les affichages
                vue.updateScore(modele.obtenirScore());
                vue.updateClic(modele.obtenirNbClics());
                vue.updateArgent(modele.joueur.argent);
                vue.updateFish(modele.obtenirFish());
                vue.updateAmeliorations(modele.joueur.argent);
                vue.updateBoutonsPaliers(modele.joueur.palierActuelAffiche, modele.joueur.palier);
            }
        }, 50); // 50ms = 20 ticks par seconde
    },
};

// ============================================================
// LANCEMENT DU JEU
// Ordre IMPORTANT :
// 1. chargerPartie() — charge la sauvegarde dans le modèle si elle existe
// 2. initialiser() — branche tous les listeners et affiche le jeu
// 3. degat_passif() — lance la boucle des dégâts passifs
// ============================================================
controller.chargerPartie();
controller.initialiser();
controller.degat_passif();