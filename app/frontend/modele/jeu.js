// L'objet CatalogueModele contient les fonctions d'appel API
const CatalogueModele = {
    // ===== FONCTIONS =====
    // ----- GET POISSONS -----
    // Récupère tous les poissons
    getPoissons: () => {
        // Cache navigateur, récupère les valeurs par la clé 'poissons'. Si rien = NULL
        const cache = localStorage.getItem('poissons')

        // Si cache, on converti en JSON et on le retourne.
        if (cache) {
            // On crée une promise, car le controller attend une promise (.then)
            return Promise.resolve(JSON.parse(cache))
        }

        // Sinon, on appelle l'API et on le stocke en cache
        return fetch('/api/poissons')
            // On convertit la réponse HTTP brut en objet JS via la fonction res.json (Méthode express)
            .then(res => res.json())
            .then(data => {
                // On sauvegarde les datas en JSON dans le cache avec la clé 'poissons' pour les futurs chargements de la page.
                localStorage.setItem('poissons', JSON.stringify(data))
                // On retourne l'objet data
                return data
            })
    }

}