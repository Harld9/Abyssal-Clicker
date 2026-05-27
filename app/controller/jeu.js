//Objet controller qui possède la méthode initialiser
const controller = {
    initialiser() {
        console.log("Initialisation")
        const bouton = document.getElementById("click")
        // Au click sur le bouton, on appelle le modèle on rajoute 1 au score et on met à jour le résultat dans la vue
        bouton.addEventListener("click", function () {
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
    },

    sauvegarderPartie() {
        let sauvegardePartie = JSON.stringify(modele.obtenirDonneesJoueur())
        console.log(sauvegardePartie)
        localStorage.setItem("SauvegardePartie", sauvegardePartie)
        let sauvegardePartieEncodé = btoa(sauvegardePartie)
        console.log(sauvegardePartieEncodé)
        // Faire atob() pour transformer la base 64 en json 
    }
}

//Appelle la fonction initialiser le controller 
document.addEventListener("DOMContentLoaded", function () {
    controller.initialiser();
});