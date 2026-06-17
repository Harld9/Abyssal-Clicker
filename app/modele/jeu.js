// ============================================================
// modele/jeu.js
// Couche MODÈLE du pattern MVC.
// Contient toutes les données du jeu (joueur, poissons, succès)
// et toute la logique métier (calculs, achats, sauvegarde, etc.)
// Ne touche JAMAIS au DOM (sauf via vue.debloquerSuccesVue, exception assumée).
// ============================================================

const modele = {
    // ============================================================
    // DONNÉES DU JOUEUR
    // ============================================================
    joueur: {
        sauvegardeChargee: false,    // true si on a chargé une sauvegarde au démarrage
        score: 0,                    // score total (sert pour débloquer les paliers)
        nbClics: 0,                  // compteur de clics manuels (pour affichage uniquement)
        dommagesActuels: 1,          // dégâts infligés par clic (base + bonus améliorations)
        dommagesBase: 1,             // dégâts de base sans aucune amélioration
        argent: 0,                   // argent gagné en tuant les poissons
        palier: 1,                   // palier max débloqué par le joueur
        mortPoisson: 0,              // nombre total de poissons tués
        passifBonusDPS: 0,           // dégâts passifs par tick (somme des améliorations passives)
        niveau_amelioration_clic: 1, // niveau d'amélioration clic (non utilisé actuellement)
        niveau_amelioration_passif: 1, // niveau d'amélioration passive (non utilisé actuellement)
        palierActuelAffiche: 1,      // palier actuellement affiché (peut être < palier pour revoir un ancien)
        quantiteAchatClic: 1,        // quantité d'achat sélectionnée pour les améliorations clic (1, 10 ou 100)
        quantiteAchatPassif: 1,      // quantité d'achat sélectionnée pour les améliorations passives

        // Seuils de score nécessaires pour débloquer chaque palier
        // Le commentaire indique combien de poissons du palier précédent il faut tuer
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

        // ============================================================
        // LES 72 SUCCÈS DU JEU
        // Chaque succès a : Numero, Nom (titre affiché), Objectif (description), Emoji, Debloque
        // Catégories :
        //   1-4   : généraux
        //   5-17  : déblocage des paliers (1 succès par palier)
        //   18-29 : 1er achat de chaque amélioration de clic
        //   30-41 : 100x achats de chaque amélioration de clic
        //   42-53 : 1er achat de chaque amélioration passive
        //   54-65 : 100x achats de chaque amélioration passive
        //   66-71 : succès de collection (tout acheter)
        //   72    : succès final (avoir tous les autres)
        // ============================================================
        succes: {
            Succes1: { Numero: 1, Nom: "Un pêcheur sachant pêcher.", Objectif: "Pêcher votre premier poisson.", Emoji: "🐟", Debloque: false },
            Succes2: { Numero: 2, Nom: "Début de la richesse.", Objectif: "Acquérir 5 argents.", Emoji: "🪙", Debloque: false },
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

        // ============================================================
        // INVENTAIRE DES AMÉLIORATIONS DE CLIC (12 améliorations)
        // Chaque item a :
        //   nom              : nom affiché
        //   bonusDegat       : dégâts ajoutés par exemplaire possédé
        //   prixBase         : prix du 1er exemplaire
        //   quantitePossedee : nombre acheté
        //   multiplicateurPrix : facteur d'augmentation du prix à chaque achat (1.15 = +15%)
        // ============================================================
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

        // ============================================================
        // INVENTAIRE DES AMÉLIORATIONS PASSIVES (12 améliorations)
        // Même structure que les améliorations clic, mais bonusDPS au lieu de bonusDegat
        // bonusDPS = dégâts passifs par tick (= 50ms dans le setInterval)
        // ============================================================
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

    // ============================================================
    // ÉTAT DU POISSON ACTUEL
    // pvPoissonMax    : points de vie maximum du poisson en cours
    // pvPoissonActuel : points de vie restants
    // poissonActuel   : objet poisson avec nom, image, rareté, etc.
    // ============================================================
    poisson: {
        pvPoissonMax: 10,
        pvPoissonActuel: 10,
        poissonActuel: null,
    },

    // ============================================================
    // CATALOGUE DES POISSONS
    // Structuré par palier (1 à 13)
    // Chaque poisson a :
    //   Nom         : nom complet (souvent humoristique)
    //   Image       : image normale
    //   ImageShiny  : image rare (5% de chance)
    //   ImageGolden : image dorée (10% de chance)
    //   PV          : points de vie
    // ============================================================
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

        // Palier 13 = boss final, un seul poisson
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

    // ============================================================
    // MÉTHODES DU MODÈLE
    // ============================================================

    /**
     * Calcule le prix TOTAL pour acheter quantite exemplaires d'un item
     * Chaque exemplaire coûte plus cher à cause du multiplicateurPrix (1.15 = +15% à chaque achat)
     *
     * Formule pour le i-ème achat : prixBase × multiplicateur^(quantitePossedee + i)
     * Math.pow(base, exp) = base à la puissance exp
     * Math.round arrondit à l'entier le plus proche
     */
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

    /**
     * Change le palier affiché (navigation entre paliers déjà débloqués)
     * Vérifie qu'on ne change pas pour le même palier et qu'on a bien débloqué le palier cible
     */
    changerPalier(nouveauPalier) {
        // Si on clique sur le palier actuel, rien à faire
        if (nouveauPalier === this.joueur.palierActuelAffiche) {
            return;
        }
        // On vérifie que le palier est débloqué (≤ palier max)
        if (nouveauPalier <= this.joueur.palier) {

            this.joueur.palierActuelAffiche = nouveauPalier;

            // Spawn d'un nouveau poisson du palier cible
            const nouveauPoisson = this.spawnFish(nouveauPalier);

            this.poisson.poissonActuel = nouveauPoisson;
            this.poisson.pvPoissonMax = nouveauPoisson.pvMax;
            this.poisson.pvPoissonActuel = nouveauPoisson.pvMax;

            console.log("Palier affiché :", nouveauPalier);
            console.log("Nouveau poisson :", nouveauPoisson);
        }
    },

    /**
     * Boucle de dégâts passifs (DUPLICATA — la version utilisée est dans le contrôleur)
     * setInterval lance la fonction à intervalle régulier (toutes les 50ms ici)
     */
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

    /**
     * Achète une amélioration passive
     * - calcule le prix selon la quantité d'achat (x1, x10 ou x100)
     * - vérifie que le joueur a assez d'argent
     * - applique l'achat et recalcule les dégâts passifs
     * - vérifie les succès
     */
    ajout_item_Passif(typeItem) {
        // Récupère l'item par son nom (ex: "amelioration_3")
        const item = this.joueur.inventaireObjetPassif[typeItem];

        if (!item) return; // sécurité

        // Récupère la quantité d'achat sélectionnée (1, 10 ou 100)
        const quantite = this.joueur.quantiteAchatPassif;
        const prixTotal = this.calculerPrixAchatMultiple(item, quantite);

        // Vérifie l'argent disponible
        if (this.joueur.argent >= prixTotal) {
            this.joueur.argent -= prixTotal;
            item.quantitePossedee += quantite;

            this.recalculerDegatsPassif();

            console.log("Achat x" + quantite + " réussi :", item.nom);
        } else {
            console.log("Argent insuffisant - Prix total :" + prixTotal + " - Argent actuel :" + this.joueur.argent);
        }
        // On vérifie si on a débloqué des succès suite à l'achat
        this.verifierLesSucces();
    },

    /**
     * Recalcule la somme totale des dégâts passifs en parcourant tout l'inventaire passif
     * for...in itère sur les CLÉS d'un objet
     */
    recalculerDegatsPassif() {
        this.joueur.passifBonusDPS = 0;
        for (const typeItem in this.joueur.inventaireObjetPassif) {
            const item = this.joueur.inventaireObjetPassif[typeItem];
            // bonus DPS de cet item × quantité possédée
            this.joueur.passifBonusDPS += item.quantitePossedee * item.bonusDPS;
        }
        console.log("Bonus DPS passif recalculé (finaux passif) : " + this.joueur.passifBonusDPS);
    },

    /**
     * Achète une amélioration de clic (même logique qu'ajout_item_Passif)
     */
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

        this.verifierLesSucces();
    },

    /**
     * Recalcule les dégâts par clic à partir des dommagesBase + bonus des améliorations
     */
    recalculerDegats() {
        this.joueur.dommagesActuels = this.joueur.dommagesBase;
        for (const typeItem in this.joueur.inventaireObjetClic) {
            const item = this.joueur.inventaireObjetClic[typeItem];
            // bonus de dégâts de cet item × quantité possédée
            this.joueur.dommagesActuels += item.quantitePossedee * item.bonusDegat;
        }
        console.log("Dégâts actuels recalculés (finaux au clic) : " + this.joueur.dommagesActuels);
    },

    /**
     * Score gagné quand le poisson est tué = numéro du palier actuel
     * (un poisson palier 5 vaut 5 points)
     */
    calculerScoreGagnePoisson() {
        console.log("Palier affiché pour score :", this.joueur.palierActuelAffiche);
        return this.joueur.palierActuelAffiche;
    },

    /**
     * Cœur du gameplay : frappe le poisson actuel
     *
     * @param {number} damageAmount - quantité de dégâts à infliger
     * @param {boolean} compterClic - true si c'est un clic manuel (incrémente nbClics)
     */
    frapperPoisson(damageAmount, compterClic = true) {
        if (compterClic) {
            this.joueur.nbClics++;
        }
        console.log("damageAmount =", damageAmount);
        console.log("PV avant =", this.poisson.pvPoissonActuel);
        console.log("dommagesActuels joueur =", this.joueur.dommagesActuels);

        // ASTUCE : Math.min empêche de faire plus de dégâts que les HP restants
        // (sinon on aurait des HP négatifs et de l'argent en trop)
        let dommagesActuels = Math.min(damageAmount, this.poisson.pvPoissonActuel);

        // Application des dégâts
        this.poisson.pvPoissonActuel -= dommagesActuels;

        // Argent gagné = dégâts infligés × multiplicateur (selon rareté du poisson)
        // Math.round pour avoir un entier
        this.joueur.argent += Math.round(dommagesActuels * this.poisson.poissonActuel.multiplicateurArgent)


        console.log("PV restants :", this.poisson.pvPoissonActuel);

        // Vérification des succès À CHAQUE COUP (pour détecter par exemple le succès "15 argents")
        this.verifierLesSucces();

        // ----- POISSON TUÉ -----
        if (this.poisson.pvPoissonActuel <= 0) {

            // Le score augmente du numéro du palier actuel
            this.joueur.score += this.calculerScoreGagnePoisson();
            this.joueur.mortPoisson += 1;
            console.log("Nombres de poissons tués : " + this.joueur.mortPoisson)
            console.log("Argent gagné :", this.joueur.argent);
            console.log("Poisson tué ! Score total : " + this.joueur.score);

            // Vérification du passage au(x) palier(s) supérieur(s)
            // Le while permet de passer plusieurs paliers d'un coup si le score est très élevé
            while (
                this.joueur.seuilPalier[this.joueur.palier + 1] &&
                this.joueur.score >= this.joueur.seuilPalier[this.joueur.palier + 1]
                ) {
                this.joueur.palier += 1;
                console.log("Palier débloqué :", this.joueur.palier);
            }

            // Apparition d'un nouveau poisson du palier actuellement affiché
            const nouveauPoisson = this.spawnFish(this.joueur.palierActuelAffiche);
            this.poisson.poissonActuel = nouveauPoisson;
            // Réinitialisation des PV
            this.poisson.pvPoissonMax = this.poisson.poissonActuel.pvMax;
            this.poisson.pvPoissonActuel = this.poisson.poissonActuel.pvMax;
            console.log("Nouveau poisson modèle :", this.poisson.poissonActuel);
            // Re-vérification des succès après la mort (palier débloqué, score atteint, etc.)
            this.verifierLesSucces();
        }
    },

    // ----- GETTERS (méthodes qui retournent des données du modèle) -----

    obteniritem_Passif(typeItem) {
        return this.joueur.inventaireObjetPassif[typeItem];
    },

    obteniritem_Clic(typeItem) {
        return this.joueur.inventaireObjetClic[typeItem];
    },

    // Méthode qui permet d'obtenir le score
    obtenirScore() {
        return this.joueur.score
    },

    // Méthode qui permet d'obtenir le nombre de clics
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

    /**
     * Fait apparaître un poisson aléatoire pour le palier donné
     * Détermine aussi la rareté (normal / golden / shiny) qui influence l'argent gagné
     */
    spawnFish(playerPalier) {
        // Récupère la liste des poissons du palier
        // Notation crochets : accès dynamique à une propriété ("Palier" + 5 = "Palier5")
        const currentFishList =
            this.catalogue["Palier" + playerPalier];

        // Choix d'un poisson aléatoire dans la liste
        // Math.random() retourne un nombre entre 0 et 1
        // Math.floor() arrondit vers le bas
        const randomIndex =
            Math.floor(Math.random() * currentFishList.length);
        const chosenFish =
            currentFishList[randomIndex];

        // Génération de la rareté (autre Math.random pour avoir un nouveau hasard)
        const randomRarete = Math.random();
        let imageFinale = chosenFish.Image;        // image normale par défaut
        let rarete = "normal";
        let multiplicateurArgent = 1;

        // SHINY = 5% de chance (0 → 0.05)
        if (randomRarete <= 0.05) {
            imageFinale = chosenFish.ImageShiny;
            rarete = "shiny";
            multiplicateurArgent = 20;  // shiny = argent x20
        }
            // GOLDEN = 10% de chance (0.05 → 0.10)
        // else if = sinon, si shiny n'est pas sorti, on tente golden
        else if (randomRarete <= 0.10) {
            imageFinale = chosenFish.ImageGolden;
            rarete = "golden";
            multiplicateurArgent = 10;  // golden = argent x10
        }
        // Sinon : normal (90% de chance)

        // Retourne un nouvel objet poisson prêt à l'emploi
        return {
            nom: chosenFish.Nom,
            image: imageFinale,
            rarete: rarete,
            multiplicateurArgent: multiplicateurArgent,
            pvMax: chosenFish.PV,
            pvActuel: chosenFish.PV
        };
    },

    /**
     * Importe une sauvegarde dans le modèle (depuis localStorage ou import manuel)
     * @param {Object} donnees - objet désérialisé contenant { joueur, poisson }
     */
    importerDonneesSauvegarde(donnees) {
        // Sécurité : si pas de "joueur" dans les données, on annule
        if (donnees.joueur === undefined) {
            return
        }

        // Restauration de toutes les propriétés du joueur
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
        // palierActuelAffiche = palier max (on affiche le dernier débloqué)
        this.joueur.palierActuelAffiche = this.joueur.palier

        // Restauration des succès (avec vérification de présence pour compatibilité)
        if (donnees.joueur.succes !== undefined) {
            this.joueur.succes = donnees.joueur.succes;
        }

        // Spawn d'un nouveau poisson du palier actuel
        const nouveauPoisson = this.spawnFish(this.joueur.palier)
        this.poisson.poissonActuel = nouveauPoisson
        this.poisson.pvPoissonMax = nouveauPoisson.pvMax
        this.poisson.pvPoissonActuel = nouveauPoisson.pvMax

        // Marqueur pour ne pas regénérer un poisson de départ
        this.joueur.sauvegardeChargee = true
    },

    /**
     * Exporte la sauvegarde en chaîne encodée (pour copier-coller ou localStorage)
     * Encodage en 3 étapes :
     * 1. JSON.stringify : objet → chaîne JSON
     * 2. encodeURIComponent : encode emojis et accents (sinon btoa plante)
     * 3. btoa : encode en base64 (chaîne universelle copiable)
     */
    exporterDonneesSauvegarde() {
        let etatPartie = { joueur: this.joueur, poisson: this.poisson }
        let sauvegardePartie = JSON.stringify(etatPartie)

        // On traduit d'abord les émojis/accents, puis on encode en base64
        let sauvegardePartieEncode = btoa(encodeURIComponent(sauvegardePartie))

        return sauvegardePartieEncode
    },

    /**
     * Retourne un objet contenant l'état complet du jeu (joueur + poisson)
     * Utilisé pour la sauvegarde automatique
     */
    obtenirEtatPartie() {
        return { joueur: this.joueur, poisson: this.poisson }
    },

    /**
     * Initialise une nouvelle partie : crée le premier poisson si on n'a pas chargé de sauvegarde
     */
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

    /**
     * Débloque un succès et notifie la vue
     * @param {string} idSucces - ex: "Succes5"
     *
     * VIOLATION MVC volontaire : le modèle appelle directement la vue
     * (devrait passer par le contrôleur mais on simplifie ici)
     */
    debloquerSucces(idSucces) {
        // Vérifie que le succès existe ET n'est pas déjà débloqué (évite les doublons)
        if (this.joueur.succes[idSucces] && this.joueur.succes[idSucces].Debloque === false) {
            this.joueur.succes[idSucces].Debloque = true;
            console.log("🏆 Succès Débloqué : " + this.joueur.succes[idSucces].Nom);
            // Notification de la vue (toast + régénération du panneau succès)
            vue.debloquerSuccesVue(this.joueur.succes[idSucces]);
        }
    },


    /**
     * Vérifie TOUS les succès du jeu et débloque ceux qui sont atteints
     * Appelée à chaque action significative (clic, achat, mort de poisson)
     */
    verifierLesSucces() {
        // ----- Succès 1 et 2 (généraux argent et poisson) -----
        if (this.joueur.argent >= 5) this.debloquerSucces("Succes2");
        if (this.joueur.mortPoisson >= 1) this.debloquerSucces("Succes1");

        // ----- Succès 3 : débloqué dès 15 argents OU palier 2 atteint -----
        if (this.joueur.argent >= 15 || this.joueur.palier >= 2) {
            this.debloquerSucces("Succes3");
        }
        // ----- Succès 4 : débloqué dès 25 argents OU palier 2 atteint -----
        if (this.joueur.argent >= 25 || this.joueur.palier >= 2) {
            this.debloquerSucces("Succes4");
        }

        // ----- Succès 5 à 17 : 1 succès par palier débloqué -----
        // Palier 1 = Succès 5, Palier 2 = Succès 6, ..., Palier 13 = Succès 17
        for (let i = 1; i <= 13; i++) {
            if (this.joueur.palier >= i) this.debloquerSucces("Succes" + (i + 4));
        }

        // Variables pour les succès de collection (66 à 71)
        // On les passe à false dès qu'on trouve un item non possédé
        let toutClic1 = true, toutClic100 = true;
        let toutPassif1 = true, toutPassif100 = true;

        // ----- Succès améliorations CLIC -----
        for (let i = 1; i <= 12; i++) {
            let item = this.joueur.inventaireObjetClic["amelioration_" + i];

            // Succès 18 à 29 : 1x acheté (Succes18 = amelioration_1, Succes19 = amelioration_2...)
            if (item.quantitePossedee >= 1) this.debloquerSucces("Succes" + (17 + i));
            else toutClic1 = false; // s'il manque un item, on note que la collection n'est pas complète

            // Succès 30 à 41 : 100x acheté
            if (item.quantitePossedee >= 100) this.debloquerSucces("Succes" + (29 + i));
            else toutClic100 = false;
        }

        // ----- Succès améliorations PASSIVES -----
        for (let i = 1; i <= 12; i++) {
            let item = this.joueur.inventaireObjetPassif["amelioration_" + i];

            // Succès 42 à 53 : 1x acheté
            if (item.quantitePossedee >= 1) this.debloquerSucces("Succes" + (41 + i));
            else toutPassif1 = false;

            // Succès 54 à 65 : 100x acheté
            if (item.quantitePossedee >= 100) this.debloquerSucces("Succes" + (53 + i));
            else toutPassif100 = false;
        }

        // ----- Succès 66 à 71 : succès de collection -----
        if (toutClic1) this.debloquerSucces("Succes66");       // toutes clic 1x
        if (toutPassif1) this.debloquerSucces("Succes67");     // toutes passif 1x
        if (toutClic1 && toutPassif1) this.debloquerSucces("Succes68"); // tout 1x

        if (toutClic100) this.debloquerSucces("Succes69");     // toutes clic 100x
        if (toutPassif100) this.debloquerSucces("Succes70");   // toutes passif 100x
        if (toutClic100 && toutPassif100) this.debloquerSucces("Succes71"); // tout 100x

        // ----- Succès final 72 : avoir tous les autres succès -----
        // On compte combien de succès sont débloqués
        let totalDebloques = 0;
        for (let cle in this.joueur.succes) {
            if (this.joueur.succes[cle].Debloque === true) totalDebloques++;
        }

        // Si 71 succès débloqués (= tous sauf le 72) et que le 72 ne l'est pas encore
        if (totalDebloques === 71 && !this.joueur.succes["Succes72"].Debloque) {
            this.debloquerSucces("Succes72");
        }
    }



}