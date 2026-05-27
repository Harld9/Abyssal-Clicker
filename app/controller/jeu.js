const controller = {

    initialiser() {
        console.log("Initialisation")
        const bouton = document.getElementById("click")
        // Au click sur le bouton, on appelle le modèle on rajoute 1 au score et on met à jour le résultat dans la vue
        bouton.addEventListener("imgPoisson", function () {
            modele.frapperPoisson(modele.joueur.dommagesActuels)
            // On récupère le score actuel du modèle et on le met à jour dans la vue
            let resultat = modele.obtenirNbClics()
            vue.updateScore(resultat)
            // On récupère l'argent actuel du modèle et on le met à jour dans la vue
            let argent = modele.joueur.argent;
            vue.updateArgent(argent);
            // On récupère le poisson actuel du modèle et on le met à jour dans la vue
            let poisson = modele.obtenirFish()
            vue.updateFish(poisson)
        })

        let options = document.getElementById('options')



        options.addEventListener("click", function () {

            console.log("Sauvegarde Exporté");

            modele.exporterDonneesSauvegarde()

            let codeSauvegarde = document.getElementById('codeSauvegarde')

            navigator.clipboard.writeText(codeSauvegarde.textContent)
        });
    },

    chargerPartie() {
        if (localStorage.getItem("maSauvegarde") === null) return
        const donnees = JSON.parse(atob(localStorage.getItem("maSauvegarde")))
        modele.importerDonneesSauvegarde(donnees)
        vue.updateScore(modele.obtenirScore())
    },

    sauvegarderPartie() {
        const encode = btoa(JSON.stringify(modele.obtenirDonneesJoueur()))
        localStorage.setItem("maSauvegarde", encode)
        console.log("Sauvegarde effectuée")
    }
}

controller.chargerPartie()
controller.initialiser()