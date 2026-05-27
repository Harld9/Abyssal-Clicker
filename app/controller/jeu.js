//Objet controller qui possède la méthode initialiser
const controller = {
    initialiser() {
        console.log("Initialisation")
        const bouton = document.getElementById("click")
        // Au click sur le bouton, on appelle le modèle on rajoute 1 au score et on met à jour le résultat dans la vue
        bouton.addEventListener("click", function () {
            modele.frapperPoisson(modele.joueur.dommagesActuels)
            let resultat = modele.obtenirNbClics()
            vue.updateScore(resultat)

            let poisson = modele.obtenirFish()
            vue.updateFish(poisson)
        })
    },

    chargerPartie() {
        if (localStorage.getItem('maSauvegarde') !== null) {
            donneesLocalstorage = JSON.parse(atob(localStorage.getItem('maSauvegarde')))
            console.log(JSON.parse(atob(localStorage.getItem('maSauvegarde'))))
            modele.joueur.score = donneesLocalstorage.score
            modele.joueur.nbClics = donneesLocalstorage.nbClics
            modele.joueur.dommagesActuels = donneesLocalstorage.dommagesActuels
            modele.joueur.argent = donneesLocalstorage.argent
            modele.joueur.seuilPalier = donneesLocalstorage.seuilPalier
            vue.updateScore(modele.joueur.nbClics)
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
