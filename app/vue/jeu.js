//Objet vue qui possède les infos visibles
const vue = {
    //Méthode qui met à jour le score dans l'affichage
    updateScore(nouveauScore) {
        const affichageScore = document.getElementById("score")
        affichageScore.textContent = "Score : " + nouveauScore
        console.log("Nouveau score :" + nouveauScore)
    }
}

