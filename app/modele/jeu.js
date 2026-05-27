//Objet modele qui possède les infos du joueur (score, argent, etc...), des poissons, etc...
const modele = {
    joueur: {
        score: 0, 
        nbClics: 0, 
        dommagesActuels: 1, 
        argent: 0, 
        palier: 1,

        seuilPalier: {
            1: 0, 
            2: 10, 
            3: 25, 
            4: 45, 
            5: 70, 
            6: 100,
            7: 140, 
            8: 190, 
            9: 250, 
            10: 320,
            11: 400, 
            12: 500, 
            13: 650
        },
    },

    poisson: { 
        pvPoissonMax: 10, 
        pvPoissonActuel: 10, 
        poissonActuel: 1, 
    },
    
    item: {},
    catalogue: {

        Palier1: [
            { Nom: "Ruben le Poisson Rouge Majestueux", 
                Image: "./static/images/poissons/Poisson1.png", PV: 20 },
            { Nom: "Barnabé le Colin, Grand Archiduc des Reflets Argentés", 
                Image: "./static/images/poissons/Poisson2.png", PV: 20 }
        ],
        Palier2: [
            { Nom: "Théodort le Hareng, l'Illustre Voyageur Scintillant", 
                Image: "./static/images/poissons/Poisson3.png", PV: 80 },
            { Nom: "Barnabé l'Alose, Grand Argentier du Courant Froid.", 
                Image: "./static/images/poissons/Poisson4.png", PV: 80 }
        ],
        Palier3: [
            { Nom: "Hubert La Carpe, Grand Intendant des Eaux Stagnantes", 
                Image: "./static/images/poissons/Poisson5.png", PV: 200 },
            { Nom: "M. Saumon, le Grand Saumon Rose", 
                Image: "./static/images/poissonsPoisson6.png", PV: 200 }
        ],
        Palier4: [
            { Nom: "Edouard Le Saumon Noir, Seigneur Affamé des Eaux Douces", 
                Image: "../static/images/poissons/Poisson7.png", PV: 500 },
            { Nom: "Sa Majesté Finbar le Poisson Rouge Étincelant d'Écaille.", 
                Image: "../static/images/poissons/Poisson8.png", PV: 500 }
        ],
        Palier5: [
            { Nom: "Félix le Poisson-Clown, l'Ambassadeur Arrogant (malgré son look)", 
                Image: "../static/images/poissons/Poisson9.png", PV: 1200 },
            { Nom: "Godefroy le Brochet, Archiduc des Eaux Troubles et Pourfendeur de Hameçons", 
                Image: "../static/images/poissons/Poisson10.png", PV: 1200 }
        ],
        Palier6: [
            { Nom: "Gérard le Piranha-Double-Mâchoire, Grand Dévoreur d'Alevins", 
                Image: "../static/images/poissons/Poisson11.png", PV: 3000 },
            { Nom: "Thon Thon, l'Oncle Aimant (et un peu gras)", 
                Image: "../static/images/poissons/Poisson12.png", PV: 3000 }
        ],
        Palier7: [
            { Nom: "Bruce « Mâchoires d'Or » Carcharodon, le Baron Flamboyant des Abysses", 
                Image: "../static/images/poissons/Poisson13.png", PV: 7000 },
            { Nom: "Mâchouille le Barracuda, Duc de la Mandibule Grognone", 
                Image: "../static/images/poissons/Poisson14.png", PV: 7000 }
        ],
        Palier8: [
            { Nom: "Hubert Mola Grand Commandeur de la Dérive Passive", 
                Image: "../static/images/poissons/Poisson15.png", PV: 15000 },
            { Nom: "Michel Requin-Baleine, Grand Intendant de la Copropriété Subaquatique", 
                Image: "../static/images/poissons/Poisson16.png", PV: 15000 }
        ],
        Palier9: [
            { Nom: "Gontran le Blobfish, Archiduc de la Mollesse Suprême", 
                Image: "../static/images/poissons/Poisson17.png", PV: 40000 },
            { Nom: "Albert le Cybéroche, Grand Architecte du Réseau de Neurones Marins", 
                Image: "../static/images/poissons/Poisson18.png", PV: 40000 }
        ],
        Palier10: [
            { Nom: "Sir François le Gobelin des Profondeurs, l'Épouvantablement Laid", 
                Image: "../static/images/poissons/Poisson19.png", PV: 100000 },
            { Nom: "Moby le Carassin d'Azur, Archiduc de la Patrouille de Bulle", 
                Image: "../static/images/poissons/Poisson20.png", PV: 100000 }
        ],
        Palier11: [
            { Nom: "Caelacanthe Cog-sworth, le Maréchal de la Rouille Éternelle", 
                Image: "../static/images/poissons/Poisson21.png", PV: 300000 },
            { Nom: "Grognon l'Esturgeon, Archimage de la Bave", 
                Image: "../static/images/poissons/Poisson22.png", PV: 300000 }
        ],
        Palier12: [
            { Nom: "Iggy le Ruban, Commandeur des Courants Électro-Punk", 
                Image: "../static/images/poissons/Poisson23.png", PV: 750000 },
            { Nom: "Jean le Grand Blanc, Baron des Balafres et de la Bavure", 
                Image: "../static/images/poissons/Poisson24.png", PV: 750000 }
        ],
        Palier13: [
            { Nom: "Sir Gilbert le Kraken-Dragon, Premier de Son Nom, Fléau Insignifiant des Poissons-Bulle", 
                Image: "../static/images/poissons/Poisson25.png", PV: 3000000 }
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
        console.log("PV restants :", this.poisson.pvPoissonActuel);

        // Vérification de la mort du poisson
        if (this.poisson.pvPoissonActuel <= 0) {
        
            // LE POISSON EST MORT : On donne +1 a Argent et on augmente le score du joueur
            this.joueur.score += 1;
            console.log("Poisson tué ! Score total : " + this.joueur.score);
        
            // On vérifie si on passe au Palier Supérieur
            let palierSuivant = this.joueur.palier + 1;
            if (this.joueur.seuilPalier[palierSuivant] && this.joueur.score >= this.joueur.seuilPalier[palierSuivant]) {
                this.joueur.palier = palierSuivant;
                console.log("Bravo ! Palier " + this.joueur.palier + " atteint !");
            }

            const nouveauPoisson = this.spawnFish(this.joueur.palier);
            // On fait apparaître le nouveau poisson du bloc correspondant
            this.poisson.poissonActuel = nouveauPoisson;
            // On réinitialise les PV du poisson
            this.poisson.pvPoissonMax = this.poisson.poissonActuel.pvMax;
            this.poisson.pvPoissonActuel = this.poisson.poissonActuel.pvMax;
            console.log("Nouveau poisson modèle :", this.poisson.poissonActuel);
        }
    },

    //Méthode qui permet d'obtenir le score
    obtenirScore() {
        return this.joueur.score
    },

    //Méthode qui permet d'obtenir le score
    obtenirNbClics() {
        return this.joueur.nbClics
    },

    obtenirFish() {
        return this.poisson.poissonActuel
    },

    obtenirDonneesJoueur() {
        return this.joueur
    },

    //Méthode pour faire apparaître un poisson aléatoire en fonction du palier actuel du joueur
    spawnFish(playerPalier) {
        // On prend la liste des poissons du palier actuel
        const currentFishList = this.catalogue["Palier" + playerPalier];

        // On en choisit un au hasard dans cette liste
        const randomIndex = Math.floor(Math.random() * currentFishList.length);
        const chosenFish = currentFishList[randomIndex];

        // On retourne l'objet avec ses PV max
        return {
                nom: chosenFish.Nom,
                image: chosenFish.Image,
                pvMax: chosenFish.PV,
                pvActuel: chosenFish.PV
        }
    }
}

//creation du premier poisson au lancement du jeu
modele.poisson.poissonActuel = modele.spawnFish(1);
console.log("Jeu chargé");


