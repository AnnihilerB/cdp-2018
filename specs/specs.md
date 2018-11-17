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

Le fichier *index.html* représente le fichier d'authentification.

Le fichier *home.html* représente le fichier d'accueil.

Le path /home/nomtable redérige vers le formulaire d'ajout nomtable. 
ex : /home/project/ redérige vers la page d'ajout                       d'un projet.

Les champs des formulaires sont sous la forme nomtable_nomchamp, pour les clés étrangères nomtable_nomtable2_nomchamp.
ex : project_name fait référence au nom d'un projet,                   sprint_project_id fait référence à l'id du projet auquel le       sprint est affecté.
