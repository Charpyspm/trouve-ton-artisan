-- Création de la base de données
DROP DATABASE IF EXISTS `trouve_ton_artisan`;
CREATE DATABASE `trouve_ton_artisan`;

-- Utilisation de la base de données
USE `trouve_ton_artisan`;

-- Suppression de la table artisans si elle existe
DROP TABLE IF EXISTS `artisans`;

-- Création de la table artisans
CREATE TABLE `artisans` (
    `Nom` VARCHAR(50) NOT NULL PRIMARY KEY,
    `Spécialité` VARCHAR(50) NOT NULL,
    `Note` FLOAT NOT NULL,
    `Ville` VARCHAR(50) NOT NULL,
    `A_propos` TEXT NOT NULL,
    `Email` VARCHAR(150) NOT NULL,
    `Site_Web` VARCHAR(50),
    `Catégorie` VARCHAR(50) NOT NULL,
    `Top` BOOLEAN DEFAULT 0
);
