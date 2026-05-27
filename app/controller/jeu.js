//Objet controller qui possède la méthode initialiser
const controller = {
    initialiser() {
        console.log("Initialisation")
        const bouton = document.getElementById("click")
        // Au click sur le bouton, on appelle le modèle on rajoute 1 au score et on met à jour le résultat dans la vue
        bouton.addEventListener("imgPoisson", function () {
            modele.frapperPoisson(modele.joueur.dommagesActuels)
            let resultat = modele.obtenirNbClics()
            vue.updateScore(resultat)

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
        if (localStorage.getItem('maSauvegarde') !== null) {
            let donneesLocalstorage = JSON.parse(atob(localStorage.getItem('maSauvegarde')))
            console.log(donneesLocalstorage)
            modele.importerDonneesSauvegarde(donneesLocalstorage)
            vue.updateScore(modele.obtenirNbClics())
        } else if (localStorage.getItem('maSauvegarde') === null) {
            return
        }
    },

    sauvegarderPartie() {
        let sauvegardePartie = JSON.stringify(modele.obtenirDonneesJoueur())
        let sauvegardePartieEncodé = btoa(sauvegardePartie)
        console.log(sauvegardePartieEncodé)
        localStorage.setItem("maSauvegarde", sauvegardePartieEncodé);
        // Faire atob() pour transformer la base 64 en json 
        // JSON.parse pour inverser le stringify
    }
}

if (localStorage.getItem('maSauvegarde') !== null) {
    controller.chargerPartie()

}
controller.initialiser()
