const vue = {
    /**
     * Formate un nombre avec des points et sa définition en lettres
     * Ex: 1500000 devient "1.500.000 (1.50 millions)"
     */
    formaterNombre(nombre) {
        if (nombre >= 1000000000000000) {
            return "(" + (nombre / 1000000000000000).toFixed(3).replace('.', ',') + " billiards)";
        } else if (nombre >= 1000000000000) {
            return "(" + (nombre / 1000000000000).toFixed(3).replace('.', ',') + " billions)";
        } else if (nombre >= 1000000000) {
            return "(" + (nombre / 1000000000).toFixed(3).replace('.', ',') + " milliards)";
        } else if (nombre >= 1000000) {
            return "(" + (nombre / 1000000).toFixed(3).replace('.', ',') + " millions)";
        } else if (nombre >= 1000) {
            return "(" + (nombre / 1000).toFixed(3).replace('.', ',') + " milliers)";
        } else if (nombre >= 100) {
            return "(" + (nombre / 100).toFixed(3).replace('.', ',') + " centaines)";
        }

        return nombre.toString();
    },
    /**
     * Met à jour l'affichage du nombre de clics
     * @param {number} nouveauClic - modele.joueur.nbClics
     * @returns {void} - met à jour le textContent de <p id="nbClic">
     */
    updateClic(nouveauClic) {
        const affichageClic = document.getElementById("nbClic")
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
     * Joue l'animation de dégât sur le conteneur du poisson
     * @param {void} - aucun paramètre requis
     * @returns {void} - ajoute/retire la classe "dommage" sur <div id="poisson">
     *                   la classe "dommage" doit être définie dans index.css
     */
    damageFish() {
        const bouton = document.getElementById("imgPoisson");
        if (!bouton) return;
        bouton.classList.remove("dommage");
        void bouton.offsetWidth;
        bouton.classList.add("dommage");
    },

    updateDeblocageItems(type, inventaire) {
        const prefixHtml = type === "clic" ? "a-clic-" : "a-passif-";

        for (let i = 1; i <= 12; i++) {
            const bloc = document.getElementById(prefixHtml + i);
            const item = inventaire["amelioration_" + i];

            if (!bloc || !item) continue;

            if (i === 1) {
                bloc.classList.remove("inconnu");
                continue;
            }

            const itemPrecedent = inventaire["amelioration_" + (i - 1)];

            if (itemPrecedent && itemPrecedent.quantitePossedee > 0) {
                bloc.classList.remove("inconnu");
            } else {
                bloc.classList.add("inconnu");
            }
        }
    },

    /**
     * Met à jour l'image et le nom du poisson affiché
     * @param {Object} nouveauPoisson - modele.poisson.poissonActuel via modele.obtenirFish()
     *                                  doit avoir : { image: string, nom: string }
     * @returns {void} - met à jour le src de <img> dans <button id="imgPoisson">
     *                   met à jour le textContent de <p id="nomPoisson">
     */
    updateFish(nouveauPoisson) {
        console.log("Poisson reçu dans la vue :", nouveauPoisson);
        if (!nouveauPoisson) return;
        const imagePoisson = document.querySelector("#imgPoisson img");
        const nomPoisson = document.querySelector("#nomPoisson");
        imagePoisson.src = nouveauPoisson.image || nouveauPoisson.Image;
        if (nomPoisson) {
            nomPoisson.textContent = nouveauPoisson.nom || nouveauPoisson.Nom;
        }
        console.log("Image changée vers :", imagePoisson.src);
    },

    /**
     * Met à jour l'affichage du nombre de poissons tués
     * @param {number} nouveauMortPoisson - modele.joueur.mortPoisson via modele.obtenirMortPoisson()
     * @returns {void} - met à jour le textContent de <p id="nbScore">
     */
    updateScore(nouveauMortPoisson) {
        const affichageMortPoisson = document.getElementById('nbScore')
        affichageMortPoisson.textContent = this.formaterNombre(nouveauMortPoisson);
        console.log("Poissons morts : " + nouveauMortPoisson)
    },

    updateCodeSauvegarde(codePartie) {
        const inputSauvegarde = document.getElementById('output-sauvegarde')
        inputSauvegarde.textContent = codePartie
    },

    /**
     * Met à jour le fond de la zone poisson selon le palier actuel
     * @param {number} palier - modele.joueur.palier (1 à 13)
     * @returns {void} - met à jour le background-image de <div id="poisson-score">
     *                   les images doivent être dans static/background/ sous la forme {palier}_profondeur.png
     */
    updateFondPalier(palier) {
        const zonePoisson = document.getElementById("poisson-score");

        zonePoisson.style.backgroundImage =
            `url("./static/background/${palier}_profondeur.png")`;
    },

    creerItems(type, inventaire) {
        const liste = document.getElementById(
            type === "clic" ? "liste-clic" : "liste-passif"
        );

        liste.innerHTML = "";

        for (let index = 1; index <= 12; index++) {
            const item = inventaire["amelioration_" + index];
            if (!item) continue;

            const itemPrecedent = inventaire["amelioration_" + (index - 1)];

            const estDebloque =
                index === 1 || itemPrecedent.quantitePossedee > 0;

            const estProchainMystere =
                index > 1 &&
                itemPrecedent &&
                itemPrecedent.quantitePossedee === 0;

            if (!estDebloque && !estProchainMystere) {
                continue;
            }

            const bloc = document.createElement("div");
            bloc.className = "amelioration";
            bloc.id = type === "clic" ? "a-clic-" + index : "a-passif-" + index;

            const imageItem = type === "passif"
                ? `./static/images/items/Item${index}Passif.png`
                : `./static/images/items/Item${index}.png`;

            if (estDebloque) {
                bloc.innerHTML = `
                <img class="a-img" alt="a-img" src="${imageItem}">
                <div class="a-nom-prix">
                    <p class="a-nom">${item.nom}</p>
                    <p class="a-prix">0 argents</p>
                </div>
                <div class="a-quantite">x0</div>
            `;

                liste.appendChild(bloc);
                const quantiteAchat = type === "clic"
                    ? modele.joueur.quantiteAchatClic
                    : modele.joueur.quantiteAchatPassif;

                this.updateItem(bloc.id, item, quantiteAchat);
            } else {
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
                break;
            }
        }
    },

    updateItem(idHtml, item, quantiteAchat = 1) {
        const bloc = document.getElementById(idHtml);
        if (!bloc || !item) return;

        let prixTotal = 0;

        for (let i = 0; i < quantiteAchat; i++) {
            prixTotal += Math.round(
                item.prixBase * Math.pow(
                    item.multiplicateurPrix,
                    item.quantitePossedee + i
                )
            );
            bloc.querySelector(".a-prix").textContent = this.formaterNombre(prixTotal) + " argents";

            bloc.dataset.prix = prixTotal;

            bloc.querySelector(".a-quantite").textContent = "x" + item.quantitePossedee;
        }

        bloc.querySelector(".a-prix").textContent = this.formaterNombre(prixTotal) + " argents";
        bloc.querySelector(".a-quantite").textContent = "x" + item.quantitePossedee;
    },


    /**
     * Met à jour l'affichage des boutons de paliers
     * @param {number} palierAffiche - palier actuellement affiché/sélectionné
     * @param {number} palierMaxDebloque - modele.joueur.palier (palier max atteint)
     * @returns {void} - affiche uniquement les paliers palierAffiche-1, palierAffiche, palierAffiche+1
     *                   désactive et ajoute la classe "bloque" sur les paliers > palierMaxDebloque
     *                   la classe "bloque" doit être définie dans index.css
     */
    updateBoutonsPaliers(palierAffiche, palierMaxDebloque) {
        for (let i = 1; i <= 13; i++) {
            const bouton = document.getElementById("palier-" + i);
            if (!bouton) continue

            // on cache tout ce qui n'est pas dans la fenêtre de 3 paliers
            if (i < palierAffiche - 1 || i > palierAffiche + 1) {
                bouton.classList.add("hidden")
                continue // on passe au suivant, inutile de continuer
            }

            // dans la fenêtre de 3 — on gère l'accessibilité
            bouton.classList.remove("hidden")
            if (i <= palierMaxDebloque) {
                bouton.classList.remove("inaccessible")
            } else {
                bouton.classList.add("inaccessible")
            }

            // surbrillance du palier actuel
            if (i === palierMaxDebloque) {
                bouton.classList.add("actif")
            } else {
                bouton.classList.remove("actif")
            }
        }
    },

    /**
     * Grise et bloque les améliorations inaccessibles selon l'argent disponible
     * @param {number} argent - modele.joueur.argent
     * @returns {void} - ajoute la classe "inaccessible" sur les <div class="amelioration">
     *                   dont le prix dans <p class="a-prix"> dépasse l'argent disponible
     *                   retire la classe "inaccessible" sinon
     *                   la classe "inaccessible" doit être définie dans index.css
     *                   les .amelioration.inconnu sont ignorées
     */
    updateAmeliorations(argent) {
        const ameliorations = document.querySelectorAll(".amelioration:not(.inconnu)")
        ameliorations.forEach(amelioration => {
            // On récupère le prix brut qu'on a caché dans dataset.prix
            const prix = parseInt(amelioration.dataset.prix);

            // Sécurité : on s'assure que le prix a bien été chargé
            if (!isNaN(prix)) {
                if (argent < prix) {
                    amelioration.classList.add("inaccessible")
                } else {
                    amelioration.classList.remove("inaccessible")
                }
            }
        })
    },

    /**
     * Affiche le total des dégâts par clic
     * @param {number} dommagesActuels - modele.joueur.dommagesActuels
     *                                   déjà calculé avec les bonus des upgrades via modele.recalculerDegats()
     * @returns {void} - met à jour le textContent de <p class="a-dps"> dans <div id="a-clic">
     */
    updateDegatsClick(dommagesActuels) {
        const affichage = document.querySelector("#a-clic .a-dps")
        if (affichage) affichage.textContent = this.formaterNombre(dommagesActuels) + " dégâts/clic";
    },

    /**
     * Calcule et affiche le total des dégâts passifs par seconde
     * @param {Object} inventaireObjetPassif - modele.joueur.inventaireObjetPassif
     *                                         chaque item doit avoir : { bonusDPS: number, quantitePossedee: number }
     * @returns {void} - met à jour le textContent de <p class="a-dps"> dans <div id="a-passif">
     */
    updateDegatsPassif(inventaireObjetPassif) {
        let totalDPS = 0
        Object.values(inventaireObjetPassif).forEach(item => {
            totalDPS += item.bonusDPS * item.quantitePossedee
        })
        const affichage = document.querySelector("#a-passif .a-dps")
        if (affichage) affichage.textContent = this.formaterNombre(totalDPS) + " dégâts/tick";
    },

    /**
     * Met à jour la surbrillance des boutons de quantité d'achat
     * @param {HTMLElement} zone - l'élément #a-clic ou #a-passif
     * @param {HTMLElement} boutonActif - le bouton sur lequel on vient de cliquer
     * @returns {void} - retire "actif" de tous les .btn-quantite de la zone
     *                   ajoute "actif" sur le bouton cliqué
     */
    updateBoutonsQuantite(zone, boutonActif) {
        zone.querySelectorAll(".btn-quantite").forEach(function (btn) {
            btn.classList.remove("actif");
        });
        boutonActif.classList.add("actif");
    },

    /**
     * Joue l'animation de dégât passif sur l'image du poisson
     * @param {void} - aucun paramètre requis
     * @returns {void} - ajoute/retire la classe "dommage-passif" sur <img> dans <button id="imgPoisson">
     *                   pas de rétrécissement, uniquement un effet de bordure
     */
    damageFishPassif() {
        const bouton = document.getElementById("imgPoisson");
        // si l'animation est déjà en cours on ne fait rien
        if (bouton.classList.contains("dommage-passif")) return

        bouton.classList.add("dommage-passif");
        // retire la classe uniquement quand l'animation est terminée
        bouton.addEventListener("animationend", function handler() {
            bouton.classList.remove("dommage-passif")
            bouton.removeEventListener("animationend", handler) // évite les doublons
        })
    },

    /**
     * Affiche un pop-up de succès débloqué style Steam
     * @param {string} titre - le nom du succès
     * @param {string} desc - la condition du succès
     * @param {string} icone - emoji ou chemin image du succès
     * @returns {void} - crée un .succes-toast dans #succes-toast-container
     *                   disparaît automatiquement après 3 secondes
     */
    afficherSuccesToast(titre, desc, icone = "🏆") {
        const container = document.getElementById("succes-toast-container")
        const toast = document.createElement("div")
        toast.className = "succes-toast"
        toast.innerHTML = `
        <div class="succes-toast-icon">${icone}</div>
        <div>
            <div class="succes-toast-label">Succès débloqué</div>
            <div class="succes-toast-titre">${titre}</div>
            <div class="succes-toast-desc">${desc}</div>
        </div>
    `
        container.appendChild(toast)
        setTimeout(() => {
            toast.classList.add("out")
            setTimeout(() => toast.remove(), 400)
        }, 3000)
    },

    /**
     * Génère dynamiquement la grille des succès dans #s-box
     * @param {Object} succes - modele.joueur.succes — dictionnaire de tous les succès
     * @returns {void} - vide #s-box et recrée toutes les .succes
     *                   ajoute "inconnu" si Debloque === false
     */
    genererSucces(succes) {
        const box = document.getElementById("s-box")
        box.innerHTML = ""

        Object.values(succes).forEach(s => {
            if (!this.estVisible(s, succes)) return; // ← skip les succès non visibles

            const div = document.createElement("div")
            div.classList.add("succes")
            div.id = "succes-" + s.Numero
            if (!s.Debloque) div.classList.add("inconnu")

            div.innerHTML = `
            <p>${s.Emoji}</p>
            <p class="s-texte-hover">
                <strong>${s.Nom}</strong><br>${s.Objectif}
            </p>
        `
            box.appendChild(div)
        })
    },

    /**
     * Débloque visuellement un succès et déclenche le toast
     * @param {Object} succes - l'objet succès depuis modele.joueur.succes.SuccesX
     *                          doit avoir : { Numero, Nom, Objectif, Emoji }
     * @returns {void} - retire "inconnu" sur #succes-{Numero}
     *                   appelle afficherSuccesToast()
     */
    debloquerSuccesVue(succes) {
        this.afficherSuccesToast(succes.Nom, succes.Objectif, succes.Emoji);
        // Régénère pour afficher les succès qui viennent de devenir visibles
        this.genererSucces(modele.joueur.succes);
    },

    /**
     * Détermine si un succès doit être affiché (débloqué ou en gris)
     * @param {Object} succes - un succès depuis modele.joueur.succes
     * @param {Object} allSucces - tous les succès depuis modele.joueur.succes
     * @returns {boolean} - true si le succès doit apparaître dans le panneau
     */
    estVisible(succes, allSucces) {
        const n = succes.Numero;

        // Toujours visible si déjà débloqué
        if (succes.Debloque) return true;

        // Succès 1-4 (généraux) : toujours visibles
        if (n >= 1 && n <= 4) return true;

        // Succès 5-17 (paliers) : 5 toujours, puis N visible si N-1 débloqué
        if (n === 5) return true;
        if (n >= 6 && n <= 17) return allSucces["Succes" + (n - 1)].Debloque;

        // Succès 18-29 (clic 1er achat) : 18 visible si Succès 3 débloqué
        if (n === 18) return allSucces.Succes3.Debloque;
        if (n >= 19 && n <= 29) return allSucces["Succes" + (n - 1)].Debloque;

        // Succès 30-41 (clic 100x) : visible si le 1er achat correspondant est débloqué
        // (Succès 30 ↔ Succès 18, Succès 31 ↔ Succès 19, etc.)
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
        // Succès 68 : toutes clic + passif 1x → visible si l'un ou l'autre débloqué
        if (n === 68) return allSucces.Succes18.Debloque || allSucces.Succes42.Debloque;
        // Succès 69 : toutes clic 100x → visible si 100x clic débloqué
        if (n === 69) return allSucces.Succes30.Debloque;
        // Succès 70 : toutes passif 100x → visible si 100x passif débloqué
        if (n === 70) return allSucces.Succes54.Debloque;
        // Succès 71 : toutes 100x → visible si l'un ou l'autre débloqué
        if (n === 71) return allSucces.Succes30.Debloque || allSucces.Succes54.Debloque;

        // Succès 72 : toujours visible
        if (n === 72) return true;

        return false;
    },
}