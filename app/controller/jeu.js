//Objet controller qui possède la méthode initialiser
const controller = {
    initialiser() {
        console.log("Initialisation")
        bouton = document.getElementById("click")
        // Au click sur le bouton, on appelle le modèle on rajoute 1 au score et on met à jour le résultat dans la vue
        bouton.addEventListener("click", function () {
            modele.ajouterClic()
            let resultat = modele.obtenirScore()
            vue.updateScore(resultat)
        })

    }
}

//Appelle la fonction initialiser le controller 
controller.initialiser();