// ============================================================
// vue/jeu.js
// Couche VUE du pattern MVC.
// Toutes les fonctions qui modifient l'affichage (DOM) sont ici.
// ============================================================

const vue = {

    /**
     * Formate un nombre avec sa définition en lettres
     * Ex: 1500000 devient "(1,500 millions)"
     *
     * @param {number} nombre - le nombre à formater
     * @returns {string} - la chaîne formatée
     */
    formaterNombre(nombre) {
        // Les conditions sont en ordre DÉCROISSANT pour attraper d'abord les plus gros nombres
        // toFixed(3) garde 3 décimales, .replace remplace le point par une virgule (format français)
        if (nombre >= 1000000000000000) {
            return (nombre / 1000000000000000).toFixed(3).replace('.', ',') + " billiards";
        } else if (nombre >= 1000000000000) {
            return (nombre / 1000000000000).toFixed(3).replace('.', ',') + " billions";
        } else if (nombre >= 1000000000) {
            return (nombre / 1000000000).toFixed(3).replace('.', ',') + " milliards";
        } else if (nombre >= 1000000) {
            return (nombre / 1000000).toFixed(3).replace('.', ',') + " millions";
        } else if (nombre >= 1000) {
            return (nombre / 1000).toFixed(3).replace('.', ',') + " milliers";
        } else if (nombre >= 100) {
            return (nombre / 100).toFixed(3).replace('.', ',') + " centaines";
        }

        // Si le nombre est < 100, on le retourne tel quel converti en chaîne
        return nombre.toString();
    },

    /**
     * Met à jour l'affichage du nombre de clics
     * @param {number} nouveauClic - modele.joueur.nbClics
     * @returns {void} - met à jour le textContent de <p id="nbClic">
     */
    updateClic(nouveauClic) {
        // getElementById récupère l'élément HTML par son id
        const affichageClic = document.getElementById("nbClic")
        // textContent modifie le texte affiché dans l'élément
        affichageClic.textContent = this.formaterNombre(nouveauClic);
        console.log("Nombre de clics : " + nouveauClic)
    },

    /**
     * Met à jour l'affichage de l'argent
     * @param {number} nouveauArgent - modele.joueur.argent
     * @returns {void} - met à jour le textContent de <div id="argent">
     */
    updateArgent(nouveauArgent) {
        const affichageArgent = document.getElementById("argent")
        affichageArgent.textContent = "Argent : " + this.formaterNombre(nouveauArgent);
        console.log(nouveauArgent + "argent")
    },

    /**
     * Joue l'animation de dégât sur le poisson au clic
     * Technique : retirer la classe, forcer un reflow, puis remettre la classe
     * pour que l'animation se rejoue à chaque appel.
     */
    damageFish() {
        const bouton = document.getElementById("imgPoisson");
        if (!bouton) return; // sécurité : si l'élément n'existe pas, on arrête

        bouton.classList.remove("dommage");
        // Astuce : lire offsetWidth force le navigateur à recalculer le layout
        // sans ça, le navigateur "optimise" et ne voit pas le retrait/ajout de classe
        // donc l'animation ne redémarrerait pas
        void bouton.offsetWidth;
        bouton.classList.add("dommage");
    },

    /**
     * Gère l'affichage des items débloqués/cachés selon ce que possède le joueur
     * (Fonction utilisée pour basculer la classe "inconnu" sur les items déjà créés)
     */
    updateDeblocageItems(type, inventaire) {
        // Préfixe d'id selon le type d'amélioration
        const prefixHtml = type === "clic" ? "a-clic-" : "a-passif-";

        for (let i = 1; i <= 12; i++) {
            const bloc = document.getElementById(prefixHtml + i);
            const item = inventaire["amelioration_" + i];

            // Si le bloc HTML ou l'item du modèle n'existe pas, on passe au suivant
            if (!bloc || !item) continue;

            // La 1ère amélioration est toujours visible (point de départ)
            if (i === 1) {
                bloc.classList.remove("inconnu");
                continue;
            }

            // Pour les autres, on vérifie si la précédente a été achetée
            const itemPrecedent = inventaire["amelioration_" + (i - 1)];

            if (itemPrecedent && itemPrecedent.quantitePossedee > 0) {
                bloc.classList.remove("inconnu"); // débloque
            } else {
                bloc.classList.add("inconnu"); // verrouille
            }
        }
    },

    /**
     * Met à jour l'image et le nom du poisson affiché
     * @param {Object} nouveauPoisson - objet poisson avec { image: string, nom: string }
     */
    updateFish(nouveauPoisson) {
        console.log("Poisson reçu dans la vue :", nouveauPoisson);
        if (!nouveauPoisson) return; // sécurité

        // querySelector permet d'utiliser un sélecteur CSS (ici : l'image dans imgPoisson)
        const imagePoisson = document.querySelector("#imgPoisson img");
        const nomPoisson = document.querySelector("#nomPoisson");

        // Le || (OU logique) permet de supporter deux nommages de propriété
        // si nouveauPoisson.image existe on l'utilise, sinon on prend nouveauPoisson.Image
        imagePoisson.src = nouveauPoisson.image || nouveauPoisson.Image;
        if (nomPoisson) {
            nomPoisson.textContent = nouveauPoisson.nom || nouveauPoisson.Nom;
        }
        console.log("Image changée vers :", imagePoisson.src);
    },

    /**
     * Met à jour l'affichage du nombre de poissons tués (=score)
     */
    updateScore(nouveauMortPoisson) {
        const affichageMortPoisson = document.getElementById('nbScore')
        affichageMortPoisson.textContent = this.formaterNombre(nouveauMortPoisson);
        console.log("Poissons morts : " + nouveauMortPoisson)
    },

    /**
     * Met à jour l'affichage du code de sauvegarde dans la modale options
     */
    updateCodeSauvegarde(codePartie) {
        const inputSauvegarde = document.getElementById('output-sauvegarde')
        inputSauvegarde.textContent = codePartie
    },

    /**
     * Met à jour les images de fond (interface + zone poisson) selon le palier actuel
     * @param {number} palier - 1 à 13
     */
    updateFondPalier(palier) {
        // Template literal (backticks) — permet d'injecter une variable directement avec ${...}
        const url = `url("./static/background/${palier}_profondeur.png")`;
        // On change le fond des deux éléments : interface (pour les transitions) et poisson-score (visuel principal)
        document.getElementById("interface").style.backgroundImage = url;
        document.getElementById("poisson-score").style.backgroundImage = url;
    },

    /**
     * Génère dynamiquement les blocs d'améliorations dans #liste-clic ou #liste-passif
     * Logique de révélation progressive : montre l'item débloqué + le suivant en "???"
     *
     * @param {string} type - "clic" ou "passif"
     * @param {Object} inventaire - modele.joueur.inventaireObjetClic ou inventaireObjetPassif
     */
    creerItems(type, inventaire) {
        // Sélection de la bonne liste selon le type
        const liste = document.getElementById(
            type === "clic" ? "liste-clic" : "liste-passif"
        );

        // On vide la liste avant de la regénérer
        liste.innerHTML = "";

        // Boucle sur les 12 améliorations possibles
        for (let index = 1; index <= 12; index++) {
            const item = inventaire["amelioration_" + index];
            if (!item) continue;

            const itemPrecedent = inventaire["amelioration_" + (index - 1)];

            // Un item est débloqué si :
            // - c'est le premier (index 1)
            // - ou si l'item précédent a été acheté au moins 1 fois
            const estDebloque =
                index === 1 || itemPrecedent.quantitePossedee > 0;

            // Un item est "le prochain mystère" si l'item précédent existe mais n'a jamais été acheté
            // C'est ce qu'on affiche en "????" pour donner envie de débloquer
            const estProchainMystere =
                index > 1 &&
                itemPrecedent &&
                itemPrecedent.quantitePossedee === 0;

            // Si l'item n'est ni débloqué ni "prochain mystère", on ne l'affiche pas du tout
            if (!estDebloque && !estProchainMystere) {
                continue;
            }

            // Création de l'élément <div> de l'amélioration
            const bloc = document.createElement("div");
            bloc.className = "amelioration";
            bloc.id = type === "clic" ? "a-clic-" + index : "a-passif-" + index;

            // Chemin de l'image selon le type (passif ou clic)
            const imageItem = type === "passif"
                ? `./static/images/items/Item${index}Passif.png`
                : `./static/images/items/Item${index}.png`;

            if (estDebloque) {
                // Item débloqué : on affiche son nom, prix et image
                bloc.innerHTML = `
                <img class="a-img" alt="a-img" src="${imageItem}">
                <div class="a-nom-prix">
                    <p class="a-nom">${item.nom}</p>
                    <p class="a-prix">0 argents</p>
                </div>
                <div class="a-quantite">x0</div>
            `;

                liste.appendChild(bloc);

                // On récupère la quantité d'achat sélectionnée (x1, x10, x100)
                const quantiteAchat = type === "clic"
                    ? modele.joueur.quantiteAchatClic
                    : modele.joueur.quantiteAchatPassif;

                // On met à jour le prix réel et la quantité possédée
                this.updateItem(bloc.id, item, quantiteAchat);
            } else {
                // Item mystère : on affiche un point d'interrogation
                bloc.classList.add("inconnu");

                bloc.innerHTML = `
                <img class="a-img" alt="a-img" src="./static/images/ui/question-mark.png">
                <div class="a-nom-prix">
                    <p class="a-nom">????</p>
                    <p class="a-prix">????</p>
                </div>
                <div class="a-quantite"></div>
            `;

                liste.appendChild(bloc);
                // break : on s'arrête là, pas besoin d'afficher d'autres mystères
                break;
            }
        }
    },

    /**
     * Met à jour le prix et la quantité d'un item amélioration déjà créé
     * Calcule le prix CUMULÉ d'un achat multiple (x10 ou x100)
     *
     * @param {string} idHtml - id de l'élément HTML
     * @param {Object} item - l'objet item depuis le modèle
     * @param {number} quantiteAchat - 1, 10 ou 100
     */
    updateItem(idHtml, item, quantiteAchat = 1) {
        const bloc = document.getElementById(idHtml);
        if (!bloc || !item) return;

        let prixTotal = 0;

        // Calcul du prix cumulé pour quantiteAchat exemplaires
        // Chaque achat coûte plus cher car le multiplicateurPrix s'applique à chaque fois
        for (let i = 0; i < quantiteAchat; i++) {
            // Math.round arrondit à l'entier le plus proche
            // Math.pow(base, exposant) = base à la puissance exposant
            // Formule : prixBase × (multiplicateur ^ (quantitePossedee + i))
            prixTotal += Math.round(
                item.prixBase * Math.pow(
                    item.multiplicateurPrix,
                    item.quantitePossedee + i
                )
            );
            bloc.querySelector(".a-prix").textContent = this.formaterNombre(prixTotal) + " argents";

            // dataset stocke des données personnalisées dans l'attribut data-prix
            // utilisé par updateAmeliorations pour récupérer le prix sans le reparser
            bloc.dataset.prix = prixTotal;

            bloc.querySelector(".a-quantite").textContent = "x" + item.quantitePossedee;
        }

        // Mise à jour finale (en cas où la boucle n'a pas tourné, ex: quantiteAchat=0)
        bloc.querySelector(".a-prix").textContent = this.formaterNombre(prixTotal) + " argents";
        bloc.querySelector(".a-quantite").textContent = "x" + item.quantitePossedee;
    },

    /**
     * Met à jour l'affichage des boutons de paliers (fenêtre glissante de 3)
     * @param {number} palierAffiche - palier sélectionné (centre de la fenêtre)
     * @param {number} palierMaxDebloque - palier max atteint par le joueur
     */
    updateBoutonsPaliers(palierAffiche, palierMaxDebloque) {
        for (let i = 1; i <= 13; i++) {
            const bouton = document.getElementById("palier-" + i);
            if (!bouton) continue

            // On cache tout ce qui n'est PAS dans la fenêtre de 3 paliers
            // (palierAffiche - 1, palierAffiche, palierAffiche + 1)
            if (i < palierAffiche - 1 || i > palierAffiche + 1) {
                bouton.classList.add("hidden")
                continue // on passe au suivant, inutile de continuer
            }

            // Dans la fenêtre de 3 → on gère l'accessibilité
            bouton.classList.remove("hidden")
            if (i <= palierMaxDebloque) {
                bouton.classList.remove("inaccessible") // débloqué
            } else {
                bouton.classList.add("inaccessible") // verrouillé
            }

            // Surbrillance du palier actuel (le max débloqué)
            if (i === palierMaxDebloque) {
                bouton.classList.add("actif")
            } else {
                bouton.classList.remove("actif")
            }
        }
    },

    /**
     * Grise les améliorations trop chères pour le joueur
     * @param {number} argent - modele.joueur.argent
     */
    updateAmeliorations(argent) {
        // querySelectorAll récupère TOUS les éléments correspondant au sélecteur
        // :not(.inconnu) exclut les items mystères qui ne sont pas cliquables
        const ameliorations = document.querySelectorAll(".amelioration:not(.inconnu)")

        // forEach itère sur chaque élément trouvé
        ameliorations.forEach(amelioration => {
            // On récupère le prix stocké dans data-prix (mis à jour dans updateItem)
            const prix = parseInt(amelioration.dataset.prix);

            // Sécurité : on vérifie que parseInt a bien réussi
            if (!isNaN(prix)) {
                if (argent < prix) {
                    amelioration.classList.add("inaccessible") // trop cher
                } else {
                    amelioration.classList.remove("inaccessible") // achetable
                }
            }
        })
    },

    /**
     * Affiche le total des dégâts par clic
     */
    updateDegatsClick(dommagesActuels) {
        const affichage = document.querySelector("#a-clic .a-dps")
        if (affichage) affichage.textContent = this.formaterNombre(dommagesActuels) + " dégâts/clic";
    },

    /**
     * Calcule et affiche le total des dégâts passifs
     * @param {Object} inventaireObjetPassif - chaque item a { bonusDPS, quantitePossedee }
     */
    updateDegatsPassif(inventaireObjetPassif) {
        let totalDPS = 0
        // Object.values() retourne un tableau de toutes les valeurs de l'objet
        // (les items, sans leurs clés "amelioration_1", "amelioration_2", etc.)
        Object.values(inventaireObjetPassif).forEach(item => {
            totalDPS += item.bonusDPS * item.quantitePossedee
        })
        const affichage = document.querySelector("#a-passif .a-dps")
        if (affichage) affichage.textContent = this.formaterNombre(totalDPS) + " dégâts/tick";
    },

    /**
     * Met à jour la surbrillance des boutons x1 / x10 / x100
     * @param {HTMLElement} zone - le conteneur #a-clic ou #a-passif
     * @param {HTMLElement} boutonActif - le bouton sur lequel l'utilisateur a cliqué
     */
    updateBoutonsQuantite(zone, boutonActif) {
        // Retire la classe "actif" de tous les boutons de la zone
        zone.querySelectorAll(".btn-quantite").forEach(function (btn) {
            btn.classList.remove("actif");
        });
        // Ajoute la classe "actif" sur le bouton cliqué
        boutonActif.classList.add("actif");
    },

    /**
     * Joue l'animation des dégâts passifs (4 demi-cercles aux coins)
     * Garantit que l'animation se termine entièrement avant de pouvoir repartir
     */
    damageFishPassif() {
        const bouton = document.getElementById("imgPoisson");
        // Si l'animation est déjà en cours on ne fait rien (évite de la réinitialiser)
        if (bouton.classList.contains("dommage-passif")) return

        bouton.classList.add("dommage-passif");

        // addEventListener écoute un événement
        // "animationend" se déclenche quand l'animation CSS se termine naturellement
        // On utilise une fonction nommée "handler" pour pouvoir la supprimer après
        bouton.addEventListener("animationend", function handler() {
            bouton.classList.remove("dommage-passif")
            // removeEventListener supprime l'écouteur pour éviter qu'il s'accumule
            bouton.removeEventListener("animationend", handler)
        })
    },

    /**
     * Affiche un toast de succès débloqué (style Steam)
     * @param {string} titre - nom du succès
     * @param {string} desc - description / objectif
     * @param {string} icone - emoji par défaut "🏆"
     */
    afficherSuccesToast(titre, desc, icone = "🏆") {
        const container = document.getElementById("succes-toast-container")
        const toast = document.createElement("div")
        toast.className = "succes-toast"

        // innerHTML permet d'injecter du HTML directement (ici avec template literal)
        toast.innerHTML = `
        <div class="succes-toast-icon">${icone}</div>
        <div>
            <div class="succes-toast-label">Succès débloqué</div>
            <div class="succes-toast-titre">${titre}</div>
            <div class="succes-toast-desc">${desc}</div>
        </div>
    `
        container.appendChild(toast)

        // setTimeout(fonction, ms) exécute la fonction après le délai en millisecondes
        // Ici : après 6 secondes, on lance l'animation de sortie
        setTimeout(() => {
            toast.classList.add("out")
            // Puis 400ms après (durée de l'animation de sortie), on supprime le toast
            setTimeout(() => toast.remove(), 400)
        }, 6000)
    },

    /**
     * Génère dynamiquement la grille des succès dans #s-box
     * Inclut la logique de révélation progressive (estVisible)
     * Et la gestion des tooltips au survol
     *
     * @param {Object} succes - modele.joueur.succes (tous les succès)
     */
    genererSucces(succes) {
        const box = document.getElementById("s-box")
        box.innerHTML = "" // on vide avant de regénérer

        // Object.values() retourne tous les objets succès (sans les clés)
        Object.values(succes).forEach(s => {
            // Si le succès n'est pas visible selon notre logique, on ne l'affiche pas
            if (!this.estVisible(s, succes)) return;

            const div = document.createElement("div")
            div.classList.add("succes")
            div.id = "succes-" + s.Numero
            // Si pas débloqué : on l'affiche en gris ("inconnu")
            if (!s.Debloque) div.classList.add("inconnu")

            // Contenu : juste l'emoji du succès
            div.innerHTML = `<p>${s.Emoji}</p>`

            // dataset.* stocke les infos pour le tooltip
            // Évite de fouiller dans le modèle à chaque survol
            div.dataset.tooltipTitre = s.Nom
            div.dataset.tooltipDesc = s.Objectif

            // ----- Gestion du tooltip au survol -----
            // mouseenter = la souris entre dans l'élément (1x au début du survol)
            div.addEventListener("mouseenter", function () {
                const tooltip = document.getElementById("succes-tooltip")
                // Injection du contenu HTML dans le tooltip
                tooltip.innerHTML = `<strong>${div.dataset.tooltipTitre}</strong><br>${div.dataset.tooltipDesc}`
                tooltip.style.display = "block"

                // getBoundingClientRect retourne la position et taille de l'élément
                // par rapport au viewport (top, left, right, bottom, width, height)
                const rect = div.getBoundingClientRect()
                const tooltipRect = tooltip.getBoundingClientRect()

                // ----- Position HORIZONTALE -----
                // Position par défaut : centré sur le succès
                let left = rect.left + rect.width / 2
                // Si le tooltip dépasse à droite, on le décale vers la gauche
                if (left + tooltipRect.width / 2 > window.innerWidth - 5) {
                    left = window.innerWidth - tooltipRect.width / 2 - 5
                }
                // Si le tooltip dépasse à gauche, on le décale vers la droite
                if (left - tooltipRect.width / 2 < 5) {
                    left = tooltipRect.width / 2 + 5
                }

                // ----- Position VERTICALE -----
                // Par défaut : juste en dessous du succès
                let top = rect.bottom + 5
                // Si le tooltip dépasse en bas, on le met au-dessus du succès à la place
                if (top + tooltipRect.height > window.innerHeight - 5) {
                    top = rect.top - tooltipRect.height - 5
                }

                // Application de la position finale (en pixels)
                tooltip.style.top = `${top}px`
                tooltip.style.left = `${left}px`
            })

            // mouseleave = la souris quitte l'élément → on cache le tooltip
            div.addEventListener("mouseleave", function () {
                document.getElementById("succes-tooltip").style.display = "none"
            })

            // Ajoute le succès créé dans le conteneur #s-box
            box.appendChild(div)
        })
    },

    /**
     * Débloque visuellement un succès :
     * - affiche le toast de notification
     * - régénère la grille pour faire apparaître les nouveaux succès visibles
     * - met à jour l'affichage de l'interface (sections révélées)
     */
    debloquerSuccesVue(succes) {
        this.afficherSuccesToast(succes.Nom, succes.Objectif, succes.Emoji);
        // Régénère pour afficher les succès qui viennent de devenir visibles
        this.genererSucces(modele.joueur.succes);
        this.updateAffichageInterface(modele.joueur.succes);
    },

    /**
     * Détermine si un succès doit être affiché dans la grille
     * (révélation progressive : on ne montre que les succès atteignables)
     *
     * @param {Object} succes - le succès à tester
     * @param {Object} allSucces - tous les succès (pour vérifier les dépendances)
     * @returns {boolean}
     */
    estVisible(succes, allSucces) {
        const n = succes.Numero;

        // Toujours visible si déjà débloqué
        if (succes.Debloque) return true;

        // Succès 1-4 (généraux) : toujours visibles
        if (n >= 1 && n <= 4) return true;

        // Succès 5-17 (paliers) : 5 toujours, puis N visible si N-1 débloqué (chaîne)
        if (n === 5) return true;
        if (n >= 6 && n <= 17) return allSucces["Succes" + (n - 1)].Debloque;

        // Succès 18-29 (clic 1er achat) : 18 visible si Succès 3 débloqué
        if (n === 18) return allSucces.Succes3.Debloque;
        if (n >= 19 && n <= 29) return allSucces["Succes" + (n - 1)].Debloque;

        // Succès 30-41 (clic 100x) : visible si le 1er achat correspondant est débloqué
        // (Succès 30 ↔ Succès 18, Succès 31 ↔ Succès 19, etc. décalage de 12)
        if (n >= 30 && n <= 41) return allSucces["Succes" + (n - 12)].Debloque;

        // Succès 42-53 (passif 1er achat) : 42 visible si Succès 4 débloqué
        if (n === 42) return allSucces.Succes4.Debloque;
        if (n >= 43 && n <= 53) return allSucces["Succes" + (n - 1)].Debloque;

        // Succès 54-65 (passif 100x) : visible si le 1er achat correspondant est débloqué
        if (n >= 54 && n <= 65) return allSucces["Succes" + (n - 12)].Debloque;

        // Succès 66 : toutes clic 1x → visible si 1er achat clic débloqué
        if (n === 66) return allSucces.Succes18.Debloque;
        // Succès 67 : toutes passif 1x → visible si 1er achat passif débloqué
        if (n === 67) return allSucces.Succes42.Debloque;
        // Succès 68 : tout clic + passif 1x → visible si l'un OU l'autre débloqué
        if (n === 68) return allSucces.Succes18.Debloque || allSucces.Succes42.Debloque;
        // Succès 69 : tout clic 100x → visible si 100x clic débloqué
        if (n === 69) return allSucces.Succes30.Debloque;
        // Succès 70 : tout passif 100x → visible si 100x passif débloqué
        if (n === 70) return allSucces.Succes54.Debloque;
        // Succès 71 : tout 100x → visible si l'un OU l'autre débloqué
        if (n === 71) return allSucces.Succes30.Debloque || allSucces.Succes54.Debloque;

        // Succès 72 (final) : toujours visible
        if (n === 72) return true;

        return false; // par sécurité
    },

    /**
     * Gère l'affichage progressif des sections de l'interface
     * selon les succès débloqués (révélation progressive)
     *
     * @param {Object} succes - modele.joueur.succes
     */
    updateAffichageInterface(succes) {
        // On récupère toutes les sections concernées
        const succesPage = document.getElementById("succes-page");
        const ameliorations = document.getElementById("ameliorations-argent");
        const aClic = document.getElementById("a-clic");
        const aPassif = document.getElementById("a-passif");
        const paliers = document.getElementById("paliers");

        // classList.toggle(classe, condition)
        // = ajoute la classe si condition=true, la retire si condition=false
        // Plus court qu'un if/else avec add/remove

        // Succès 5 → afficher succes-page
        succesPage.classList.toggle("hidden", !succes.Succes5.Debloque);

        // Succès 3 OU Succès 4 → afficher ameliorations-argent
        ameliorations.classList.toggle("hidden", !(succes.Succes3.Debloque || succes.Succes4.Debloque));

        // Succès 3 → afficher a-clic
        aClic.classList.toggle("hidden", !succes.Succes3.Debloque);

        // Succès 4 → afficher a-passif
        aPassif.classList.toggle("hidden", !succes.Succes4.Debloque);

        // Succès 6 → afficher paliers
        paliers.classList.toggle("hidden", !succes.Succes6.Debloque);
    },
}