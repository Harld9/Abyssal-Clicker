//Objet vue qui possède les infos visibles
const vue = {
    //Méthode qui met à jour l'argent' dans l'affichage
    updateArgent(nouveauArgent) {
        const affichageArgent = document.getElementById("argent")
        affichageArgent.textContent = "Argent :" + nouveauArgent
        console.log(nouveauArgent + "argent")
    },
    //Méthode qui met une animation de dégât au poisson.
    damageFish() {
        const poisson = document.getElementById("poisson")
        void poisson.offsetWidth;
        poisson.classList.add("dommage")
        setTimeout(() => {
            poisson.classList.remove("dommage")
        }, 100)
    },
    //Méthode qui met à jour le poisson dans l'affichage
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

    updateFondPalier(palier) {
        const zonePoisson = document.getElementById("poisson-score");

        zonePoisson.style.backgroundImage =
            `url("./static/background/${palier}_profondeur.png")`;
    },
    updateScore(nouveauScore) {
        document.getElementById("nbScore").textContent = nouveauScore;
    },

    updateClic(nouveauClic) {
        document.getElementById("nbClic").textContent = nouveauClic;
    },

    updateBoutonsPaliers(palierAffiche, palierMaxDebloque) {
        for (let i = 1; i <= 13; i++) {
            const bouton = document.getElementById("palier-" + i);

            if (i === palierAffiche - 1 || i === palierAffiche || i === palierAffiche + 1) {
                bouton.classList.remove("hidden");
            } else {
                bouton.classList.add("hidden");
            }

            if (i <= palierMaxDebloque) {
                bouton.disabled = false;
                bouton.classList.remove("bloque");
            } else {
                bouton.disabled = true;
                bouton.classList.add("bloque");
            }
        }
    }
}