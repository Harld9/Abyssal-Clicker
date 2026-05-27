//Objet vue qui possède les infos visibles
const vue = {
    //Méthode qui met à jour le score dans l'affichage
    updateScore(nouveauScore) {
        const affichageScore = document.getElementById("nbScore")
        affichageScore.textContent = nouveauScore
        console.log("Nombre de clics : " + nouveauScore)
    },

    //Méthode qui met à jour l'argent' dans l'affichage
    updateArgent(nouveauArgent) {
        const affichageArgent = document.getElementById("argent")
        affichageArgent.textContent = "Nombre de clics : " + nouveauArgent
        console.log(nouveauArgent + "argents")
    },

    //Méthode qui met à jour les améliorations dans l'affichage selon l'argent disponible

    //Méthode qui met à jour les succès dans l'affichage selon les succès débloqués par le joueur

    //Méthode qui met à jour les paliers dans l'affichage selon les paliers débloqués par le joueur

    //Méthode qui met une animation de dégât au poisson.
    damageFish() {
        const poisson = document.getElementById("poisson")
        poisson.classList.add("dommage")
        setTimeout(() => {
            poisson.classList.remove("dommage")
        }, 100)
    },

    updateFish(nouveauPoisson) {
        const affichagePoisson = document.getElementById("nomPoisson")
        affichagePoisson.textContent = "Poisson " + nouveauPoisson
    }
}

