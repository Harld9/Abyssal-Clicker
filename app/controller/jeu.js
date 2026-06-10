const controller = {

    initialiser() {
        const bouton = document.getElementById("imgPoisson")
        // Au click sur le bouton, on appelle le modèle on rajoute 1 au score et on met à jour le résultat dans la vue
        bouton.addEventListener("click", function () {
            modele.frapperPoisson(modele.joueur.dommagesActuels)
            vue.damageFish()
            let resultat = modele.obtenirNbClics()
            vue.updateScore(resultat)
            let mortPoisson = modele.obtenirMortPoisson()
            vue.updateMortPoisson(mortPoisson)
            // On récupère l'argent actuel du modèle et on le met à jour dans la vue
            let argent = modele.joueur.argent;
            vue.updateArgent(argent);
            // On récupère le poisson actuel du modèle et on le met à jour dans la vue
            let poisson = modele.obtenirFish()
            vue.updateFish(poisson)
        })

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
        vue.updateScore(modele.obtenirMortPoisson())
        vue.updateFish(modele.obtenirFish())
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