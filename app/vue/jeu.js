//Objet vue qui possède les infos visibles
const vue = {
    //Méthode qui met à jour le score dans l'affichage
    updateScore(nouveauScore) {
        const affichageScore = document.getElementById("nbScore")
        affichageScore.textContent = "Nombre de clics : " + nouveauScore
        console.log("Nombre de clics : " + nouveauScore)
    },

    updateFish(nouveauPoisson) {

        if (!nouveauPoisson) return;

        document.querySelector("#imagePoisson").src =
            nouveauPoisson.image;

        document.querySelector("#nomPoisson").textContent =
            nouveauPoisson.nom;

        console.log("Poisson affiché :", nouveauPoisson);
}
}



