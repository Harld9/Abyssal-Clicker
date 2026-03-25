CREATE TABLE IF NOT EXISTS Joueur (
    token VARCHAR(50) PRIMARY KEY,
    argent BIGINT DEFAULT 0,
    score BIGINT DEFAULT 0,
    palierActuel BIGINT DEFAULT 1,
    dateDerniereSauvegarde DATETIME DEFAULT CURRENT_TIMESTAMP,
    nom VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS Amelioration (
    idAmelioration TEXT PRIMARY KEY,
    nomAmelioration VARCHAR(50) NOT NULL,
    typeAmelioration VARCHAR(50) NOT NULL,
    cout BIGINT NOT NULL,
    valeurSupplementaire BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS Posseder (
    token VARCHAR(50),
    idAmelioration TEXT,
    Quantite BIGINT DEFAULT 0,
    PRIMARY KEY (token, idAmelioration),
    FOREIGN KEY (token) REFERENCES Joueur(token) ON DELETE CASCADE,
    FOREIGN KEY (idAmelioration) REFERENCES Amelioration(idAmelioration) ON DELETE CASCADE
);