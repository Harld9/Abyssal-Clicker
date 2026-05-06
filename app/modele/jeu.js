//Objet modele qui possède les infos du joueur (score, argent, etc...)
const modele = {
    score: 0,
    //Méthode qui permet de rajouter du score à chaque clic
    ajouterClic() {
        console.log("Nouveau clic, score +1")
        modele.score++
    },
    //Méthode qui permet d'obtenir le score
    obtenirScore() {
        return modele.score
    }
}

