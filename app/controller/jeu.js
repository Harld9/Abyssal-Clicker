const controller = {

    initialiser() {
        console.log("Initialisation")

        document.getElementById("imgPoisson").addEventListener("click", function () {
            modele.frapperPoisson(modele.joueur.dommagesActuels)
            vue.updateScore(modele.obtenirScore())
            vue.updateFish(modele.obtenirFish())
        })

        document.getElementById("recup-sauvegarde").addEventListener("click", function () {
            const code = modele.exporterDonneesSauvegarde()
            navigator.clipboard.writeText(code)
            document.getElementById("recup-sauvegarde").textContent = "Sauvegarde copiée"
            console.log("Sauvegarde exportée")
        })

        document.getElementById("options").addEventListener("click", function () {
            document.getElementById("modale-options").classList.remove("hidden")
        })

        document.getElementById("fermer-options").addEventListener("click", function () {
            document.getElementById("modale-options").classList.add("hidden")
        })
    },

    chargerPartie() {
        if (localStorage.getItem("maSauvegarde") === null) return
        const donnees = JSON.parse(atob(localStorage.getItem("maSauvegarde")))
        modele.importerDonneesSauvegarde(donnees)
        vue.updateScore(modele.obtenirScore())
    },

    sauvegarderPartie() {
        const encode = btoa(JSON.stringify(modele.obtenirDonneesJoueur()))
        localStorage.setItem("maSauvegarde", encode)
        console.log("Sauvegarde effectuée")
    }
}

controller.chargerPartie()
controller.initialiser()