//Objet modele qui possède les infos du joueur (score, argent, etc...), des poissons, etc...
const modele = {
    joueur: {
        score: 0, nbClics: 0, dommagesActuels: 1, argent: 0, palier: 1, seuilPalier: {
            1: 0, 2: 10, 3: 25, 4: 45, 5: 70, 6: 100,
            7: 140, 8: 190, 9: 250, 10: 320,
            11: 400, 12: 500, 13: 650
        },
        inventaireObjetPassif: {
            amelioration_1: {
                nom: "Cage a poisson",
                bonusDPS: 1,
                prixBase: 250,
                quantitePossedee: 0
            },
            amelioration_2: {
                nom: "Filet de peche",
                bonusDPS: 3,
                prixBase: 800,
                quantitePossedee: 0
            },
            amelioration_3: {
                nom: "Barque a rames avec filet",
                bonusDPS: 6,
                prixBase: 1800,
                quantitePossedee: 0
            },
            amelioration_4: {
                nom: "Petit bateau a moteur",
                bonusDPS: 10,
                prixBase: 4500,
                quantitePossedee: 0
            },
            amelioration_5: {
                nom: "Chalutier",
                bonusDPS: 20,
                prixBase: 8000,
                quantitePossedee: 0
            },
            amelioration_6: {
                nom: "Navire-usine",
                bonusDPS: 75,
                prixBase: 20000,
                quantitePossedee: 0
            },
            amelioration_7: {
                nom: "Ferme aquacole",
                bonusDPS: 200,
                prixBase: 50000,
                quantitePossedee: 0
            },
            amelioration_8: {
                nom: "Flotte de chalutiers",
                bonusDPS: 500,
                prixBase: 120000,
                quantitePossedee: 0
            },
            amelioration_9: {
                nom: "Station de pompage marine",
                bonusDPS: 1500,
                prixBase: 350000,
                quantitePossedee: 0
            },
            amelioration_10: {
                nom: "Sous-marin de chalutage",
                bonusDPS: 4000,
                prixBase: 1000000,
                quantitePossedee: 0
            },
            amelioration_11: {
                nom: "Canon a filet en titane",
                bonusDPS: 6000,
                prixBase: 1500000,
                quantitePossedee: 0
            },
            amelioration_12: {
                nom: "Mega-plateforme oceanique",
                bonusDPS: 10000,
                prixBase: 3000000,
                quantitePossedee: 0
            },
            amelioration_13: {
                nom: "Base sous-marine autonome",
                bonusDPS: 30000,
                prixBase: 10000000,
                quantitePossedee: 0
            }
        },
        inventaireObjetClic: {
            amelioration_1: {
                nom: "Peche a mains nues",
                bonusDegat: 1,
                prixBase: 15,
                quantitePossedee: 0
            },
            amelioration_2: {
                nom: "Lance en bois taillee",
                bonusDegat: 2,
                prixBase: 50,
                quantitePossedee: 0
            },
            amelioration_3: {
                nom: "Epuisette de plage",
                bonusDegat: 4,
                prixBase: 150,
                quantitePossedee: 0
            },
            amelioration_4: {
                nom: "Canne a peche artisanale",
                bonusDegat: 6,
                prixBase: 400,
                quantitePossedee: 0
            },
            amelioration_5: {
                nom: "Canne a peche avec moulinet",
                bonusDegat: 10,
                prixBase: 1200,
                quantitePossedee: 0
            },
            amelioration_6: {
                nom: "Fusil-harpon de plongee",
                bonusDegat: 25,
                prixBase: 3000,
                quantitePossedee: 0
            },
            amelioration_7: {
                nom: "Appats aux pheromones",
                bonusDegat: 50,
                prixBase: 12000,
                quantitePossedee: 0
            },
            amelioration_8: {
                nom: "Canne en fibre de carbone",
                bonusDegat: 120,
                prixBase: 30000,
                quantitePossedee: 0
            },
            amelioration_9: {
                nom: "Harpon pneumatique",
                bonusDegat: 300,
                prixBase: 75000,
                quantitePossedee: 0
            },
            amelioration_10: {
                nom: "Fusil a ondes soniques",
                bonusDegat: 800,
                prixBase: 180000,
                quantitePossedee: 0
            },
            amelioration_11: {
                nom: "Gantelet electrique",
                bonusDegat: 2500,
                prixBase: 500000,
                quantitePossedee: 0
            },
            amelioration_12: {
                nom: "Lance-torpilles cryogeniques",
                bonusDegat: 15000,
                prixBase: 4500000,
                quantitePossedee: 0
            }
        },
    },

    poisson: { pvPoissonMax: 10, pvPoissonActuel: 10, poissonActuel: 1, },
    catalogue: {

        Palier1: [
            { Nom: "Ruben le Poisson Rouge Majestueux", Image: "../static/images/Poisson1.png", PV: 20 },
            { Nom: "Barnabé le Colin, Grand Archiduc des Reflets Argentés", Image: "../static/images/Poisson2.png", PV: 20 }
        ],
        Palier2: [
            { Nom: "Théodort le Hareng, l'Illustre Voyageur Scintillant", Image: "../static/images/Poisson3.png", PV: 80 },
            { Nom: "Barnabé l'Alose, Grand Argentier du Courant Froid.", Image: "../static/images/Poisson4.png", PV: 80 }
        ],
        Palier3: [
            { Nom: "Hubert La Carpe, Grand Intendant des Eaux Stagnantes", Image: "../static/images/Poisson5.png", PV: 200 },
            { Nom: "M. Saumon, le Grand Saumon Rose", Image: "../static/images/Poisson6.png", PV: 200 }
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
        const currentFishList = this.catalogue.nomDeLaListe;

        // On en choisit un au hasard dans cette liste
        const randomIndex = Math.floor(Math.random() * currentFishList.length);
        const chosenFish = currentFishList[randomIndex];

        // On retourne l'objet avec ses PV max
        return {
            name: chosenFish.name,
            max_hp: chosenFish.hp,
            current_hp: chosenFish.hp
        }
    },
    importerDonneesSauvegarde(donnees) {
        this.joueur.score = donnees.score
        this.joueur.nbClics = donnees.nbClics
        this.joueur.dommagesActuels = donnees.dommagesActuels
        this.joueur.argent = donnees.argent
        this.joueur.seuilPalier = donnees.seuilPalier
    }
}

/*// Les nouveaux paliers basés sur le nombre de kills (le Score)
 

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

 
}
*/

