# Trouve ton artisan

Application web (Vite + React + TypeScript) avec un backend Node/Express et une base MySQL.

## Prérequis
- Node.js 18+ (recommandé: LTS récent)
- npm 9+
- MySQL 8 (service démarré en local)

## Structure du projet
- Frontend: racine du repo (Vite, React, TS)
- Backend: dossier `backend/` (Express, mysql2)
- Base de données: scripts SQL dans `sql/`

## Installation
1. Cloner le repo et installer les dépendances du frontend:
   - npm install
2. Installer les dépendances du backend:
   - cd backend
   - npm install

## Base de données
1. Créer la base et les tables (depuis MySQL):
   - Exécuter `sql/creation.sql`
2. Importer les données:
   - Exécuter `sql/remplissage.sql`

## Configuration backend (.env)
Créer un fichier `backend/.env` avec:
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=tta_app            # ou votre utilisateur MySQL
DB_PASSWORD=mot_de_passe   # le mot de passe associé
DB_NAME=trouve_ton_artisan
PORT=5174
```
Note: le fichier `.env` est ignoré par git.

## Lancer en développement
Ouvrir deux terminaux.

Terminal 1 – Backend:
```
cd backend
npm start
```
API disponible sur http://localhost:5174 (ex: GET /api/health)

Terminal 2 – Frontend:
```
npm run dev
```
Frontend sur http://localhost:5173. Les appels `/api` sont proxifiés vers le backend (voir `vite.config.ts`).

## Scripts utiles (frontend)
- `npm run dev` – démarre Vite
- `npm run build` – build de production
- `npm run preview` – sert le build localement
- `npm run lint` – lint du code

## Vérifications rapides
- API: `GET http://localhost:5174/api/health` doit renvoyer `{ "ok": true }`
- Données: `GET http://localhost:5174/api/artisans` renvoie la liste des artisans
- Frontend: pages Accueil, Liste, Fiche, NotFound accessibles

## Dépannage
- Port 5174 occupé: le backend tourne déjà. Arrêtez le processus ou changez `PORT` dans `backend/.env` et relancez.
- Erreur MySQL (Access denied): vérifiez utilisateur/mot de passe et que MySQL est démarré.
- CORS: en dev, le proxy Vite contourne les soucis. Ajustez `vite.config.ts` ou la config CORS backend si nécessaire.

## Sécurité (résumé)
- Éviter l’utilisateur MySQL `root`: créer un utilisateur dédié avec droits minimaux (SELECT).
- Stocker les secrets uniquement dans `backend/.env`.
- En prod: ajouter Helmet, rate limiting, et restreindre CORS aux domaines autorisés.
