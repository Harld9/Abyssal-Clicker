setInterval(function () {
    controller.sauvegarderPartie()
    console.log("Sauvegarde effectuée")
}, 5000);

let options = document.getElementById('options')

options.addEventListener("click", function () {
    console.log("Sauvegarde Exporté");
    modele.exporterDonneesSauvegarde()
});
document.getElementById('options').addEventListener('click', () => {
    document.getElementById('modale-options').classList.remove('hidden')
})

document.getElementById('fermer-options').addEventListener('click', () => {
    document.getElementById('modale-options').classList.add('hidden')
})
