//Objet modele qui possède les infos du joueur (score, argent, etc...), des poissons, etc...
const modele = {
    joueur: {
        score: 0, nbClics: 0, dommagesActuels: 1, argent: 0, palier: 1, seuilPalier: {
            1: 0, 2: 10, 3: 25, 4: 45, 5: 70, 6: 100,
            7: 140, 8: 190, 9: 250, 10: 320,
            11: 400, 12: 500, 13: 650
        },
    },

    poisson: { pvPoissonMax: 10, pvPoissonActuel: 10, poissonActuel: 1, },
    item: {},
    catalogue: {

        Palier1: [
            { Nom: "Ruben le Poisson Rouge Majestueux", Image: "./static/images/Poisson1.png", PV: 20 },
            { Nom: "Barnabé le Colin, Grand Archiduc des Reflets Argentés", Image: "./static/images/Poisson2.png", PV: 20 }
        ],
        Palier2: [
            { Nom: "Théodort le Hareng, l'Illustre Voyageur Scintillant", Image: "./static/images/Poisson3.png", PV: 80 },
            { Nom: "Barnabé l'Alose, Grand Argentier du Courant Froid.", Image: "./static/images/Poisson4.png", PV: 80 }
        ],
        Palier3: [
            { Nom: "Hubert La Carpe, Grand Intendant des Eaux Stagnantes", Image: "./static/images/Poisson5.png", PV: 200 },
            { Nom: "M. Saumon, le Grand Saumon Rose", Image: "./static/images/Poisson6.png", PV: 200 }
        ],
        Palier4: [
            { Nom: "Edouard Le Saumon Noir, Seigneur Affamé des Eaux Douces", Image: "../static/images/Poisson7.png", PV: 500 },
            { Nom: "Sa Majesté Finbar le Poisson Rouge Étincelant d'Écaille.", Image: "../static/images/Poisson8.png", PV: 500 }
        ],
        Palier5: [
            { Nom: "Félix le Poisson-Clown, l'Ambassadeur Arrogant (malgré son look)", Image: "../static/images/Poisson9.png", PV: 1200 },
            { Nom: "Godefroy le Brochet, Archiduc des Eaux Troubles et Pourfendeur de Hameçons", Image: "../static/images/Poisson10.png", PV: 1200 }
        ],
        Palier6: [
            { Nom: "Gérard le Piranha-Double-Mâchoire, Grand Dévoreur d'Alevins", Image: "../static/images/Poisson11.png", PV: 3000 },
            { Nom: "Thon Thon, l'Oncle Aimant (et un peu gras)", Image: "../static/images/Poisson12.png", PV: 3000 }
        ],
        Palier7: [
            { Nom: "Bruce « Mâchoires d'Or » Carcharodon, le Baron Flamboyant des Abysses", Image: "../static/images/Poisson13.png", PV: 7000 },
            { Nom: "Mâchouille le Barracuda, Duc de la Mandibule Grognone", Image: "../static/images/Poisson14.png", PV: 7000 }
        ],
        Palier8: [
            { Nom: "Hubert Mola Grand Commandeur de la Dérive Passive", Image: "../static/images/Poisson15.png", PV: 15000 },
            { Nom: "Michel Requin-Baleine, Grand Intendant de la Copropriété Subaquatique", Image: "../static/images/Poisson16.png", PV: 15000 }
        ],
        Palier9: [
            { Nom: "Gontran le Blobfish, Archiduc de la Mollesse Suprême", Image: "../static/images/Poisson17.png", PV: 40000 },
            { Nom: "Albert le Cybéroche, Grand Architecte du Réseau de Neurones Marins", Image: "../static/images/Poisson18.png", PV: 40000 }
        ],
        Palier10: [
            { Nom: "Sir François le Gobelin des Profondeurs, l'Épouvantablement Laid", Image: "../static/images/Poisson19.png", PV: 100000 },
            { Nom: "Moby le Carassin d'Azur, Archiduc de la Patrouille de Bulle", Image: "../static/images/Poisson20.png", PV: 100000 }
        ],
        Palier11: [
            { Nom: "Caelacanthe Cog-sworth, le Maréchal de la Rouille Éternelle", Image: "../static/images/Poisson21.png", PV: 300000 },
            { Nom: "Grognon l'Esturgeon, Archimage de la Bave", Image: "../static/images/Poisson22.png", PV: 300000 }
        ],
        Palier12: [
            { Nom: "Iggy le Ruban, Commandeur des Courants Électro-Punk", Image: "../static/images/Poisson23.png", PV: 750000 },
            { Nom: "Jean le Grand Blanc, Baron des Balafres et de la Bavure", Image: "../static/images/Poisson24.png", PV: 750000 }
        ],
        Palier13: [
            { Nom: "Sir Gilbert le Kraken-Dragon, Premier de Son Nom, Fléau Insignifiant des Poissons-Bulle", Image: "../static/images/Poisson25.png", PV: 3000000 }
        ]

    },


    frapperPoisson(damageAmount) {
        this.joueur.nbClics++
        // ASTUCE DE PRO : Math.min empêche de faire plus de dégâts que les HP restants
        let dommagesActuels = Math.min(damageAmount, this.poisson.pvPoissonActuel);

        // On retire la vie au poisson
        this.poisson.pvPoissonActuel -= dommagesActuels;

        // On donne l'argent immédiat (1 Dégât = 1 Argent)
        this.joueur.argent += dommagesActuels;
        console.log(this.poisson.pvPoissonActuel)
        // Vérification de la mort du poisson
        if (this.poisson.pvPoissonActuel <= 0) {
        
            // LE POISSON EST MORT : On donne +1 au Score
            this.joueur.score += 1;
            console.log("Poisson tué ! Score total : " + this.joueur.score);

            // On vérifie si on passe au Palier Supérieur
            let palierSuivant = this.joueur.palier + 1;
            if (this.joueur.seuilPalier[palierSuivant] && this.joueur.score >= this.joueur.seuilPalier[palierSuivant]) {
                this.joueur.palier = palierSuivant;
                console.log("Bravo ! Palier " + this.joueur.palier + " atteint !");
            }
            // On fait apparaître le nouveau poisson du bloc correspondant
            this.poisson.poissonActuel = this.spawnFish(this.joueur.palier);
        }
    },

    //Méthode qui permet d'obtenir le score
    obtenirScore() {
        return this.joueur.score
    },

    //Méthode qui permet d'obtenir le nombre de clics
    obtenirNbClics() {
        return this.joueur.nbClics
    },

    obtenirFish() {
        return this.poisson.poissonActuel
    },

    //Méthode pour faire apparaître un poisson aléatoire en fonction du palier actuel du joueur
    spawnFish(playerPalier) {
        const nomDeLaListe = "Palier" + playerPalier;
        const currentFishList = this.catalogue[nomDeLaListe];

        console.log("playerPalier =", playerPalier);
        console.log("clé cherchée =", nomDeLaListe);
        console.log("currentFishList =", currentFishList);

        if (!currentFishList) {
            console.error("Liste introuvable :", nomDeLaListe);
            return null;
        }

        const randomIndex = Math.floor(Math.random() * currentFishList.length);
        const chosenFish = currentFishList[randomIndex];

        this.poisson.pvPoissonMax = chosenFish.PV;
        this.poisson.pvPoissonActuel = chosenFish.PV;

            // Création du poisson normal
            let fish = {
                nom: chosenFish.Nom,
                image: chosenFish.Image,
                pvMax: chosenFish.PV,
                pvActuel: chosenFish.PV,
                rarete: "normal",
                multiplicateurArgent: 1
            };

            // Vérification shiny/golden
            fish = this.applyRareVariant(fish);
            console.log("Nouveau poisson :", fish);
            return fish;
        },

applyRareVariant(fish) {

    let random = Math.random() * 100;

    // 4% Golden
    if (random <= 4) {

        fish.rarete = "Golden";
        fish.image = fish.image.replace(".png", "Golden.png");
        fish.pvMax *= 5;
        fish.pvActuel = fish.pvMax;
        fish.multiplicateurArgent = 3;
    }

    // 1% Shiny
    else if (random <= 1) {

        fish.rarete = "Shiny";
        fish.image = fish.image.replace(".png", "Shiny.png");
        fish.pvMax *= 2;
        fish.pvActuel = fish.pvMax;
        fish.multiplicateurArgent = 10;
    }
    return fish;
}
}
