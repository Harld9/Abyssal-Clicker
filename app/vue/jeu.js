//Objet vue qui possède les infos visibles
const vue = {
    //Méthode qui met à jour le score dans l'affichage
    updateScore(nouveauScore) {
        const affichageScore = document.getElementById("nbScore")
        affichageScore.textContent = "Nombre de clics : " + nouveauScore
        console.log("Nombre de clics : " + nouveauScore)
    },

    //Méthode qui met à jour l'argent' dans l'affichage
    updateArgent(nouveauArgent) {
        const affichageArgent = document.getElementById("argent")
        affichageArgent.textContent = "Argent :" + nouveauArgent
        console.log(nouveauArgent + "argents")
    },

    //Méthode qui met à jour les améliorations dans l'affichage selon l'argent disponible

    //Méthode qui met à jour les succès dans l'affichage selon les succès débloqués par le joueur

    //Méthode qui met à jour les paliers dans l'affichage selon les paliers débloqués par le joueur

    updateFish(nouveauPoisson) {
        console.log("Poisson reçu dans la vue :", nouveauPoisson);

        if (!nouveauPoisson) return;

        const imagePoisson = document.querySelector("#imgPoisson  img");
        const nomPoisson = document.querySelector("#nomPoisson");

        imagePoisson.src = nouveauPoisson.image || nouveauPoisson.Image;

        if (nomPoisson) {
            nomPoisson.textContent = nouveauPoisson.nom || nouveauPoisson.Nom;
        }
        console.log("Image changée vers :", imagePoisson.src);
    }
}



