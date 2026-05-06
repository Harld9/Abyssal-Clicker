//Objet vue qui possède les infos visibles
const vue = {
    //Méthode qui met à jour le score dans l'affichage
    updateScore(nouveauScore) {
        const affichageScore = document.getElementById("nbClics")
        affichageScore.textContent = "Nombre de clics : " + nouveauScore
        console.log("Nombre de clics : " + nouveauScore)
    },

    updateFish(nouveauPoisson) {
        const afficagePoisson = document.getElementById("poisson")
        afficagePoisson.textContent = "Poisson " + nouveauPoisson
    }
}

