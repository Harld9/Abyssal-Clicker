const controller = {

    initialiser() {
        modele.initialiserNouvellePartie();

        vue.creerItems("clic", modele.joueur.inventaireObjetClic);
        vue.creerItems("passif", modele.joueur.inventaireObjetPassif);
        this.brancherItems();
        vue.updateAmeliorations(modele.joueur.argent);

        const bouton = document.getElementById("imgPoisson");

        bouton.addEventListener("click", function () {
            modele.frapperPoisson(modele.joueur.dommagesActuels, true, true);
            vue.damageFish();

            vue.updateScore(modele.obtenirScore());
            vue.updateClic(modele.obtenirNbClics());
            vue.updateArgent(modele.joueur.argent);
            vue.updateFish(modele.obtenirFish());
            vue.updateAmeliorations(modele.joueur.argent);

            vue.updateBoutonsPaliers(
                modele.joueur.palierActuelAffiche,
                modele.joueur.palier
            );
        });

        for (let i = 1; i <= 13; i++) {
            const boutonPalier = document.getElementById("palier-" + i);

            boutonPalier.addEventListener("click", function () {
                modele.changerPalier(i);

                vue.updateFish(modele.obtenirFish());
                vue.updateFondPalier(modele.joueur.palierActuelAffiche);
                vue.updateBoutonsPaliers(
                    modele.joueur.palierActuelAffiche,
                    modele.joueur.palier
                );
            });
        }

        const boutonsQuantite = document.querySelectorAll(".btn-quantite");

        boutonsQuantite.forEach(function (bouton) {
            bouton.addEventListener("click", function () {
                const quantite = Number(bouton.dataset.quantite);
                const zone = bouton.closest("#a-clic, #a-passif");

                if (zone.id === "a-clic") {
                    modele.joueur.quantiteAchatClic = quantite;
                }

                if (zone.id === "a-passif") {
                    modele.joueur.quantiteAchatPassif = quantite;
                }

                vue.updateBoutonsQuantite(zone, bouton);
                vue.creerItems("clic", modele.joueur.inventaireObjetClic);
                vue.creerItems("passif", modele.joueur.inventaireObjetPassif);
                controller.brancherItems();
                vue.updateAmeliorations(modele.joueur.argent);
            });
        });

        let exportSauvegarde = document.getElementById("recup-sauvegarde");

        exportSauvegarde.addEventListener("click", function () {
            console.log("Sauvegarde Exportée");

            let sauvegardePartieEncode = modele.exporterDonneesSauvegarde();

            vue.updateCodeSauvegarde(sauvegardePartieEncode);
            navigator.clipboard.writeText(sauvegardePartieEncode);
        });

        let importSauvegarde = document.getElementById("ajout-sauvegarde");
        let inputSauvegarde = document.getElementById("input-sauvegarde");

        importSauvegarde.addEventListener("click", function () {
            console.log("Sauvegarde Importée");

            const donneesImportees = JSON.parse(atob(inputSauvegarde.value));

            modele.importerDonneesSauvegarde(donneesImportees);

            vue.updateArgent(modele.joueur.argent);
            vue.updateClic(modele.joueur.nbClics);
            vue.updateScore(modele.joueur.score);
            vue.updateFish(modele.obtenirFish());

            vue.creerItems("clic", modele.joueur.inventaireObjetClic);
            vue.creerItems("passif", modele.joueur.inventaireObjetPassif);

            controller.brancherItems();

            vue.updateAmeliorations(modele.joueur.argent);
            vue.updateDegatsClick(modele.joueur.dommagesActuels);
            vue.updateDegatsPassif(modele.joueur.inventaireObjetPassif);
        });
    },

    brancherItems() {
        for (let i = 1; i <= 12; i++) {
            const blocClic = document.getElementById("a-clic-" + i);

            if (blocClic) {
                blocClic.addEventListener("click", function () {
                    modele.ajout_item_Clic("amelioration_" + i);

                    vue.creerItems("clic", modele.joueur.inventaireObjetClic);
                    vue.creerItems("passif", modele.joueur.inventaireObjetPassif);

                    controller.brancherItems();

                    vue.updateArgent(modele.joueur.argent);
                    vue.updateAmeliorations(modele.joueur.argent);
                    vue.updateDegatsClick(modele.joueur.dommagesActuels);
                });
            }

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

    chargerPartie() {
        if (localStorage.getItem("maSauvegarde") === null) return;

        const donnees = JSON.parse(atob(localStorage.getItem("maSauvegarde")));

        console.log("Données de la fonction charger partie : " + donnees);

        modele.importerDonneesSauvegarde(donnees);

        vue.updateScore(modele.obtenirScore());
        vue.updateFish(modele.obtenirFish());
        vue.updateClic(modele.obtenirNbClics());
        vue.updateArgent(modele.joueur.argent);

        vue.creerItems("clic", modele.joueur.inventaireObjetClic);
        vue.creerItems("passif", modele.joueur.inventaireObjetPassif);

        vue.updateAmeliorations(modele.joueur.argent);

        vue.updateBoutonsPaliers(
            modele.joueur.palierActuelAffiche,
            modele.joueur.palier
        );

        vue.updateDegatsClick(modele.joueur.dommagesActuels);
        vue.updateDegatsPassif(modele.joueur.inventaireObjetPassif);
        vue.updateFondPalier(modele.joueur.palierActuelAffiche);
    },

    sauvegarderPartie() {
        const encode = btoa(JSON.stringify(modele.obtenirEtatPartie()));
        localStorage.setItem("maSauvegarde", encode);
    },

    degat_passif() {
        setInterval(function () {
            if (modele.joueur.passifBonusDPS > 0) {
                // On joue uniquement l'animation des demi-cercles (coins)
                vue.damageFishPassif();

                // On applique les dégâts sans compter comme un clic manuel
                modele.frapperPoisson(modele.joueur.passifBonusDPS, false);

                // Mises à jour des affichages
                vue.updateScore(modele.obtenirScore());
                vue.updateClic(modele.obtenirNbClics());
                vue.updateArgent(modele.joueur.argent);
                vue.updateFish(modele.obtenirFish());
                vue.updateAmeliorations(modele.joueur.argent);
            }
        }, 200);
    },
};

controller.chargerPartie();
controller.initialiser();
controller.degat_passif();