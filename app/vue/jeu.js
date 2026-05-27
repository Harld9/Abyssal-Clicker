//Objet vue qui possède les infos visibles
const vue = {
    //Méthode qui met à jour le score dans l'affichage
    updateScore(nouveauScore) {
        const affichageScore = document.getElementById("nbScore")
        affichageScore.textContent = "Nombre de clics : " + nouveauScore
        console.log("Nombre de clics : " + nouveauScore)
    },

    updateFish(nouveauPoisson) {
        console.log("Poisson reçu dans la vue :", nouveauPoisson);

        if (!nouveauPoisson) return;

        const imagePoisson = document.querySelector("#imagePoisson");
        const nomPoisson = document.querySelector("#nomPoisson");

        imagePoisson.src = nouveauPoisson.image || nouveauPoisson.Image;

        if (nomPoisson) {
            nomPoisson.textContent = nouveauPoisson.nom || nouveauPoisson.Nom;
        }
    console.log("Image changée vers :", imagePoisson.src);
}
}



