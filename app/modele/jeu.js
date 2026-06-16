//Objet this qui possède les infos du joueur (score, argent, etc...), des poissons, etc...
const modele = {
    joueur: {
        sauvegardeChargee: false,
        score: 0,
        nbClics: 0,
        dommagesActuels: 1,
        dommagesBase: 1,
        argent: 0,
        palier: 1,
        mortPoisson: 0,
        passifBonusDPS: 0,
        niveau_amelioration_clic: 1,
        niveau_amelioration_passif: 1,
        palierActuelAffiche: 1,
        quantiteAchatClic: 1,
        quantiteAchatPassif: 1,

        seuilPalier: {
            1: 0,
            2: 25,      // ~25 poissons P1
            3: 125,     // ~50 poissons P2 (+100 pts)
            4: 275,     // ~50 poissons P3 (+150 pts)
            5: 515,     // ~60 poissons P4 (+240 pts)
            6: 865,     // ~70 poissons P5 (+350 pts)
            7: 1345,    // ~80 poissons P6 (+480 pts)
            8: 1975,    // ~90 poissons P7 (+630 pts)
            9: 2775,    // ~100 poissons P8 (+800 pts)
            10: 3855,   // ~120 poissons P9 (+1080 pts)
            11: 5255,   // ~140 poissons P10 (+1400 pts)
            12: 7125,   // ~170 poissons P11 (+1870 pts)
            13: 9525    // ~200 poissons P12 pour le boss final
        },
        inventaireObjetClic: {
            amelioration_1: { nom: "Peche a mains nues", bonusDegat: 1, prixBase: 15, quantitePossedee: 0, multiplicateurPrix: 1.15 },
            amelioration_2: { nom: "Lance en bois taillee", bonusDegat: 2, prixBase: 60, quantitePossedee: 0, multiplicateurPrix: 1.15 },
            amelioration_3: { nom: "Epuisette de plage", bonusDegat: 4, prixBase: 200, quantitePossedee: 0, multiplicateurPrix: 1.15 },
            amelioration_4: { nom: "Canne a peche artisanale", bonusDegat: 10, prixBase: 700, quantitePossedee: 0, multiplicateurPrix: 1.15 },
            amelioration_5: { nom: "Canne a peche avec moulinet", bonusDegat: 25, prixBase: 2500, quantitePossedee: 0, multiplicateurPrix: 1.15 },
            amelioration_6: { nom: "Fusil-harpon de plongee", bonusDegat: 60, prixBase: 9000, quantitePossedee: 0, multiplicateurPrix: 1.15 },
            amelioration_7: { nom: "Appats aux pheromones", bonusDegat: 150, prixBase: 30000, quantitePossedee: 0, multiplicateurPrix: 1.15 },
            amelioration_8: { nom: "Canne en fibre de carbone", bonusDegat: 350, prixBase: 100000, quantitePossedee: 0, multiplicateurPrix: 1.15 },
            amelioration_9: { nom: "Harpon pneumatique", bonusDegat: 800, prixBase: 350000, quantitePossedee: 0, multiplicateurPrix: 1.15 },
            amelioration_10: { nom: "Fusil a ondes soniques", bonusDegat: 2000, prixBase: 1200000, quantitePossedee: 0, multiplicateurPrix: 1.15 },
            amelioration_11: { nom: "Gantelet electrique", bonusDegat: 5000, prixBase: 4000000, quantitePossedee: 0, multiplicateurPrix: 1.15 },
            amelioration_12: { nom: "Lance-torpilles cryogeniques", bonusDegat: 12000, prixBase: 12000000, quantitePossedee: 0, multiplicateurPrix: 1.15 }
        },
        inventaireObjetPassif: {
            amelioration_1: { nom: "Cage a poisson", bonusDPS: 1, prixBase: 25, quantitePossedee: 0, multiplicateurPrix: 1.15 },
            amelioration_2: { nom: "Filet de peche", bonusDPS: 2, prixBase: 100, quantitePossedee: 0, multiplicateurPrix: 1.15 },
            amelioration_3: { nom: "Barque a rames avec filet", bonusDPS: 5, prixBase: 400, quantitePossedee: 0, multiplicateurPrix: 1.15 },
            amelioration_4: { nom: "Petit bateau a moteur", bonusDPS: 12, prixBase: 1500, quantitePossedee: 0, multiplicateurPrix: 1.15 },
            amelioration_5: { nom: "Chalutier", bonusDPS: 30, prixBase: 6000, quantitePossedee: 0, multiplicateurPrix: 1.15 },
            amelioration_6: { nom: "Navire-usine", bonusDPS: 70, prixBase: 25000, quantitePossedee: 0, multiplicateurPrix: 1.15 },
            amelioration_7: { nom: "Ferme aquacole", bonusDPS: 180, prixBase: 100000, quantitePossedee: 0, multiplicateurPrix: 1.15 },
            amelioration_8: { nom: "Flotte de chalutiers", bonusDPS: 450, prixBase: 350000, quantitePossedee: 0, multiplicateurPrix: 1.15 },
            amelioration_9: { nom: "Station de pompage marine", bonusDPS: 1000, prixBase: 1200000, quantitePossedee: 0, multiplicateurPrix: 1.15 },
            amelioration_10: { nom: "Sous-marin de chalutage", bonusDPS: 2500, prixBase: 4000000, quantitePossedee: 0, multiplicateurPrix: 1.15 },
            amelioration_11: { nom: "Canon a filet en titane", bonusDPS: 6000, prixBase: 12000000, quantitePossedee: 0, multiplicateurPrix: 1.15 },
            amelioration_12: { nom: "Mega-plateforme oceanique", bonusDPS: 15000, prixBase: 35000000, quantitePossedee: 0, multiplicateurPrix: 1.15 },
        }
    },


    poisson: {
        pvPoissonMax: 10,
        pvPoissonActuel: 10,
        poissonActuel: null,
    },
    catalogue: {

        Palier1: [
            {
                Nom: "Ruben le Poisson Rouge Majestueux",
                Image: "./static/images/poissons/Poisson1.png",
                ImageShiny: "./static/images/poissons/Poisson1Shiny.png",
                ImageGolden: "./static/images/poissons/Poisson1Golden.png",
                PV: 20
            },
            {
                Nom: "Barnabé le Colin, Grand Archiduc des Reflets Argentés",
                Image: "./static/images/poissons/Poisson2.png",
                ImageShiny: "./static/images/poissons/Poisson2Shiny.png",
                ImageGolden: "./static/images/poissons/Poisson2Golden.png",
                PV: 20
            }
        ],

        Palier2: [
            {
                Nom: "Théodort le Hareng, l'Illustre Voyageur Scintillant",
                Image: "./static/images/poissons/Poisson3.png",
                ImageShiny: "./static/images/poissons/Poisson3Shiny.png",
                ImageGolden: "./static/images/poissons/Poisson3Golden.png",
                PV: 100
            },
            {
                Nom: "Barnabé l'Alose, Grand Argentier du Courant Froid.",
                Image: "./static/images/poissons/Poisson4.png",
                ImageShiny: "./static/images/poissons/Poisson4Shiny.png",
                ImageGolden: "./static/images/poissons/Poisson4Golden.png",
                PV: 100
            }
        ],

        Palier3: [
            {
                Nom: "Hubert La Carpe, Grand Intendant des Eaux Stagnantes",
                Image: "./static/images/poissons/Poisson5.png",
                ImageShiny: "./static/images/poissons/Poisson5Shiny.png",
                ImageGolden: "./static/images/poissons/Poisson5Golden.png",
                PV: 500
            },
            {
                Nom: "M. Saumon, le Grand Saumon Rose",
                Image: "./static/images/poissons/Poisson6.png",
                ImageShiny: "./static/images/poissons/Poisson6Shiny.png",
                ImageGolden: "./static/images/poissons/Poisson6Golden.png",
                PV: 500
            }
        ],

        Palier4: [
            {
                Nom: "Edouard Le Saumon Noir, Seigneur Affamé des Eaux Douces",
                Image: "./static/images/poissons/Poisson7.png",
                ImageShiny: "./static/images/poissons/Poisson7Shiny.png",
                ImageGolden: "./static/images/poissons/Poisson7Golden.png",
                PV: 2000
            },
            {
                Nom: "Sa Majesté Finbar le Poisson Rouge Étincelant d'Écaille.",
                Image: "./static/images/poissons/Poisson8.png",
                ImageShiny: "./static/images/poissons/Poisson8Shiny.png",
                ImageGolden: "./static/images/poissons/Poisson8Golden.png",
                PV: 2000
            }
        ],

        Palier5: [
            {
                Nom: "Félix le Poisson-Clown, l'Ambassadeur Arrogant (malgré son look)",
                Image: "./static/images/poissons/Poisson9.png",
                ImageShiny: "./static/images/poissons/Poisson9Shiny.png",
                ImageGolden: "./static/images/poissons/Poisson9Golden.png",
                PV: 8000
            },
            {
                Nom: "Godefroy le Brochet, Archiduc des Eaux Troubles et Pourfendeur de Hameçons",
                Image: "./static/images/poissons/Poisson10.png",
                ImageShiny: "./static/images/poissons/Poisson10Shiny.png",
                ImageGolden: "./static/images/poissons/Poisson10Golden.png",
                PV: 8000
            }
        ],

        Palier6: [
            {
                Nom: "Gérard le Piranha-Double-Mâchoire, Grand Dévoreur d'Alevins",
                Image: "./static/images/poissons/Poisson11.png",
                ImageShiny: "./static/images/poissons/Poisson11Shiny.png",
                ImageGolden: "./static/images/poissons/Poisson11Golden.png",
                PV: 30000
            },
            {
                Nom: "Thon Thon, l'Oncle Aimant (et un peu gras)",
                Image: "./static/images/poissons/Poisson12.png",
                ImageShiny: "./static/images/poissons/Poisson12Shiny.png",
                ImageGolden: "./static/images/poissons/Poisson12Golden.png",
                PV: 30000
            }
        ],

        Palier7: [
            {
                Nom: "Bruce « Mâchoires d'Or » Carcharodon, le Baron Flamboyant des Abysses",
                Image: "./static/images/poissons/Poisson13.png",
                ImageShiny: "./static/images/poissons/Poisson13Shiny.png",
                ImageGolden: "./static/images/poissons/Poisson13Golden.png",
                PV: 120000
            },
            {
                Nom: "Mâchouille le Barracuda, Duc de la Mandibule Grognone",
                Image: "./static/images/poissons/Poisson14.png",
                ImageShiny: "./static/images/poissons/Poisson14Shiny.png",
                ImageGolden: "./static/images/poissons/Poisson14Golden.png",
                PV: 120000
            }
        ],

        Palier8: [
            {
                Nom: "Hubert Mola Grand Commandeur de la Dérive Passive",
                Image: "./static/images/poissons/Poisson15.png",
                ImageShiny: "./static/images/poissons/Poisson15Shiny.png",
                ImageGolden: "./static/images/poissons/Poisson15Golden.png",
                PV: 450000
            },
            {
                Nom: "Michel Requin-Baleine, Grand Intendant de la Copropriété Subaquatique",
                Image: "./static/images/poissons/Poisson16.png",
                ImageShiny: "./static/images/poissons/Poisson16Shiny.png",
                ImageGolden: "./static/images/poissons/Poisson16Golden.png",
                PV: 450000
            }
        ],

        Palier9: [
            {
                Nom: "Gontran le Blobfish, Archiduc de la Mollesse Suprême",
                Image: "./static/images/poissons/Poisson17.png",
                ImageShiny: "./static/images/poissons/Poisson17Shiny.png",
                ImageGolden: "./static/images/poissons/Poisson17Golden.png",
                PV: 1500000
            },
            {
                Nom: "Albert le Cybéroche, Grand Architecte du Réseau de Neurones Marins",
                Image: "./static/images/poissons/Poisson18.png",
                ImageShiny: "./static/images/poissons/Poisson18Shiny.png",
                ImageGolden: "./static/images/poissons/Poisson18Golden.png",
                PV: 1500000
            }
        ],

        Palier10: [
            {
                Nom: "Sir François le Gobelin des Profondeurs, l'Épouvantablement Laid",
                Image: "./static/images/poissons/Poisson19.png",
                ImageShiny: "./static/images/poissons/Poisson19Shiny.png",
                ImageGolden: "./static/images/poissons/Poisson19Golden.png",
                PV: 5000000
            },
            {
                Nom: "Moby le Carassin d'Azur, Archiduc de la Patrouille de Bulle",
                Image: "./static/images/poissons/Poisson20.png",
                ImageShiny: "./static/images/poissons/Poisson20Shiny.png",
                ImageGolden: "./static/images/poissons/Poisson20Golden.png",
                PV: 5000000
            }
        ],

        Palier11: [
            {
                Nom: "Caelacanthe Cog-sworth, le Maréchal de la Rouille Éternelle",
                Image: "./static/images/poissons/Poisson21.png",
                ImageShiny: "./static/images/poissons/Poisson21Shiny.png",
                ImageGolden: "./static/images/poissons/Poisson21Golden.png",
                PV: 15000000
            },
            {
                Nom: "Grognon l'Esturgeon, Archimage de la Bave",
                Image: "./static/images/poissons/Poisson22.png",
                ImageShiny: "./static/images/poissons/Poisson22Shiny.png",
                ImageGolden: "./static/images/poissons/Poisson22Golden.png",
                PV: 15000000
            }
        ],

        Palier12: [
            {
                Nom: "Iggy le Ruban, Commandeur des Courants Électro-Punk",
                Image: "./static/images/poissons/Poisson23.png",
                ImageShiny: "./static/images/poissons/Poisson23Shiny.png",
                ImageGolden: "./static/images/poissons/Poisson23Golden.png",
                PV: 35000000
            },
            {
                Nom: "Jean le Grand Blanc, Baron des Balafres et de la Bavure",
                Image: "./static/images/poissons/Poisson24.png",
                ImageShiny: "./static/images/poissons/Poisson24Shiny.png",
                ImageGolden: "./static/images/poissons/Poisson24Golden.png",
                PV: 35000000
            }
        ],

        Palier13: [
            {
                Nom: "Sir Gilbert le Kraken-Dragon, Premier de Son Nom, Fléau Insignifiant des Poissons-Bulle",
                Image: "./static/images/poissons/Poisson25.png",
                ImageShiny: "./static/images/poissons/Poisson25Shiny.png",
                ImageGolden: "./static/images/poissons/Poisson25Golden.png",
                PV: 80000000
            }
        ]
    },

    calculerPrixAchatMultiple(item, quantite) {
        let total = 0;

        for (let i = 0; i < quantite; i++) {
            total += Math.round(
                item.prixBase * Math.pow(
                    item.multiplicateurPrix,
                    item.quantitePossedee + i
                )
            );
        }
        return total;
    },

    changerPalier(nouveauPalier) {
        if (nouveauPalier === this.joueur.palierActuelAffiche) {
            return;
        }
        if (nouveauPalier <= this.joueur.palier) {

            this.joueur.palierActuelAffiche = nouveauPalier;

            const nouveauPoisson = this.spawnFish(nouveauPalier);

            this.poisson.poissonActuel = nouveauPoisson;
            this.poisson.pvPoissonMax = nouveauPoisson.pvMax;
            this.poisson.pvPoissonActuel = nouveauPoisson.pvMax;

            console.log("Palier affiché :", nouveauPalier);
            console.log("Nouveau poisson :", nouveauPoisson);
        }
    },

    degat_passif() {
        setInterval(function () {
            if (modele.joueur.passifBonusDPS > 0) {
                vue.damageFish();
                modele.frapperPoisson(modele.joueur.passifBonusDPS);
                vue.updateArgent(modele.joueur.argent);
                vue.updateFish(modele.obtenirFish());
                vue.updateScore(modele.obtenirScore());
                vue.updateClic(modele.obtenirNbClics());
            }
        }, 50);
    },

    ajout_item_Passif(typeItem) {
        const item = this.joueur.inventaireObjetPassif[typeItem];

        if (!item) return;

        const quantite = this.joueur.quantiteAchatPassif;
        const prixTotal = this.calculerPrixAchatMultiple(item, quantite);

        if (this.joueur.argent >= prixTotal) {
            this.joueur.argent -= prixTotal;
            item.quantitePossedee += quantite;

            this.recalculerDegatsPassif();

            console.log("Achat x" + quantite + " réussi :", item.nom);
        } else {
            console.log("Argent insuffisant - Prix total :" + prixTotal + " - Argent actuel :" + this.joueur.argent);
        }
    },

    recalculerDegatsPassif() {
        this.joueur.passifBonusDPS = 0;
        for (const typeItem in this.joueur.inventaireObjetPassif) {
            const item = this.joueur.inventaireObjetPassif[typeItem];
            //on ajoute les degat en multipliant la quantité posséder et en ajoutant la somme au bonusDPS passif
            this.joueur.passifBonusDPS += item.quantitePossedee * item.bonusDPS;
        }
        console.log("Bonus DPS passif recalculé (finaux passif) : " + this.joueur.passifBonusDPS);
    },

    ajout_item_Clic(typeItem) {
        const item = this.joueur.inventaireObjetClic[typeItem];

        if (!item) return;

        const quantite = this.joueur.quantiteAchatClic;
        const prixTotal = this.calculerPrixAchatMultiple(item, quantite);

        if (this.joueur.argent >= prixTotal) {
            this.joueur.argent -= prixTotal;
            item.quantitePossedee += quantite;

            this.recalculerDegats();

            console.log("Achat x" + quantite + " réussi :", item.nom);
        } else {
            console.log("Argent insuffisant - Prix total :" + prixTotal + " - Argent actuel :" + this.joueur.argent);
        }
    },

    recalculerDegats() {
        this.joueur.dommagesActuels = this.joueur.dommagesBase;
        for (const typeItem in this.joueur.inventaireObjetClic) {
            const item = this.joueur.inventaireObjetClic[typeItem];
            //on ajoute les degat en multipliant la quantité posséder et en ajoutant la somme au dommage actuel
            this.joueur.dommagesActuels += item.quantitePossedee * item.bonusDegat;
        }
        console.log("Dégâts actuels recalculés (finaux au clic) : " + this.joueur.dommagesActuels);
    },

    calculerScoreGagnePoisson() {
        console.log("Palier affiché pour score :", this.joueur.palierActuelAffiche);
        return this.joueur.palierActuelAffiche;
    },

    frapperPoisson(damageAmount, compterClic = true) {
        if (compterClic) {
            this.joueur.nbClics++;
        }
        console.log("damageAmount =", damageAmount);
        console.log("PV avant =", this.poisson.pvPoissonActuel);
        console.log("dommagesActuels joueur =", this.joueur.dommagesActuels);

        // ASTUCE DE PRO : Math.min empêche de faire plus de dégâts que les HP restants
        let dommagesActuels = Math.min(damageAmount, this.poisson.pvPoissonActuel);

        // On retire la vie au poisson
        this.poisson.pvPoissonActuel -= dommagesActuels;

        // On donne l'argent immédiat (1 Dégât = 1 Argent)
        this.joueur.argent += Math.round(dommagesActuels * this.poisson.poissonActuel.multiplicateurArgent)


        console.log("PV restants :", this.poisson.pvPoissonActuel);

        // Vérification de la mort du poisson
        if (this.poisson.pvPoissonActuel <= 0) {

            // LE POISSON EST MORT : On donne +1 au Score
            this.joueur.score += this.calculerScoreGagnePoisson();
            this.joueur.mortPoisson += 1;
            console.log("Nombres de poissons tués : " + this.joueur.mortPoisson)
            console.log("Argent gagné :", this.joueur.argent);
            console.log("Poisson tué ! Score total : " + this.joueur.score);

            // On vérifie si on passe au Palier Supérieur

            while (
                this.joueur.seuilPalier[this.joueur.palier + 1] &&
                this.joueur.score >= this.joueur.seuilPalier[this.joueur.palier + 1]
            ) {
                this.joueur.palier += 1;
                console.log("Palier débloqué :", this.joueur.palier);
            }
            const nouveauPoisson = this.spawnFish(this.joueur.palierActuelAffiche);
            // On fait apparaître le nouveau poisson du bloc correspondant
            this.poisson.poissonActuel = nouveauPoisson;
            // On réinitialise les PV du poisson
            this.poisson.pvPoissonMax = this.poisson.poissonActuel.pvMax;
            this.poisson.pvPoissonActuel = this.poisson.poissonActuel.pvMax;
            console.log("Nouveau poisson modèle :", this.poisson.poissonActuel);
        }
    },

    obteniritem_Passif(typeItem) {
        return this.joueur.inventaireObjetPassif[typeItem];
    },

    obteniritem_Clic(typeItem) {
        return this.joueur.inventaireObjetClic[typeItem];
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
    obtenirMortPoisson() {
        return this.joueur.mortPoisson
    },

    //Méthode pour faire apparaître un poisson aléatoire en fonction du palier actuel du joueur
    spawnFish(playerPalier) {
        // Liste des poissons du palier actuel
        const currentFishList =
            this.catalogue["Palier" + playerPalier];
        // Choix d'un poisson aléatoire
        const randomIndex =
            Math.floor(Math.random() * currentFishList.length);
        const chosenFish =
            currentFishList[randomIndex];
        // Génération de la rareté
        const randomRarete = Math.random();
        let imageFinale = chosenFish.Image;
        let rarete = "normal";
        let multiplicateurArgent = 1;
        // SHINY = 5%
        if (randomRarete <= 0.05) {
            imageFinale = chosenFish.ImageShiny;
            rarete = "shiny";
            multiplicateurArgent = 20;
        }
        // GOLDEN = 10%
        else if (randomRarete <= 0.10) {
            imageFinale = chosenFish.ImageGolden;
            rarete = "golden";
            multiplicateurArgent = 10;
        }
        // Retour du poisson final
        return {
            nom: chosenFish.Nom,
            image: imageFinale,
            rarete: rarete,
            multiplicateurArgent: multiplicateurArgent,
            pvMax: chosenFish.PV,
            pvActuel: chosenFish.PV
        };
    },

    importerDonneesSauvegarde(donnees) {

        if (donnees.joueur === undefined) {
            return
        }


        this.joueur.score = donnees.joueur.score
        this.joueur.nbClics = donnees.joueur.nbClics
        this.joueur.dommagesActuels = donnees.joueur.dommagesActuels
        this.joueur.argent = donnees.joueur.argent
        this.joueur.seuilPalier = donnees.joueur.seuilPalier
        this.joueur.inventaireObjetClic = donnees.joueur.inventaireObjetClic
        this.joueur.inventaireObjetPassif = donnees.joueur.inventaireObjetPassif
        this.joueur.palier = donnees.joueur.palier
        this.joueur.passifBonusDPS = donnees.joueur.passifBonusDPS
        this.joueur.mortPoisson = donnees.joueur.mortPoisson
        this.joueur.dommagesBase = donnees.joueur.dommagesBase
        this.joueur.palierActuelAffiche = this.joueur.palier
        const nouveauPoisson = this.spawnFish(this.joueur.palier)
        this.poisson.poissonActuel = nouveauPoisson
        this.poisson.pvPoissonMax = nouveauPoisson.pvMax
        this.poisson.pvPoissonActuel = nouveauPoisson.pvMax

        this.joueur.sauvegardeChargee = true
    },

    exporterDonneesSauvegarde() {
        let etatPartie = { joueur: this.joueur, poisson: this.poisson }
        let sauvegardePartie = JSON.stringify(etatPartie)
        let sauvegardePartieEncodé = btoa(sauvegardePartie)
        return sauvegardePartieEncodé
    },
    obtenirEtatPartie() {
        return { joueur: this.joueur, poisson: this.poisson }
    },

    initialiserNouvellePartie() {
        if (this.joueur.sauvegardeChargee === false) {
            // Création du premier poisson au lancement du jeu
            this.poisson.poissonActuel =
                this.spawnFish(this.joueur.palier);

            this.poisson.pvPoissonMax =
                this.poisson.poissonActuel.pvMax;

            this.poisson.pvPoissonActuel =
                this.poisson.poissonActuel.pvMax;

            console.log("Premier poisson chargé :",
                this.poisson.poissonActuel);
        }
    }
}

