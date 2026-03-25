// Importe express
const express = require('express')
// On crée une instance de router
const router = express.Router()
// On importe (require) le fichier controller (backend)
const poissonController = require('../controller/poisson')

// ====== ROUTES ======
// ----- API/CHAUSSETTES ------
// On écoute appel GET sur /poissons et appel la fonction getChaussettes du controller
// On appelle la référence de la fonction (Express appellera la fonction au bon moment) et non
// le résultat de la fonction (getAll() -- la fonction s'exécute immédiatement au démarrage)
router.get('/poissons', poissonController.getChaussettes);
// ----- API/CHAUSSETTE/:ID ------
router.get('/poisson/:id', poissonController.getChaussetteById)

// On exporte le router avec ses routes pour que app.js puisse les utiliser (require)
module.exports = router