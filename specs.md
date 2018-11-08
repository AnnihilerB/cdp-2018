# Spécifications techniques

Ce fichier détaille l'ensemble des conventions de nommage et de codage.
Le langage utilisé est l'anglais.

## Linter

Le linter utilisé est ESLint. Le linter est configuré pour analyser le code en temps réel.
Il est basé sur la configuration *Google*.
Husky a également été mis en place. Un *githook* avant chaque push est mis en place pour empêcher d'envoyer sur le dépot du code non clean.
Les erreurs ESLint doivent être corrigées pour pouvoir push.

## Modèles

Le dossier *models* contient tous les modèles données :

- sprint.js
- user.js
- project.js
- task.js
- issue.js

## Front

Le fichier *index.html* représente le fichier d'accueil.
Le fichier ?????? représente une page d'affichage de formulaire.
