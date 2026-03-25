import nodemon from "nodemon";
import cookieParser from "cookie-parser";
import express from "express";

// Les nouveaux paliers basés sur le nombre de kills (le Score)
const PALIER_THRESHOLDS = {
    1: 0, 2: 10, 3: 25, 4: 45, 5: 70, 6: 100, 
    7: 140, 8: 190, 9: 250, 10: 320, 
    11: 400, 12: 500, 13: 650
};

function applyDamage(damageAmount) {
    // ASTUCE DE PRO : Math.min empêche de faire plus de dégâts que les HP restants
    let actualDamage = Math.min(damageAmount, currentFish.current_hp);

    // 1. On retire la vie au poisson
    currentFish.current_hp -= actualDamage;

    // 2. On donne l'argent immédiat (1 Dégât = 1 Argent)
    player.money += actualDamage; 

    // 3. Vérification de la mort du poisson
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
}

// Fonction pour faire apparaître un poisson aléatoire en fonction du palier actuel du joueur
function spawnFish(playerPalier) {
    // 1. On prend la liste des poissons du palier actuel
    const currentFishList = FISH_DATA[playerPalier];
    
    // 2. On en choisit un au hasard dans cette liste
    const randomIndex = Math.floor(Math.random() * currentFishList.length);
    const chosenFish = currentFishList[randomIndex];
    
    // 3. On retourne l'objet avec ses PV max
    return {
        name: chosenFish.name,
        max_hp: chosenFish.hp,
        current_hp: chosenFish.hp
    };
}