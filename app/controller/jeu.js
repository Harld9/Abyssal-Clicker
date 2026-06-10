const controller = {

    initialiser() {
        const bouton = document.getElementById("imgPoisson")
        bouton.addEventListener("click", function () {
            modele.frapperPoisson(modele.joueur.dommagesActuels);
            vue.damageFish();

            vue.updateScore(modele.obtenirScore());
            vue.updateClic(modele.obtenirNbClics());
            vue.updateArgent(modele.joueur.argent);
            vue.updateFish(modele.obtenirFish());

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
                vue.updateBoutonsPaliers(modele.joueur.palierActuelAffiche, modele.joueur.palier);
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

                zone.querySelectorAll(".btn-quantite").forEach(function (btn) {
                    btn.classList.remove("actif");
                });

                bouton.classList.add("actif");
            });
        });

        modele.degat_passif();

        const item_clic1 = document.getElementById("a-clic-1");
        item_clic1.addEventListener("click", function () {
            modele.ajout_item_Clic("amelioration_1");
            vue.updateArgent(modele.joueur.argent);
            console.log(modele.obteniritem_Clic("amelioration_1").quantitePossedee
            );

        });
        const itempassif1 = document.getElementById("a-passif-1");
        itempassif1.addEventListener("click", function () {
            modele.ajout_item_Passif("amelioration_1");
            vue.updateArgent(modele.joueur.argent);
            console.log(modele.obteniritem_Passif("amelioration_1").quantitePossedee
            );

        });

        let options = document.getElementById('recup-sauvegarde')
        options.addEventListener("click", function () {
            console.log("Sauvegarde Exporté");
            modele.exporterDonneesSauvegarde()
            let codeSauvegarde = document.getElementById('output-sauvegarde')
            navigator.clipboard.writeText(codeSauvegarde.textContent)
        });
    },

    chargerPartie() {
        if (localStorage.getItem("maSauvegarde") === null) return
        const donnees = JSON.parse(atob(localStorage.getItem("maSauvegarde")))
        console.log("Données de la fonction charger partie : " + donnees)
        modele.importerDonneesSauvegarde(donnees)
        vue.updateScore(modele.obtenirScore())
        vue.updateFish(modele.obtenirFish())
        vue.updateClic(modele.obtenirNbClics())
        //Penser a faire le getter
        vue.updateArgent(modele.joueur.argent)
    },

    sauvegarderPartie() {
        const encode = btoa(JSON.stringify(modele.obtenirEtatPartie()))
        localStorage.setItem("maSauvegarde", encode)
    }
}

controller.chargerPartie()
controller.initialiser()