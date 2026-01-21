// 1. IMPORTATION (On va chercher le module)
const express = require('express');

// 2. CRÉATION (On exécute la fonction express() pour créer l'app)
const app = express();

// 3. DÉMARRAGE (On écoute le port)
app.listen(3000, () => {
    console.log("🟢 Serveur lancé sur http://localhost:3000");
});