// Namespace qui regroupe toutes les fonctions d'affichage liées à la page catalogue.
const CatalogueVue = {
    // ===== FONCTIONS =====
    // ----- AFFICHAGE -----
    // Affiche la liste des chaussettes avec les informations du controller (→ modèle)
    Affichage: (chaussettes) => {
        // On prend l'élément HTML <ul> (id= liste)
        const liste = document.getElementById('liste')
        // On vide le contenu de la liste. Pas de donnée utilisateur donc pas de faille XSS.
        liste.innerHTML = ''

        // Pour chaque élément de 'chaussettes'
        chaussettes.forEach(c => {
            // Création des balises HTML
            const li = document.createElement('li')
            const img = document.createElement('img')
            const a = document.createElement('a')
            const span = document.createElement('span')

            // Modification du contenu de chaque balise
            a.textContent = c.nom
            span.textContent = c.prix + '€'

            // Modification des attributs de chaque balise
            img.src = '/img/' + c.image
            img.alt = c.nom
            a.href = '/produit?id=' + c.id

            // Ajout des balises dans la liste
            li.appendChild(img)
            li.appendChild(a)
            li.appendChild(span)
            // Ajout de la balise <li> dans le <ul>
            liste.appendChild(li)
        })
    },
    // ----- AFFICHAGE ERREUR -----
    // Si le controller renvoie une erreur, on affiche cette erreur
    AffichageErreur: () => {
        document.getElementById('liste').innerHTML = 'Erreur de chargement'
    }

}