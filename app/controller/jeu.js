const controller = {

    initialiser() {
        const bouton = document.getElementById("imgPoisson")
        // Au click sur le bouton, on appelle le modèle on rajoute 1 au score et on met à jour le résultat dans la vue
        bouton.addEventListener("click", function () {
            modele.frapperPoisson(modele.joueur.dommagesActuels)
            vue.damageFish()
<<<<<<< HEAD
            let score = modele.obtenirScore()
=======
            let resultat = modele.obtenirNbClics()
            vue.updateScore(resultat)
>>>>>>> b7e5ec4a20216690d5fa94eadc1854cce0fec7ef
            let mortPoisson = modele.obtenirMortPoisson()
            vue.updateScore(mortPoisson)
            // On récupère l'argent actuel du modèle et on le met à jour dans la vue
            let argent = modele.joueur.argent;
            vue.updateArgent(argent);
            // On récupère le poisson actuel du modèle et on le met à jour dans la vue
            let poisson = modele.obtenirFish()
            vue.updateFish(poisson)
            vue.updateBoutonsPaliers(modele.joueur.palierActuelAffiche, modele.joueur.palier);

            let nbClic = modele.obtenirNbClics()
            vue.updateClic(nbClic);


        })

<<<<<<< HEAD
        this.degat_passif()

=======
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
>>>>>>> b7e5ec4a20216690d5fa94eadc1854cce0fec7ef

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

<<<<<<< HEAD
        let exportSauvegarde = document.getElementById('recup-sauvegarde')
        exportSauvegarde.addEventListener("click", function () {
            console.log("Sauvegarde Exportée");
            let sauvegardePartieEncodé = modele.exporterDonneesSauvegarde()
            vue.updateCodeSauvegarde(sauvegardePartieEncodé)
            navigator.clipboard.writeText(sauvegardePartieEncodé)
=======
        let options = document.getElementById('recup-sauvegarde')
        options.addEventListener("click", function () {
            console.log("Sauvegarde Exporté");
            modele.exporterDonneesSauvegarde()
            let codeSauvegarde = document.getElementById('output-sauvegarde')
            navigator.clipboard.writeText(codeSauvegarde.textContent)
>>>>>>> b7e5ec4a20216690d5fa94eadc1854cce0fec7ef
        });

        let importSauvegarde = document.getElementById('ajout-sauvegarde')
        let inputSauvegarde = document.getElementById('input-sauvegarde')
        importSauvegarde.addEventListener("click", function () {
            console.log("Sauvegarde Importée");
            donneesImportees = JSON.parse(atob(inputSauvegarde.value))
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
    },
    degat_passif() {
        setInterval(function () {
            if (modele.joueur.passifBonusDPS > 0) {
                vue.damageFish();
                modele.frapperPoisson(modele.joueur.passifBonusDPS);
                vue.updateArgent(modele.joueur.argent);
                vue.updateFish(modele.obtenirFish());
                vue.updateScore(modele.obtenirMortPoisson());
            }
        }, 200);
    }

}

controller.chargerPartie()
controller.initialiser()