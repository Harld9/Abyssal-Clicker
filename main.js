//on définit la variable express qui contient tout le module express
const express = require('express')

//on crée une variable app qui contient notre serveur
const app = express()

//on définit EJS comme l'outil pour gérer nos pages (templates)
app.set('view engine', 'ejs');

//on dit à Express que nos fichiers sont dans le dossier "template" et pas ailleurs
app.set('views', './template');

//on dit ce qui se passe quand quelqu'un va sur la page d'accueil ('/')
app.get('/',(req, res) => {

    //on affiche un message dans la console (terminal)
    console.log('🚀 Serveur démarré sur http://localhost:8080')
    
    //on renvoie la page 'index' et on lui donne une donnée (text)
    res.render('index', {text : 'EF'})
})

//on lance le serveur pour qu'il écoute sur le port 8080
app.listen(8080)