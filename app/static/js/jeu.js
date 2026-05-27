setInterval(function () {
    controller.sauvegarderPartie()
    console.log("Partie Sauvegardée !")
}, 5000);

document.getElementById('options').addEventListener('click', () => {
    document.getElementById('modale-options').classList.remove('hidden')
})

document.getElementById('fermer-options').addEventListener('click', () => {
    document.getElementById('modale-options').classList.add('hidden')
})