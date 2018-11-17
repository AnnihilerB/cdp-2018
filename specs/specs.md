# Spécifications techniques

Ce fichier détaille l'ensemble des conventions de nommage et de codage.
Le langage utilisé est l'anglais.

## Quand est-ce que une tâche est considérée comme "DONE"

Une tâche est considérée comme fini (état DONE) quand la phase de développement est terminée mais aussi que les tests unitaires associés à la tâche sont réalisés et qu'ils passent.

## Tests

Un, ou une série de tests sont validés quand ces derniers passent et vérifient le code. Un test valide doit au moins afficher "OK" ainsi que l'heure et la date du lancement du test.

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
