const controller = {

    initialiser() {
        const bouton = document.getElementById("imgPoisson")
        // Au click sur le bouton, on appelle le modèle on rajoute 1 au score et on met à jour le résultat dans la vue
        bouton.addEventListener("click", function () {
            modele.frapperPoisson(modele.joueur.dommagesActuels, true)
            vue.damageFish()

            vue.updateScore(modele.obtenirMortPoisson());
            vue.updateArgent(modele.joueur.argent);
            vue.updateClic(modele.obtenirNbClics());
            vue.updateFish(modele.obtenirFish())
            vue.updateAmeliorations(modele.joueur.argent)
            vue.updateBoutonsPaliers(modele.joueur.palierActuelAffiche, modele.joueur.palier);


        })

        this.degat_passif()

        for (let i = 1; i <= 13; i++) {
            const boutonPalier = document.getElementById("palier-" + i);

            boutonPalier.addEventListener("click", function () {
                modele.changerPalier(i);

                vue.updateFondPalier(modele.joueur.palierActuelAffiche);
                vue.updateFish(modele.obtenirFish());
                vue.updateBoutonsPaliers(modele.joueur.palierActuelAffiche, modele.joueur.palier);
            });
        }

        const boutonsQuantite = document.querySelectorAll(".btn-quantite");

        boutonsQuantite.forEach(function (bouton) {
            bouton.addEventListener("click", function () {
                const quantite = Number(bouton.dataset.quantite);

                const zone = bouton.closest("#a-clic, #a-passif");

                if (zone.id === "a-clic") modele.joueur.quantiteAchatClic = quantite;
                if (zone.id === "a-passif") modele.joueur.quantiteAchatPassif = quantite;

                vue.updateBoutonsQuantite(zone, bouton)
            });
        });

        // Achat de l'amélioration clic 1
        const item_clic1 = document.getElementById("a-clic-1");
        item_clic1.addEventListener("click", function () {
            modele.ajout_item_Clic("amelioration_1");

            vue.updateArgent(modele.joueur.argent);
            vue.updateAmeliorations(modele.joueur.argent);
            vue.updateDegatsClick(modele.joueur.dommagesActuels);

            console.log(modele.obteniritem_Clic("amelioration_1").quantitePossedee);

        });

        // Achat de l'amélioration passif 1
        const itempassif1 = document.getElementById("a-passif-1");
        itempassif1.addEventListener("click", function () {
            modele.ajout_item_Passif("amelioration_1");

            vue.updateArgent(modele.joueur.argent);
            vue.updateAmeliorations(modele.joueur.argent);
            vue.updateDegatsPassif(modele.joueur.inventaireObjetPassif);

            console.log(modele.obteniritem_Passif("amelioration_1").quantitePossedee);

        });

        let exportSauvegarde = document.getElementById('recup-sauvegarde')
        exportSauvegarde.addEventListener("click", function () {
            console.log("Sauvegarde Exportée");
            let sauvegardePartieEncode = modele.exporterDonneesSauvegarde()

            vue.updateCodeSauvegarde(sauvegardePartieEncode)

            navigator.clipboard.writeText(sauvegardePartieEncode)
        });

        let importSauvegarde = document.getElementById('ajout-sauvegarde')
        let inputSauvegarde = document.getElementById('input-sauvegarde')
        importSauvegarde.addEventListener("click", function () {
            console.log("Sauvegarde Importée");
            let donneesImportees = JSON.parse(atob(inputSauvegarde.value))
            modele.importerDonneesSauvegarde(donneesImportees)
            console.log("Sauvegarde importée avec ces données : " + donneesImportees);

            vue.updateArgent(modele.joueur.argent)
            vue.updateClic(modele.joueur.nbClics)
            vue.updateScore(modele.joueur.score)
            vue.updateFish(modele.obtenirFish())
        });
        modele.initialiserNouvellePartie()
    },

    chargerPartie() {
        if (localStorage.getItem("maSauvegarde") === null) {
            return
        }
        const donnees = JSON.parse(atob(localStorage.getItem("maSauvegarde")))
        console.log("Données de la fonction charger partie : " + donnees)
        modele.importerDonneesSauvegarde(donnees)

        vue.updateScore(modele.obtenirScore())
        vue.updateArgent(modele.joueur.argent)
        vue.updateFish(modele.obtenirFish())
        vue.updateClic(modele.obtenirNbClics())
        vue.updateAmeliorations(modele.joueur.argent)
        vue.updateBoutonsPaliers(modele.joueur.palierActuelAffiche, modele.joueur.palier);
        vue.updateFondPalier(modele.joueur.palierActuelAffiche)
        vue.updateDegatsClick(modele.joueur.dommagesActuels);
        vue.updateDegatsPassif(modele.joueur.inventaireObjetPassif);
    },

    sauvegarderPartie() {
        const encode = btoa(JSON.stringify(modele.obtenirEtatPartie()))
        localStorage.setItem("maSauvegarde", encode)
    },
    degat_passif() {
        setInterval(function () {
            if (modele.joueur.passifBonusDPS > 0) {
                modele.frapperPoisson(modele.joueur.passifBonusDPS);

                vue.damageFishPassif();
                vue.updateScore(modele.obtenirMortPoisson());
                vue.updateArgent(modele.joueur.argent);
                vue.updateFish(modele.obtenirFish());
            }
        }, 200);
    }

}

controller.chargerPartie()
controller.initialiser()