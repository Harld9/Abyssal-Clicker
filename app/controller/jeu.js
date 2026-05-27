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

    /* chargerPartie() {
         if (localStorage.getItem('maSauvegarde') !== null) {
         } else {
             //alors initialiser une nouvelle partie
         }
     },*/

    sauvegarderPartie() {
        let sauvegardePartie = JSON.stringify(modele.obtenirDonneesJoueur())
        let sauvegardePartieEncodé = btoa(sauvegardePartie)
        console.log(sauvegardePartieEncodé)
        localStorage.setItem("maSauvegarde", sauvegardePartieEncodé);
        // Faire atob() pour transformer la base 64 en json 
        // JSON.parse pour inverser le stringify
    }
}

//Appelle la fonction initialiser le controller 
controller.initialiser();