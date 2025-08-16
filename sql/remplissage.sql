-- Utilisation de la table 
USE `trouve_ton_artisan`;

-- Remplissage de la table artisans
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/data.csv'
INTO TABLE `artisans`
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ',' ENCLOSED BY '"' ESCAPED BY '\\'
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(`Nom`, `Spécialité`, `Note`, `Ville`, `A_propos`, `Email`, `Site_Web`, `Catégorie`, `Top`);

