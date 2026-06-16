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
        succes: {
            Succes1: { Numero: 1, Nom: "Un pêcheur sachant pêcher.", Objectif: "Pêcher votre premier poisson.", Emoji: "🐟", Debloque: false },
            Succes2: { Numero: 2, Nom: "Début de la richesse.", Objectif: "Acquérir 15 argents.", Emoji: "🪙", Debloque: false },
            Succes3: { Numero: 3, Nom: "Le marchand d'amélioration.", Objectif: "Débloquer les améliorations de clic.", Emoji: "🛒", Debloque: false },
            Succes4: { Numero: 4, Nom: "Début de l'entreprenariat.", Objectif: "Débloquer les améliorations passives.", Emoji: "🏭", Debloque: false },
            Succes5: { Numero: 5, Nom: "Les portes de la mer s'ouvre.", Objectif: "Débloquer le palier 1.", Emoji: "🚪", Debloque: false },
            Succes6: { Numero: 6, Nom: "Les pieds dans l'eau.", Objectif: "Débloquer le palier 2.", Emoji: "🌊", Debloque: false },
            Succes7: { Numero: 7, Nom: "Baptême marin.", Objectif: "Débloquer le palier 3.", Emoji: "💧", Debloque: false },
            Succes8: { Numero: 8, Nom: "L'horizon s'efface.", Objectif: "Débloquer le palier 4.", Emoji: "🌅", Debloque: false },
            Succes9: { Numero: 9, Nom: "Le soleil pâlit.", Objectif: "Débloquer le palier 5.", Emoji: "🌤️", Debloque: false },
            Succes10: { Numero: 10, Nom: "La lumière hésite.", Objectif: "Débloquer le palier 6.", Emoji: "🕯️", Debloque: false },
            Succes11: { Numero: 11, Nom: "Le silence commence.", Objectif: "Débloquer le palier 7.", Emoji: "🤫", Debloque: false },
            Succes12: { Numero: 12, Nom: "Les ombres parlent.", Objectif: "Débloquer le palier 8.", Emoji: "👁️", Debloque: false },
            Succes13: { Numero: 13, Nom: "Quelque chose remonte.", Objectif: "Débloquer le palier 9.", Emoji: "❓", Debloque: false },
            Succes14: { Numero: 14, Nom: "Ne regarde pas en bas.", Objectif: "Débloquer le palier 10.", Emoji: "😰", Debloque: false },
            Succes15: { Numero: 15, Nom: "Il n'y a plus de surface.", Objectif: "Débloquer le palier 11.", Emoji: "💀", Debloque: false },
            Succes16: { Numero: 16, Nom: "Tu n'aurais pas dû descendre.", Objectif: "Débloquer le palier 12.", Emoji: "☠️", Debloque: false },
            Succes17: { Numero: 17, Nom: "Les abysses t'ont choisi.", Objectif: "Débloquer le palier 13.", Emoji: "🔱", Debloque: false },
            Succes18: { Numero: 18, Nom: "A mon époque on y allait à la main.", Objectif: "Acheter Pêche à mains nues.", Emoji: "🤲", Debloque: false },
            Succes19: { Numero: 19, Nom: "L'homme des cavernes pêchait mieux.", Objectif: "Acheter Lance en bois taillée.", Emoji: "🪵", Debloque: false },
            Succes20: { Numero: 20, Nom: "Pour les enfants, c'est suffisant.", Objectif: "Acheter Épuisette de plage.", Emoji: "🕸️", Debloque: false },
            Succes21: { Numero: 21, Nom: "Un artisan du fond de l'eau.", Objectif: "Acheter Canne à pêche artisanale.", Emoji: "🎣", Debloque: false },
            Succes22: { Numero: 22, Nom: "La technologie au service de la mort.", Objectif: "Acheter Canne à pêche avec moulinet.", Emoji: "⚙️", Debloque: false },
            Succes23: { Numero: 23, Nom: "Ça commence à devenir sérieux.", Objectif: "Acheter Fusil-harpon de plongée.", Emoji: "🔱", Debloque: false },
            Succes24: { Numero: 24, Nom: "Les poissons viennent d'eux-mêmes.", Objectif: "Acheter Appâts aux phéromones.", Emoji: "🧪", Debloque: false },
            Succes25: { Numero: 25, Nom: "L'ingénierie au service du massacre.", Objectif: "Acheter Canne en fibre de carbone.", Emoji: "🏗️", Debloque: false },
            Succes26: { Numero: 26, Nom: "Pan.", Objectif: "Acheter Harpon pneumatique.", Emoji: "💥", Debloque: false },
            Succes27: { Numero: 27, Nom: "La mer tremble à ton passage.", Objectif: "Acheter Fusil à ondes soniques.", Emoji: "📡", Debloque: false },
            Succes28: { Numero: 28, Nom: "Zeus pêchait-il ainsi ?", Objectif: "Acheter Gantelet électrique.", Emoji: "⚡", Debloque: false },
            Succes29: { Numero: 29, Nom: "Le poisson ne souffre plus, il est gelé.", Objectif: "Acheter Lance-torpilles cryogéniques.", Emoji: "🧊", Debloque: false },
            Succes30: { Numero: 30, Nom: "Cent mains dans l'eau.", Objectif: "Acheter 100x Pêche à mains nues.", Emoji: "👐", Debloque: false },
            Succes31: { Numero: 31, Nom: "Une forêt sacrifiée pour la pêche.", Objectif: "Acheter 100x Lance en bois taillée.", Emoji: "🌲", Debloque: false },
            Succes32: { Numero: 32, Nom: "L'épuisette ne suffit plus.", Objectif: "Acheter 100x Épuisette de plage.", Emoji: "🕸️", Debloque: false },
            Succes33: { Numero: 33, Nom: "L'artisan est devenu industriel.", Objectif: "Acheter 100x Canne à pêche artisanale.", Emoji: "🏭", Debloque: false },
            Succes34: { Numero: 34, Nom: "Le moulinet tourne sans fin.", Objectif: "Acheter 100x Canne à pêche avec moulinet.", Emoji: "🔄", Debloque: false },
            Succes35: { Numero: 35, Nom: "Un arsenal sous-marin.", Objectif: "Acheter 100x Fusil-harpon de plongée.", Emoji: "⚔️", Debloque: false },
            Succes36: { Numero: 36, Nom: "L'océan entier est attiré.", Objectif: "Acheter 100x Appâts aux phéromones.", Emoji: "🌀", Debloque: false },
            Succes37: { Numero: 37, Nom: "La fibre craque sous le poids.", Objectif: "Acheter 100x Canne en fibre de carbone.", Emoji: "💢", Debloque: false },
            Succes38: { Numero: 38, Nom: "Pan. Pan. Pan. Pan...", Objectif: "Acheter 100x Harpon pneumatique.", Emoji: "💣", Debloque: false },
            Succes39: { Numero: 39, Nom: "Le silence est mort avec les poissons.", Objectif: "Acheter 100x Fusil à ondes soniques.", Emoji: "📢", Debloque: false },
            Succes40: { Numero: 40, Nom: "La foudre frappe sans relâche.", Objectif: "Acheter 100x Gantelet électrique.", Emoji: "🌩️", Debloque: false },
            Succes41: { Numero: 41, Nom: "L'océan commence à geler.", Objectif: "Acheter 100x Lance-torpilles cryogéniques.", Emoji: "❄️", Debloque: false },
            Succes42: { Numero: 42, Nom: "Travaillez, mes fidèles employés.", Objectif: "Acheter Cage à poisson.", Emoji: "🪤", Debloque: false },
            Succes43: { Numero: 43, Nom: "Le filet se resserre.", Objectif: "Acheter Filet de pêche.", Emoji: "🕸️", Debloque: false },
            Succes44: { Numero: 44, Nom: "En avant, matelot.", Objectif: "Acheter Barque à rames avec filet.", Emoji: "🚣", Debloque: false },
            Succes45: { Numero: 45, Nom: "Le moteur tourne, les poissons meurent.", Objectif: "Acheter Petit bateau à moteur.", Emoji: "🚤", Debloque: false },
            Succes46: { Numero: 46, Nom: "Le fond de l'océan se vide.", Objectif: "Acheter Chalutier.", Emoji: "⚓", Debloque: false },
            Succes47: { Numero: 47, Nom: "Une usine flottante de la mort.", Objectif: "Acheter Navire-usine.", Emoji: "🛳️", Debloque: false },
            Succes48: { Numero: 48, Nom: "Élevés pour mourir.", Objectif: "Acheter Ferme aquacole.", Emoji: "🐠", Debloque: false },
            Succes49: { Numero: 49, Nom: "Une armada de la destruction.", Objectif: "Acheter Flotte de chalutiers.", Emoji: "⚔️", Debloque: false },
            Succes50: { Numero: 50, Nom: "Aspirer la mer entière.", Objectif: "Acheter Station de pompage marine.", Emoji: "🌊", Debloque: false },
            Succes51: { Numero: 51, Nom: "Personne ne peut nous voir ici.", Objectif: "Acheter Sous-marin de chalutage.", Emoji: "🤿", Debloque: false },
            Succes52: { Numero: 52, Nom: "Le titane ne pardonne pas.", Objectif: "Acheter Canon à filet en titane.", Emoji: "🔩", Debloque: false },
            Succes53: { Numero: 53, Nom: "L'océan appartient à l'industrie.", Objectif: "Acheter Méga-plateforme océanique.", Emoji: "🏗️", Debloque: false },
            Succes54: { Numero: 54, Nom: "Une prison sans fin.", Objectif: "Acheter 100x Cage à poisson.", Emoji: "🔒", Debloque: false },
            Succes55: { Numero: 55, Nom: "L'océan est devenu un filet.", Objectif: "Acheter 100x Filet de pêche.", Emoji: "🌐", Debloque: false },
            Succes56: { Numero: 56, Nom: "Une flottille de rameurs épuisés.", Objectif: "Acheter 100x Barque à rames avec filet.", Emoji: "😮‍💨", Debloque: false },
            Succes57: { Numero: 57, Nom: "Le port est plein, la mer est vide.", Objectif: "Acheter 100x Petit bateau à moteur.", Emoji: "🏚️", Debloque: false },
            Succes58: { Numero: 58, Nom: "Le fond marin n'existe plus.", Objectif: "Acheter 100x Chalutier.", Emoji: "🕳️", Debloque: false },
            Succes59: { Numero: 59, Nom: "La mer est une chaîne de production.", Objectif: "Acheter 100x Navire-usine.", Emoji: "⚙️", Debloque: false },
            Succes60: { Numero: 60, Nom: "L'élevage a remplacé l'océan.", Objectif: "Acheter 100x Ferme aquacole.", Emoji: "🏭", Debloque: false },
            Succes61: { Numero: 61, Nom: "Une guerre déclarée à la mer.", Objectif: "Acheter 100x Flotte de chalutiers.", Emoji: "💀", Debloque: false },
            Succes62: { Numero: 62, Nom: "La mer baisse à vue d'œil.", Objectif: "Acheter 100x Station de pompage marine.", Emoji: "📉", Debloque: false },
            Succes63: { Numero: 63, Nom: "Les abysses sont à sec.", Objectif: "Acheter 100x Sous-marin de chalutage.", Emoji: "😱", Debloque: false },
            Succes64: { Numero: 64, Nom: "Le titane a recouvert l'océan.", Objectif: "Acheter 100x Canon à filet en titane.", Emoji: "🔩", Debloque: false },
            Succes65: { Numero: 65, Nom: "Plus d'eau, que du métal.", Objectif: "Acheter 100x Méga-plateforme océanique.", Emoji: "🦾", Debloque: false },
            Succes66: { Numero: 66, Nom: "L'arsenal du pêcheur.", Objectif: "Acheter 1 fois toutes les améliorations clic.", Emoji: "🗡️", Debloque: false },
            Succes67: { Numero: 67, Nom: "L'empire du large.", Objectif: "Acheter 1 fois toutes les améliorations passives.", Emoji: "👑", Debloque: false },
            Succes68: { Numero: 68, Nom: "Le maître des abysses.", Objectif: "Acheter 1 fois toutes les améliorations (clic + passif).", Emoji: "🔱", Debloque: false },
            Succes69: { Numero: 69, Nom: "L'industrie de la mort.", Objectif: "Acheter 100x toutes les améliorations clic.", Emoji: "💀", Debloque: false },
            Succes70: { Numero: 70, Nom: "L'océan n'existe plus.", Objectif: "Acheter 100x toutes les améliorations passives.", Emoji: "🌑", Debloque: false },
            Succes71: { Numero: 71, Nom: "Tu as tout consumé.", Objectif: "Acheter 100x toutes les améliorations (clic + passif).", Emoji: "🖤", Debloque: false },
            Succes72: { Numero: 72, Nom: "Les abysses n'ont plus de secrets.", Objectif: "Obtenir tous les succès.", Emoji: "🏆", Debloque: false }
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
        //on vrifie si on a bien débloqué un ou des succes
        this.verifierLesSucces();
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

        // on verifie si l'utilisateur a biend débloqué un/des succès
        this.verifierLesSucces();
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
            // on vérifie si on a bien débloqué les succes
            this.verifierLesSucces();
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

        if (donnees.joueur.succes !== undefined) {
            this.joueur.succes = donnees.joueur.succes;
        }

        const nouveauPoisson = this.spawnFish(this.joueur.palier)
        this.poisson.poissonActuel = nouveauPoisson
        this.poisson.pvPoissonMax = nouveauPoisson.pvMax
        this.poisson.pvPoissonActuel = nouveauPoisson.pvMax

        this.joueur.sauvegardeChargee = true
    },

    exporterDonneesSauvegarde() {
        let etatPartie = { joueur: this.joueur, poisson: this.poisson }
        let sauvegardePartie = JSON.stringify(etatPartie)

        // On traduit d'abord les émojis/accents, puis on encode en base64
        let sauvegardePartieEncode = btoa(encodeURIComponent(sauvegardePartie))

        return sauvegardePartieEncode
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
    },

    debloquerSucces(idSucces) {
        if (this.joueur.succes[idSucces] && this.joueur.succes[idSucces].Debloque === false) {
            this.joueur.succes[idSucces].Debloque = true;
            console.log("🏆 Succès Débloqué : " + this.joueur.succes[idSucces].Nom);
            // Ton collègue pourra lier son affichage ici plus tard
        }
    },


    verifierLesSucces() {
        // Succès et 2
        if (this.joueur.argent >= 15) this.debloquerSucces("Succes2");
        if (this.joueur.mortPoisson >= 1) this.debloquerSucces("Succes1");

        //  Succès 3 et 4 : Achat de la première amélioration
        if (this.joueur.inventaireObjetClic.amelioration_1.quantitePossedee >= 1) this.debloquerSucces("Succes3");
        if (this.joueur.inventaireObjetPassif.amelioration_1.quantitePossedee >= 1) this.debloquerSucces("Succes4");

        // 5 à 17 : Paliers (Palier 1 = Succès 5)
        for (let i = 1; i <= 13; i++) {
            if (this.joueur.palier >= i) this.debloquerSucces("Succes" + (i + 4));
        }

        let toutClic1 = true, toutClic100 = true;
        let toutPassif1 = true, toutPassif100 = true;

        // Succès pour les Améliorations au Clic (dps)
        for (let i = 1; i <= 12; i++) {
            let item = this.joueur.inventaireObjetClic["amelioration_" + i];

            // Succès 18 à 29 (1x)
            if (item.quantitePossedee >= 1) this.debloquerSucces("Succes" + (17 + i));
            else toutClic1 = false;

            // Succès 30 à 41 (100x)
            if (item.quantitePossedee >= 100) this.debloquerSucces("Succes" + (29 + i));
            else toutClic100 = false;
        }

        // Succès pour les améliorations Passives
        for (let i = 1; i <= 12; i++) {
            let item = this.joueur.inventaireObjetPassif["amelioration_" + i];

            // Succès 42 à 53 (1x)
            if (item.quantitePossedee >= 1) this.debloquerSucces("Succes" + (41 + i));
            else toutPassif1 = false;

            // Succès 54 à 65 (100x) - Décalé suite à la suppression de l'objet 13
            if (item.quantitePossedee >= 100) this.debloquerSucces("Succes" + (53 + i));
            else toutPassif100 = false;
        }

        // Succès 66 à 71 : Succès d'achats
        if (toutClic1) this.debloquerSucces("Succes66");
        if (toutPassif1) this.debloquerSucces("Succes67");
        if (toutClic1 && toutPassif1) this.debloquerSucces("Succes68");

        if (toutClic100) this.debloquerSucces("Succes69");
        if (toutPassif100) this.debloquerSucces("Succes70");
        if (toutClic100 && toutPassif100) this.debloquerSucces("Succes71");

        // Succès final 72 : Avoir tous les succes
        let totalDebloques = 0;
        for (let cle in this.joueur.succes) {
            if (this.joueur.succes[cle].Debloque === true) totalDebloques++;
        }

        if (totalDebloques === 71 && !this.joueur.succes["Succes72"].Debloque) {
            this.debloquerSucces("Succes72");
        }
    }



}

