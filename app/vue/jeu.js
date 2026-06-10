const vue = {
    /**
     * Met à jour l'affichage du nombre de clics
     * @param {number} nouveauClic - modele.joueur.nbClics
     * @returns {void} - met à jour le textContent de <p id="nbClic">
     */
    updateClic(nouveauClic) {
        const affichageClic = document.getElementById("nbClic")
        affichageClic.textContent = nouveauClic
        console.log("Nombre de clics : " + nouveauClic)
    },

    /**
     * Met à jour l'affichage de l'argent
     * @param {number} nouveauArgent - modele.joueur.argent
     * @returns {void} - met à jour le textContent de <div id="argent">
     */
    updateArgent(nouveauArgent) {
        const affichageArgent = document.getElementById("argent")
        affichageArgent.textContent = "Argent :" + nouveauArgent
        console.log(nouveauArgent + "argent")
    },

    /**
     * Joue l'animation de dégât sur le conteneur du poisson
     * @param {void} - aucun paramètre requis
     * @returns {void} - ajoute/retire la classe "dommage" sur <div id="poisson">
     *                   la classe "dommage" doit être définie dans index.css
     */
    damageFish() {
        const poisson = document.getElementById("imgPoisson")
        void poisson.offsetWidth;
        poisson.classList.add("dommage")
        setTimeout(() => {
            poisson.classList.remove("dommage")
        }, 100)
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
        affichageMortPoisson.textContent = nouveauMortPoisson
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
        }

        bloc.querySelector(".a-prix").textContent = prixTotal + " argents";
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
            const prixTexte = amelioration.querySelector(".a-prix").textContent
            const prix = parseInt(prixTexte)
            if (argent < prix) {
                amelioration.classList.add("inaccessible")
            } else {
                amelioration.classList.remove("inaccessible")
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
        if (affichage) affichage.textContent = dommagesActuels + " dégâts/clic"
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
        if (affichage) affichage.textContent = totalDPS + " dégâts/tick"
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
        const bouton = document.querySelector("#imgPoisson")
        bouton.classList.remove("dommage-passif")
        void bouton.offsetWidth
        bouton.classList.add("dommage-passif")
        // pas de setTimeout — forwards garde le dernier état
    },
}