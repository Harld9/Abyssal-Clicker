// Fait le lien entre le modèle (catalogue) et la vue (catalogue)
const CatalogueController = {

    init: () => {
        CatalogueModele.getPoissons()
            .then(data => CatalogueVue.Affichage(data.chaussettes))
            .catch(() => CatalogueVue.AffichageErreur())
    }

}