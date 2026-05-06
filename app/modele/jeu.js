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
    },

    // Les nouveaux paliers basés sur le nombre de kills (le Score)
    PALIER_THRESHOLDS: {
        1: 0, 2: 10, 3: 25, 4: 45, 5: 70, 6: 100,
        7: 140, 8: 190, 9: 250, 10: 320,
        11: 400, 12: 500, 13: 650
    },

    //Méthode qui permet d'appliquer des dommages
    applyDamage(damageAmount) {
        // ASTUCE DE PRO : Math.min empêche de faire plus de dégâts que les HP restants
        let actualDamage = Math.min(damageAmount, currentFish.current_hp);

        // On retire la vie au poisson
        currentFish.current_hp -= actualDamage;

        // On donne l'argent immédiat (1 Dégât = 1 Argent)
        player.money += actualDamage;

        // Vérification de la mort du poisson
        if (currentFish.current_hp <= 0) {

            // LE POISSON EST MORT : On donne +1 au Score
            player.score += 1;
            console.log("Poisson tué ! Score total : " + player.score);

            // On vérifie si on passe au Palier Supérieur
            let nextPalier = player.palier + 1;
            if (PALIER_THRESHOLDS[nextPalier] && player.score >= PALIER_THRESHOLDS[nextPalier]) {
                player.palier = nextPalier;
                console.log("Bravo ! Palier " + player.palier + " atteint !");
            }
            // On fait apparaître le nouveau poisson du bloc correspondant
            currentFish = spawnFish(player.palier);
        }
    },

    //Méthode pour faire apparaître un poisson aléatoire en fonction du palier actuel du joueur
    spawnFish(playerPalier) {
        // On prend la liste des poissons du palier actuel
        const currentFishList = FISH_DATA[playerPalier];

        // On en choisit un au hasard dans cette liste
        const randomIndex = Math.floor(Math.random() * currentFishList.length);
        const chosenFish = currentFishList[randomIndex];

        // On retourne l'objet avec ses PV max
        return {
            name: chosenFish.name,
            max_hp: chosenFish.hp,
            current_hp: chosenFish.hp
        }
    }
}

