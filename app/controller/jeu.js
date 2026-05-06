//Objet controller qui possède la méthode initialiser
const controller = {
    initialiser() {
        console.log("Initialisation")
        const bouton = document.getElementById("imgPoisson")
        // Au click sur le bouton, on appelle le modèle on rajoute 1 au score et on met à jour le résultat dans la vue
        bouton.addEventListener("click", function () {
            modele.frapperPoisson(modele.joueur.dommagesActuels)
            let resultat = modele.obtenirNbClics()
            vue.updateScore(resultat)

            let poisson = modele.obtenirFish()
            vue.updateFish(poisson)
        })
    }
}

//Appelle la fonction initialiser le controller 
controller.initialiser();